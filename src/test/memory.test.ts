import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('memory', () => {
    const res = parseAndTypecheck(`
language core;
extend with #unit-type, #references, #let-bindings, #sequencing;


fn inc_ref(ref : &Nat) -> Unit {
  return ref := succ (*ref)
}

fn inc3(ref : &Nat) -> Nat {
  return inc_ref(ref);
  inc_ref(ref);
  inc_ref(ref);
  *ref
}

fn main(n : Nat) -> Nat {
  return let ref = new(n) in inc3(ref)
}
`);
    expectGood(res);
})


test('memory2', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn foo(n : &Nat) -> Nat {
  return *n
}

fn main(n : Nat) -> Nat {
  return foo(<0x01>)
}

`);
    expectGood(res);
})

test('memory3', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn main(n : Nat) -> Nat {
 return *(if true then <0x01> else <0x02>)
}
`);
    expectGood(res);
})

test('memory4', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references, #type-ascriptions;

fn foo(n : Nat) -> &Nat { return if Nat::iszero(n) then <0x01> else <0x02> }

fn main(n : Nat) -> Nat {
  return *foo(0)
}

`);
    expectGood(res);
})

test('memory5', () => {
    const res = parseAndTypecheck(`
language core;
extend with #multiparameter-functions, #unit-type, #references, #let-bindings, #sequencing;


fn inc_ref(ref : &Nat, a : Nat) -> Unit {
  return ref := succ (*ref)
}

fn inc3(ref : &Nat) -> Nat {
  return inc_ref(ref, 0);
  inc_ref(ref, 0);
  inc_ref(ref, 0);
  *ref
}

fn main(n : Nat) -> Nat {
  return let ref = new(n) in inc3(ref)
}
`);
    expectGood(res);
})

test('memory_ref_ref', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references, #sequencing;

fn main(n : &&Nat) -> Nat {
  return *n := 0; succ(0)
}
`);
    expectGood(res);
})


test('memory_bad', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn main(n : Nat) -> Nat {
  return *((fn (_ : Nat) {
      return <0x01>
    }) (0))
}
`);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_REFERENCE_TYPE)
})

test('memory_not_ref', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn main(n : Nat) -> Nat {
  return *n;
}

`);
    expectTypeError(res, error_type.ERROR_NOT_A_REFERENCE)
})

test('memory_ref_to_not_ref', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn main(n : Nat) -> Bool {
  return new (true)
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_REFERENCE)
})


test('ref_variant', () => {
    const res = parseAndTypecheck(`
language core;

extend with #references,
            #variants;

fn main(n : Nat) -> &<| a : Nat |> {
  return new(<| a = 0 |>)
}
`);
    expectGood(res)
})

test('mem_to_not_ref', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn main(n : Nat) -> Nat {
  return if Nat::iszero(n) then <0x01> else <0x02>
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_MEMORY_ADDRESS)
})

test('seq', () => {
    const res = parseAndTypecheck(`
language core;
extend with #references;

fn main(n : Nat) -> Nat {
  return if Nat::iszero(n) then <0x01> else <0x02>
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_MEMORY_ADDRESS)
})

test('seq2', () => {
    const res = parseAndTypecheck(`
language core;
extend with #sequencing, #unit-type;

fn main(n : Nat) -> Nat {
  return (fn(a : Nat) { return unit }) (0);
   (fn(a : Nat) { return a }) (0);
    0
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})
