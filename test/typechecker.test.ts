import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../src/typechecker";
import {example} from "../src/examples";
import {tokenInfo} from "../src/utils";
import {error_type} from "../src/typecheckError";


test('smoke', () => {
    expect(parseAndTypecheck(example).ok).toBe(false)
})

test('main not found', () => {
    const res = parseAndTypecheck("language core; fn notmain(n : Nat) -> Nat {return 0}")
    expect(res.ok).toBe(false)
    expect((res as TypeErrorsReport).errors).not.toStrictEqual([])
})

test('syntax error', () => {
    const res = parseAndTypecheck("langu age core; fn notmain(n : Nat) -> Nat {return x}");
    expect(res).toStrictEqual(new SyntaxErrorReport([
        {
            "line": 1,
            "charPositionInLine": 0,
            "message": "mismatched input 'langu' expecting 'language'"
        }
    ]))
})

test('undefined var', () => {
    const res = parseAndTypecheck("language core; fn main(n : Nat) -> Nat {return f(n)}");
    expect(res).instanceof(TypeErrorsReport)
    const errors = (res as TypeErrorsReport).errors.map(i => [i.type, ...tokenInfo(i.token!)])
    expect(errors.slice(0, 1)).toStrictEqual([["ERROR_UNDEFINED_VARIABLE", "f", 14,]])
})

test('simple defined var', () => {
    const res = parseAndTypecheck(`language core; fn main(n : Nat) -> Nat { return n }`);
    expect(res).instanceof(GoodReport)
})

test('multiparam', () => {
    const res = parseAndTypecheck(`
    language core;

extend with #multiparameter-functions;

fn m_f(a : Nat, b : Bool) -> Nat {
    return if (b) then a else 0
}

fn get_m_f(a : Nat, b : Bool, c : Nat) -> (fn(Nat, Bool) -> Nat) {
    return m_f
}

fn main(n : Nat) -> Nat {
    return get_m_f(0, true, 0)(0, false)
}
`);
    expect(res).instanceof(GoodReport);
})

test('nested', () => {
    const res = parseAndTypecheck(`
language core;

extend with #nested-function-declarations;

fn main(n : Nat) -> Nat {
  fn nested(x : Nat) -> Bool {
   \treturn if (Nat::iszero(x)) then Nat::iszero(n) else false
  }

  return if (nested(n)) then 0 else succ(0)
}
`);
    expect(res).instanceof(GoodReport);
})

test('let', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let y = let x = 0 in x in y
}`);
    expect(res).instanceof(GoodReport);
})

test('let2', () => {
    const res = parseAndTypecheck(`
language core;

extend with  #let-patterns, #pattern-ascriptions, #let-bindings;

fn foo(n : Nat) -> Nat {
    return n
}

fn main(n : Nat) -> Bool {
    return let (x as Bool) = true in 0
}`);
    expect(res).instanceof(TypeErrorsReport);
})


test('let_fun', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let zeroFun = (fn (a : Nat) {return a}) in zeroFun(0)
}
`);
    expect(res).instanceof(GoodReport);
})

test('let_nested', () => {
    const res = parseAndTypecheck(`
language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let y = let x = 0 in x in x
}
`);
    expect(res).instanceof(TypeErrorsReport);
})

test('let_if', () => {
    const res = parseAndTypecheck(`
language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let x = if false then 0 else succ(0) in x
}
`);
    expect(res).instanceof(GoodReport);
})

test('let_empty', () => {
    const res = parseAndTypecheck(`
language core;
extend with #let-bindings;
extend with #lists;


fn main(n : Nat) -> Bool {
 return let x = List::isempty([0, 0]) in x
}
`);
    expect(res).instanceof(GoodReport);
})

test('let_rec', () => {
    const res = parseAndTypecheck(`
language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let y = let step = (fn (i : Nat) { return fn (cur : Nat) { return succ(cur) } })
              in Nat::rec(succ(0), 0, step)
         in y

}
`);
    expect(res).instanceof(GoodReport);
})

