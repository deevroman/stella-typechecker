import {expect, test} from 'vitest'
import {GoodReport, parseAndTypecheck} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('exceptions_not_enabled', () => {
    const res = parseAndTypecheck(`
language core;

extend with #exceptions, #natural-literals;

fn main(n : Nat) -> Nat {
  return try { throw(1) } with { 1 }
}

`);
    expectTypeError(res, error_type.ERROR_EXCEPTION_TYPE_NOT_DECLARED)
})

test('exceptions', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping,
            #exceptions,
            #exception-type-declaration,
            #unit-type;

exception type = Unit

fn foo(b : Bool) -> Top {
  return throw(unit);
}

fn main(b : Bool) -> Top {
    return foo(true)
}
`);
    expectGood(res)
})

test('exceptions_shadow', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping,
            #exceptions,
            #exception-type-declaration,
            #unit-type;

exception type = Bool
exception type = Unit

fn foo(b : Bool) -> Top {
  return throw(unit);
}

fn main(b : Bool) -> Top {
    return foo(true)
}
`);
    expectGood(res)
})

test('exceptions_bad_exception_type', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping,
            #exceptions,
            #exception-type-declaration,
            #unit-type;

exception type = Unit

fn foo(b : Bool) -> Top {
  return throw(0);
}

fn main(b : Bool) -> Top {
    return foo(true)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_SUBTYPE)
})

test('exceptions_bad_exception_type_without_subtyping', () => {
    const res = parseAndTypecheck(`
    language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #exceptions,
            #exception-type-declaration,
            #unit-type;

exception type = Unit

fn foo(b : Bool) -> Top {
  return throw(0);
}

fn main(b : Bool) -> Top {
    return foo(true)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('exceptions_without_exception_type', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping,
            #exceptions,
            #exception-type-declaration,
            #unit-type;

fn foo(b : Bool) -> Top {
  return throw(0);
}

fn main(b : Bool) -> Top {
    return foo(true)
}
`);
    expectTypeError(res, error_type.ERROR_EXCEPTION_TYPE_NOT_DECLARED)
})

test('panic', () => {
    const res = parseAndTypecheck(`
    language core;

extend with #panic;

fn main(n : Nat) -> Nat {
  return panic!
}
`);
    expectGood(res)
})

test('panic_in_else', () => {
    const res = parseAndTypecheck(`
language core;
extend with #panic;

fn main(n : Nat) -> Nat {
  return (fn(x : Nat) {
      return if false then x else panic!
  }) (0)
}
`);
    expectGood(res)
})

test('panic_bad', () => {
    const res = parseAndTypecheck(`
language core;
extend with #panic;

fn main(n : Nat) -> Nat {
  return (if false then panic! else fn (x : Nat) { return x }) (0)
}

`);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_PANIC_TYPE)
})

test('panic_with_ambiguous_type_as_bottom', () => {
    const res = parseAndTypecheck(`
language core;
extend with #panic, #ambiguous-type-as-bottom;

fn main(n : Nat) -> Nat {
  return (fn(x : Nat) {
      return panic!
  }) (0)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('panic_with_ambiguous_type_as_bottom_with_subtyping', () => {
    const res = parseAndTypecheck(`
language core;
extend with #panic, #ambiguous-type-as-bottom, #structural-subtyping;

fn main(n : Nat) -> Nat {
  return (fn(x : Nat) {
      return panic!
  }) (0)
}

`);
    expectGood(res)
})

test('throw_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #exceptions, #natural-literals, #exception-type-declaration;

exception type = Nat

fn main(n : Nat) -> Nat {
    return (fn(x : Nat) {
        return throw(1)
    }) (0)
}
`);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_THROW_TYPE)
})

test('throw_variant', () => {
    const res = parseAndTypecheck(`
language core;
extend with #exceptions, #exception-type-declaration, #variants, #structural-patterns, #open-variant-exceptions;

exception variant bool : Bool
exception variant nat : Nat

fn fail(n : Nat) -> Bool {
  return throw(<| bool = true |>)
}

fn main(n : Nat) -> Bool {
  return try { true } catch { <| bool = true |> => true }
}
`);
    expectGood(res)
})

test('throw_variant_bad_match', () => {
    const res = parseAndTypecheck(`
language core;
extend with #exceptions, #exception-type-declaration, #variants, #structural-patterns, #open-variant-exceptions;

exception variant bool : Bool
exception variant nat : Nat

fn fail(n : Nat) -> Bool {
  return throw(<| bool = true |>)
}

fn main(n : Nat) -> Bool {
  return try { true } catch { <| ne_bool = true |> => true }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('throw_variant_bad_body', () => {
    const res = parseAndTypecheck(`
language core;
extend with #exceptions, #exception-type-declaration, #variants, #structural-patterns, #open-variant-exceptions;

exception variant bool : Bool
exception variant nat : Nat

fn fail(n : Nat) -> Bool {
  return throw(<| bool = true |>)
}

fn main(n : Nat) -> Bool {
  return try { 0 } catch { <| ne_bool = true |> => true }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('throw_cast_as_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #try-cast-as, #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return try { true } cast as Nat
    { 1 => true }
    with
    { 12 }
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('throw_cast_as_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #try-cast-as, #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return try { true } cast as Bool
    { 1 => 1 }
    with
    { 12 }
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

// test('throw_variant_bad', () => {
//     const res = parseAndTypecheck(`
// language core;
// extend with #exceptions, #exception-type-declaration, #variants, #structural-patterns, #open-variant-exceptions;
//
// exception variant bool : Bool
// exception variant nat : Nat
//
// fn fail(n : Nat) -> Bool {
//   return throw(<| bool = true |>)
// }
//
// fn main(n : Nat) -> Bool {
//   return try { true } catch { <| bool = true |> => true }
// }
// `);
//     expectGood(res)
// })
