import {expect, test} from 'vitest'
import {GoodReport, parseAndTypecheck, TypeErrorsReport} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";


test('sum_type', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #sum-types;

fn main(n : Nat + Bool) -> Nat {
  return match n {
      inl(a) => a
    | inr(b) => 0
   }
}
    `);
    expect(res).instanceof(GoodReport);
})

test('sum_type2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #sum-types;

fn main(n : Nat + Bool) -> Bool {
  return match n {
      inr(a) => a
    | inl(b) => false
   }
}
    `);
    expect(res).instanceof(GoodReport);
})


test('sum_type3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types, #unit-type;

fn test(first : Nat + Bool) -> Nat {
  return match first {
     a => 0
  }
}

fn main(input : Bool) -> Nat {
  return test(inl(0))
}
    `);
    expect(res).instanceof(GoodReport);
})

test('sum_type4', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types, #unit-type;

fn test(first : Bool) -> Nat + Unit {
  return if first then inl(succ(0)) else inr(unit)
}

fn main(input : Bool) -> Nat {
  return match test(input) {
      inl(n) => n
    | inr(_) => 0
  }
}
    `);
    expect(res).instanceof(GoodReport);
})

test('sum_type_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types;

fn main(n : Nat) -> Nat + Nat {
  return (fn (a : Nat) { return inl(0) }) (0)
}
    `);
    expect(res).instanceof(TypeErrorsReport);
})

test('sum_type_bad_inl', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types;

fn main(input : Bool) -> Nat {
  return inl(0)
}
    `);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_INJECTION)
})

test('sum_type_bad_inr', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types;

fn main(input : Bool) -> Nat {
  return inr(0)
}
    `);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_INJECTION)
})

test('sum_type_bad_inr2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #sum-types,
            #natural-literals;

fn main(n : Nat) -> Nat + Bool {
  return inr(12)
}
    `);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('sum_type_with_bot_inr', () => {
    const res = parseAndTypecheck(`
language core;
extend with #ambiguous-type-as-bottom, #structural-subtyping, #sum-types;
fn main(n : Nat) -> Bool + Nat {
  return (fn (x : Nat) {
    return inr(x)
  })(n)
}
    `);
    expect(res).instanceof(GoodReport);
})

test('sum_type_with_bot_inl', () => {
    const res = parseAndTypecheck(`
language core;
extend with #ambiguous-type-as-bottom, #structural-subtyping, #sum-types;
fn main(n : Nat) -> Nat + Bool {
  return (fn (x : Nat) {
    return inl(x)
  })(n)
}
    `);
    expect(res).instanceof(GoodReport);
})
