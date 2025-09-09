import {expect, test} from 'vitest'
import {GoodReport, parseAndTypecheck} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('ascriptions', () => {
    const res = parseAndTypecheck(`
language core;
extend with #type-ascriptions;


fn main(n : Nat) -> Nat {
  return 0 as Nat
}
`);
    expectGood(res);
})

test('ascriptions_bad', () => {
    const res = parseAndTypecheck(`
language core;
extend with #type-ascriptions;


fn main(n : Nat) -> Bool {
  return 0 as Bool
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('ascriptions2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types;
extend with #type-ascriptions;

fn main(n : Nat) -> Nat + Bool {
  return (fn (b : Bool) { return inl(n) as (Nat + Bool) })(true)
}
`);
    expectGood(res);
})

test('cast', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals, #type-cast, #pairs, #top-type, #structural-subtyping;

fn main(n : Nat) -> Nat {
  return (1 cast as {Nat, Nat}).1
}
`);
    expectGood(res);
})
