import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";


test('smoke', () => {
    expect(parseAndTypecheck(example).ok).toBe(false)
})

test('main not found', () => {
    const res = parseAndTypecheck("language core; fn notmain(n : Nat) -> Nat {return 0}")
    expect(res.ok).toBe(false)
    expect((res as TypeErrorsReport).errors).not.toStrictEqual([])
})

test('syntax error', () => {
    const res = parseAndTypecheck("langu age core; fn notmain(n : Nat) -> Nat {return x}");
    expect(res).toStrictEqual(new SyntaxErrorReport([
        {
            "line": 1,
            "charPositionInLine": 0,
            "message": "mismatched input 'langu' expecting 'language'"
        }
    ]))
})

test('undefined var', () => {
    const res = parseAndTypecheck("language core; fn main(n : Nat) -> Nat {return f(n)}");
    expect(res).instanceof(TypeErrorsReport)
    const errors = (res as TypeErrorsReport).errors.map(i => [i.type, ...tokenInfo(i.token!)])
    expect(errors.slice(0, 1)).toStrictEqual([["ERROR_UNDEFINED_VARIABLE", "f", 14,]])
})

test('simple defined var', () => {
    const res = parseAndTypecheck(`language core; fn main(n : Nat) -> Nat { return n }`);
    expect(res).instanceof(GoodReport)
})

test('multiparam', () => {
    const res = parseAndTypecheck(`
    language core;

extend with #multiparameter-functions;

fn m_f(a : Nat, b : Bool) -> Nat {
    return if (b) then a else 0
}

fn get_m_f(a : Nat, b : Bool, c : Nat) -> (fn(Nat, Bool) -> Nat) {
    return m_f
}

fn main(n : Nat) -> Nat {
    return get_m_f(0, true, 0)(0, false)
}
`);
    expect(res).instanceof(GoodReport);
})

test('nested', () => {
    const res = parseAndTypecheck(`
language core;

extend with #nested-function-declarations;

fn main(n : Nat) -> Nat {
  fn nested(x : Nat) -> Bool {
   \treturn if (Nat::iszero(x)) then Nat::iszero(n) else false
  }

  return if (nested(n)) then 0 else succ(0)
}
`);
    expect(res).instanceof(GoodReport);
})

test('undef', () => {
    const res = parseAndTypecheck(`
    language core;

fn main(n : Nat) -> Nat {
    return a
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNDEFINED_VARIABLE)
})

test('not_fun', () => {
    const res = parseAndTypecheck(`
language core;

fn foo(arg : Nat) -> Nat {
    return 0
}

fn main(n : Nat) -> Nat {
  return n(foo(true))
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_NOT_A_FUNCTION)
})


test('int_literal', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals;


fn main(n : Nat) -> Bool {
  return 5;
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('succ_true', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Bool {
    return succ(true)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})
