import {expect, test} from 'vitest'
import {SyntaxErrorReport, parseAndTypecheck, TypeErrorsReport, GoodReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectTypeError} from "./utils-for-tests";

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
