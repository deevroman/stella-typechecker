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
    StellaEntityRecord, StellaEntityVariant,
    StellaFunction,
    StellaList,
    StellaRecord, StellaRef,
    StellaSumType, StellaTuple,
    StellaType, StellaVariant
} from "./typecheckTypes";
import {TypesCollector} from "./typesCollector";
import {addFunctionsToScope, findAllFunctions, makeFunctionsMap} from "./typechecker";
import {Token} from "antlr4ts/Token";
import {CommonToken} from "antlr4ts";

export class stellaParserVisitorImpl implements stellaParserVisitor<void> {
    scopes: { [p: string]: StellaType | undefined }[] = [{}];
    extensions: string[];
    type_errors: TypecheckError[] = [];
    patternType: StellaType[] = [];
    contextType: (StellaType | undefined)[] = [];

    constructor(extensions: string[]) {
        this.extensions = extensions;
        this.scopes = [{
            "List:head": new StellaFunction([new StellaList()], new StellaType()),
            "List:tail": new StellaFunction([new StellaList()], new StellaType()),
            "List:isempty": new StellaFunction([new StellaList()], new StellaType()),
            "Nat::iszero": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("BOOL_TYPE")),
            "Nat::add": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("NAT_TYPE")),
            "Nat::mul": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("NAT_TYPE")),
            "Nat::div": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("NAT_TYPE")),
            "Nat::square": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("NAT_TYPE")),
            "Nat::rec": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("NAT_TYPE")),
            "cons": new StellaFunction([new StellaType("UNIT_TYPE")], new StellaType()), // todo
            "fix": new StellaFunction([new StellaType("NAT_TYPE")], new StellaType("NAT_TYPE")), // todo
        }]
    }

    getScope() {
        return this.scopes[this.scopes.length - 1];
    }

    addToScope(name: string, type: StellaType | undefined) {
        this.getScope()[name] = type;
    }

    nameInScope(name: string): StellaType | undefined {
        for (const scope of this.scopes.toReversed()) {
            if (name in scope) {
                return scope[name];
            }
        }
        return undefined;
    }

    openScope() {
        this.scopes.push({});
    }

    closeScope() {
        this.scopes.pop();
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

    visitAbstraction(ctx: AbstractionContext): StellaFunction {
        debugger;
        this.openScope()
        this.addContextType(undefined)
        const argsTypes = ctx.paramDecl().map(i => this.visitParamDecl(i)!)
        const returnType = this.visitExpr(ctx.expr())
        this.dropPatternType()
        this.closeScope()
        return new StellaFunction(argsTypes, returnType!)
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
        if (ctx._fun instanceof VarContext) {
            const funToken = ctx._fun._name;
            const type = this.nameInScope(funToken.text!)
            if (type instanceof StellaFunction) {
                if (ctx._args.length !== type.argsTypes?.length) {
                    this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS, funToken));
                } else {
                    for (let i = 0; i < type.argsTypes.length; i++) {
                        this.addContextType(type.argsTypes[i])
                        const argType = ctx._args[i].accept(this)! as StellaType
                        if (!argType.isEqualType(type.argsTypes[i])) {
                            if (argType.type === "RECORD_TYPE" && type.argsTypes[i].type === "RECORD_TYPE") {
                                this.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS, funToken)); // todo
                            } else {
                                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION, funToken)); // todo
                            }
                        }
                        this.dropContextType()
                    }
                }
                return type.returnType
            } else if (type && type.type === "LIST_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE, funToken));
            } else if (!type) {
                this.addError(new TypecheckError(error_type.ERROR_UNDEFINED_VARIABLE, funToken));
            } else {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_FUNCTION, funToken));
            }
        } else if (ctx._fun instanceof ParenthesisedExprContext) {
            const fun = ctx._fun.accept(this) as StellaFunction // todo
            if (ctx._args.length !== fun.argsTypes?.length) {
                this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS));
            }
            return fun.returnType;
        } else {
            debugger
            const type = this.visitExpr(ctx._fun) as StellaType;
            if (type instanceof StellaFunction) {
                return type.returnType;
            } else {
                this.addError(new TypecheckError(error_type.ERROR_NOT_A_FUNCTION));
            }
        }
    }

    visitAssign(ctx: AssignContext): StellaType | undefined {
        const lType = ctx._lhs.accept(this)! as StellaType
        const rType = ctx._rhs.accept(this)! as StellaType
        if (lType instanceof StellaRef) {
            if (!lType.genericType.isEqualType(rType)) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_REFERENCE))
        }
        return new StellaType("UNIT_TYPE");
    }

    visitBinding(ctx: BindingContext): StellaEntityRecord {
        return new StellaEntityRecord(ctx._name.text!, this.visitExpr(ctx._rhs)!);
    }

    visitConsList(ctx: ConsListContext): StellaType {
        const headType = this.visitExpr(ctx._head) as StellaType
        const tailType = this.visitExpr(ctx._tail) as StellaType
        if (headType.type === "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
        }
        if (tailType.type !== "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
        }
        return new StellaList() // todo
    }

    visitConstFalse(ctx: ConstFalseContext): StellaType {
        return new StellaType("BOOL_TYPE") // todo
    }

    visitConstInt(ctx: ConstIntContext): StellaType {
        return new StellaType("NAT_TYPE").addValue(ctx._n.text!, true) // todo
    }

    visitConstMemory(ctx: ConstMemoryContext): void {
        debugger;
        return undefined;
    }

    visitConstTrue(ctx: ConstTrueContext): StellaType {
        return new StellaType("BOOL_TYPE") // todo
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

    visitDeclExceptionVariant(ctx: DeclExceptionVariantContext): void {
        debugger;
        return undefined;
    }

    visitDeclFun(ctx: DeclFunContext): void {
        this.openScope()
        ctx.paramDecl().forEach(i => this.visitParamDecl(i))
        addFunctionsToScope(this, makeFunctionsMap(findAllFunctions(ctx.decl())))
        const returnTypeFromContext = (this.nameInScope(ctx._name.text!) as StellaFunction)?.returnType

        this.addContextType(returnTypeFromContext)
        const returnType = this.visitExpr(ctx.expr()) as StellaType
        if (!returnType?.isEqualType(returnTypeFromContext)) {
            if (returnType instanceof StellaRecord && returnTypeFromContext instanceof StellaRecord) {
                for (let [label, valueType] of Object.entries(returnType.entities)) {
                    const valueTypeFromContext = returnTypeFromContext.entities[label]
                    if (!valueTypeFromContext) {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD_FIELDS))
                    } else {
                        if (!valueTypeFromContext.isEqualType(valueType)) {
                            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                        }
                    }
                }
                for (let label in returnTypeFromContext.entities) {
                    if (!returnType.entities[label]) {
                        this.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
                    }
                }

                if (!returnTypeFromContext.isEqualType(returnType)) {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                }
            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        this.dropContextType()
        this.closeScope()
        return undefined // todo type
    }

    visitDeclFunGeneric(ctx: DeclFunGenericContext): void {
        debugger;
        return undefined;
    }

    visitDeclTypeAlias(ctx: DeclTypeAliasContext): void {
        debugger;
        return undefined;
    }

    visitDeref(ctx: DerefContext): StellaType | undefined {
        const type = ctx._expr_.accept(this)! as StellaType
        if (type instanceof StellaRef) {
            return type.genericType
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
    }

    visitDivide(ctx: DivideContext): void {
        debugger;
        return undefined;
    }

    visitDotRecord(ctx: DotRecordContext): StellaType | undefined {
        const type = ctx._expr_.accept(this)! as StellaType;
        if (type instanceof StellaRecord) {
            return type.entities[ctx._label.text!]
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_RECORD))
        }
        return undefined;
    }

    visitDotTuple(ctx: DotTupleContext): StellaType | undefined {
        const type = ctx._expr_.accept(this)! as StellaType;
        if (type instanceof StellaTuple) {
            const index = parseInt(ctx._index.text!)
            if (index > type.elems.length || index <= 0) {
                this.addError(new TypecheckError(error_type.ERROR_TUPLE_INDEX_OUT_OF_BOUNDS))
            } else {
                return type.elems[index - 1]
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_RECORD))
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

    visitFix(ctx: FixContext): StellaType {
        const argType = this.visitExpr(ctx._expr_) as StellaType
        if (argType instanceof StellaFunction) {
            if (argType.argsTypes!.length !== 1) {
                this.addError(new TypecheckError(error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS))
            } else if (argType.argsTypes![0].type !== "NAT_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
            if (argType.returnType?.type !== "NAT_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }

        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_FUNCTION))
        }
        return new StellaType("NAT_TYPE");
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
        const type = this.visitExpr(ctx._list) as StellaType
        if (type instanceof StellaList) {
            if (type.genericType?.type === "UNIT_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
            } else {
                return type.genericType!;
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
        }
    }

    visitIf(ctx: IfContext): StellaType | undefined {
        const type = this.visitExpr(ctx._condition)
        if (type?.type !== "BOOL_TYPE") {
            if (type instanceof StellaFunction && type.returnType?.type !== "BOOL_TYPE") {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        const thenType = this.visitExpr(ctx._thenExpr)
        const elseType = this.visitExpr(ctx._elseExpr)

        const patternTypeFromContext = (this.getContextType() as StellaType)
        if (!patternTypeFromContext?.isEqualType(thenType)) {
            if (patternTypeFromContext instanceof StellaVariant) {
                if (thenType instanceof StellaVariant && elseType instanceof StellaVariant) {
                    const badThenLabels = thenType.assignableTo(patternTypeFromContext)
                    badThenLabels.forEach(label => {
                        // todo
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                    })
                    const badElseLabels = elseType.assignableTo(patternTypeFromContext)
                    badElseLabels.forEach(label => {
                        // todo
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                    })
                } else {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_VARIANT_TYPE))
                }
            } else if (thenType instanceof StellaVariant || elseType instanceof StellaVariant) {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_VARIANT_TYPE))
            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }

        // fixme нужно проверять объединяемость типов
        if (!thenType?.isEqualType(elseType)) {
            if (thenType instanceof StellaVariant && elseType instanceof StellaVariant) {

            } else {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }

        return thenType; // fixme
    }

    visitInl(ctx: InlContext): StellaType | undefined {
        const contextType = this.getContextType();
        if (!(contextType instanceof StellaSumType)) {
            this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
            return undefined
        } else {
            this.addContextType(contextType.leftType!)
            this.visitExpr(ctx._expr_)
            this.dropContextType()
            return contextType
        }
    }

    visitInlineAnnotation(ctx: InlineAnnotationContext): void {
        debugger;
        return undefined;
    }

    visitInr(ctx: InrContext): StellaType | undefined {
        const contextType = this.getContextType();
        if (!(contextType instanceof StellaSumType)) {
            this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
            return undefined
        } else {
            this.addContextType(contextType.rightType!)
            this.visitExpr(ctx._expr_);
            this.dropContextType()
            return contextType
        }
    }

    visitIsEmpty(ctx: IsEmptyContext): StellaType {
        const type = this.visitExpr(ctx._list) as StellaType
        if (type.type !== "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
        }
        return new StellaType("BOOL_TYPE")
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

    visitLabelledPattern(ctx: LabelledPatternContext): void {
        const patternTypeFromContext = (this.getPatternType() as StellaRecord).entities[ctx._label.text!]
        if (patternTypeFromContext) {
            this.addPatternType(patternTypeFromContext)
            const type = ctx._pattern_.accept(this)! as StellaType
            if (patternTypeFromContext.type !== type.type) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
            }
            this.dropPatternType()
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return undefined;
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
        this.visitPatternBinding(ctx._patternBinding)
        const res = this.visitExpr(ctx._body)
        if (res instanceof StellaList && res.genericType?.type === "UNIT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
        }
        this.closeScope()
        return res
    }

    visitLetRec(ctx: LetRecContext): StellaType | void {
        this.openScope()
        this.visitPatternBinding(ctx._patternBinding)
        const res = this.visitExpr(ctx._body)
        this.closeScope()
        return res
    }

    visitList(ctx: ListContext): StellaType {
        const listTypes = ctx.expr().map(i => this.visitExpr(i))
        if (listTypes.length === 0) {
            return new StellaList()
        } else {
            const firstType = listTypes[0];
            for (let elemType of listTypes) {
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

    visitMatch(ctx: MatchContext): StellaType {
        this.addContextType(undefined)
        const matchType = this.visitExpr(ctx.expr());
        this.dropContextType()
        const matchedTypeVariants: StellaType[] = []
        const returnTypes: StellaType[] = [];
        if (ctx._cases.length === 0) {
            this.addError(new TypecheckError(error_type.ERROR_ILLEGAL_EMPTY_MATCHING))
        }
        ctx._cases.forEach(_case => {
            this.openScope()
            this.addPatternType(matchType!);
            matchedTypeVariants.push(_case._pattern_.accept(this)!)
            const value = this.visitExpr(_case._expr_) as StellaType
            if (value) {
                if (returnTypes.length > 0) {
                    if (returnTypes[0].type !== value.type) {
                        this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
                    }
                }
                if (value instanceof StellaList && value.genericType.type === "UNIT_TYPE") {
                    this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_LIST_TYPE))
                } else {
                    returnTypes.push(value)
                }
            }
            this.dropPatternType()
            this.closeScope()
        })
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
        if (initialType.type !== "NAT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        const stepType = ctx._step.accept(this)! as StellaType
        if (!(stepType instanceof StellaFunction)) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        } else if (stepType.argsTypes.length !== 1) {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_NUMBER_OF_PARAMETERS_IN_LAMBDA))
        } else if (stepType.argsTypes[0].type !== "NAT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_PARAMETER))
        }
        return new StellaType("NAT_TYPE"); // todo
    }

    visitNotEqual(ctx: NotEqualContext): StellaType {
        debugger;
        return new StellaType("BOOL_TYPE");
    }

    visitPanic(ctx: PanicContext): void {
        debugger;
        return undefined;
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
            return ctx._pat.accept(this);
        } else if (ctx._pat instanceof PatternVarContext) {
            const type = ctx._rhs.accept<any>(this) as StellaType
            if (type) {
                if (type.type === "FUNCTION_TYPE") {
                    this.addToScope(ctx._pat.text!, type as StellaFunction)
                } else {
                    this.addToScope(ctx._pat.text, type);
                }

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

    visitPatternCons(ctx: PatternConsContext): void {
        if (this.getPatternType()?.type !== "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }

        this.addPatternType((this.getPatternType() as StellaList).genericType!)
        ctx._head.accept(this)
        this.dropPatternType()

        this.addPatternType(this.getPatternType()!)
        ctx._tail.accept(this)
        this.dropPatternType()
        return undefined;
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
            ctx._pattern_.accept(this)
            this.dropPatternType()
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return undefined;
    }

    visitPatternInr(ctx: PatternInrContext): void {
        const patternType = this.getPatternType()
        if (patternType instanceof StellaSumType) {
            this.addPatternType(patternType.rightType!)
            ctx._pattern_.accept(this)
            this.dropPatternType()
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return undefined;
    }

    visitPatternInt(ctx: PatternIntContext): StellaType {
        return new StellaType("NAT_TYPE").addValue(ctx._n.text!, true); // todo
    }

    visitPatternList(ctx: PatternListContext): StellaType {
        if (this.getPatternType()?.type !== "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        this.addPatternType((this.getPatternType() as StellaList).genericType!)
        ctx._patterns.forEach(p => p.accept(this))
        this.dropPatternType()
        return new StellaList(); // todo
    }

    visitPatternRecord(ctx: PatternRecordContext): void {
        ctx._patterns.forEach(p => p.accept(this))
        return undefined;
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
        debugger;
        return undefined;
    }

    visitPatternUnit(ctx: PatternUnitContext): void {
        debugger;
        return undefined;
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

    visitPatternVariant(ctx: PatternVariantContext): void {
        debugger;
        const patternTypeFromContext = (this.getPatternType() as StellaVariant).entities[ctx._label.text!]
        if (patternTypeFromContext) {
            if (ctx._pattern_) {
                this.addPatternType(patternTypeFromContext)
                ctx._pattern_.accept(this)
                this.dropPatternType()
            }
        } else {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        }
        return undefined;
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
        const fields = ctx._bindings.map(b => this.visitBinding(b))
        if (new Set(fields.map(e => e.key)).size !== fields.length) {
            this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
        } else {
            return new StellaRecord(fields)
        }
    }

    visitRecordFieldType(ctx: RecordFieldTypeContext): void {
        debugger;
        return undefined;
    }

    visitRef(ctx: RefContext): StellaType | undefined {
        return new StellaRef(ctx._expr_.accept(this)! as StellaType);
    }

    visitSequence(ctx: SequenceContext): StellaType | undefined {
        this.addContextType(new StellaType("UNIT_TYPE"))
        const retType1 = ctx._expr1.accept(this)! as StellaType
        if (retType1.type !== "UNIT_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
        this.dropContextType()
        const retType2 = ctx._expr2.accept(this)! as StellaType
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

    visitSucc(ctx: SuccContext): void {
        return ctx._n.accept(this) // todo
    }

    visitTail(ctx: TailContext): StellaType {
        const type = this.visitExpr(ctx._list) as StellaType
        if (type.type !== "LIST_TYPE") {
            this.addError(new TypecheckError(error_type.ERROR_NOT_A_LIST))
        }
        return type // todo
    }

    visitTerminatingSemicolon(ctx: TerminatingSemicolonContext): void {
        return ctx._expr_.accept(this);
    }

    visitThrow(ctx: ThrowContext): void {
        debugger;
        return undefined;
    }

    visitTryCastAs(ctx: TryCastAsContext): void {
        debugger;
        return undefined;
    }

    visitTryCatch(ctx: TryCatchContext): void {
        debugger;
        return undefined;
    }

    visitTryWith(ctx: TryWithContext): void {
        debugger;
        return undefined;
    }

    visitTuple(ctx: TupleContext): StellaType {
        return new StellaTuple(ctx._exprs.map(t => t.accept(this)!)); // todo
    }

    visitTypeAbstraction(ctx: TypeAbstractionContext): void {
        debugger;
        return undefined;
    }

    visitTypeApplication(ctx: TypeApplicationContext): void {
        debugger;
        return undefined;
    }

    visitTypeAsc(ctx: TypeAscContext): StellaType {
        const ascType = ctx._type_.accept(this)! as StellaType
        this.addContextType(ascType)
        const exprType = this.visitExpr(ctx._expr_);
        if (!exprType?.isEqualType(ascType)) {
            if (exprType instanceof StellaList
                && ascType instanceof StellaList
                && exprType.genericType?.type !== "UNIT_TYPE"
            ) {
                this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
        this.dropContextType()
        return ascType;
    }

    visitTypeAuto(ctx: TypeAutoContext): void {
        debugger;
        return undefined;
    }

    visitTypeBool(ctx: TypeBoolContext): StellaType {
        return new StellaType("BOOL_TYPE")
    }

    visitTypeBottom(ctx: TypeBottomContext): void {
        debugger;
        return undefined;
    }

    visitTypeCast(ctx: TypeCastContext): void {
        debugger;
        return undefined;
    }

    visitTypeForAll(ctx: TypeForAllContext): void {
        debugger;
        return undefined;
    }

    visitTypeFun(ctx: TypeFunContext): StellaType {
        const args = ctx.stellatype()
        const argsTypes = args.slice(0, -1).map(i => i.accept(this)! as StellaType);
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
            // Todo
            // this.addError(new TypecheckError(error_type.ERROR_DUPLICATE_RECORD_FIELDS))
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

    visitTypeTop(ctx: TypeTopContext): void {
        debugger;
        return undefined;
    }

    visitTypeTuple(ctx: TypeTupleContext): StellaType {
        return new StellaTuple(ctx._types.map(t => t.accept(this)!));
    }

    visitTypeUnit(ctx: TypeUnitContext): StellaType {
        return new StellaType("UNIT_TYPE")
    }

    visitTypeVar(ctx: TypeVarContext): void {
        debugger;
        return undefined;
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

    visitVariant(ctx: VariantContext): StellaType {
        debugger;
        if (ctx._rhs) {
            if (this.getContextType()) {
                const patternTypeFromContext = (this.getContextType() as StellaVariant).entities[ctx._label.text!]
                if (!patternTypeFromContext) {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_VARIANT_LABEL, ctx._label))
                } else if (patternTypeFromContext.type === "_NULLARY_VARIANT_ENTITY_TYPE") {
                    this.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_DATA_FOR_NULLARY_LABEL))
                }
            } else {
                this.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_VARIANT_TYPE))
            }
            const fieldType = this.visitExpr(ctx._rhs)
            return new StellaVariant([new StellaEntityVariant(ctx._label.text!, fieldType!)])
        } else {
            const patternTypeFromContext = (this.getContextType() as StellaVariant).entities[ctx._label.text!]
            if (patternTypeFromContext.type !== "_NULLARY_VARIANT_ENTITY_TYPE") {
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
