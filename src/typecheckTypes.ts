import {stellaParserVisitorImpl} from "./stellaParserVisitorImpl";
import {error_type, TypecheckError} from "./typecheckError";

type StellaTypeEnum =
    "UNIT_TYPE" |
    "BOOL_TYPE" |
    "NAT_TYPE" |
    "RECORD_TYPE" |
    "_RECORD_ENTITY_TYPE" |
    "_VARIANT_ENTITY_TYPE" |
    "_NULLARY_VARIANT_ENTITY_TYPE" |
    "SUM_TYPE" |
    "_INCOMPLETED_SUM_TYPE_FILLER" |
    "TUPLE_TYPE" |
    "LIST_TYPE" |
    "_EMPTY_LIST_TYPE" |
    "VARIANT_TYPE" |
    "FUNCTION_TYPE" |
    "REF_TYPE" |
    "_CONST_MEMORY_REF_TYPE" |
    "ANY_TYPE" |
    "TOP_TYPE" |
    "BOT_TYPE" |
    "AUTO_TYPE" |
    "GENERIC_TYPE";

// const simpleTypes: StellaTypeEnum[] = ["BOOL_TYPE", "NAT_TYPE", "UNIT_TYPE"]

export class StellaType {
    readonly type: StellaTypeEnum = "UNIT_TYPE";
    value: string | undefined = undefined;
    isEqualValue: boolean = true;
    addr: string = ""; // todo cleanup
    genericsList: StellaGenericVarType[] = [];
    varName = "";

    constructor(type: StellaTypeEnum = "UNIT_TYPE") {
        this.type = type;
    }

    addAddr(addr: string): StellaType {
        this.addr = addr;
        return this;
    }

    addValue(value: string, isEqualValue: boolean) {
        this.value = value
        this.isEqualValue = isEqualValue
        return this
    }

    addGenericsList(genericsList: StellaGenericVarType[]) {
        this.genericsList = genericsList
        return this
    }

    addVarName(name: string) {
        this.varName = name
        return this
    }

    isJokerType() {
        return this.varName !== ""
    }

    isGeneric() {
        return this.genericsList.length !== 0
    }

    clone() : this {
        const copy = Object.create(Object.getPrototypeOf(this))
        Object.assign(copy, this)
        return copy
    }
    //
    // isSimpleType() {
    //     return simpleTypes.includes(this.type)
    // }

    isEqualType(oth: StellaType | undefined) {
        return this.type === oth?.type
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (this.type !== oth.type) {
            if (ctx.subtypingEnabled) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
            } else {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        return this
    }
}


export class StellaGenericVarType extends StellaType {
    readonly type: StellaTypeEnum = "GENERIC_TYPE";
    genericName: string;
    value: string | undefined = undefined;
    isEqualValue: boolean = true;

    constructor(genericName: string) {
        super();
        this.genericName = genericName
        this.genericsList = [this]
    }

    addAddr(addr: string): StellaType {
        this.addr = addr;
        return this;
    }

    addValue(value: string, isEqualValue: boolean) {
        this.value = value
        this.isEqualValue = isEqualValue
        return this
    }

    isEqualType(oth: StellaType | undefined) {
        return this.type === oth?.type
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (this.type !== oth.type) {
            if (ctx.subtypingEnabled) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
            } else {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        } else {
            if (this.genericName !== (oth as StellaGenericVarType).genericName) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        }
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        if (genericsMap[this.genericName]) {
            return genericsMap[this.genericName]
        }
        return this
    }
}


export class StellaFunction extends StellaType {
    readonly type: StellaTypeEnum = "FUNCTION_TYPE";
    argsTypes: StellaType[] = [];
    returnType: StellaType = new StellaType("UNIT_TYPE");

