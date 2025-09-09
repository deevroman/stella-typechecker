import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";

test('cons', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;


fn main(n : Nat) -> [Nat] {
  return cons(0, []);
}
`);
    expectGood(res);
})

test('cons_list_of_lists', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists, #natural-literals;

fn main(n : Nat) -> [[Nat]] {
  return cons([0], (cons([1], [])))
}
`);
    expectGood(res);
})

test('cons_subtyping', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists, #top-type, #bottom-type, #structural-subtyping;

fn main(n : Nat) -> [Top] {
  return cons(0, []);
}
`);
    expectGood(res);
})

test('cons_subtyping2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> [Top] {
  return cons(true, (cons(0, [])))
}

`);
    expectGood(res);
})

test('cons_subtyping3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> Top {
  return cons(0, (cons(0, [])))
}
`);
    expectGood(res);
})

test('cons_bad_subtyping', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> Bool {
  return List::isempty(cons(true, (cons(0, []))))
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_SUBTYPE)
})

test('cons_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> [Bool] {
  return cons(0, (cons(0, [])))
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_SUBTYPE)
})

test('cons_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> [Bool] {
  return cons(true, (cons(0, [])))
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_SUBTYPE)
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
    expectGood(res);
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
    expectGood(res);
})

test('head_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists ;

fn main(n : Nat) -> Nat {
  return List::head([])(n)
}
`);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})

test('head_empty', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;

fn main(n : Nat) -> Nat {
  return List::head([])
}
`);
    expectGood(res)
})

test('head_tail_empty', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;

fn main(n : Nat) -> Nat {
  return List::head(List::tail([]))
}
`);
    expectGood(res)
})

test('tail', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists;

fn main(n : Nat) -> Nat {
  return List::tail([0])
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
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
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})

test('list_match_res_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #lists ;

fn main(n : Nat) -> Nat {
  return (fn (a : Nat) { return match(0) {
    x => x
    | y => []
  }
  }) (0)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_LIST)
})
