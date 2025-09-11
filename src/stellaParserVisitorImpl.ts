import {
    AbstractionContext,
    AddContext,
    AnExtensionContext,
    AnnotationContext,
    ApplicationContext,
    AssignContext,
    BindingContext,
    ConsListContext,
    ConstFalseContext,
    ConstIntContext,
    ConstMemoryContext,
    ConstTrueContext,
    ConstUnitContext,
    DeclContext,
    DeclExceptionTypeContext,
    DeclExceptionVariantContext,
    DeclFunContext,
    DeclFunGenericContext,
    DeclTypeAliasContext,
    DerefContext,
    DivideContext,
    DotRecordContext,
    DotTupleContext,
    EqualContext,
    ExprContext,
    ExtensionContext,
    FixContext,
    FoldContext,
    GreaterThanContext,
    GreaterThanOrEqualContext,
    HeadContext,
    IfContext,
    InlContext,
    InlineAnnotationContext,
    InrContext,
    IsEmptyContext,
    IsZeroContext,
    LabelledPatternContext,
    LanguageCoreContext,
    LanguageDeclContext,
    LessThanContext,
    LessThanOrEqualContext,
    LetContext,
    LetRecContext,
    ListContext,
    LogicAndContext,
    LogicNotContext,
    LogicOrContext,
    MatchCaseContext,
    MatchContext,
    MultiplyContext,
    NatRecContext,
    NotEqualContext,
    PanicContext,
    ParamDeclContext,
    ParenthesisedExprContext,
    ParenthesisedPatternContext,
    PatternAscContext,
    PatternBindingContext,
    PatternCastAsContext,
    PatternConsContext,
    PatternContext,
    PatternFalseContext,
    PatternInlContext,
    PatternInrContext,
    PatternIntContext,
    PatternListContext,
    PatternRecordContext,
    PatternSuccContext,
    PatternTrueContext,
    PatternTupleContext,
    PatternUnitContext,
    PatternVarContext,
    PatternVariantContext,
    PredContext,
    ProgramContext,
    RecordContext,
    RecordFieldTypeContext,
    RefContext,
    SequenceContext,
    Start_ExprContext,
    Start_ProgramContext,
    Start_TypeContext,
    StellatypeContext,
    SubtractContext,
    SuccContext,
    TailContext,
    TerminatingSemicolonContext,
    ThrowContext,
    TryCastAsContext,
    TryCatchContext,
    TryWithContext,
    TupleContext,
    TypeAbstractionContext,
    TypeApplicationContext,
    TypeAscContext,
    TypeAutoContext,
    TypeBoolContext,
    TypeBottomContext,
    TypeCastContext,
    TypeForAllContext,
    TypeFunContext,
    TypeListContext,
    TypeNatContext,
    TypeParensContext,
    TypeRecContext,
    TypeRecordContext,
    TypeRefContext,
    TypeSumContext,
    TypeTopContext,
    TypeTupleContext,
    TypeUnitContext,
    TypeVarContext,
    TypeVariantContext,
    UnfoldContext,
    VarContext,
    VariantContext,
    VariantFieldTypeContext
} from "./gen/generic-main-antlr/antlr/stellaParser";
import {stellaParserVisitor} from "./gen/generic-main-antlr/antlr/stellaParserVisitor";
import {ErrorNode, ParseTree, RuleNode} from "antlr4ts/tree";
import {TerminalNode} from "antlr4ts/tree/TerminalNode";
import {error_type, TypecheckError} from "./typecheckError";
import {
    StellaBot,
    StellaEntityRecord,
    StellaEntityVariant,
    StellaFunction,
    StellaGenericVarType,
    StellaList,
    StellaRecord,
    StellaRef,
    StellaSumType,
    StellaTop,
    StellaTuple,
    StellaType,
    StellaVariant
} from "./typecheckTypes";
import {addFunctionsToScope, findAllFunctions, makeFunctionsMap} from "./typechecker";

export class stellaParserVisitorImpl implements stellaParserVisitor<void> {
    scopes: { [p: string]: StellaType | undefined }[] = [{}];
    typeVarScopes: { [p: string]: boolean }[] = [{}]; // todo rewrite ro Set
    extensions: string[];
    type_errors: TypecheckError[] = [];
    patternType: StellaType[] = [];
    contextType: (StellaType | undefined)[] = [];
    subtypingEnabled: boolean = false;
    exceptionType: StellaType | undefined;
    ambiguousTypeAsBottom: boolean = false;

    constructor(extensions: string[] = []) {
        this.extensions = extensions;
        if (extensions.includes("structural-subtyping")) {
            this.subtypingEnabled = true;
        }
        if (extensions.includes("ambiguous-type-as-bottom")) {
            this.ambiguousTypeAsBottom = true;
        }
        this.scopes = [{}]
        this.typeVarScopes = [{}]
    }

    getScope() {
        return this.scopes[this.scopes.length - 1];
    }

    getTypeVarScope() {
        return this.typeVarScopes[this.scopes.length - 1];
    }

    addToScope(name: string, type: StellaType | undefined) {
        this.getScope()[name] = type;
    }

    addToTypeVarScope(name: string) {
        this.getTypeVarScope()[name] = true;
    }

    nameInScope(name: string): StellaType | undefined {
        for (const scope of this.scopes.toReversed()) {
            if (name in scope) {
                return scope[name];
            }
        }
        return undefined;
    }

    typeVarNameInScope(name: string): boolean {
        for (const scope of this.typeVarScopes.toReversed()) {
            if (name in scope) {
                return scope[name];
            }
        }
        return false;
    }

    openScope() {
        this.scopes.push({});
    }

    closeScope() {
        this.scopes.pop();
    }

    openTypeVarScope() {
        this.typeVarScopes.push({});
    }

    closeTypeVarScope() {
        this.typeVarScopes.pop();
    }

    addPatternType(type: StellaType) {
        this.patternType.push(type)
    }

    dropPatternType() {
        this.patternType.pop()
    }

    getPatternType(): StellaType {
        return this.patternType[this.patternType.length - 1]!;
    }

    addContextType(type: StellaType | undefined) {
        this.contextType.push(type)
    }

    dropContextType() {
        this.contextType.pop()
    }

    getContextType(): StellaType {
        return this.contextType[this.contextType.length - 1]!;
    }

    addError(err: TypecheckError) {
        this.type_errors.push(err)
    }