test('rec_bad', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Nat {
  return Nat::rec(n, succ(0), fn(i : Bool) {
             return fn(r : Nat) {
             return 0
           } })
}

`);
    expect(res).instanceof(TypeErrorsReport);
})

test('let_num_args', () => {
    const res = parseAndTypecheck(`
language core;

extend with #multiparameter-functions;

fn main(n : Nat) -> Nat {
    return ((fn(a : Nat, b : Nat) {
        return 0
    }))(0)
}
`);
    expect(res).instanceof(TypeErrorsReport);
})

test('let_num_args_fix', () => {
    const res = parseAndTypecheck(`language core;

extend with #fixpoint-combinator, #multiparameter-functions;

fn foo(a : Nat, b : Nat) -> Bool {
  return true
}

fn main(n : Nat) -> Nat {
  return (fn (a : Nat) { return fix(foo); } ) (0)
}`);
    expect(res).instanceof(TypeErrorsReport);
})

test('undef', () => {
    const res = parseAndTypecheck(`
    language core;

fn main(n : Nat) -> Nat {
    return a
}
`);
    expect(res).instanceof(TypeErrorsReport);
})

test('not_fun', () => {
    const res = parseAndTypecheck(`
language core;

fn foo(arg : Nat) -> Nat {
    return 0
}

fn main(n : Nat) -> Nat {
  return n(foo(true))
}
`);
    expect(res).instanceof(TypeErrorsReport);
})

test('pair', () => {
    const res = parseAndTypecheck(`
language core;
extend with #pairs;

fn main(n : Nat) -> {Nat, Nat} {
  return {succ(n), {succ(succ(n)), n}}.2
}
`);
    expect(res).instanceof(GoodReport);
})

test('tuple', () => {
    const res = parseAndTypecheck(`
language core;
extend with #tuples;

fn main(n : Nat) -> {Nat, Nat, Bool} {
  return {n, succ(n), true}
}
`);
    expect(res).instanceof(GoodReport);
})

test('call_tuple', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #tuples;

fn main(n : Nat) -> Nat {
  return {0, false}(0)
}
`);
    expect(res).instanceof(TypeErrorsReport);
})


test('int_literal', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals;


fn main(n : Nat) -> Bool {
  return 5;
}
`);
    expect(res).instanceof(TypeErrorsReport);
})

test('succ_true', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Bool {
    return succ(true)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

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
    expect(res).instanceof(GoodReport);
})

test('match2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants;

fn main(n : (fn(Nat) -> Nat)) -> Nat {
  return match n {
    \ta => 0
   }
}
`);
    expect(res).instanceof(GoodReport);
})

test('match_list', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #lists;

fn test(n : [Nat]) -> Nat {
  return match n {
    \t[] => 0
    \t| [a] => a
      | [a, b] => a
      | [a, b, c] => a
      | cons (1, xs) => 1
    \t| cons (2, cons(3, xs)) => 2
    \t| cons (a, cons(b, [1, 2])) => b
    \t| cons (a, cons(b, cons(c, cs))) => c
   }
}

fn main(n : [Nat]) -> Nat {
  return match n {
    \t[] => 0
    \t| cons (x, xs) => 0
   }
}
`);
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(GoodReport);
})

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

test('record', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #records;

fn main(n : Nat) -> Nat {
  return match {a = true, b = 0} {
    \t{b = c, a = d} => c
   }
}
    `);
    expect(res).instanceof(GoodReport);
})