    constructor(argsTypes: StellaType[], returnType: StellaType) {
        super("FUNCTION_TYPE");
        this.argsTypes = argsTypes;
        this.returnType = returnType;
    }


    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false;
        }
        if (this.argsTypes.length !== (oth as StellaFunction).argsTypes.length) {
            return false;
        }
        for (let i = 0; i < this.argsTypes.length; i++) {
            if (!this.argsTypes[i].isEqualType((oth as StellaFunction).argsTypes[i])) {
                return false;
            }
        }
        return this.returnType.isEqualType((oth as StellaFunction).returnType)
    }


    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaFunction)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return
        }
        // todo names?
        if (this.genericsList.length !== oth.genericsList.length) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return;
        }
        if (this.argsTypes.length !== oth.argsTypes.length) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return;
        }
        // const prevErrors = ctx.type_errors
        // ctx.type_errors = []
        for (let i = 0; i < this.argsTypes.length; i++) {
            oth.argsTypes[i].tryAssignTo(this.argsTypes[i], ctx)
        }
        this.returnType.tryAssignTo(oth.returnType, ctx)
        // const newErrors = ctx.type_errors
        // ctx.type_errors = prevErrors
        // if (newErrors.length) {
        //     ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_PARAMETER))
        //     newErrors.forEach(err => ctx.addError(err))
        // }

    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        let newRemainingGenerics = []
        const newArgs: StellaType[] = []
        this.argsTypes.forEach(i => {
            const newArg = i.substituteGenerics(genericsMap)
            newRemainingGenerics.push(...newArg.genericsList)
            newArgs.push(newArg)
        })
        const newReturnType = this.returnType.substituteGenerics(genericsMap)
        newRemainingGenerics.push(...newReturnType.genericsList)
        // todo deduplicate
        return new StellaFunction(newArgs, newReturnType).addGenericsList(newRemainingGenerics)
    }
}

export class StellaList extends StellaType {
    readonly type: StellaTypeEnum = "LIST_TYPE";
    parameterType: StellaType;
    isInfiniteList: boolean = false;
    minLength: number = 0;
    isFixedList: boolean = false;
    fixedLength: number = 0;
    fixedElems: StellaType[] = []

    constructor(parameterType: StellaType = new StellaType("_EMPTY_LIST_TYPE")) {
        super();
        this.parameterType = parameterType;
    }

    static makeEmptyList(ambiguousTypeAsBottom: boolean) {
        return new StellaList(ambiguousTypeAsBottom ? new StellaBot() : new StellaType("_EMPTY_LIST_TYPE")).setMinLength(0)
    }

    isEmptyList() {
        return this.parameterType.type === "_EMPTY_LIST_TYPE"
    }

    setMinLength(len: number) : this {
        this.isInfiniteList = true
        this.minLength = len
        return this
    }

    setFixedLength(len: number) : this {
        this.isFixedList = true
        this.fixedLength = len
        return this
    }

    isFixedLength() : boolean {
        return this.isFixedList
    }

    setFixedElems(elems: StellaType[]) : this {
        this.fixedElems = elems
        return this
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false;
        }
        if (this.parameterType?.type === "_EMPTY_LIST_TYPE") {
            return true;
        }
        return this.parameterType!.isEqualType((oth as StellaList)?.parameterType);
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaList)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return
        }
        if (this.parameterType.type !== "_EMPTY_LIST_TYPE") {
            this.parameterType.tryAssignTo(oth.parameterType, ctx)
        }
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        const newParameterType = this.parameterType.substituteGenerics(genericsMap)
        return new StellaList(newParameterType)
    }
}

export class StellaRef extends StellaType {
    readonly type: StellaTypeEnum = "REF_TYPE";
    parameterType: StellaType;

    constructor(parameterType: StellaType = new StellaType("UNIT_TYPE")) {
        super();
        this.parameterType = parameterType;
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false;
        }
        return this.parameterType!.isEqualType((oth as StellaList)?.parameterType);
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaRef)) {
            if (!(oth instanceof StellaTop)) {
                if (this.parameterType.type === "_CONST_MEMORY_REF_TYPE") {
                    ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_MEMORY_ADDRESS))
                } else {
                    ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_REFERENCE))
                }
            }
            return
        }
        if (this.parameterType.type !== "_CONST_MEMORY_REF_TYPE") {
            this.parameterType.tryAssignTo(oth.parameterType, ctx)
        }
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        const newParameterType = this.parameterType.substituteGenerics(genericsMap)
        return new StellaRef(newParameterType)
    }
}

export class StellaSumType extends StellaType {
    readonly type: StellaTypeEnum = "SUM_TYPE";
    leftType: StellaType | undefined;
    rightType: StellaType | undefined;
    leftHidden: boolean = false
    rightHidden: boolean = false

    constructor(leftType: StellaType, rightType: StellaType) {
        super();
        this.leftType = leftType;
        this.rightType = rightType;
    }

    hideLeftValue() {
        this.leftHidden = true
        return this
    }

    unhideLeftValue() {
        this.leftHidden = false
        return this
    }

    hideRightValue() {
        this.rightHidden = true
        return this
    }

