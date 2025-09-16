import {expect} from 'vitest'
import {SyntaxErrorReport, TypeErrorsReport, GoodReport} from "../typechecker";
import {error_type, TypecheckError} from "../typecheckError";

export function expectTypeError(res: SyntaxErrorReport | TypeErrorsReport | GoodReport, expectError: error_type) {
    expect(res).instanceof(TypeErrorsReport);
    try {
        expect((res as TypeErrorsReport).errors[0].type).toBe(expectError)
    } finally {
        if (res instanceof TypeErrorsReport) {
            console.error(res.errors[0].type + ":")
            console.error(res.errors[0].prettyPrint())
        }
    }
}

export function expectGood(res: SyntaxErrorReport | TypeErrorsReport | GoodReport) {
    console.log(res.sourceText)
    try {
        expect(res).instanceof(GoodReport);
    } catch (e) {
        if (res instanceof TypeErrorsReport) {
            res.errors.forEach(err => {
                console.error(err.type)
                // @ts-ignore
                console.error(err.stack)
            })
        }
        throw e
    }
}
