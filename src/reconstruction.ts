import {StellaAuto, StellaFunction, StellaList, StellaType} from "./typecheckTypes";
import {
    ERROR_OCCURS_CHECK_INFINITE_TYPE,
    error_type,
    ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION,
    TypecheckError
} from "./typecheckError";

type Constraint = { left: StellaType, right: StellaType }

export function checkConstrains(constrains: Constraint[]): TypecheckError | undefined {
    try {
        unify(constrains)
    } catch (e) {
        return e as TypecheckError
    }
}

function debug(...args: any) {
    return
    // console.debug(...args)
}

function unify(cs: Constraint[]): TypecheckError | undefined {
    debug("Constraints count:", cs.length)
    debug(constrainsToStr(cs))
    if (cs.length === 0) {
        return
    }
    debugger
    cs = flipIfNeed(dropTrivial(cs))
    // debug("After drop")
    // debug(constrainsToStr(cs))
    // debug()
    const forSubstitute = findLeftAss(cs)
    // check
    if (forSubstitute) {
        if (forSubstitute.right.containsThatAuto(forSubstitute.left as StellaAuto)) {
            throw new ERROR_OCCURS_CHECK_INFINITE_TYPE(forSubstitute.left, forSubstitute.right)
        }
        cs = substituteAuto(cs, forSubstitute)
    } else {
        // todo
        return
    }
    cs = unwrap(cs)
    debug("After unwrap")
    debug(constrainsToStr(cs))
    debug()
    return unify(cs)
}

function dropTrivial(cs: Constraint[]) {
    return cs.filter(c => !c.left.isEqualType(c.right))
}

function flipIfNeed(cs: Constraint[]) {
    return cs.map(c => {
        if (!(c.left instanceof StellaAuto) && c.right instanceof StellaAuto) {
            return {left: c.right, right: c.left}
        }
        return c
    })
}

function findLeftAss(cs: Constraint[]) {
    return cs.find(c => c.left instanceof StellaAuto)
}

function substituteAuto(cs: Constraint[], target: Constraint): Constraint[] {
    return cs.map(c => {
        return {
            left: c.left.substituteAuto(target.left as StellaAuto, target.right),
            right: c.right.substituteAuto(target.left as StellaAuto, target.right)
        };
    })
}

function unwrap(cs: Constraint[]) {
    return cs.flatMap(c => {
        const {left, right} = c
        if (!(left instanceof StellaAuto) && !(right instanceof StellaAuto) && left.type !== right.type) {
            throw new ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION(left, right)
        }
        if (left instanceof StellaFunction && right instanceof StellaFunction) {
            if (left.argsTypes.length !== right.argsTypes.length) {
                throw new TypecheckError(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
            }
            const res = []
            for (let i = 0; i < left.argsTypes.length; i++) {
                res.push({left: left.argsTypes[i], right: right.argsTypes[i]})
            }
            res.push({left: left.returnType, right: right.returnType})
            return res
        }
        // todo нужно придумать тест, который проверяет наличие этого ифа
        if (left instanceof StellaList && right instanceof StellaList) {
            return {left: left.parameterType, right: right.parameterType}
        }
        return c
    })
}

function constrainsToStr(constrains: Constraint[]) {
    return constrains.map(({left, right}) => `${left.prettyPrint()} = ${right.prettyPrint()}`).join("\n")
}
