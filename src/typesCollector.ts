import {
    DeclFunContext,
    DeclFunGenericContext,
    ParamDeclContext,
    ProgramContext,
    stellaParser,
    TypeFunContext
} from "./gen/generic-main-antlr/antlr/stellaParser";
import {StellaFunction, StellaGenericVarType} from "./typecheckTypes";
import {stellaParserVisitorImpl} from "./stellaParserVisitorImpl";

export class TypesCollector {
    private parser: stellaParser;
    private root: ProgramContext;

    constructor(parser: stellaParser, tree: ProgramContext) {
        this.parser = parser;
        this.root = tree;
    }

    static extractName(fn: (DeclFunContext | DeclFunGenericContext)): string {
        return fn._name.text ?? "";
    }

    static extractArgs(fn: (DeclFunContext | DeclFunGenericContext)): {
        name: string | undefined;
        type: TypeFunContext
    }[] {
        return fn.children?.filter(i => i instanceof ParamDeclContext).map(i => {
            return {
                "name": i.children?.[0].text,
                "type": i.children?.[2] as TypeFunContext
            }
        }) ?? [];
    }

    public getExtensions(program: ProgramContext): string[] {
        const extensionContexts = program.extension();
        if (!extensionContexts
            || extensionContexts.length === 0
            || !extensionContexts[0].children) return [];
        return extensionContexts[0].children
            .slice(2)
            .filter((_, idx) => idx % 2 === 0)
            .map(i => i.text.slice(1))
    }

    static extractFunctionTypes(fn: (DeclFunContext | DeclFunGenericContext), typeVisitor: stellaParserVisitorImpl): StellaFunction | undefined {
        if (fn instanceof DeclFunGenericContext) {
            const generics = fn._generics.map(i => new StellaGenericVarType(i.text!))
            typeVisitor.openTypeVarScope()
            generics.forEach(type => {
                typeVisitor.addToTypeVarScope(type.genericName)
            })
            const args = TypesCollector.extractArgs(fn);
            const argsTypes = args.map(i => i.type.accept(typeVisitor))
            typeVisitor.closeTypeVarScope()
            if (argsTypes.some(i => i === undefined)) {
                return undefined
            }
            const returnType = fn.stellatype()[0].accept(typeVisitor)
            if (returnType === undefined) {
                return undefined
            }
            return new StellaFunction(
                argsTypes,
                returnType,
            ).addGenericsList(generics)
        } else {
            const args = TypesCollector.extractArgs(fn);
            const argsTypes = args.map(i => i.type.accept(typeVisitor))
            if (argsTypes.some(i => i === undefined)) {
                return undefined
            }
            const returnType = fn.stellatype()[0].accept(typeVisitor)
            if (returnType === undefined) {
                return undefined
            }
            return new StellaFunction (
                argsTypes,
                returnType
            )
        }
    }

    // static makeType(ctx: StellatypeContext) : StellaType {
    // if (ctx instanceof TypeNatContext) {
    //     return new StellaType("NAT_TYPE")
    // }
    // if (ctx instanceof TypeBoolContext) {
    //     return new StellaType("BOOL_TYPE")
    // }
    // if (ctx instanceof TypeFunContext) {
    //     const args = ctx.stellatype()
    //     const argsTypes = args.slice(0, -1).map(this.makeType);
    //     const returnTypes = args.slice(-1).map(this.makeType)[0];
    //     return new StellaFunction(argsTypes, returnTypes)
    // }
    // if (ctx instanceof TypeParensContext) {
    //     return TypesCollector.makeType(ctx._type_)
    // }
    // if (ctx instanceof TypeListContext) {
    //     // todo elems
    //     return new StellaList(this.makeType(ctx._type_))
    // }
    // if (ctx instanceof TypeSumContext) {
    //     return new StellaSumType(this.makeType(ctx._left), this.makeType(ctx._right))
    // }
    // if (ctx instanceof TypeRecordContext) {
    //     const fields = ctx._fieldTypes.map(b => new StellaEntityRecord(b._label.text!, this.makeType(b._type_)!))
    //     if (new Set(fields.map(e => e.key)).size !== fields.length) {
    //         // Todo
    //         // this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
    //     } else {
    //         return new StellaRecord(fields)
    //     }
    // }
    // if (ctx instanceof TypeVariantContext) {
    //     const fields = ctx._fieldTypes.map(b => new StellaEntityVariant(b._label.text!, this.makeType(b._type_)!))
    //     if (new Set(fields.map(e => e.key)).size !== fields.length) {
    //         // Todo
    //         // this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
    //     } else {
    //         return new StellaVariant(fields)
    //     }
    // }
    // debugger
    // return {
    //     type: "UNIT_TYPE",
    //     argsTypes: undefined,
    //     returnType: undefined,
    //     parameterType: undefined
    // }
    // }
}
