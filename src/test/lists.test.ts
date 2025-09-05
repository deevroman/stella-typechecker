import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";

test('cons', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;


fn main(n : Nat) -> [Nat] {
  return  cons(0, []);
}
`);
    expect(res).instanceof(GoodReport);
})

test('list_ops', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;

fn first_or_default(list : [Nat]) -> Nat {
  return if List::isempty(list) then List::head(List::tail([0,0,0])) else List::head(list)
}

fn main(arg : Nat) -> Nat {
  return first_or_default([0, 0, 0])
}

    `);
    expect(res).instanceof(GoodReport);
})

test('list_ops2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;

fn main(arg : Nat) -> Nat {
  return List::head([0, 0, 0, true])
}

    `);
    expect(res).instanceof(TypeErrorsReport);
})


test('asc_list', () => {
    const res = parseAndTypecheck(`
language core;
extend with #type-ascriptions;
extend with #lists;

fn main(n : Nat) -> [Bool] {
  return [] as [Bool]
}
`);
    expect(res).instanceof(GoodReport);
})

test('head_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists ;

fn main(n : Nat) -> Nat {
  return List::head([])(n)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})

test('list_bad_ass', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;

fn main(arg : Nat) -> Nat {
  return [0]
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_LIST)
})


test('list_match_res_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists ;

fn main(n : Nat) -> Nat {
  return (fn (a : Nat) { return match(0) {
    x => []
    | y => [0]
  }
  }) (0)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})
