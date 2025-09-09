import {expect} from 'vitest'
import {SyntaxErrorReport, TypeErrorsReport, GoodReport} from "../typechecker";
import {error_type} from "../typecheckError";

export function expectTypeError(res: SyntaxErrorReport | TypeErrorsReport | GoodReport, expectError: error_type) {
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(expectError)
}

export function expectGood(res: SyntaxErrorReport | TypeErrorsReport | GoodReport) {
    expect(res).instanceof(GoodReport);
}
