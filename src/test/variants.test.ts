import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";

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
    expectTypeError(res, error_type.ERROR_MISSING_DATA_FOR_LABEL)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_DATA_FOR_NULLARY_LABEL)
})

test('variant_nullary_bad3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #structural-patterns, #natural-literals, #variants, #nullary-variant-labels;

fn main(n : Nat) -> <| a : Nat, b, c |> {
  return <| e |>
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_VARIANT_LABEL)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_PATTERN_FOR_TYPE)
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
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_VARIANT_TYPE)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_VARIANT_LABEL)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_VARIANT_LABEL)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})