test('record2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #records;


fn main(succeed : Nat) -> { b : Nat, a : Bool } {
  return { a = true, b = 0 }
}
    `);
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(GoodReport);
})

test('record_in_record', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> Nat {
  return { i = 0, inner = { x = true, y = succ(0) }}.inner.y
}

    `);
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(TypeErrorsReport);
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
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_MISSING_RECORD_FIELDS)
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
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('record_as_arg_and_extra_field_in_ass', () => {
    const res = parseAndTypecheck(`
language core;
extend with #records;

fn main(n : Nat) -> { fst : Nat, snd : Bool } {
  return { fst = 0, bar = true}
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_RECORD_FIELDS)
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
    expect(res).instanceof(GoodReport);
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
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_NOT_A_RECORD)
})

test('not_record_dot2', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records, #natural-literals;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return [].fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_NOT_A_RECORD)
})

test('not_record_dot3', () => {
    const res = parseAndTypecheck(`
    language core;
extend with #records, #natural-literals;

fn foo(x : { fst : Nat, snd : Nat, thd : Bool }) -> Nat {
  return ([]).fst
}

fn main(n : Nat) -> Nat {
  return foo({ fst = 0, snd = 0, thd = true })
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_NOT_A_RECORD)
})

test('variant', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants;

fn main(n : <| a : Nat, b : Bool |>) -> Nat {
  return match n {
      <| a = t |> => t
    | <| b = t |> => 0
   }
}
`);
    expect(res).instanceof(GoodReport);
})

test('variant2', () => {
    const res = parseAndTypecheck(`language core;

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
    | <| failure = f |> => 0
  }
}`);
    expect(res).instanceof(GoodReport);
})

test('variant_nullary', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants, #nullary-variant-labels;

fn main(n : Nat) -> <| a : Nat, b, c |> {
  return <| c |>
}

`);
    expect(res).instanceof(GoodReport);
})

