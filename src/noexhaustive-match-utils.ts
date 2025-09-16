import {error_type, TypecheckError} from "./typecheckError";
import {
    StellaAuto,
    StellaEntityRecord,
    StellaEntityVariant,
    StellaFunction,
    StellaList, StellaRecord,
    StellaSumType,
    StellaTuple,
    StellaType,
    StellaVariant
} from "./typecheckTypes";
import {stellaParserVisitorImpl} from "./stellaParserVisitorImpl";

export function checkNoexhaustiveMatch(expectedType: StellaType, cases: StellaType[], ctx: stellaParserVisitorImpl): boolean {
    if (cases.some(_case => _case.varName !== "")) {
        return true
    }
    if (cases.some(_case => _case instanceof StellaAuto)) {
        return true // hack
    }
    if (expectedType instanceof StellaAuto) {
        if (cases.length > 1) {
            return true // todo dirty hack
        } else {
            ctx.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS))
            return false
        }
    }
    const constructors = getAllConstructors(expectedType, ctx)
    for (let i = 0; i < constructors.length; i++){
        const constr = constructors[i];
        let res = false;
        for (let pat of cases) {
            if (tryMatch(constr, pat, ctx)) {
                res = true
                break
            }
        }
        if (!res) {
            ctx.addError(new TypecheckError(error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS))
            return false
        }
    }
    return true
}

function getAllConstructors(type: StellaType, ctx: stellaParserVisitorImpl): StellaType[] {
    const first = firstConstructor(type)
    const result = [first]
    let current: StellaType | undefined = first
    while (current = nextConstructor(current, ctx)) {
        result.push(current)
    }
    return result
}

function firstConstructor(type: StellaType): StellaType {
    if (type.type === "BOOL_TYPE") {
        return new StellaType(type.type).addValue("false", true)
    } else if (type.type === "NAT_TYPE") {
        return new StellaType(type.type).addValue("0", true)
    } else if (type.type === "UNIT_TYPE") {
        return new StellaType(type.type).addValue("unit", true)
    }
    if (type instanceof StellaTuple) {
        return new StellaTuple(type.elems.map(firstConstructor))
    }
    if (type instanceof StellaSumType) {
        return new StellaSumType(firstConstructor(type.leftType!), firstConstructor(type.rightType!)).hideLeftValue()
    }
    if (type instanceof StellaFunction) {
        return type.clone() // todo ?
    }
    if (type.type === "_NULLARY_VARIANT_ENTITY_TYPE") {
        return new StellaType("_NULLARY_VARIANT_ENTITY_TYPE")
    }
    if (type instanceof StellaVariant) {
        if (type.entities.length === 0) {
            return new StellaVariant([]).addValue("", true)
        }
        return new StellaVariant(type.entities.map(([label, value]) => new StellaEntityVariant(label, firstConstructor(value)))) // todo тест что firstConstructor не забыт
            .addValue(type.entities[0][0], true)
    }
    if (type instanceof StellaList) {
        return new StellaList(type.parameterType).setFixedLength(0).setFixedElems([])
    }
    if (type instanceof StellaRecord) {
        return new StellaRecord(type.entities.map(([label, value]) => new StellaEntityVariant(label, firstConstructor(value))))  // todo тест что firstConstructor не забыт
    }
    if (type instanceof StellaAuto) {
        throw "NOT NEED"
    }
    debugger
    throw "Unsupported"
    return new StellaType() // fixme
}

