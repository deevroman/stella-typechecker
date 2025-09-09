import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";

/*

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
}`);
    expectGood(res);
})
*/

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
