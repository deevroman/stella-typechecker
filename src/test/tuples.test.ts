import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";

test('pair', () => {
    const res = parseAndTypecheck(`
language core;
extend with #pairs;

fn main(n : Nat) -> {Nat, Nat} {
  return {succ(n), {succ(succ(n)), n}}.2
}
`);
    expectGood(res);
})

test('tuple', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples;

fn main(n : Nat) -> {Nat, Nat, Bool} {
  return {n, succ(n), true}
}
`);
    expectGood(res);
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('tuple_bad_index', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples, #lists;

fn main(n : Nat) -> Nat {
  return {}.1
}
`);
    expectTypeError(res, error_type.ERROR_TUPLE_INDEX_OUT_OF_BOUNDS)
})

test('tuple_bad_index2', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples, #lists;

fn main(n : Nat) -> Nat {
  return {}.0
}
`);
    expectTypeError(res, error_type.ERROR_TUPLE_INDEX_OUT_OF_BOUNDS)
})

test('not_tuple', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples;

fn main(n : Nat) -> Nat {
  return true.1
}
`);
    expectTypeError(res, error_type.ERROR_NOT_A_TUPLE)
})

test('not_tuple2', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples, #lists;

fn main(n : Nat) -> Nat {
  return ([]).1
}
`);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})
