import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('generic', () => {
    const res = parseAndTypecheck(`
language core;

extend with #universal-types;

generic fn const[X, Y](x : X) -> fn(Y) -> X {
  return fn(y : Y) {
    return x
  }
}

fn main(x : Nat) -> Nat {
  return const[Nat, Bool](x)(false)
}
`);
    expectGood(res);
})

test('generic_for_all', () => {
    const res = parseAndTypecheck(`
language core;

extend with #universal-types;

generic fn const[X](x : X) -> forall Y. fn(Y) -> X {
  return generic [Y] fn(y : Y) { return x }
}

fn main(x : Nat) -> Nat {
  return const[Nat](x)[Bool](false)
}
`);
    expectGood(res);
})

test('generic_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #universal-types;

generic fn const[X](x : X) -> fn(Y) -> X {
  return fn(y : Y) {
    return x
  }
}

fn main(x : Nat) -> Nat {
  return const[Nat, Bool](x)(false)
}
`);
    expectTypeError(res, error_type.ERROR_UNDEFINED_TYPE_VARIABLE)
})

test('generic_to_not_generic', () => {
    const res = parseAndTypecheck(`
language core;

extend with #universal-types;

generic fn const[X](x : X) -> fn(X) -> X {
  return generic [Y] fn(y : Y) { return x }
}

fn main(x : Nat) -> Nat {
  return const[Nat](x)[Bool](false)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('generic_succ_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #universal-types;

generic fn const[X, Y](x : X) -> fn(Y) -> X {
  return fn(y : Y) {
    return succ(x)
  }
}

fn main(x : Nat) -> Nat {
  return const[Nat, Bool](x)(false)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('generic_bad_x_to_y', () => {
    const res = parseAndTypecheck(`
language core;

extend with #universal-types;

generic fn identity[T](x : T) -> T {
  return x
}

generic fn const[X, Y](x : X) -> fn(Y) -> X {
  return identity[fn(Y) -> Y](
    fn(y : Y) {
      return x
    }
  )
}

fn main(x : Nat) -> Nat {
  return const[Nat, Bool](x)(false)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})


/*
test('auto_fix', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #fixpoint-combinator;

fn main(f : fn(auto) -> auto) -> auto {
  return fix(f);
}

`);
    expectGood(res);
})
*/
