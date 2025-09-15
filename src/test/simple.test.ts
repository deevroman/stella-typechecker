import {expect, test} from 'vitest'
import {parseAndTypecheck, SyntaxErrorReport, TypeErrorsReport} from "../typechecker";
import {example} from "../examples";
import {tokenInfo} from "../utils";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";


test('smoke', () => {
    expect(parseAndTypecheck(example).ok).toBe(false)
})

test('smoke_check_error_type', () => {
    expectTypeError(parseAndTypecheck(example), error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
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
    expectGood(res)
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
    expectGood(res);
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
    expectGood(res);
})

test('nested_bad', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> (fn(Bool) -> Nat) {
    return fn(i : Nat) { return i }
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('undef', () => {
    const res = parseAndTypecheck(`
    language core;

fn main(n : Nat) -> Nat {
    return a
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNDEFINED_VARIABLE)
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
    expectTypeError(res, error_type.ERROR_NOT_A_FUNCTION)
})

test('return_type', () => {
    const res = parseAndTypecheck(`
language core;

fn foo(arg : Nat) -> Bool {
    return false
}

fn main(n : Nat) -> Nat {
  return foo(0)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('not_fun2', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Nat {
  return (0) (0)
}
`);
    expectTypeError(res, error_type.ERROR_NOT_A_FUNCTION)
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
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('succ_true', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Bool {
    return succ(true)
}
`);
    expect(res).instanceof(TypeErrorsReport);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('if_cond_type', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Nat {
    return if 0 then 0 else 0
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('if_cond_type_bad', () => {
    const res = parseAndTypecheck(`
language core;

fn foo(b : Nat) -> Nat {
    return 0
}

fn main(n : Nat) -> Nat {
    return if foo then 0 else 0
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('if_cond_type_bad2', () => {
    const res = parseAndTypecheck(`
language core;

fn foo(b : Nat) -> Bool {
    return true
}

fn main(n : Nat) -> Nat {
    return if foo then 0 else 0
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('unit_arg', () => {
    const res = parseAndTypecheck(`
language core;
extend with #unit-type;

fn seq(_ : Unit) -> fn(Unit) -> Unit {
  return fn(x : Unit) { return x }
}

fn main(x : Nat) -> Unit {
  return seq(unit)(seq(unit))
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('seq', () => {
    const res = parseAndTypecheck(`
language core;
extend with #sequencing, #unit-type;

fn main(n : Nat) -> Nat {
  return (fn(a : Bool) { return unit }) (false); 0
}
`);
    expectGood(res)
})

test('fix', () => {
    const res = parseAndTypecheck(`
language core;

extend with #fixpoint-combinator;

fn main(n : Nat) -> Nat {
  return fix(fn(y : Nat) { return n });
}

`);
    expectGood(res)
})

test('nat_rec', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Nat {
  return Nat::rec(n, succ(0), fn(i : Nat) {
             return fn(r : Nat) {
             return true
           } })
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('rec_fix', () => {
    const res = parseAndTypecheck(`
language core;
extend with #panic, #pairs, #fixpoint-combinator;
// декремент
fn dec(n : Nat) -> Nat {
  return Nat::rec(n, {0, 0},
    fn(k : Nat) {
      return fn(p : {Nat, Nat}) {
return { succ(p.1), p.1 }
} }).2
}

// вычитание
fn sub(n : Nat) -> fn(Nat) -> Nat {
  return fn(m : Nat) {
    return Nat::rec(m, n, fn(k : Nat) { return dec })
  }
}

// деление (с явным параметром для рекурсивного вызова)
fn mkdiv(div : fn(Nat) -> fn(Nat) -> Nat) -> fn(Nat) -> fn(Nat) -> Nat {
  return fn(n : Nat) {
    return fn(m : Nat) {
      return if Nat::iszero(n) then 0 else
        succ(div(sub(n)(m))(m))
    }
} }

// деление
fn div(n : Nat) -> fn(Nat) -> Nat {
  return fn(m : Nat) {
    return
      if Nat::iszero(m)
        then panic! // ОШИБКА: деление на НОЛЬ!
        else fix(mkdiv)(n)(m)
} }

fn main(n : Nat) -> Nat {
  return div(n)(n)
}

`);
    expectGood(res)
})


test('infer_match', () => {
    const res = parseAndTypecheck(`
language core;

fn main(n : Nat) -> Nat {
  return (fn (a : Nat) { return match(0) {
    x => x
    | y => true
    }
  }) (0)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('name_shadow', () => {
    const res = parseAndTypecheck(`
language core;

extend with #nested-function-declarations;

fn main(n : Bool) -> Nat {
  fn nested(n : Nat) -> Bool {
     return if (n) then n else false
  }

  return if (nested(0)) then 0 else succ(0)
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('example_from_stella', () => {
    const res = parseAndTypecheck(`
language core;

extend with
  #unit-type,
  #references,
  #arithmetic-operators,
  #sequencing,
  #natural-literals;

fn helper(ref : &Nat) -> fn(Nat) -> Nat {
  return
    fn (n : Nat) {
      return
        Nat::rec(n, unit, fn(i : Nat){
          return fn(r : Unit) {
            return
              Nat::rec(*ref, unit, fn(j : Nat) {
                return fn(r2 : Unit) {
                  return ref := succ(*ref)
                }
              })
          }
        });
        (*ref)
    }
}

fn exp2(n : Nat) -> Nat {
  return helper(new(1))(n)
}

fn main(n : Nat) -> Nat {
  return exp2(n)
}
`);
    expectGood(res)
})
