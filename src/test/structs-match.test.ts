import {test} from 'vitest'
import {parseAndTypecheck} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('match', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns;

fn main(n : Nat) -> Nat {
  return match true {
    true => 0
    | false => 0
   }
}
`);
    expectGood(res);
})

test('match_fun', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants;

fn main(n : (fn(Nat) -> Nat)) -> Nat {
  return match n {
      a => 0
   }
}
`);
    expectGood(res);
})

test('match_list_const', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [] => 0    
      | cons (x, xs) => 0
   }
}
`);
    expectGood(res);
})

test('match_list_const2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [] => 0
      | [0] => 0
      | [succ(x)] => 0
      | cons (x, [0]) => 0
      | cons (x, [succ(y)]) => 0
      | cons (x, cons(x2, xs)) => 0
   }
}
`);
    expectGood(res);
})

test('match_ne_list', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [0] => 0
      | cons (x, xs) => 0
   }
}

`);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})
test('match_ne_list2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [] => 0
      | [0] => 0
      | cons (x, [0]) => 0
      | cons (x, [succ(y)]) => 0
      | cons (x, cons(x2, xs)) => 0
   }
}
`);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_list_bad_with_duplicates_vars', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [] => 0    
      | cons (x, [0]) => 0
      | cons (x, [succ(x)]) => 0
      | cons (x, cons(x2, xs)) => 0
   }
}

`);
    expectTypeError(res, error_type.ERROR_DUPLICATE_PATTERN_VARIABLE)
})

test('match_list_in_list_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [[0]] {
      [] => 0
      | [0] => 0
      | cons (x, xs) => 0
   }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('match_list_bad_pattern_type', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [] => 0    
      | [0] => 0
      | [true, 0] => 0
      | cons (x, xs) => 0
   }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('match_list_bad_pattern_type2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #lists;

fn main(n : Nat) -> Nat {
  return match [0] {
      [] => 0    
      | [0] => 0
      | [0, 0] => 0
      | cons (true, xs) => 0
   }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('match_list_big', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #lists;

fn test(n : [Nat]) -> Nat {
  return match n {
      [] => 0
      | [a] => a
      | [a, b] => a
      | [a, b, c] => a
      | cons (1, xs) => 1
      | cons (2, cons(3, xs)) => 2
      | cons (a, cons(b, [1, 2])) => b
      | cons (a, cons(b, cons(c, cs))) => c
   }
}

fn main(n : [Nat]) -> Nat {
  return match n {
      [] => 0
      | cons (x, xs) => 0
   }
}
`);
    expectGood(res);
})

test('match_nat', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {   
  return match 5 {
      0 => 0
    | succ(n) => 0
   }
}   
`);
    expectGood(res);
})

test('match_ne_nat', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return match 5 {
      0 => 0
    | succ(succ(n)) => 0
   }
} 
`);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_ne_nat2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return match 0 {
      0 => 0
    | succ(0) => 0
    | succ(succ(succ(n))) => 0
   }
} 
`);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})


test('match_nat2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return match 0 {
      0 => 0
    | succ(0) => 0
    | succ(succ(0)) => 0
    | succ(succ(succ(n))) => 0
   }
} 
`);
    expectGood(res)
})

test('match_nat3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return match 0 {
      0 => 0
    | succ(x) => 0
    | succ(succ(x)) => 0
    | succ(succ(succ(n))) => 0
   }
} 
`);
    expectGood(res)
})


test('match_bool_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns;

fn main(n : Nat) -> Nat {
  return match true {
      true => 0
   }
}
    `);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_variant', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants, #unit-type;

fn attempt(get_one? : Bool) -> <| value : Nat, failure : Unit |> {
  return
    if get_one?
      then <| value = 0 |>
      else <| failure = unit |>
}

fn main(succeed : Bool) -> Nat {
  return match attempt(succeed) {
      <| value = n |> => succ(n)
  }
}
    `);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_variants2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns;

fn main(n : Nat) -> Nat {
  return match true {
      true => 0
    | _ => 0
   }
}
    `);
    expectGood(res);
})

test('match_nat_succ', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals;

fn test(input : Nat) -> Nat {
  return match input {
      succ(succ(n)) => n
    | succ(n) => n
    | _ => 0
  }
}

fn main(n : Nat) -> Nat {
  return match n {
      0 => 0
    | succ(succ(succ(n))) => n
    | 1 => 1
    //| _ => n
   }
}
    `);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_record_with_nat', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
      {b = x, a = d} => 0
   }
}
    `);
    expectGood(res)
})

test('match_record_with_nat2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
      {b = 0, a = d} => 0
    | {b = succ(n), a = true} => 0
    | {b = succ(n), a = false} => 0
    //| _ => 0
   }
}
    `);
    expectGood(res)
})

test('match_record_with_dup_fields', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
      {b = x, a = d, a = y} => 0
   }
}
    `);
    expectTypeError(res, error_type.ERROR_DUPLICATE_RECORD_PATTERN_FIELDS)
})

test('match_ne_record_with_nat', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
      {b = 0, a = d} => 0
   }
}
    `);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})


test('match_ne_record_with_nat2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
      {b = 0, a = d} => 0
    | {b = succ(n), a = true} => 0
    //| _ => 0
   }
}
    `);
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})


test('match_tuple', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #tuples;

fn main(n : Nat) -> Nat {
  return match {{0, true}, {0, true}} {
      {a, b} => 0
   }
}
`)
    expectGood(res)
})

test('match_tuple_bad', () => {
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

test('match_with_bad_case_return_value', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #tuples;

fn main(n : Nat) -> Nat {
  return match {{0, true}, {0, true}} {
      {a, b} => n(0)
   }
}
`)
    expectTypeError(res, error_type.ERROR_NOT_A_FUNCTION)
})