function nextConstructor(constructor: StellaType, ctx: stellaParserVisitorImpl): StellaType | undefined {
    if (constructor.type === "BOOL_TYPE") {
        if (constructor.value === "false") {
            return new StellaType(constructor.type).addValue("true", true)
        }
        return undefined
    }
    if (constructor.type === "NAT_TYPE") {
        const value = parseInt(constructor.value!)
        if (value < ctx.maxIntInProgram) {
            return new StellaType(constructor.type).addValue((value + 1).toString(), true)
        }
        if (constructor.isEqualValue) {
            return new StellaType(constructor.type).addValue((value + 1).toString(), false)
        }
        return undefined
    }
    if (constructor.type === "UNIT_TYPE") {
        return undefined
    }
    if (constructor instanceof StellaTuple) {
        const newElems = constructor.clone()
        for (let i = newElems.elems.length - 1; i >= 0; i--) {
            const newElem = nextConstructor(newElems.elems[i], ctx)
            if (newElem) {
                newElems.elems[i] = newElem
                return new StellaTuple(newElems.elems)
            } else {
                newElems.elems[i] = firstConstructor(newElems.elems[i])
            }
        }
        return undefined
    }
    if (constructor.type === "_INCOMPLETED_SUM_TYPE_FILLER") {
        return undefined
    }
    if (constructor instanceof StellaSumType) {
        if (!constructor.rightHidden) {
            const newRightType = nextConstructor(constructor.rightType!, ctx)
            if (newRightType) {
                return new StellaSumType(constructor.leftType!, newRightType).hideLeftValue()
            } else {
                return new StellaSumType(firstConstructor(constructor.leftType!), constructor.rightType!).hideRightValue()
            }
        }
        if (!constructor.leftHidden) {
            const newLeftType = nextConstructor(constructor.leftType!, ctx)
            if (newLeftType) {
                return new StellaSumType(newLeftType, firstConstructor(constructor.rightType!)).hideRightValue()
            }
        }
        return undefined
    }
    if (constructor instanceof StellaVariant) {
        if (constructor.entities.length === 0) {
            return undefined
        }
        let foundCurrent = false
        let nextLabel = null
        for (let [label,] of constructor.entities) {
            if (label === constructor.value) {
                foundCurrent = true
            } else if (foundCurrent) {
                nextLabel = label
                break
            }
        }
        if (nextLabel) {
            return new StellaVariant(constructor.entities.map(([label, value]) => new StellaEntityVariant(label, value)))
                .addValue(nextLabel, true)
        } else {
            return undefined
        }
    }
    if (constructor instanceof StellaRecord) {
        const newEntities = constructor.clone()
        for (let i = newEntities.entities.length - 1; i >= 0; i--) {
            const newElem = nextConstructor(newEntities.entities[i][1], ctx)
            if (newElem) {
                newEntities.entities[i][1] = newElem
                return new StellaRecord(newEntities.entities.map(([label, t]) => new StellaEntityRecord(label, t)))
            } else {
                newEntities.entities[i][1] = firstConstructor(newEntities.entities[i][1])
            }
        }
        return undefined
    }
    if (constructor instanceof StellaList) {
        const newElems = constructor.fixedElems.map(i => i.clone())

        for (let i = newElems.length - 1; i >= 0; i--) {
            const newElem = nextConstructor(newElems[i], ctx)
            if (newElem) {
                newElems[i] = newElem
                if (constructor.isFixedLength()) {
                    return new StellaList(constructor.parameterType).setFixedLength(newElems.length).setFixedElems(newElems)
                } else {
                    return new StellaList(constructor.parameterType).setMinLength(newElems.length).setFixedElems(newElems)
                }
            } else {
                newElems[i] = firstConstructor(newElems[i])
            }
        }

        const len = constructor.isFixedLength() ? constructor.fixedLength : constructor.minLength
        const newLen = len + 1
        const newElemsWithNewLen: StellaType[] = []
        for (let i = 0; i < newLen; i++) {
            newElemsWithNewLen.push(firstConstructor(constructor.parameterType))
        }
        if (len < ctx.maxListLenInProgram) {
            return new StellaList(constructor.parameterType).setFixedLength(newLen).setFixedElems(newElemsWithNewLen)
        } else {
            if (constructor.isFixedLength()) {
                return new StellaList(constructor.parameterType).setMinLength(newLen).setFixedElems(newElemsWithNewLen)
            }
        }
        return undefined
    }
    debugger
    return undefined
}