    visitAbstraction(ctx: AbstractionContext): StellaFunction | undefined {
        debugger;
        this.openScope()
        const contextType = this.getContextType()
        if (contextType && !(contextType instanceof StellaFunction)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        if (contextType && contextType instanceof StellaFunction) {
            if (contextType.argsTypes.length !== ctx.paramDecl().length) {
                // todo check better
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        const argsTypes = ctx.paramDecl().map((i, index) => {
            return this.visitParamDecl(i)!
        })
        if (contextType && contextType instanceof StellaFunction) {
            this.addContextType(contextType.returnType)
        } else {
            this.addContextType(undefined)
        }
        const returnType = this.visitExpr(ctx.expr())
        this.dropContextType()

        this.closeScope()
        if (returnType) {
            return new StellaFunction(argsTypes, returnType!)
        }
    }

    visitAdd(ctx: AddContext): void {
        debugger;
        return undefined;
    }

    visitAnExtension(ctx: AnExtensionContext): void {
        debugger;
        return undefined;
    }

    visitAnnotation(ctx: AnnotationContext): void {
        debugger;
        return undefined;
    }

    visitApplication(ctx: ApplicationContext): StellaType | undefined {
        let fun = ctx._fun;
        while (fun instanceof ParenthesisedExprContext) {
            fun = fun._expr_
        }
        if (fun instanceof VarContext) {
            const funToken = fun._name;
            const type = this.nameInScope(funToken.text!)
            if (type instanceof StellaFunction) {
                if (ctx._args.length !== type.argsTypes?.length) {
                    this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS, funToken));
                } else {
                    for (let i = 0; i < type.argsTypes.length; i++) {
                        const expectedArgumentType = type.argsTypes[i]
                        this.addContextType(expectedArgumentType)
                        const argType = ctx._args[i].accept(this) as StellaType | undefined
                        argType?.tryAssignTo(expectedArgumentType, this)
                        this.dropContextType()
                    }
                }
                const contextType = this.getContextType()
                if (contextType) {
                    type.returnType.tryAssignTo(contextType, this)
                }
                return type.returnType
            } else if (type && type.type === "LIST_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE, funToken));
            } else if (!type) {
                this.addError(new TypecheckError(error_type.ERROR_UNDEFINED_VARIABLE, funToken));
            } else {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_FUNCTION, funToken));
            }
        } else {
            debugger
            this.addContextType(undefined)
            const type = fun.accept(this) as (StellaType | undefined);
            this.dropContextType()
            if (type instanceof StellaFunction) {
                if (ctx._args.length !== type.argsTypes?.length) {
                    this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS));
                } else {
                    for (let i = 0; i < type.argsTypes.length; i++) {
                        const expectedArgumentType = type.argsTypes[i]
                        this.addContextType(expectedArgumentType)
                        const argType = ctx._args[i].accept(this) as StellaType | undefined
                        argType?.tryAssignTo(expectedArgumentType, this)
                        this.dropContextType()
                    }
                }
                return type.returnType;
            } else {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_FUNCTION));
            }
        }
    }

    visitAssign(ctx: AssignContext): StellaType | undefined {
        const lType = ctx._lhs.accept(this)! as StellaType
        if (!(lType instanceof StellaRef)) {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_REFERENCE))
            return
        }
        this.addContextType(lType.parameterType)
        const rType = ctx._rhs.accept(this)! as StellaType
        this.dropContextType()

        if (!lType.parameterType.isEqualType(rType)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        return new StellaType("UNIT_TYPE");
    }

    visitBinding(ctx: BindingContext): StellaEntityRecord | undefined {
        const contextType = this.getContextType()
        if (contextType) {
            if (contextType instanceof StellaRecord) {
                const expectedValueType = contextType.findTypeByLabel(ctx._name.text!)
                if (expectedValueType) {
                    this.addContextType(expectedValueType)
                    try {
                        return new StellaEntityRecord(ctx._name.text!, this.visitExpr(ctx._rhs)!);
                    } finally {
                        this.dropContextType()
                    }
                } else {
                    if (this.subtypingEnabled) {
                        this.addContextType(undefined)
                        try {
                            return new StellaEntityRecord(ctx._name.text!, this.visitExpr(ctx._rhs)!);
                        } finally {
                            this.dropContextType()
                        }
                    } else {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD_FIELDS))
                        return
                    }
                }
            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                return
            }
        } else {
            return new StellaEntityRecord(ctx._name.text!, this.visitExpr(ctx._rhs)!);
        }
    }

    visitConsList(ctx: ConsListContext): StellaType | undefined {
        const contextType = this.getContextType()
        if (contextType) {
            if (contextType instanceof StellaList) {
                this.addContextType(contextType.parameterType)
            } else if (contextType instanceof StellaTop && this.subtypingEnabled) {
                this.addContextType(contextType)
            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
                return
            }
        } else {
            this.addContextType(contextType)
        }
        const headType = this.visitExpr(ctx._head) as StellaType
        this.dropContextType()

        const tailType = this.visitExpr(ctx._tail) as StellaType
        if (!(tailType instanceof StellaList) && !(tailType instanceof StellaTop)) {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
            return
        }
        const resultListType = new StellaList(headType)
        if (contextType) {
            resultListType.tryAssignTo(contextType, this)
            tailType.tryAssignTo(contextType, this)
        } else {
            tailType.tryAssignTo(resultListType, this)
        }
        return resultListType
    }

    visitConstFalse(ctx: ConstFalseContext): StellaType {
        const returnType = new StellaType("BOOL_TYPE").addValue("false", true)
        const contextType = this.getContextType()
        if (contextType) {
            returnType.tryAssignTo(contextType, this)
        }
        return returnType
    }

    visitConstInt(ctx: ConstIntContext): StellaType {
        const returnType = new StellaType("NAT_TYPE").addValue(ctx._n.text!, true)
        const contextType = this.getContextType()
        if (contextType) {
            returnType.tryAssignTo(contextType, this)
        }
        return returnType
    }

    visitConstMemory(ctx: ConstMemoryContext): StellaType | undefined {
        const contextType = this.getContextType();
        if (contextType) {
            return new StellaRef(new StellaType("_CONST_MEMORY_REF_TYPE")).addAddr(ctx._mem.text!);
        } else {
            this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_REFERENCE_TYPE))
        }
    }

    visitConstTrue(ctx: ConstTrueContext): StellaType {
        const returnType = new StellaType("BOOL_TYPE").addValue("true", true)
        const contextType = this.getContextType()
        if (contextType) {
            returnType.tryAssignTo(contextType, this)
        }
        return returnType
    }

    visitConstUnit(ctx: ConstUnitContext): StellaType {
        return new StellaType("UNIT_TYPE");
    }

    visitDecl(ctx: DeclContext): void {
        debugger;
        return undefined;
    }

    visitDeclExceptionType(ctx: DeclExceptionTypeContext): void {
        debugger;
        return undefined;
    }

    visitDeclExceptionVariant(ctx: DeclExceptionVariantContext): StellaEntityVariant {
        return new StellaEntityVariant(ctx._name.text!, this.visitExpr(ctx._variantType)!);
    }

    visitDeclFun(ctx: DeclFunContext): void {
        this.openScope()
        ctx.paramDecl().forEach(i => this.visitParamDecl(i))
        addFunctionsToScope(this, makeFunctionsMap(findAllFunctions(ctx.decl())))
        const returnTypeFromContext = (this.nameInScope(ctx._name.text!) as StellaFunction)?.returnType

        this.addContextType(returnTypeFromContext)
        const returnType = this.visitExpr(ctx.expr()) as StellaType
        returnType?.tryAssignTo(returnTypeFromContext, this)
        this.dropContextType()
        this.closeScope()
        return undefined // todo type
    }

    visitDeclFunGeneric(ctx: DeclFunGenericContext): void {
        this.openTypeVarScope()
        ctx._generics.forEach(genericToken => {
            this.addToTypeVarScope(genericToken.text!)
        })
        debugger
        this.openScope()
        ctx.paramDecl().forEach(i => this.visitParamDecl(i))
        addFunctionsToScope(this, makeFunctionsMap(findAllFunctions(ctx.decl())))
        const returnTypeFromContext = (this.nameInScope(ctx._name.text!) as StellaFunction)?.returnType

        this.addContextType(returnTypeFromContext)
        const returnType = this.visitExpr(ctx.expr()) as StellaType
        returnType?.tryAssignTo(returnTypeFromContext, this)
        this.dropContextType()
        this.closeScope()
        return undefined // todo type
    }

    visitDeclTypeAlias(ctx: DeclTypeAliasContext): void {
        debugger;
        return undefined;
    }

    visitDeref(ctx: DerefContext): StellaType | undefined {
        this.addContextType(new StellaRef(this.getContextType()))
        const type = ctx._expr_.accept(this)! as StellaType
        this.dropContextType()
        if (type instanceof StellaRef) {
            return type.parameterType
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_REFERENCE))
            // this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
    }

    visitDivide(ctx: DivideContext): void {
        debugger;
        return undefined;
    }

    visitDotRecord(ctx: DotRecordContext): StellaType | undefined {
        const fieldName = ctx._label.text!
        const contextType = this.getContextType()
        if (contextType) {
            const contextRecord = new StellaRecord([new StellaEntityRecord(fieldName, contextType)], true)
            this.addContextType(contextRecord)
        } else {
            this.addContextType(contextType)
        }
        this.addContextType(undefined)
        const type = ctx._expr_.accept(this)! as StellaType;
        this.dropContextType()
        if (type instanceof StellaRecord) {
            const value = type.findTypeByLabel(fieldName)
            if (!value) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_FIELD_ACCESS))
            }
            return value
        } else {
            if (type instanceof StellaList && type.isEmptyList()) {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
            } else {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_RECORD))
            }
        }
        return undefined;
    }

    visitDotTuple(ctx: DotTupleContext): StellaType | undefined {
        const index = parseInt(ctx._index.text!)
        this.addContextType(undefined)
        const type = ctx._expr_.accept(this)! as StellaType;
        this.dropContextType()
        if (type instanceof StellaTuple) {
            if (index > type.elems.length || index <= 0) {
                this.addError(new TypecheckError(error_type.ERROR_TUPLE_INDEX_OUT_OF_BOUNDS))
            } else {
                return type.elems[index - 1]
            }
        } else {
            if (type instanceof StellaList && type.isEmptyList()) {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
            } else {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_TUPLE))
            }
        }
        return undefined;
    }

    visitEqual(ctx: EqualContext): void {
        debugger;
        return undefined;
    }

    visitExpr(ctx: ExprContext): StellaType | undefined {
        return ctx.accept(this)!;
    }

    visitExtension(ctx: ExtensionContext): void {
        debugger;
        return undefined;
    }

    visitFix(ctx: FixContext): StellaType | undefined {
        this.addContextType(undefined)
        const argType = this.visitExpr(ctx._expr_) as StellaType
        this.dropContextType()
        if (argType instanceof StellaFunction) {
            const fixT = argType.argsTypes![0]
            if (argType.argsTypes!.length !== 1) {
                this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS))
            } else if (fixT.type !== argType.returnType?.type) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            } else {
                return fixT;
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_FUNCTION))
        }
    }

    visitFold(ctx: FoldContext): void {
        debugger;
        return undefined;
    }

    visitGreaterThan(ctx: GreaterThanContext): void {
        debugger;
        return undefined;
    }

    visitGreaterThanOrEqual(ctx: GreaterThanOrEqualContext): void {
        debugger;
        return undefined;
    }

    visitHead(ctx: HeadContext): StellaType | undefined {
        const contextType = this.getContextType()
        if (contextType) {
            this.addContextType(new StellaList(contextType))
        }
        const type = this.visitExpr(ctx._list) as StellaType
        if (contextType) {
            this.dropContextType()
        }
        if (type instanceof StellaList) {
            if (type.isEmptyList()) {
                if (contextType) {
                    return contextType
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
                }
            } else {
                return type.parameterType!;
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
        }
    }

    visitIf(ctx: IfContext): StellaType | undefined {
        this.addContextType(new StellaType("BOOL_TYPE"))
        const type = this.visitExpr(ctx._condition)
        this.dropContextType()
        if (type?.type !== "BOOL_TYPE") {
            if (type instanceof StellaFunction && type.returnType?.type !== "BOOL_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        const thenType = this.visitExpr(ctx._thenExpr)
        let elseType;
        if (this.getContextType() === undefined) {
            this.addContextType(thenType)
            elseType = this.visitExpr(ctx._elseExpr)
            this.dropContextType()
        } else {
            elseType = this.visitExpr(ctx._elseExpr)
        }

        const typeFromContext = (this.getContextType() as StellaType)
        if (typeFromContext !== undefined) {
            thenType?.tryAssignTo(typeFromContext, this)
            elseType?.tryAssignTo(typeFromContext, this)
        } else {
            if (!thenType?.isEqualType(elseType)) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }

        if (typeFromContext instanceof StellaRef) {
            return typeFromContext
        }
        return thenType; // fixme
    }

    visitInl(ctx: InlContext): StellaType | undefined {
        const contextType = this.getContextType();
        if (!contextType) {
            if (this.ambiguousTypeAsBottom) {
                this.addContextType(undefined)
                const type = this.visitExpr(ctx._expr_);
                this.dropContextType()
                if (type) {
                    return new StellaSumType(type, new StellaBot())
                }
            } else {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
            }
        } else if (!(contextType instanceof StellaSumType)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_INJECTION))
            return undefined
        } else {
            this.addContextType(contextType.leftType!)
            const type = this.visitExpr(ctx._expr_)
            this.dropContextType()
            if (contextType.leftType) {
                if (type) {
                    type.tryAssignTo(contextType.leftType, this)
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
                }
            }
            return contextType
        }
    }

    visitInlineAnnotation(ctx: InlineAnnotationContext): void {
        debugger;
        return undefined;
    }

    visitInr(ctx: InrContext): StellaType | undefined {
        const contextType = this.getContextType();
        if (!contextType) {
            if (this.ambiguousTypeAsBottom) {
                this.addContextType(undefined)
                const type = this.visitExpr(ctx._expr_);
                this.dropContextType()
                if (type) {
                    return new StellaSumType(new StellaBot(), type)
                }
            } else {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
            }
        } else if (!(contextType instanceof StellaSumType)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_INJECTION))
            return undefined
        } else {
            this.addContextType(contextType.rightType!)
            const type = this.visitExpr(ctx._expr_);
            this.dropContextType()
            if (contextType.rightType) {
                if (type) {
                    type.tryAssignTo(contextType.rightType, this)
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
                }
            }
            return contextType
        }
    }

    visitIsEmpty(ctx: IsEmptyContext): StellaType {
        const resultType = new StellaType("BOOL_TYPE")
        if (this.getContextType()) {
            resultType.tryAssignTo(this.getContextType(), this)
        }

        this.addContextType(undefined)
        const type = this.visitExpr(ctx._list) as StellaType
        this.dropContextType()

        if (type instanceof StellaList) {
            if (type.isEmptyList() && !this.subtypingEnabled) {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
        }
        return resultType
    }

    visitIsZero(ctx: IsZeroContext): StellaType {
        const type = this.visitExpr(ctx._n) as StellaType
        if (type.type !== "NAT_TYPE") {
            if (type.type === "LIST_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        return new StellaType("BOOL_TYPE")
    }

    visitLabelledPattern(ctx: LabelledPatternContext): StellaType | undefined {
        const patternTypeFromContext = (this.getPatternType() as StellaRecord).findTypeByLabel(ctx._label.text!)
        if (patternTypeFromContext) {
            this.addPatternType(patternTypeFromContext)
            const type = ctx._pattern_.accept(this)! as StellaType
            if (patternTypeFromContext.type !== type.type) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
            }
            this.dropPatternType()
            return new StellaRecord([]); // todo
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
    }

    visitLanguageCore(ctx: LanguageCoreContext): void {
        debugger;
        return undefined;
    }

    visitLanguageDecl(ctx: LanguageDeclContext): void {
        debugger;
        return undefined;
    }

    visitLessThan(ctx: LessThanContext): void {
        debugger;
        return undefined;
    }

    visitLessThanOrEqual(ctx: LessThanOrEqualContext): void {
        debugger;
        return undefined;
    }

    visitLet(ctx: LetContext): StellaType | void {
        this.openScope()
        this.addContextType(undefined)
        this.visitPatternBinding(ctx._patternBinding)
        this.dropContextType()
        const res = this.visitExpr(ctx._body)
        if (res instanceof StellaList && res.isEmptyList()) {
            this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
        }
        this.closeScope()
        return res
    }

    visitLetRec(ctx: LetRecContext): StellaType | void {
        this.openScope()
        this.addContextType(undefined)

        let patternBinding = ctx._patternBinding._pat
        while (patternBinding instanceof ParenthesisedPatternContext) {
            patternBinding = patternBinding._pattern_
        }
        if (patternBinding instanceof PatternVarContext) {
            this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_PATTERN_TYPE))
            return undefined
        }
        let ascType;
        if (patternBinding instanceof PatternAscContext) {
            const patternType = patternBinding.accept(this) as StellaType
            ascType = patternBinding._type_.accept(this)! as StellaType
            if (!patternType.isEqualType(ascType)) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
            }
        } else {
            debugger
        }
        this.dropContextType()
        const res = this.visitExpr(ctx._body)
        this.closeScope()
        if (!ascType?.isEqualType(res)) {
            debugger
        }
        return res
    }

    visitList(ctx: ListContext): StellaType | undefined {
        const elemsCount = ctx.expr().length
        const contextType = this.getContextType()
        if (contextType) {
            if (contextType instanceof StellaList) {
                this.addContextType(contextType.parameterType)
            } else if (contextType instanceof StellaTop && this.subtypingEnabled) {
                this.addContextType(contextType)
            } else {
                if (elemsCount === 0 && !this.ambiguousTypeAsBottom) {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
                }
                return
            }
        } else {
            this.addContextType(contextType)
        }
        const listElemsTypes = ctx.expr().map(i => this.visitExpr(i))
        this.dropContextType()
        if (elemsCount === 0) {
            const contextType = this.getContextType()
            if (contextType) {
                if (contextType instanceof StellaList || contextType instanceof StellaTop) {
                    return contextType
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
                }
            } else {
                return StellaList.makeEmptyList(this.ambiguousTypeAsBottom)
            }
        } else {
            const firstType = listElemsTypes[0];
            for (let elemType of listElemsTypes) {
                if (elemType?.type !== firstType?.type) {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                }
            }
            return new StellaList(firstType)
        }
    }

    visitLogicAnd(ctx: LogicAndContext): StellaType {
        debugger;
        return new StellaType("BOOL_TYPE");
    }

    visitLogicNot(ctx: LogicNotContext): StellaType {
        debugger;
        return new StellaType("BOOL_TYPE");
    }

    visitLogicOr(ctx: LogicOrContext): StellaType {
        debugger;
        return new StellaType("BOOL_TYPE");
    }

    visitMatch(ctx: MatchContext): StellaType | undefined {
        this.addContextType(undefined)
        const matchType = this.visitExpr(ctx.expr());
        if (matchType === undefined) {
            return
        }
        this.dropContextType()
        const matchedTypeVariants: StellaType[] = []
        const returnTypes: StellaType[] = [];
        if (ctx._cases.length === 0) {
            this.addError(new TypecheckError(error_type.ERROR_ILLEGAL_EMPTY_MATCHING))
            return
        }
        for (const _case of ctx._cases) {
            this.openScope()
            this.addPatternType(matchType!);
            const casePatternType = _case._pattern_.accept(this)!
            if (casePatternType === undefined) {
                debugger
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
                return
            }
            matchedTypeVariants.push(casePatternType)
            const value = this.visitExpr(_case._expr_) as StellaType | undefined
            if (value) {
                if (returnTypes.length > 0) {
                    if (returnTypes[0].type !== value.type) {
                        if (value instanceof StellaList) {
                            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
                        } else {
                            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                        }
                    }
                }
                if (value instanceof StellaList && value.isEmptyList()) {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
                } else {
                    returnTypes.push(value)
                }
            }
            this.dropPatternType()
            this.closeScope()
        }
        switch (matchType?.type) {
            case "BOOL_TYPE": {
                if (matchedTypeVariants.find(t => t.value === "_")) {
                    return returnTypes[0]
                }
                if (!matchedTypeVariants.some(t => t.value === "true")) {
                    this.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)) // todo
                }
                if (!matchedTypeVariants.some(t => t.value === "false")) {
                    this.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)) // todo
                }
                return returnTypes[0]
            }
            case "NAT_TYPE": {
                if (matchedTypeVariants.length === 0) {
                    this.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)) // todo
                    break
                }
                if (matchedTypeVariants.find(t => t.value === "_")) {
                    return returnTypes[0]
                }
                matchedTypeVariants.sort((a, b) => {
                    if (parseInt(a.value!) < parseInt(b.value!)) {
                        return 1;
                    }
                    if (parseInt(a.value!) > parseInt(b.value!)) {
                        return -1
                    }
                    return 0
                })
                let maxChecked = matchedTypeVariants[0];
                if (maxChecked.isEqualValue) {
                    this.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)) // todo
                    break
                }
                for (const i of matchedTypeVariants) {
                    if (!i.isEqualValue) {
                        maxChecked = i
                    } else {
                        if (parseInt(i.value!) + 1 >= parseInt(maxChecked.value!)) {
                            maxChecked = i
                        } else {
                            this.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)) // todo
                            return returnTypes[0]
                        }
                    }
                }
                if (parseInt(maxChecked.value!) !== 0) {
                    this.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)) // todo
                    break
                }
                return returnTypes[0]
            }
            default:
                return returnTypes[0]
        }
        throw "Unsupported"
    }

    visitMatchCase(ctx: MatchCaseContext): void {
        debugger;
        return undefined;
    }

    visitMultiply(ctx: MultiplyContext): void {
        debugger;
        return undefined;
    }

    visitNatRec(ctx: NatRecContext): StellaType {
        const nType = ctx._n.accept(this)! as StellaType
        if (nType.type !== "NAT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        const initialType = ctx._initial.accept(this)! as StellaType
        this.addContextType(undefined)
        const stepType = ctx._step.accept(this)! as StellaType
        this.dropContextType()
        if (!(stepType instanceof StellaFunction)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        } else if (stepType.argsTypes.length !== 1) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_NUMBER_OF_PARAMETERS_IN_LAMBDA))
        } else if (stepType.argsTypes[0].type !== "NAT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        } else if ((!(stepType.returnType instanceof StellaFunction))) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        } else if (!stepType.returnType.isEqualType(new StellaFunction([initialType], initialType))) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        return initialType
    }

    visitNotEqual(ctx: NotEqualContext): StellaType {
        debugger;
        return new StellaType("BOOL_TYPE");
    }

    visitPanic(ctx: PanicContext): StellaType | undefined {
        debugger
        const contextType = this.getContextType()
        if (contextType) {
            return contextType
        } else {
            if (this.ambiguousTypeAsBottom) {
                return new StellaBot()
            } else {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_PANIC_TYPE))
            }
        }
    }

    visitParamDecl(ctx: ParamDeclContext): StellaType | undefined {
        const type = this.visitStellatype(ctx._paramType)
        this.addToScope(ctx._name.text!, type)
        return type;
    }

    visitParenthesisedExpr(ctx: ParenthesisedExprContext): any {
        return ctx._expr_.accept(this);
    }

    visitParenthesisedPattern(ctx: ParenthesisedPatternContext): void {
        return ctx._pattern_.accept(this)
    }

    visitPattern(ctx: PatternContext): void {
        debugger;
        return undefined;
    }

    visitPatternAsc(ctx: PatternAscContext): StellaType {
        if (ctx._pattern_ instanceof PatternVarContext) {
            const type = ctx._type_.accept(this)!
            this.addToScope(ctx._pattern_.text!, type)
            return type
        }
        return ctx._pattern_.accept(this)!
    }

    visitPatternBinding(ctx: PatternBindingContext): StellaType | undefined {
        if (ctx._pat instanceof ParenthesisedPatternContext) {
            const patternType = ctx._pat.accept(this) as StellaType | undefined;
            const type = ctx._rhs.accept(this) as StellaType | undefined
            if (patternType && type) {
                if (type.type !== patternType.type) { // fixme
                    if (this.subtypingEnabled) {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
                    } else {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
                    }
                }
                return patternType
            } else {
                return
            }
        } else if (ctx._pat instanceof PatternVarContext) {
            const type = ctx._rhs.accept(this) as StellaType | undefined
            if (type) {
                this.addToScope(ctx._pat.text!, type)
                return type
            }
        } else if (ctx._pat instanceof PatternAscContext) {
            const patternType = ctx._pat.accept(this) as StellaType
            const ascType = ctx._pat._type_.accept(this)! as StellaType
            if (!patternType.isEqualType(ascType)) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
            return ascType
        }
        return undefined;
    }

    visitPatternCastAs(ctx: PatternCastAsContext): void {
        debugger;
        return undefined;
    }

    visitPatternCons(ctx: PatternConsContext): StellaType | undefined {
        if (this.getPatternType()?.type !== "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }

        this.addPatternType((this.getPatternType() as StellaList).parameterType!)
        ctx._head.accept(this)
        this.dropPatternType()

        this.addPatternType(this.getPatternType()!)
        ctx._tail.accept(this)
        this.dropPatternType()
        return StellaList.makeEmptyList(this.ambiguousTypeAsBottom); // todo
    }

    visitPatternFalse(ctx: PatternFalseContext): StellaType {
        if (this.getPatternType()?.type !== "BOOL_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return new StellaType("BOOL_TYPE").addValue("false", true); // todo
    }

    visitPatternInl(ctx: PatternInlContext): void {
        const patternType = this.getPatternType()
        if (patternType instanceof StellaSumType) {
            this.addPatternType(patternType.leftType!)
            try {
                return ctx._pattern_.accept(this)
            } finally {
                this.dropPatternType()
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return undefined;
    }

    visitPatternInr(ctx: PatternInrContext): void {
        const patternType = this.getPatternType()
        if (patternType instanceof StellaSumType) {
            this.addPatternType(patternType.rightType!)
            try {
                return ctx._pattern_.accept(this)
            } finally {
                this.dropPatternType()
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return undefined;
    }

    visitPatternInt(ctx: PatternIntContext): StellaType | undefined {
        if (this.getPatternType()?.type !== "NAT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        } else {
            return new StellaType("NAT_TYPE").addValue(ctx._n.text!, true); // todo
        }
    }

    visitPatternList(ctx: PatternListContext): StellaType {
        if (!(this.getPatternType() instanceof StellaList)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        this.addPatternType((this.getPatternType() as StellaList).parameterType!)
        ctx._patterns.forEach(p => p.accept(this))
        this.dropPatternType()
        return StellaList.makeEmptyList(this.ambiguousTypeAsBottom); // todo
    }

    visitPatternRecord(ctx: PatternRecordContext): StellaType | undefined {
        for (const p of ctx._patterns) {
            const fieldType = p.accept(this);
            if (fieldType === undefined) {
                return
            }
        }
        return new StellaRecord([]); // todo
    }

    visitPatternSucc(ctx: PatternSuccContext): StellaType {
        this.addPatternType(this.getPatternType())
        const valueType = ctx._pattern_.accept(this)! as StellaType
        if (valueType.type === "ANY_TYPE") {
            return new StellaType("NAT_TYPE").addValue("1", false)
        } else if (valueType.type === "NAT_TYPE") {
            return new StellaType("NAT_TYPE").addValue((parseInt(valueType.value ?? "0") + 1).toString(), valueType.isEqualValue)
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        this.dropPatternType()
        return new StellaType("NAT_TYPE") // todo
    }

    visitPatternTrue(ctx: PatternTrueContext): StellaType {
        if (this.getPatternType()?.type !== "BOOL_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return new StellaType("BOOL_TYPE").addValue("true", true); // todo
    }

    visitPatternTuple(ctx: PatternTupleContext): void {
        const patternType = this.getPatternType()
        if (!(patternType instanceof StellaTuple)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
            return undefined
        }
        if (patternType.elems.length !== ctx._patterns.length) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
            return undefined
        }
        ctx._patterns.forEach(p => p.accept(this))
        return undefined;
    }

    visitPatternUnit(ctx: PatternUnitContext): StellaType | undefined {
        const patternType = this.getPatternType()
        if (patternType.type !== "UNIT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        } else {
            return new StellaType("UNIT_TYPE");
        }
    }

    visitPatternVar(ctx: PatternVarContext): StellaType {
        const varName = ctx._name.text!
        if (varName === "_") {
            return new StellaType("ANY_TYPE").addValue("_", false)
        } else {
            const parentType = this.getPatternType()!
            this.addToScope(varName, parentType!)
            if (parentType.type === "NAT_TYPE") {
                return parentType.addValue("0", false)
            }
            return parentType
        }
    }

    visitPatternVariant(ctx: PatternVariantContext): StellaType | undefined {
        const patternTypeFromContext = this.getPatternType()
        if (!(patternTypeFromContext instanceof StellaVariant)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
            return
        }
        const patternValueTypeFromContext = patternTypeFromContext.findTypeByLabel(ctx._label.text!)
        if (patternValueTypeFromContext) {
            if (ctx._pattern_) {
                if (patternValueTypeFromContext.type === "_NULLARY_VARIANT_ENTITY_TYPE") {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_NON_NULLARY_VARIANT_PATTERN))
                    return
                }
                this.addPatternType(patternValueTypeFromContext)
                ctx._pattern_.accept(this)
                this.dropPatternType()
            } else {
                if (patternValueTypeFromContext.type !== "_NULLARY_VARIANT_ENTITY_TYPE") {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_NULLARY_VARIANT_PATTERN))
                    return
                }
            }
            return new StellaVariant([]); // todo
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
    }

    visitPred(ctx: PredContext): StellaType | undefined {
        debugger;
        return ctx._n.accept(this)! as StellaType // todo
    }

    visitProgram(ctx: ProgramContext): void {
        debugger;
        return undefined;
    }

    visitRecord(ctx: RecordContext): StellaRecord | undefined {
        const contextType = this.getContextType()
        if (contextType) {
            if (contextType instanceof StellaRecord) {

            } else if (contextType instanceof StellaTop && this.subtypingEnabled) {

            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD))
                return
            }
        }
        const fieldsNames = ctx._bindings.map(b => b._name.text)
        if (new Set(fieldsNames).size !== fieldsNames.length) {
            this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
        } else {
            const fields = []
            for (let binding of ctx._bindings) {
                const bindingType = this.visitBinding(binding)
                if (bindingType === undefined) {
                    return undefined
                }
                fields.push(bindingType)
            }
            return new StellaRecord(fields, false, false)
        }
    }

    visitRecordFieldType(ctx: RecordFieldTypeContext): void {
        debugger;
        return undefined;
    }

    visitRef(ctx: RefContext): StellaType | undefined {
        const contextType = this.getContextType()
        if (contextType instanceof StellaRef) {
            this.addContextType(contextType.parameterType)
            try {
                return new StellaRef(ctx._expr_.accept(this)! as StellaType);
            } finally {
                this.dropContextType()
            }
        } else if (contextType === undefined || contextType instanceof StellaTop) {
            return new StellaRef(ctx._expr_.accept(this)! as StellaType);
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_REFERENCE))
        }
    }

    visitSequence(ctx: SequenceContext): StellaType | undefined {
        this.addContextType(new StellaType("UNIT_TYPE"))
        const retType1 = ctx._expr1.accept(this)! as StellaType | undefined
        if (retType1 === undefined) {
            return
        }
        if (retType1.type !== "UNIT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        this.dropContextType()
        const retType2 = ctx._expr2.accept(this)! as StellaType | undefined
        if (!this.getContextType().isEqualType(retType2)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        } else {
            return retType2
        }
    }

    visitStart_Expr(ctx: Start_ExprContext): void {
        debugger;
        return undefined;
    }

    visitStart_Program(ctx: Start_ProgramContext): void {
        debugger;
        return undefined;
    }

    visitStart_Type(ctx: Start_TypeContext): void {
        debugger;
        return undefined;
    }

    visitStellatype(ctx: StellatypeContext): StellaType | undefined {
        return ctx.accept(this)!
    }

    visitSubtract(ctx: SubtractContext): void {
        debugger;
        return undefined;
    }

    visitSucc(ctx: SuccContext): StellaType | undefined {
        const contextType = this.getContextType()
        if (contextType) {
            new StellaType("NAT_TYPE").tryAssignTo(contextType, this)
        }
        this.addContextType(new StellaType("NAT_TYPE"))
        const argType = ctx._n.accept(this)! as StellaType
        this.dropContextType()
        if (!argType) {
            return
        }
        argType.tryAssignTo(new StellaType("NAT_TYPE"), this)
        return argType
    }

    visitTail(ctx: TailContext): StellaType | undefined {
        const contextType = this.getContextType()
        if (contextType) {
            if (!(contextType instanceof StellaList || contextType instanceof StellaTop && this.subtypingEnabled)) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                return
            }
        }
        const type = this.visitExpr(ctx._list) as StellaType
        if (contextType) {
            type.tryAssignTo(contextType, this)
        } else {
            if (!(type instanceof StellaList)) {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
                return
            }
        }
        return type
    }

    visitTerminatingSemicolon(ctx: TerminatingSemicolonContext): void {
        return ctx._expr_.accept(this);
    }

    visitThrow(ctx: ThrowContext): StellaType | undefined {
        if (this.exceptionType === undefined) {
            this.addError(new TypecheckError(error_type.ERROR_EXCEPTION_TYPE_NOT_DECLARED))
            return undefined
        }
        this.addContextType(this.exceptionType)
        const type = ctx._expr_.accept(this) as StellaType | undefined;
        this.dropContextType()
        if (!this.exceptionType) {
            this.addError(new TypecheckError(error_type.ERROR_EXCEPTION_TYPE_NOT_DECLARED))
        } else {
            type?.tryAssignTo(this.exceptionType, this)
        }
        if (this.ambiguousTypeAsBottom) {
            return new StellaBot()
        } else {
            if (!this.getContextType()) {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_THROW_TYPE))
            }
        }
    }

    visitTryCastAs(ctx: TryCastAsContext): StellaType | undefined {
        this.addContextType(undefined)
        ctx._tryExpr.accept(this)
        this.dropContextType()

        const castType = ctx._type_.accept(this) as StellaType | undefined
        if (castType === undefined) {
            return
        }

        this.addPatternType(castType)
        ctx._pattern_.accept(this)
        this.dropPatternType()

        this.addContextType(undefined)
        const returnType = ctx._expr_.accept(this) as StellaType | undefined
        const fallbackType = ctx._fallbackExpr.accept(this) as StellaType | undefined
        this.dropContextType()

        const contextType = this.getContextType()
        if (contextType) {
            returnType?.tryAssignTo(contextType, this)
            fallbackType?.tryAssignTo(contextType, this)
        }
        return fallbackType;
    }

    visitTryCatch(ctx: TryCatchContext): StellaType | undefined {
        const tryExprType = ctx._tryExpr.accept(this) as StellaType | undefined
        if (this.getContextType()) {
            tryExprType?.tryAssignTo(this.getContextType(), this)
        }
        if (this.exceptionType === undefined) {
            this.addError(new TypecheckError(error_type.ERROR_EXCEPTION_TYPE_NOT_DECLARED))
            return
        }

        this.addPatternType(this.exceptionType)
        ctx._pat.accept(this)
        this.dropPatternType()

        const fallbackExprType = ctx._fallbackExpr.accept(this) as StellaType | undefined
        if (this.getContextType()) {
            fallbackExprType?.tryAssignTo(this.getContextType(), this)
        }
        return fallbackExprType;
    }

    visitTryWith(ctx: TryWithContext): StellaType | undefined {
        const tryExprType = ctx._tryExpr.accept(this) as StellaType | undefined
        if (this.getContextType()) {
            tryExprType?.tryAssignTo(this.getContextType(), this)
        }
        const fallbackExprType = ctx._fallbackExpr.accept(this) as StellaType | undefined
        if (this.getContextType()) {
            fallbackExprType?.tryAssignTo(this.getContextType(), this)
        }
        return tryExprType;
    }

    visitTuple(ctx: TupleContext): StellaType {
        return new StellaTuple(ctx._exprs.map(t => {
            this.addContextType(undefined) // fixme ?
            try {
                return t.accept(this)!
            } finally {
                this.dropContextType()
            }
        }));
    }

    visitTypeAbstraction(ctx: TypeAbstractionContext): StellaType | undefined {
        debugger;
        this.openTypeVarScope()
        const generics = ctx._generics.map(token => {
            this.addToTypeVarScope(token.text!)
            return new StellaGenericVarType(token.text!)
        })
        const type = ctx._expr_.accept(this) as StellaType | undefined
        this.closeTypeVarScope()
        if (type === undefined) {
            return
        }
        type.addGenericsList(generics)
        const contextType = this.getContextType()
        type.tryAssignTo(contextType, this)
        return type?.addGenericsList(generics)
    }

    visitTypeApplication(ctx: TypeApplicationContext): StellaType | undefined {
        let fun = ctx._fun;
        while (fun instanceof ParenthesisedExprContext) {
            fun = fun._expr_
        }
        if (fun instanceof VarContext) {
            const funToken = fun._name;
            const genericsArgs = ctx._types.map(i => (i.accept(this) as (StellaType | undefined)))
            const funTypeFromScope = this.nameInScope(funToken.text!)
            if (funTypeFromScope === undefined) {
                return
            }
            if (!funTypeFromScope.isGeneric()) {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_GENERIC_FUNCTION))
                return undefined
            }
            if (genericsArgs.length !== funTypeFromScope.genericsList.length) {
                this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_TYPE_ARGUMENTS))
                return undefined
            }
            const genericsMap: Record<string, StellaType> = {}
            for (let i = 0; i < genericsArgs.length; i++) {
                genericsMap[funTypeFromScope.genericsList[i].genericName] = genericsArgs[i]!
            }
            return funTypeFromScope.substituteGenerics(genericsMap)
        } else if (fun instanceof ApplicationContext) {
            debugger
            const funType = fun.accept(this) as (StellaType | undefined)
            if (funType === undefined) {
                return
            }
            const genericsArgs = ctx._types.map(i => (i.accept(this) as (StellaType | undefined)))
            if (!funType?.isGeneric()) {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_GENERIC_FUNCTION))
                return undefined
            }
            if (genericsArgs.length !== funType.genericsList.length) {
                this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_TYPE_ARGUMENTS))
                return undefined
            }
            const genericsMap: Record<string, StellaType> = {}
            for (let i = 0; i < genericsArgs.length; i++) {
                genericsMap[funType.genericsList[i].genericName] = genericsArgs[i]!
            }
            return funType.substituteGenerics(genericsMap)
        } else {
            debugger
            throw "fixme"
        }
        return undefined;
    }

    visitTypeAsc(ctx: TypeAscContext): StellaType {
        const ascType = ctx._type_.accept(this)! as StellaType
        this.addContextType(ascType)
        const exprType = this.visitExpr(ctx._expr_);
        if (!exprType?.isEqualType(ascType)) {
            if (exprType instanceof StellaList
                && ascType instanceof StellaList
                && !exprType.isEmptyList()
            ) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        this.dropContextType()
        return ascType;
    }

    visitTypeAuto(ctx: TypeAutoContext): StellaType {
        return new StellaType("AUTO_TYPE"); // todo
    }

    visitTypeBool(ctx: TypeBoolContext): StellaType {
        return new StellaType("BOOL_TYPE")
    }

    visitTypeBottom(ctx: TypeBottomContext): StellaType {
        return new StellaBot();
    }

    visitTypeCast(ctx: TypeCastContext): void {
        const exprType = ctx._expr_.accept(this)
        return ctx._type_.accept(this);
    }

    visitTypeForAll(ctx: TypeForAllContext): StellaType | undefined {
        this.openTypeVarScope()
        const generics = ctx._types.map(i => new StellaGenericVarType(i.text!))
        generics.forEach(type => {
            this.addToTypeVarScope(type.genericName)
        })
        debugger;
        const type = ctx.stellatype().accept(this) as (StellaType | undefined)
        this.closeTypeVarScope()
        return type?.addGenericsList(generics)
    }

    visitTypeFun(ctx: TypeFunContext): StellaType | undefined {
        const args = ctx.stellatype()
        const argsTypes: StellaType[] = [];
        for (const i of args.slice(0, -1)) {
            const type = i.accept(this)
            if (type === undefined) {
                return;
            }
            argsTypes.push(type);
        }
        const returnTypes = args.slice(-1).map(i => i.accept(this)! as StellaType)[0];
        return new StellaFunction(argsTypes, returnTypes)
    }

    visitTypeList(ctx: TypeListContext): StellaType {
        return new StellaList(ctx._type_.accept(this)! as StellaType)
    }

    visitTypeNat(ctx: TypeNatContext): StellaType {
        return new StellaType("NAT_TYPE")
    }

    visitTypeParens(ctx: TypeParensContext): StellaType {
        return ctx._type_.accept(this)! as StellaType;
    }

    visitTypeRec(ctx: TypeRecContext): void {
        debugger;
        return undefined;
    }

    visitTypeRecord(ctx: TypeRecordContext): StellaType | undefined {
        const fields = ctx._fieldTypes.map(b => new StellaEntityRecord(b._label.text!, b._type_.accept(this)!))
        if (new Set(fields.map(e => e.key)).size !== fields.length) {
            this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
        } else {
            return new StellaRecord(fields)
        }
    }

    visitTypeRef(ctx: TypeRefContext): StellaType | undefined {
        return new StellaRef(ctx._type_.accept(this)!);
    }

    visitTypeSum(ctx: TypeSumContext): StellaType {
        return new StellaSumType(ctx._left.accept(this)! as StellaType, ctx._right.accept(this)! as StellaType)
    }

    visitTypeTop(ctx: TypeTopContext): StellaType {
        return new StellaTop();
    }

    visitTypeTuple(ctx: TypeTupleContext): StellaType {
        return new StellaTuple(ctx._types.map(t => t.accept(this)!));
    }

    visitTypeUnit(ctx: TypeUnitContext): StellaType {
        return new StellaType("UNIT_TYPE")
    }

    visitTypeVar(ctx: TypeVarContext): StellaType |undefined {
        if (this.typeVarNameInScope(ctx._name.text!)){
            return new StellaGenericVarType(ctx._name.text!);
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNDEFINED_TYPE_VARIABLE))
        }
    }

    visitTypeVariant(ctx: TypeVariantContext): StellaType | undefined {
        const fields = [];
        for (const b of ctx._fieldTypes) {
            if (b._type_) {
                fields.push(new StellaEntityVariant(b._label.text!, b._type_.accept(this)!));
            } else {
                fields.push(new StellaEntityVariant(b._label.text!, new StellaType("_NULLARY_VARIANT_ENTITY_TYPE")));
            }
        }
        if (new Set(fields.map(e => e.key)).size !== fields.length) {
            // Todo
            // this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
        } else {
            return new StellaVariant(fields)
        }
    }

    visitUnfold(ctx: UnfoldContext): void {
        debugger;
        return undefined;
    }

    visitVar(ctx: VarContext): StellaType | undefined {
        const type = this.nameInScope(ctx._name.text!)
        if (type) {
            return type;
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNDEFINED_VARIABLE, ctx._name));
            // fixme
        }
        return type;
    }

    visitVariant(ctx: VariantContext): StellaType | undefined {
        // debugger;
        const contextType = this.getContextType();
        if (ctx._rhs) {
            if (contextType) {
                if (contextType instanceof StellaVariant) {
                    const patternTypeFromContext = contextType.findTypeByLabel(ctx._label.text!)
                    if (!patternTypeFromContext) {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_VARIANT_LABEL, ctx._label))
                    } else if (patternTypeFromContext.type === "_NULLARY_VARIANT_ENTITY_TYPE") {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_DATA_FOR_NULLARY_LABEL))
                    } else {
                        this.addContextType(patternTypeFromContext)
                        const fieldType = this.visitExpr(ctx._rhs)
                        this.dropContextType()
                        return new StellaVariant([new StellaEntityVariant(ctx._label.text!, fieldType!)])
                    }
                } else if (contextType instanceof StellaTop && this.subtypingEnabled) {
                    this.addContextType(undefined)
                    const fieldType = this.visitExpr(ctx._rhs)
                    this.dropContextType()
                    return new StellaVariant([new StellaEntityVariant(ctx._label.text!, fieldType!)])
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_VARIANT, ctx._label))
                }
            } else {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_VARIANT_TYPE))
            }
        } else {
            const patternTypeFromContext = (contextType as StellaVariant).findTypeByLabel(ctx._label.text!)
            if (patternTypeFromContext === undefined) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_VARIANT_LABEL))
            } else if (patternTypeFromContext!.type !== "_NULLARY_VARIANT_ENTITY_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_MISSING_DATA_FOR_LABEL))
            }
            return new StellaVariant([new StellaEntityVariant(ctx._label.text!, new StellaType("_NULLARY_VARIANT_ENTITY_TYPE"))])
        }
    }

    visitVariantFieldType(ctx: VariantFieldTypeContext): void {
        debugger;
        return undefined;
    }

    visit(tree: ParseTree): void {
        debugger;
        return undefined;
    }

    visitChildren(node: RuleNode): void {
        debugger;
        return undefined;
    }

    visitErrorNode(node: ErrorNode): void {
        debugger;
        return undefined;
    }

    visitTerminal(node: TerminalNode): void {
        debugger;
        return undefined;
    }
}
