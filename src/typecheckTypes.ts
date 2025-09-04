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
    "FUNCTION_TYPE"|
    "REF_TYPE"|
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
            if (!this.argsTypes[i].isEqualType((oth as StellaFunction).argsTypes[i])){
                return false;
            }
        }
        return this.returnType.isEqualType((oth as StellaFunction).returnType)
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
        if (!super.isEqualType(oth)){
            return false;
        }
        if (this.genericType?.type === "UNIT_TYPE") {
            return true;
        }
        return this.genericType!.isEqualType((oth as StellaList)?.genericType);
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
        if (!super.isEqualType(oth)){
            return false;
        }
        return this.genericType!.isEqualType((oth as StellaList)?.genericType);
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
        if (this.elems.length !== (oth as StellaTuple).elems.length){
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
    entities: {[p: string]: StellaType} = {}

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
    entities: {[p: string]: StellaType} = {}

    constructor(entities: StellaEntityVariant[]) {
        super();
        this.entities = Object.fromEntries(entities.map(e => [e.key, e.valueType!]));
    }

    isEqualType(oth: StellaType | undefined): boolean {
        if (!super.isEqualType(oth)) {
            return false
        }
        for (let entitiesKey in this.entities) {
            const othValue = (oth as StellaVariant).entities[entitiesKey]
            if (!othValue) {
                return false
            }
            if (!this.entities[entitiesKey].isEqualType(othValue)) {
                return false
            }
        }
        for (let entitiesKey in (oth as StellaVariant).entities) {
            const thisValue = this.entities[entitiesKey]
            if (!thisValue) {
                return false
            }
            if (!(oth as StellaVariant).entities[entitiesKey].isEqualType(thisValue)) {
                return false
            }
        }
        return true
    }

    assignableTo(oth: StellaVariant): string[] {
        const badLabels = []
        for (let [label, type] of Object.entries(this.entities)) {
            debugger
            if (!oth.entities[label]?.isEqualType(type)) {
                badLabels.push(label)
            }
        }
        return badLabels
    }
}
