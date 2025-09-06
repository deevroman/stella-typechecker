import {expect, test} from 'vitest'
import {GoodReport, parseAndTypecheck} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";


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
    expect(res).instanceof(GoodReport)
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
    expect(res).instanceof(GoodReport)
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
