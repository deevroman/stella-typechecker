import {stellaParserVisitorImpl} from "./stellaParserVisitorImpl";
import {error_type, TypecheckError} from "./typecheckError";

type StellaTypeEnum =
    "UNIT_TYPE" |
    "BOOL_TYPE" |
    "NAT_TYPE" |
    "PAIR_TYPE" |
    "RECORD_TYPE" |
    "_RECORD_ENTITY_TYPE" |
    "_VARIANT_ENTITY_TYPE" |
    "_NULLARY_VARIANT_ENTITY_TYPE" |
    "SUM_TYPE" |
    "TUPLE_TYPE" |
    "LIST_TYPE" |
    "VARIANT_TYPE" |
    "FUNCTION_TYPE" |
    "REF_TYPE" |
    "ANY_TYPE";

export class StellaType {
    type: StellaTypeEnum = "UNIT_TYPE";
    value: string | undefined = undefined;
    isEqualValue: boolean = true;

    constructor(type: StellaTypeEnum = "UNIT_TYPE") {
        this.type = type;
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
        if (this.type !== oth.type) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
        }
    }
}

export class StellaFunction extends StellaType {
    type: StellaTypeEnum = "FUNCTION_TYPE";
    argsTypes: StellaType[] = [];
    returnType: StellaType = new StellaType("UNIT_TYPE");

    constructor(argsTypes: StellaType[], returnType: StellaType) {
        super();
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
        if (!(oth instanceof StellaFunction)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return
        }
        if (this.argsTypes.length !== oth.argsTypes.length) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return;
        }
        for (let i = 0; i < this.argsTypes.length; i++) {
            this.argsTypes[i].tryAssignTo(oth.argsTypes[i], ctx)
        }
        this.returnType.tryAssignTo(oth.returnType, ctx)
    }
}

export class StellaList extends StellaType {
    type: StellaTypeEnum = "LIST_TYPE";
    genericType: StellaType;

    constructor(genericType: StellaType = new StellaType("UNIT_TYPE")) {
        super();
        this.genericType = genericType;
    }


    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false;
        }
        if (this.genericType?.type === "UNIT_TYPE") {
            return true;
        }
        return this.genericType!.isEqualType((oth as StellaList)?.genericType);
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (!(oth instanceof StellaList)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
            return
        }
        if (this.genericType.type !== "UNIT_TYPE") {
            this.genericType.tryAssignTo(oth.genericType, ctx)
        }
    }
}

export class StellaRef extends StellaType {
    type: StellaTypeEnum = "REF_TYPE";
    genericType: StellaType;

    constructor(genericType: StellaType = new StellaType("UNIT_TYPE")) {
        super();
        this.genericType = genericType;
    }


    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false;
        }
        return this.genericType!.isEqualType((oth as StellaList)?.genericType);
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (!(oth instanceof StellaList)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            return
        }
        this.genericType.tryAssignTo(oth.genericType, ctx)
    }
}

export class StellaSumType extends StellaType {
    type: StellaTypeEnum = "SUM_TYPE";
    leftType: StellaType | undefined;
    rightType: StellaType | undefined;

    constructor(leftType: StellaType, rightType: StellaType) {
        super();
        this.leftType = leftType;
        this.rightType = rightType;
    }


    isEqualType(oth: StellaType | undefined): boolean {
        return super.isEqualType(oth)
            && this.leftType!.isEqualType((oth as StellaSumType).leftType)
            && this.rightType!.isEqualType((oth as StellaSumType).rightType);
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl) {
        if (!(oth instanceof StellaSumType)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_LIST))
            return
        }
        this.leftType!.tryAssignTo(oth.leftType!, ctx)
        this.rightType!.tryAssignTo(oth.rightType!, ctx)
    }
}


export class StellaTuple extends StellaType {
    type: StellaTypeEnum = "TUPLE_TYPE";
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
}


export class StellaEntityRecord extends StellaType {
    type: StellaTypeEnum = "_RECORD_ENTITY_TYPE";
    key: string;
    valueType: StellaType | undefined;

    constructor(key: string, valueType: StellaType) {
        super();
        this.key = key;
        this.valueType = valueType;
    }
}

export class StellaRecord extends StellaType {
    type: StellaTypeEnum = "RECORD_TYPE";
    entities: { [p: string]: StellaType } = {}

    constructor(entities: StellaEntityRecord[]) {
        super();
        this.entities = Object.fromEntries(entities.map(e => [e.key, e.valueType!]));
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false
        }
        for (let entitiesKey in this.entities) {
            const othValue = (oth as StellaRecord).entities[entitiesKey]
            if (!othValue) {
                return false
            }
            if (!this.entities[entitiesKey].isEqualType(othValue)) {
                return false
            }
        }
        for (let entitiesKey in (oth as StellaRecord).entities) {
            const thisValue = this.entities[entitiesKey]
            if (!thisValue) {
                return false
            }
            if (!(oth as StellaRecord).entities[entitiesKey].isEqualType(thisValue)) {
                return false
            }
        }
        return true
    }

    tryAssignTo(oth: StellaType, ctx: stellaParserVisitorImpl): void {
        if (!(oth instanceof StellaRecord)) {
            ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD))
            return
        }
        for (let [label, valueType] of Object.entries(this.entities)) {
            const valueTypeFromContext = oth.entities[label]
            if (!valueTypeFromContext) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_RECORD_FIELDS))
            } else {
                valueType.tryAssignTo(valueTypeFromContext, ctx)
            }
        }
        for (let label in oth.entities) {
            if (!this.entities[label]) {
                ctx.addError(new TypecheckError(error_type.ERROR_MISSING_RECORD_FIELDS))
            }
        }
    }
}


export class StellaEntityVariant extends StellaType {
    type: StellaTypeEnum = "_VARIANT_ENTITY_TYPE";
    key: string;
    valueType: StellaType | undefined;

    constructor(key: string, valueType: StellaType) {
        super();
        this.key = key;
        this.valueType = valueType;
    }
}


export class StellaVariant extends StellaType {
    type: StellaTypeEnum = "VARIANT_TYPE";
    entities: [string, StellaType][] = []

    private readonly entitiesIndex: {[label: string]: StellaType} = {}

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
        for (let i = 0; i < this.entities.length; i++) {
            const [thisLabel, thisType] = this.entities[i]
            const [othLabel, othType] = oth.entities[i]
            if (thisLabel !== othLabel) {
                ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION))
            }
            thisType.tryAssignTo(othType, ctx)
        }
    }

    findTypeByLabel(label: string) : StellaType | undefined {
        return this.entitiesIndex[label]
    }
}
