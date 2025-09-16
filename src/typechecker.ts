import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {stellaLexer} from "./gen/generic-main-antlr/antlr/stellaLexer";
import {
    DeclContext, DeclExceptionTypeContext, DeclExceptionVariantContext,
    DeclFunContext, DeclFunGenericContext,
    ProgramContext,
    stellaParser
} from "./gen/generic-main-antlr/antlr/stellaParser";

import {ANTLRErrorListener, RecognitionException, Recognizer} from 'antlr4ts';

import {TypesCollector} from './typesCollector'
import {stellaParserVisitorImpl} from "./stellaParserVisitorImpl";
import {error_type, TypecheckError} from "./typecheckError";
import {StellaAuto, StellaEntityVariant, StellaType, StellaVariant} from "./typecheckTypes";
import {checkConstrains} from "./reconstruction";

class BufferedErrorListener implements ANTLRErrorListener<any> {
    public syntaxErrors: SyntaxError[] = [];

    syntaxError<T>(
        recognizer: Recognizer<T, any>,
        offendingSymbol: T,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        this.syntaxErrors.push({
            line: line,
            charPositionInLine: charPositionInLine,
            message: msg
        });
    }
}

export interface Report {
    ok: boolean;
    sourceText: string;
}

export class SyntaxError {
    line: number = 0;
    charPositionInLine: number = 0;
    message: string = "";
}

export class SyntaxErrorReport implements Report {
    ok: boolean = false;
    syntaxErrors: SyntaxError[] = [];
    sourceText: string = "";

    constructor(syntaxErrors: SyntaxError[]) {
        this.syntaxErrors = syntaxErrors;
    }

    addSource(sourceText: string) {
        this.sourceText = sourceText
        return this
    }
}

export class TypeErrorsReport implements Report {
    ok: boolean = false;
    errors: TypecheckError[] = [];
    extensions: object = {};
    payload: any;
    sourceText: string = "";

    constructor(errors: TypecheckError[], extensions: object, payload: any) {
        this.errors = errors;
        this.extensions = extensions;
        this.payload = payload;
    }

    addSource(sourceText: string) {
        this.sourceText = sourceText
        return this
    }
}

export class GoodReport implements Report {
    ok: boolean = true;
    extensions: object = {};
    payload: any;
    sourceText: string = "";

    constructor(extensions: object, payload: any) {
        this.extensions = extensions;
        this.payload = payload;
    }

    addSource(sourceText: string) {
        this.sourceText = sourceText
        return this
    }
}

function checkProgram(parser: stellaParser, tree: ProgramContext) {
    const collector = new TypesCollector(parser, tree);
    const errors: TypecheckError[] = [];

    const mainFn = findMainFn(tree);
    if (!mainFn) {
        errors.push(new TypecheckError(error_type.ERROR_MISSING_MAIN))
    } else if (mainFn.paramDecl().length !== 1) {
        errors.push(new TypecheckError(error_type.ERROR_INCORRECT_ARITY_OF_MAIN))
    }

    const visitor = new stellaParserVisitorImpl(collector.getExtensions(tree));

    const declException = tree.decl().findLast(i => i instanceof DeclExceptionTypeContext);
    visitor.exceptionType = declException?._exceptionType?.accept(visitor) as StellaType | undefined

    const declExceptionsVariants = tree.decl().filter(i => i instanceof DeclExceptionVariantContext);
    if (declExceptionsVariants.length) {
        const variantEntities: StellaEntityVariant[] = []
        declExceptionsVariants.forEach(decl => {
            variantEntities.push(visitor.visitDeclExceptionVariant(decl))
        })
        visitor.exceptionType = new StellaVariant(variantEntities)
    }

    const functions = makeFunctionsList(findAllFunctions(tree.decl()));
    addFunctionsToScope(visitor, functions)
    if (visitor.type_errors.length) {
        return new TypeErrorsReport(
            visitor.type_errors,
            collector.getExtensions(tree),
            {
                functionsList: findAllFunctions(tree.decl()).map(i => i.children?.[1]?.text),
                constraints: visitor.constraints
            }
        )
    }

    for (let [name, f] of functions) {
        if (f instanceof DeclFunContext) {
            visitor.visitDeclFun(f)
        } else {
            visitor.visitDeclFunGeneric(f)
        }
        errors.push(...visitor.type_errors);
    }
    if (errors.length === 0 && visitor.typeReconstruction && visitor.constraints.length) {
        const err = checkConstrains(visitor.constraints)
        if (err) {
            errors.push(err)
        }
    }

    if (errors.length) {
        return new TypeErrorsReport(
            errors,
            collector.getExtensions(tree),
            {
                functionsList: findAllFunctions(tree.decl()).map(i => i.children?.[1]?.text),
                constraints: visitor.constraints
            }
        )
    } else {
        return new GoodReport(
            collector.getExtensions(tree),
            {
                functionsList: findAllFunctions(tree.decl()).map(i => i.children?.[1]?.text),
                // findAllFunctions(tree.decl()).map(i => i.children?.[1]?.toStringTree()),
                typeVars: visitor.typeVars,
                constraints: visitor.constraints
            }
        )
    }
}


export function parseAndTypecheck(text: string): SyntaxErrorReport | TypeErrorsReport | GoodReport {
    StellaAuto.resetFreshVarCounter()
    const inputStream = new ANTLRInputStream(text);
    const lexer = new stellaLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new stellaParser(tokenStream);

    const errorListener = new BufferedErrorListener();
    parser.removeErrorListeners()
    parser.addErrorListener(errorListener);

    const tree = parser.program();
    if (errorListener.syntaxErrors.length) {
        return new SyntaxErrorReport(
            errorListener.syntaxErrors
        )
    }
    // try { // todo
    return checkProgram(parser, tree).addSource(text);
    // } catch (e) {

    // return new GoodReport([], undefined)
    // }
}

function findMainFn(tree: ProgramContext): DeclFunContext | undefined {
    return tree.decl()?.find(i => i.children?.[0].text === "fn" && i.children?.[1].text === "main") as DeclFunContext
}

export function findAllFunctions(decls: DeclContext[]): (DeclFunContext | DeclFunGenericContext)[] {
    return decls.filter(i => i.children?.[0].text === "fn" || i.children?.[0].text === "generic") as (DeclFunContext | DeclFunGenericContext)[]
}

export function addFunctionsToScope(visitor: stellaParserVisitorImpl, functions: [string, (DeclFunContext | DeclFunGenericContext)][]) {
    for (let [name, f] of functions) {
        const functionType = TypesCollector.extractFunctionTypes(f, visitor)
        visitor.addToScope(name, functionType)
        // f.accept(visitor)
    }
}

export function makeFunctionsList(functions: (DeclFunContext | DeclFunGenericContext)[]): [string, (DeclFunContext | DeclFunGenericContext)][] {
    return functions.map(f => [TypesCollector.extractName(f), f])
}
