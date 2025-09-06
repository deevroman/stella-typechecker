import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {stellaLexer} from "./gen/generic-main-antlr/antlr/stellaLexer";
import {
    DeclContext, DeclExceptionTypeContext,
    DeclFunContext,
    ProgramContext,
    stellaParser
} from "./gen/generic-main-antlr/antlr/stellaParser";

import {ANTLRErrorListener, RecognitionException, Recognizer} from 'antlr4ts';

import {TypesCollector} from './typesCollector'
import {stellaParserVisitorImpl} from "./stellaParserVisitorImpl";
import {error_type, TypecheckError} from "./typecheckError";
import {StellaType} from "./typecheckTypes";

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
}

export class SyntaxError {
    line: number = 0;
    charPositionInLine: number = 0;
    message: string = "";
}

export class SyntaxErrorReport implements Report {
    ok: boolean = false;
    syntaxErrors: SyntaxError[] = [];

    constructor(syntaxErrors: SyntaxError[]) {
        this.syntaxErrors = syntaxErrors;
    }
}

export class TypeErrorsReport implements Report {
    ok: boolean = false;
    errors: TypecheckError[] = [];
    extensions: object = {};
    payload: any;

    constructor(errors: TypecheckError[], extensions: object, payload: any) {
        this.errors = errors;
        this.extensions = extensions;
        this.payload = payload;
    }
}

export class GoodReport implements Report {
    ok: boolean = true;
    extensions: object = {};
    payload: any;
    constructor(extensions: object, payload: any) {
        this.extensions = extensions;
        this.payload = payload;
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

    const declException = tree.decl().find(i => i instanceof DeclExceptionTypeContext);
    visitor.exceptionType = declException?._exceptionType?.accept(visitor) as StellaType | undefined

    const functions = makeFunctionsMap(findAllFunctions(tree.decl()));
    addFunctionsToScope(visitor, functions)
    for (let [name, f] of Object.entries(functions)) {
        visitor.visitDeclFun(f)
        errors.push(...visitor.type_errors);
    }
    if (errors.length) {
        return new TypeErrorsReport(
            errors,
            collector.getExtensions(tree),
            findAllFunctions(tree.decl()).map(i => i.children?.[1]?.text)
        )
    } else {
        return new GoodReport(
            collector.getExtensions(tree),
            [
                findAllFunctions(tree.decl()).map(i => i.children?.[1]?.text),
                findAllFunctions(tree.decl()).map(i => i.children?.[1]?.toStringTree()),
            ]
        )
    }
}


export function parseAndTypecheck(text: string): SyntaxErrorReport | TypeErrorsReport | GoodReport {
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
    return checkProgram(parser, tree);
}

function findMainFn(tree: ProgramContext): DeclFunContext | undefined {
    return tree.decl()?.find(i => i.children?.[0].text === "fn" && i.children?.[1].text === "main") as DeclFunContext
}

export function findAllFunctions(decls: DeclContext[]): DeclFunContext[] {
    return decls.filter(i => i.children?.[0].text === "fn") as DeclFunContext[]
}

export function addFunctionsToScope(visitor: stellaParserVisitorImpl, functions: { [p: string]: DeclFunContext }) {
    for (let [name, f] of Object.entries(functions)) {
        visitor.addToScope(name, TypesCollector.extractFunctionTypes(f))
    }
}

export function makeFunctionsMap(functions: DeclFunContext[] ) {
    return Object.fromEntries(functions.map(f => [TypesCollector.extractName(f), f]))
}
