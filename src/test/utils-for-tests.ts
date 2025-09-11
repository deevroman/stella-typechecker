import {expect} from 'vitest'
import {SyntaxErrorReport, TypeErrorsReport, GoodReport} from "../typechecker";
import {error_type, TypecheckError} from "../typecheckError";

export function expectTypeError(res: SyntaxErrorReport | TypeErrorsReport | GoodReport, expectError: error_type) {
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(expectError)
}

export function expectGood(res: SyntaxErrorReport | TypeErrorsReport | GoodReport) {
    try {
        expect(res).instanceof(GoodReport);
    } catch (e) {
        console.log(res.sourceText)
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
