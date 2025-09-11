import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
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

test('match2', () => {
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

test('match_list', () => {
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
    \t0 => 0
    | succ(n) => 0
   }
}   
`);
    expectGood(res);
})


test('match_variants', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns;

fn main(n : Nat) -> Nat {
  return match true {
      true => 0
   }
}
    `);
    expect(res).instanceof(TypeErrorsReport);
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
    expect(res).instanceof(TypeErrorsReport);
})
/*

test('match_record_with_nat', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
    \t{b = 0, a = d} => 0
   }
}
    `);
    expect(res).instanceof(TypeErrorsReport);
})

test('match_record_with_nat2', () => {
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
    expect(res).instanceof(TypeErrorsReport);
})

*/

test('record', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records;

fn main(succeed : Nat) -> { b : Nat, a : Bool } {
  return { a = true, b = 0 }
}
    `);
    expectGood(res);
})

test('record2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
      {b = c, a = d} => c
   }
}
    `);
    expectGood(res);
})

test('record3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> { a : Bool, b : Nat } {
  return match {a = true, b = 0} {
    \t{b = c, a = d} => { a = false, b = 0 } 
   }
}
    `);
    expectGood(res);
})

test('record_in_record', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> Nat {
  return { i = 0, inner = { x = true, y = succ(0) }}.inner.y
}

    `);
    expectGood(res);
})

test('record_as_arg', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records;

fn foo(x : { fst : Nat, snd : Bool, thd : Bool }) -> Nat {
  return x.fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = true, thd = true })
}
`);
    expectGood(res);
})

test('record_as_arg2', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return x.fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = true, thd = true })
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('record_as_arg_and_missing_field_in_ass', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> { fst : Nat, snd : Bool } {
  return { fst = 0 }
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_MISSING_RECORD_FIELDS)
})

test('record_as_arg_and_incorrect_field_type_in_ass', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> { fst : Nat, snd : Bool } {
  return { fst = 0, snd = 0}
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('record_as_arg_and_extra_field_in_ass', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> { fst : Nat, snd : Bool } {
  return { fst = 0, bar = true}
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_RECORD_FIELDS)
})

test('record_dot', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return x.fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expectGood(res);
})

test('record_duplicate_in_arg', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records;

fn foo(x : { fst : Nat, fst : Nat, thd : Bool }) -> Nat {
  return x.fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expectTypeError(res, error_type.ERROR_DUPLICATE_RECORD_FIELDS)
})

test('record_duplicate_in_ret', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records;
fn foo(succeed : Bool) -> { a : Nat, b : Nat, b : Nat} {
    return { a = 0, b = 0 } 
}

fn main(succeed : Nat) -> { a : Nat, b : Nat } {
  return foo(true)
}
`);
    expectTypeError(res, error_type.ERROR_DUPLICATE_RECORD_FIELDS)
})

test('record_duplicate_in_const', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records;
fn foo(succeed : Bool) -> { a : Nat, b : Nat} {
    return { a = 0, b = 0, b = 0} 
}

fn main(succeed : Nat) -> { a : Nat, b : Nat } {
  return foo(true)
}
`);
    expectTypeError(res, error_type.ERROR_DUPLICATE_RECORD_FIELDS)
})

test('not_record_dot', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records, #natural-literals;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return 1.fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_NOT_A_RECORD)
})

test('not_record_dot2', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records, #natural-literals, #lists;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return ([]).fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})

test('not_record_dot3', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records, #natural-literals, #lists, #ambiguous-type-as-bottom;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return ([]).fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expectTypeError(res, error_type.ERROR_NOT_A_RECORD)
})

/*
// antlr bug
test('not_record_dot_', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records, #natural-literals, #lists;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return [].fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expectTypeError(res, error_type.ERROR_NOT_A_RECORD)
})
*/


test('record_in_abs', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn foo(n : Nat) -> (fn(Nat) -> { current : Nat, next : Nat }) {
  return fn(i : Nat) {
    return { current = i, next = succ(n) }
  }
}

fn main(n : Nat) -> Nat {
  return foo(0)(succ(0)).next
}
`);
    expectGood(res);
})

test('record_succ', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> Nat {
  return succ({ a = 0, b = false })
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_RECORD)
})

test('record_field_order_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records;
fn foo(succeed : Bool) -> { a : Nat, b : Nat } {
    return { a = 0, b = 0 }
}

fn main(succeed : Nat) -> { b : Nat, a : Nat } {
  return foo(true)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('record_missing_field', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn foo(x : { fst : Nat, snd : Bool, thd : Bool }) -> Nat {
  return x.fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = true }) // thd is missing
}

`);
    expectTypeError(res, error_type.ERROR_MISSING_RECORD_FIELDS)
})

test('record_missing_field2', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn foo(n : Nat) -> (fn(Nat) -> { current : Nat, next : Nat }) {
  return fn(i : Nat) {
    return { next = succ(n) } // 'current' is missing
  }
}

fn main(n : Nat) -> Nat {
  return foo(0)(succ(0)).next
}

`);
    expectTypeError(res, error_type.ERROR_MISSING_RECORD_FIELDS)
})

test('record_missing_field3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records,
            #natural-literals,
            #top-type,
            #bottom-type,
            #structural-subtyping;

fn iterate(n : Nat) -> { current : Nat } {
  return { current = n, next = succ(n) }
}

fn main(n : Nat) -> { current : Nat, next : Nat } {
  return iterate(0)
}
`);
    expectTypeError(res, error_type.ERROR_MISSING_RECORD_FIELDS)
})

test('record_from_if', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records;
fn foo(succeed : Bool) -> { a : Nat, b : Nat } {
    return if false then { b = 0, a = 0 } else { a = 0, b = 0 }
}

fn main(succeed : Nat) -> { a : Nat, b : Nat } {
  return foo(true)
}
`);
    expectGood(res)
})


/*
test('stub', () => {
    const res = parseAndTypecheck("language core; fn main(n : Nat) -> Nat {return f(n)}");
    expect(res).instanceof(TypeErrorsReport)
    const errors = (res as TypeErrorsReport).errors.map(i => [i.type, ...tokenInfo(i.token!)])
    expect(errors).toStrictEqual([["ERROR_UNDEFINED_VARIABLE", "f", 14,]])
})
*/
