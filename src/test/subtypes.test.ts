import {expect, test} from 'vitest'
import {GoodReport, parseAndTypecheck} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('top_and_tuple', () => {
    const res = parseAndTypecheck(`
language core;

extend with #tuples,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn tuple_gen(n : Nat) -> {Top, Bool, Nat} {
  return {1, true, 12}
}


fn main(n : Nat) -> {Top, Bool} {
  return tuple_gen(n)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TUPLE_LENGTH);
})

test('top_and_red', () => {
    const res = parseAndTypecheck(`
language core;

extend with #references,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> Top {
  return new(0)
}
`);
    expectGood(res)
})

test('top_in_function_arg', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn kek( x : Top ) -> Top {
  return x;
}

fn main(b : Bool) -> (fn(Top) -> Top) {
    return kek;
}
`);
    expectGood(res)
})

test('top_in_function_arg2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn kek( x : Top ) -> Bool {
  return false;
}

fn main(b : Bool) -> (fn(Top) -> Top) {
    return kek;
}
`);
    expectGood(res)
})

test('top_in_function_arg_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(b : Bool) -> (fn(Top) -> Top) {
    return fn(x : Bool) {
        return false
    }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_SUBTYPE);
})

test('records_subtyping', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn main(n : Nat) -> { one : Nat } {
  return { one = 1, two = succ(succ(0)) }
}
`);
    expectGood(res)
})

test('variants_subtyping', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn fail(n : Nat) -> <| failure : Top, value : Nat |> {
  return <| failure = 1 |>
}

fn main(n : Nat) -> <| value : Nat, failure : Top, value2 : Bool |> {
  return fail(n)
}
`);
    expectGood(res)
})


test('variants_subtyping_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping,
            #type-ascriptions;

fn main(n : Nat) -> <| value : Nat, failure : Top|> {
  return <| failure = 1 |> as (<| failure : Top, value2 : Nat |>)
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_VARIANT_LABEL)
})

test('if_cond_type', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-subtyping;

fn main(n : Nat) -> Nat {
    return if 0 then 0 else 0
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_SUBTYPE)
})