function tryMatch(constr: StellaType, pat: StellaType, ctx: stellaParserVisitorImpl): boolean {
    if (pat === undefined) {
        debugger
    }
    if (pat.isJokerType()) {
        return true
    }
    if (pat.type === "_INCOMPLETED_SUM_TYPE_FILLER") {
        return false
    }

    if (constr.type !== pat.type) {
        ctx.addError(new TypecheckError(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE))
        debugger
        return false
    }

    if (constr.type === "UNIT_TYPE" && pat.type === "UNIT_TYPE") {
        return constr.value === "unit" && pat.value === "unit"
    }

    if (constr.type === "BOOL_TYPE" && pat.type === "BOOL_TYPE") {
        return constr.value === pat.value
    }

    if (constr.type === "NAT_TYPE" && pat.type === "NAT_TYPE") {
        if (constr.isEqualValue) {
            if (pat.isEqualValue) {
                return parseInt(constr.value!) === parseInt(pat.value!)
            } else {
                return parseInt(constr.value!) >= parseInt(pat.value!)
            }
        } else {
            return !pat.isEqualValue && parseInt(constr.value!) >= parseInt(pat.value!)
        }
    }

    if (constr instanceof StellaTuple && pat instanceof StellaTuple) {
        for (let i = 0; i < constr.elems.length; i++) {
            if (!tryMatch(constr.elems[i], pat.elems[i], ctx)) {
                return false
            }
        }
        return true
    }

    if (constr.type === "_NULLARY_VARIANT_ENTITY_TYPE" && pat.type === "_NULLARY_VARIANT_ENTITY_TYPE") {
        return true
    }

    if (constr instanceof StellaVariant && pat instanceof StellaVariant) {
        const constrValue = constr.findTypeByLabel(constr.value!)!
        const patValue = pat.findTypeByLabel(constr.value!)!
        if (patValue === undefined) {
            return false
        }
        if (patValue.isJokerType()) {
            return true
        }
        if (!tryMatch(constrValue, patValue, ctx)) {
            return false
        }
        return true
    }

    if (constr instanceof StellaRecord && pat instanceof StellaRecord) {
        for (let i = 0; i < constr.entities.length; i++) {
            if (!tryMatch(constr.entities[i][1], pat.findTypeByLabel(constr.entities[i][0])!, ctx)) {
                return false
            }
        }
        return true
    }

    if (constr instanceof StellaSumType && pat instanceof StellaSumType) {
        if (constr.rightHidden) {
            if (!tryMatch(constr.leftType!, pat.leftType!, ctx)) {
                return false
            }
        }
        if (constr.leftHidden) {
            if (!tryMatch(constr.rightType!, pat.rightType!, ctx)) {
                return false
            }
        }
        return true
    }

    if (constr instanceof StellaList && pat instanceof StellaList) {
        if (constr.isFixedLength() && constr.fixedLength === 0) {
            if (pat.isFixedLength()) {
                return pat.fixedLength === 0;
            }
            return false
        }
        if (constr.isFixedLength()) {
            if (pat.isFixedLength()) {
                if (constr.fixedLength !== pat.fixedLength) {
                    return false
                }
                for (let i = 0; i < constr.fixedElems.length; i++) {
                    if (!tryMatch(constr.fixedElems[i], pat.fixedElems[i], ctx)) {
                        return false
                    }
                }
                return true
            } else if (pat.isInfiniteList) {
                if (constr.fixedLength < pat.minLength) {
                    return false
                }
                for (let i = 0; i < Math.min(constr.fixedElems.length, pat.fixedElems.length); i++) {
                    if (!tryMatch(constr.fixedElems[i], pat.fixedElems[i], ctx)) {
                        return false
                    }
                }
                return true
            } else {
                debugger
                throw "!!!!"
            }
        } else {
            if (pat.isFixedLength()) {
                return false
            }
            for (let i = 0; i < Math.min(constr.fixedElems.length, pat.fixedElems.length); i++) {
                if (!tryMatch(constr.fixedElems[i], pat.fixedElems[i], ctx)) {
                    return false
                }
            }
            return true
        }
        debugger
    }

    debugger
    throw "Unsupported match" // todo
    return false
}
