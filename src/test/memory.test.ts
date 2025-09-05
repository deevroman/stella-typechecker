import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";


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
