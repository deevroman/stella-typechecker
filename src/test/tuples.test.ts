import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";

test('pair', () => {
    const res = parseAndTypecheck(`
language core;
extend with #pairs;

fn main(n : Nat) -> {Nat, Nat} {
  return {succ(n), {succ(succ(n)), n}}.2
}
`);
    expect(res).instanceof(GoodReport);
})

test('tuple', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples;

fn main(n : Nat) -> {Nat, Nat, Bool} {
  return {n, succ(n), true}
}
`);
    expect(res).instanceof(GoodReport);
})

test('call_tuple', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #tuples;

fn main(n : Nat) -> Nat {
  return {0, false}(0)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_NOT_A_FUNCTION)
})

test('tuple_unexpected_field', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> Nat {
  return { fst = 0 }.thd
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_FIELD_ACCESS)
})

test('match_tuple', () => {
    const res = parseAndTypecheck(`
language core;

extend with #tuples, #structural-patterns;

fn foo(a : Nat) -> { Nat, Bool } {
  return { 0, true }
}

fn main(n : Nat) -> Nat {
  return match(foo(0)) {
    {x, y, z} => x
}
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})
