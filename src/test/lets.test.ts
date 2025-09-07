import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";


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

test('let_if_bad', () => {
    const res = parseAndTypecheck(`
language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let x = if false then true else succ(0) in x
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('let_if_bad2', () => {
    const res = parseAndTypecheck(`
language core;
extend with #let-bindings;


fn main(n : Nat) -> Nat {
  return let x = if false then 0 else false in x
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
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
    expectTypeError(res, error_type.ERROR_INCORRECT_NUMBER_OF_ARGUMENTS)
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
    expectTypeError(res, error_type.ERROR_AMBIGUOUS_LIST_TYPE)
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

test('cast', () => {
    const res = parseAndTypecheck(`
language core;

extend with #natural-literals, #type-cast, #pairs, #top-type, #structural-subtyping;

fn main(n : Nat) -> Nat {
  return (1 cast as {Nat, Nat}).1
}
`);
    expect(res).instanceof(GoodReport);
})