test('match_unit', () => {
    const res = parseAndTypecheck(`
language core;

extend with #unit-type, #structural-patterns;

fn main(n : Nat) -> Nat {
  return match(unit) {
    unit => 0
    | m => 0
  }
}
`);
    expectGood(res);
})

test('match_unit2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #unit-type;

fn main(n : Nat) -> Nat {
  return match unit {
      unit => 0
   }
}
`);
    expectGood(res);
})

test('match_unit_bad_zero_cases', () => {
    const res = parseAndTypecheck(`
language core;

extend with #unit-type, #structural-patterns, #natural-literals, #tuples;

fn main(n : Unit) -> Nat {
  return match n {
      
   }
}
`)
    expectTypeError(res, error_type.ERROR_ILLEGAL_EMPTY_MATCHING)
})

test('match_unit_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #unit-type, #structural-patterns, #natural-literals, #tuples;

fn main(n : Unit) -> Nat {
  return match n {
      {a, b} => 0
   }
}
`)
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('match_unit_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #unit-type, #structural-patterns, #natural-literals, #tuples;

fn main(n : Unit) -> Nat {
  return match n {
      m => 0
   }
}
`)
    expectGood(res)
})

test('match_unit_bad3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #unit-type, #structural-patterns, #natural-literals, #tuples;

fn main(n : Unit) -> Nat {
  return match n {
      _ => 0
   }
}
`)
    expectGood(res)
})

// ERROR_NONEXHAUSTIVE_MATCH_PATTERNS

test('match_ne_nat_int_cons', () => {
    const res = parseAndTypecheck(`    
language core;

extend with #structural-patterns, #natural-literals;

fn main(n : Nat) -> Nat {
  return match 5 {
    0 => 0
    | 5 => 0
    | 4 => 0
   }
}`)
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_ne_tuple', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #tuples;

fn main(n : Nat) -> Nat {
  return match {{0, true}, true, true} {
      {{a, c}, true, x} => 0
   }
}
`)
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_ne_sum', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #sum-types;

fn main(n : Bool + Nat) -> Nat {
  return match n {
      inr(a) => a
   }
}
`)
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})


test('match_ne_tuple_and_lists', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #tuples, #lists;

fn main(n : Nat) -> Nat {
  return match {{0}, true, [0]} {
    	{{0}, x, []} => 0
    // | {{0}, x, cons(0, s)} => 0
    // | {{0}, x, cons(0, cons(0, ss))} => 0
    // | {{0}, x, cons(succ(q), sss)} => 0
    // | {{succ(succ(n))}, x, l} => 0
    // | {{1}, false, l} => 0
    //| {{x}, true, l} => 0
    //| _ => 0
   }
}
`)
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_ne_tuple_and_lists2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #tuples, #lists;

fn main(n : Nat) -> Nat {
  return match {{0}, true, [0]} {
    	{{0}, x, []} => 0
    | {{0}, x, cons(0, s)} => 0
    | {{0}, x, cons(0, cons(0, ss))} => 0
    | {{0}, x, cons(succ(q), sss)} => 0
    // | {{succ(succ(n))}, x, l} => 0
    // | {{1}, false, l} => 0
    //| {{x}, true, l} => 0
    //| _ => 0
   }
}
`)
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})

test('match_tuple_and_lists', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #tuples, #lists;

fn main(n : Nat) -> Nat {
  return match {{0}, true, [0]} {
      {{0}, x, []} => 0
    | {{0}, x, cons(0, s)} => 0
    | {{0}, x, cons(0, cons(0, ss))} => 0
    | {{0}, x, cons(succ(q), sss)} => 0
    | {{succ(succ(n))}, x, l} => 0
    | {{1}, false, l} => 0
    | {{x}, true, l} => 0
    //| _ => 0
   }
}
`)
    expectGood(res)
})


test('match_tuple_sum', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #tuples, #lists;

fn main(n : {Bool, Nat, {Bool + (Bool + Nat)}}) -> Nat {
  return match n {
    {a, x, {inl(true)}} => 0
  | {a, x, {inl(false)}} => 0
  | {a, x, {inr(inl(false))}} => 0
  | {a, x, {inr(inl(true))}} => 0
  | {a, x, {inr(inr(0))}} => 0
  | {a, x, {inr(inr(succ(z)))}} => 0
  | {a, x, {w}} => 0
  }
}
`)
    expectGood(res)
})

test('match_tuple_sum2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #tuples, #lists;

fn main(n : {Bool, Nat, {Bool + (Bool + Nat)}}) -> Nat {
  return match n {
    {a, x, {inl(true)}} => 0
  | {a, x, {inl(false)}} => 0
  | {a, x, {inr(inl(false))}} => 0
  | {a, x, {inr(inl(true))}} => 0
  | {a, x, {inr(inr(0))}} => 0
  | {a, x, {inr(inr(succ(z)))}} => 0
  // | {a, x, {w}} => 0
  }
}
`)
    expectGood(res)
})

test('match_ne_tuple_sum', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #tuples, #lists;

fn main(n : {Bool, Nat, {Bool + (Bool + Nat)}}) -> Nat {
  return match n {
    {a, x, {inl(true)}} => 0
  | {a, x, {inl(false)}} => 0
  | {a, x, {inr(inl(false))}} => 0
  | {a, x, {inr(inl(true))}} => 0
  | {a, x, {inr(inr(0))}} => 0
  // | {a, x, {inr(inr(succ(z)))}} => 0
  // | {a, x, {w}} => 0
  }
}
`)
    expectTypeError(res, error_type.ERROR_NONEXHAUSTIVE_MATCH_PATTERNS)
})
