import {expect, test} from 'vitest'
import {parseAndTypecheck, TypeErrorsReport} from "../typechecker";
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

test('pair_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #pairs;

fn main(f : Nat) -> { Nat, Nat } {
  return { f, f(0) }
}
`);
    expectTypeError(res, error_type.ERROR_NOT_A_FUNCTION)
})

test('pair_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #pairs;

fn main(x : Nat) -> Nat {
  return (fn(x : Nat) { 
    return { 
      { { x, x }, { x, x } },
      { { x, Nat::iszero(x) }, { x, x } }
    } 
  })(0).2.1
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
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