    isEqualType(oth: StellaType | undefined): boolean {
        return super.isEqualType(oth)
            && this.leftType!.isEqualType((oth as StellaSumType).leftType)
            && this.rightType!.isEqualType((oth as StellaSumType).rightType);
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaSumType)) {
            ctx.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_SUM_TYPE))
            return
        }
        this.leftType!.tryAssignTo(oth.leftType!, ctx)
        this.rightType!.tryAssignTo(oth.rightType!, ctx)
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        const newLeftType = this.leftType!.substituteGenerics(genericsMap)
        const newRightType = this.rightType!.substituteGenerics(genericsMap)
        return new StellaSumType(newLeftType, newRightType)
    }
}

export class StellaTuple extends StellaType {
    readonly type: StellaTypeEnum = "TUPLE_TYPE";
    elems: StellaType[] = []

    constructor(elems: StellaType[]) {
        super();
        this.elems = elems;
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false
        }
        if (this.elems.length !== (oth as StellaTuple).elems.length) {
            return false;
        }
        for (let i = 0; i < this.elems.length; i++) {
            const othElem = (oth as StellaTuple).elems[i];
            if (!this.elems[i].isEqualType(othElem)) {
                return false;
            }
        }
        return true;
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaTuple)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TUPLE))
            return
        }
        if (this.elems.length !== oth.elems.length) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TUPLE_LENGTH))
            return
        }
        for (let i = 0; i < this.elems.length; i++) {
            this.elems[i].tryAssignTo(oth.elems[i], ctx)
        }
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        const newElems: StellaType[] = []
        this.elems.forEach(i => {
            newElems.push(i.substituteGenerics(genericsMap))
        })
        return new StellaTuple(newElems)
    }
}


export class StellaEntityRecord extends StellaType {
    readonly type: StellaTypeEnum = "_RECORD_ENTITY_TYPE";
    key: string;
    valueType: StellaType | undefined;

    constructor(key: string, valueType: StellaType) {
        super();
        this.key = key;
        this.valueType = valueType;
    }
}

export class StellaRecord extends StellaType {
    readonly type: StellaTypeEnum = "RECORD_TYPE";
    entities: [string, StellaType][] = []
    private readonly entitiesIndex: { [label: string]: StellaType } = {}
    incompleted: boolean = false // when dot access
    pinnedFieldOrder: boolean = true

    constructor(entities: StellaEntityRecord[], incompleted: boolean = false, pinnedFieldOrder: boolean = true) {
        super();
        this.entities = entities.map(e => [e.key, e.valueType!]);
        this.entitiesIndex = Object.fromEntries(entities.map(e => [e.key, e.valueType!]));
        this.incompleted = incompleted
        this.pinnedFieldOrder = pinnedFieldOrder
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false
        }
        if (!(oth instanceof StellaRecord)) {
            return false
        }
        if (this.entities.length !== oth.entities.length) {
            return false
        }
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i][0] !== oth.entities[i][0]) {
                return false
            }
            if (this.entities[i][1].isEqualType(oth.entities[i][1])) {
                return false
            }
        }
        return true
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaRecord)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD))
            return
        }
        if (ctx.subtypingEnabled) {
            for (let i = 0; i < oth.entities.length; i++) {
                const [othLabel, othType] = oth.entities[i]
                const thisType = this.findTypeByLabel(othLabel)
                if (thisType) {
                    thisType.tryAssignTo(othType, ctx)
                } else {
                    if (!this.incompleted) {
                        ctx.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
                    }
                }
            }
            if (this.entities.length < oth.entities.length) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
        } else {
            if (!this.pinnedFieldOrder) {
                for (let i = 0; i < oth.entities.length; i++) {
                    const [othLabel, othType] = oth.entities[i]
                    if (this.entities[i] === undefined) {
                        if (!this.findTypeByLabel(othLabel)) {
                            ctx.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
                        }
                        continue
                    }
                    const thisType = this.findTypeByLabel(othLabel)
                    if (thisType) {
                        thisType.tryAssignTo(othType, ctx)
                    } else {
                        if (!this.incompleted) {
                            ctx.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
                        }
                    }
                }
                for (let i = oth.entities.length; i < this.entities.length; i++) {
                    const [thisLabel, thisType] = this.entities[i]
                    const othType = oth.findTypeByLabel(thisLabel)
                    if (othType) {
                        thisType.tryAssignTo(othType, ctx)
                    } else {
                        ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                    }
                }
            } else {
                for (let i = 0; i < oth.entities.length; i++) {
                    const [othLabel, othType] = oth.entities[i]
                    if (this.entities[i] === undefined) {
                        if (this.findTypeByLabel(othLabel)) {
                            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                        } else {
                            ctx.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
                        }
                        continue
                    }
                    const [thisLabel, thisType] = this.entities[i]
                    if (othLabel !== thisLabel) {
                        if (this.findTypeByLabel(othLabel)) {
                            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                        } else {
                            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD_FIELDS))
                        }
                        continue
                    }
                    if (thisType) {
                        thisType.tryAssignTo(othType, ctx)
                    } else {
                        if (!this.incompleted) {
                            ctx.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
                        }
                    }
                }
                for (let i = oth.entities.length; i < this.entities.length; i++) {
                    const [thisLabel,] = this.entities[i]
                    if (oth.findTypeByLabel(thisLabel)) {
                        ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD_FIELDS))
                    } else {
                        ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                    }
                }
            }
        }
    }

    findTypeByLabel(label: string): StellaType | undefined {
        return this.entitiesIndex[label]
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        const newEntities: StellaEntityRecord[] = []
        this.entities.forEach(([name, type]) => {
            newEntities.push(new StellaEntityRecord(name, type.substituteGenerics(genericsMap)))
        })
        return new StellaRecord(newEntities)
    }
}