test('variant_nullary_pattern', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants, #nullary-variant-labels;

fn foo(a : Nat) -> <| a : Nat, b |> {
  return <| a = 0 |>
}

fn main(n : Nat) -> Nat {
  return match(foo(0)) {
    <| a = x |> => x
    | <| b |> => 0
\t}
}

`);
    expect(res).instanceof(GoodReport);
})

test('variant_nullary_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants, #nullary-variant-labels;

fn main(n : Nat) -> <| a : Nat, b, c |> {
  return <| a |>
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_MISSING_DATA_FOR_LABEL)
})

test('variant_nullary_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants, #nullary-variant-labels;

fn main(n : Nat) -> <| a : Nat, b, c |> {
  return <| b = true |>
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_DATA_FOR_NULLARY_LABEL)
})

test('variant_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants;

fn main(n : <| a : Nat, b : Bool |>) -> Nat {
  return match n {
      <| q = t |> => t
    | <| b = t |> => 0
   }
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
})

test('variant_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #letrec-bindings, #let-patterns, #pattern-ascriptions, #variants;

fn main(n : Nat) -> <| a : Nat, b : Bool |> {
   return (fn ( a : Nat) { return
    if true
      then <| a = 0 |>
      else <| b = true |>
     }) (0)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_AMBIGUOUS_VARIANT_TYPE)
})

test('variant_bad3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants, #unit-type;

fn attempt(get_one? : Bool) -> <| value : Nat, failure : Unit |> {
  return
    if get_one?
      then <| r = 0 |>
      else <| failure = unit |>
}

fn main(succeed : Bool) -> Nat {
  return match attempt(succeed) {
      <| value = n |> => succ(n)
    | <| failure = f |> => 0
  }
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_VARIANT_LABEL)
})

test('variant_bad4', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants, #unit-type;

fn attempt(get_one? : Bool) -> <| value : Nat, failure : Unit |> {
  return
    if get_one?
      then <| value = unit |>
      else <| failure = unit |>
}

fn main(succeed : Bool) -> Nat {
  return match attempt(succeed) {
      <| value = n |> => succ(n)
    | <| failure = f |> => 0
  }
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('variant_bad_if_in_if', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants, #unit-type;

fn attempt(get_one? : Bool) -> <| value : Nat, failure : Unit |> {
  return
    if get_one?
      then if get_one?
        then <| value = 0 |>
        else <| failure2 = unit |>
      else <| failure = unit |>
}

fn main(succeed : Bool) -> Nat {
  return match attempt(succeed) {
      <| value = n |> => succ(n)
    | <| failure = f |> => 0
  }
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_VARIANT_LABEL)
})

test('variant_bad_if_in_if2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #variants, #unit-type;

fn attempt(get_one? : Bool) -> <| value : Nat, failure : Unit |> {
  return
    if get_one?
      then if get_one?
        then <| value = 0 |>
        else <| failure = 0 |>
      else <| failure = unit |>
}

fn main(succeed : Bool) -> Nat {
  return match attempt(succeed) {
      <| value = n |> => succ(n)
    | <| failure = f |> => 0
  }
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

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
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_MISSING_RECORD_FIELDS)
})

test('unit', () => {
    const res = parseAndTypecheck(`
language core;
extend with #unit-type;

fn main(_ : Nat) -> Unit {
    return unit
}
`);
    expect(res).instanceof(GoodReport);
})

test('ascriptions', () => {
    const res = parseAndTypecheck(`
language core;
extend with #type-ascriptions;


fn main(n : Nat) -> Nat {
  return 0 as Nat
}
`);
    expect(res).instanceof(GoodReport);
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
    expect(res).instanceof(GoodReport);
})

test('letrec', () => {
    const res = parseAndTypecheck(`
language core;

extend with  #letrec-bindings, #let-patterns, #pattern-ascriptions;

fn foo(n : Nat) -> Nat {
\treturn n
}

fn main(n : Nat) -> Nat {
    return letrec (x as Nat) = 0 in x
}
`);
    expect(res).instanceof(GoodReport);
})

test('letrec2', () => {
    const res = parseAndTypecheck(`
language core;

extend with  #let-patterns, #pattern-ascriptions, #let-bindings, #letrec-bindings, #lists;

fn foo(n : Nat) -> Nat {
return n
}

fn main(n : Nat) -> Nat {
    return letrec length as (fn ([Nat]) -> Nat) =
      (
        fn(xs : [Nat]) { return
          if List::isempty(xs)
            then 0
          else succ (length (List::tail(xs)))
          }
      ) in let list = cons(0, (cons(0, []))) in length (list)
}
`);
    expect(res).instanceof(GoodReport);
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
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})

test('let_bad', () => {
    const res = parseAndTypecheck(`
    language core;

extend with #lists ;
extend with #let-bindings;

fn main(n : Nat) -> Nat {
  return let x = [] in x
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_AMBIGUOUS_LIST_TYPE)
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
    expect((res as TypeErrorsReport).errors[0].type).toBe(error_type.ERROR_AMBIGUOUS_LIST_TYPE)
})

test('memory', () => {
    const res = parseAndTypecheck(`language core;
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
}`);
    expect(res).instanceof(GoodReport);
})



/*
test('stub', () => {
    const res = parseAndTypecheck("language core; fn main(n : Nat) -> Nat {return f(n)}");
    expect(res).instanceof(TypeErrorsReport)
    const errors = (res as TypeErrorsReport).errors.map(i => [i.type, ...tokenInfo(i.token!)])
    expect(errors).toStrictEqual([["ERROR_UNDEFINED_VARIABLE", "f", 14,]])
})
*/


/*
language core;

extend with #multiparameter-functions, #sum-types, #structural-patterns, #natural-literals, #records, #tuples, #lists;

fn kek(n : {Bool, Nat, {Bool + (Bool + Nat)}}) -> Nat {
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

fn main(n : Nat) -> Nat {
  return match {{0}, true, [0]} {
    	{{0}, x, []} => 0
    | {{0}, x, cons(0, s)} => 0
    | {{0}, x, cons(0, cons(0, ss))} => 0
    | {{0}, x, cons(succ(q), ss)} => 0
    | {{succ(succ(n))}, x, l} => 0
    | {{1}, false, l} => 0
    //| {{x}, true, l} => 0
    //| _ => 0
   }
}
* */


/*
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
* */