export class StellaEntityVariant extends StellaType {
    readonly type: StellaTypeEnum = "_VARIANT_ENTITY_TYPE";
    key: string;
    valueType: StellaType | undefined;

    constructor(key: string, valueType: StellaType) {
        super();
        this.key = key;
        this.valueType = valueType;
    }
}


export class StellaVariant extends StellaType {
    readonly type: StellaTypeEnum = "VARIANT_TYPE";
    entities: [string, StellaType][] = []


    private readonly entitiesIndex: { [label: string]: StellaType } = {}

    constructor(entities: StellaEntityVariant[]) {
        super();
        this.entities = entities.map(e => [e.key, e.valueType!]);
        this.entitiesIndex = Object.fromEntries(entities.map(e => [e.key, e.valueType!]));
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false
        }
        if (!(oth instanceof StellaVariant)) {
            return false
        }
        if (this.entities.length !== oth.entities.length) {
            return false
        }
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i][0] !== oth.entities[i][0]) {
                return false
            }
            if (this.entities[i][1].isEqualType(oth.entities[i][1])) {
                return false
            }
        }
        return true
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (ctx.subtypingEnabled && oth instanceof StellaTop) {
            return
        }
        if (ctx.subtypingEnabled && oth instanceof StellaBot) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
        }
        if (!(oth instanceof StellaVariant)) {
            ctx.addError(new TypecheckError(error_type.ERROR_AMBIGUOUS_VARIANT_TYPE))
            return
        }
        if (this.entities.length === 1) {
            const thisLabel = this.entities[0][0]
            const thisType = this.entities[0][1]
            const typeInOth = oth.findTypeByLabel(thisLabel)
            if (typeInOth === undefined) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            } else {
                thisType.tryAssignTo(typeInOth, ctx)
            }
            return
        }
        if (ctx.subtypingEnabled) {
            if (this.entities.length > oth.entities.length) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
            for (let i = 0; i < this.entities.length; i++) {
                const [thisLabel, thisType] = this.entities[i]
                const othType = oth.findTypeByLabel(thisLabel)
                if (!othType) {
                    ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_VARIANT_LABEL))
                } else {
                    thisType.tryAssignTo(othType, ctx)
                }
            }
        } else {
            if (this.entities.length !== oth.entities.length) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
            for (let i = 0; i < this.entities.length; i++) {
                const [thisLabel, thisType] = this.entities[i]
                const [othLabel, othType] = oth.entities[i]
                if (thisLabel !== othLabel) {
                    ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
                }
                thisType.tryAssignTo(othType, ctx)
            }
        }
    }

    findTypeByLabel(label: string): StellaType | undefined {
        return this.entitiesIndex[label]
    }

    substituteGenerics(genericsMap: Record<string, StellaType>) : StellaType {
        const newEntities: StellaEntityVariant[] = []
        this.entities.forEach(([name, type]) => {
            newEntities.push(new StellaEntityVariant(name, type.substituteGenerics(genericsMap)))
        })
        return new StellaVariant(newEntities)
    }
}

export class StellaTop extends StellaType {
    readonly type: StellaTypeEnum = "TOP_TYPE";

    constructor() {
        super();
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (oth instanceof StellaTop) {
            return
        }
        ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_SUBTYPE))
    }
}

export class StellaBot extends StellaType {
    readonly type: StellaTypeEnum = "BOT_TYPE";

    constructor() {
        super();
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (ctx.subtypingEnabled) {
            return;
        } else {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
    }
}
