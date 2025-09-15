import {expect, test} from 'vitest'
import {parseAndTypecheck, TypeErrorsReport} from "../typechecker";
import {error_type} from "../typecheckError";
import {expectGood, expectTypeError} from "./utils-for-tests";

test('auto', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

fn increment_twice(n : auto) -> auto {
  return succ(succ(n))
}

fn main(n : auto) -> auto {
  return increment_twice(n)
}
`);
    expectGood(res);
})

test('auto_inl', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #sum-types;

fn main(n : Nat) -> Nat + Nat {
  return (fn (a : Nat) { return inl(0) }) (0)
}
`);
    expectGood(res);
})

test('auto_inl', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #sum-types;

fn main(n : Nat) -> Nat + Nat {
  return (fn (a : Nat) { return inr(0) }) (0)
}
`);
    expectGood(res);
})

test('auto_if_inl_inr', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #sum-types, #unit-type;

fn main(input : auto) -> auto {
  return if input then inl(succ(0)) else inr(unit)
}
`);
    expectGood(res);
})

test('auto_if_inl_inr_match', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #sum-types, #unit-type;

fn test(first : auto) -> auto {
  return if first then inl(succ(0)) else inr(unit)
}

fn main(input : auto) -> auto {
  return match test(input) {
      inl(n) => n
    | inr(_) => 0
  }
}
`);
    expectGood(res);
})

test('auto_args', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

fn Bool::not(b : auto) -> auto {
    return
        if b then false else true
}

fn twice(f : fn(auto) -> auto) -> auto {
    return fn(x : auto) {
        return f(f(x))
    }
}

fn main(b : auto) -> auto {
    return twice(Bool::not)(b)
}
`);
    expectGood(res);
})

test('auto_rec', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

// addition of natural numbers
fn Nat::add(n : auto) -> auto {
  return fn(m : auto) {
    return Nat::rec(n, m, fn(i : auto) {
      return fn(r : auto) {
        return succ( r ); // r := r + 1
      };
    });
  };
}

// square, computed as a sum of odd numbers
fn square(n : auto) -> auto {
  return Nat::rec(n, 0, fn(i : auto) {
      return fn(r : auto) {
        // r := r + (2*i + 1)
        return Nat::add(i)( Nat::add(i)( succ( r )));
      };
  });
}

fn main(n : auto) -> auto {
  return square(n);
}
`);
    expectGood(res);
})

test('auto_fix', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

// addition of natural numbers
fn Nat::add(n : auto) -> auto {
  return fn(m : auto) {
    return Nat::rec(n, m, fn(i : auto) {
      return fn(r : auto) {
        return succ( r ); // r := r + 1
      };
    });
  };
}

// square, computed as a sum of odd numbers
fn square(n : auto) -> auto {
  return Nat::rec(n, 0, fn(i : auto) {
      return fn(r : auto) {
        // r := r + (2*i + 1)
        return Nat::add(i)( Nat::add(i)( succ( r )));
      };
  });
}

fn main(n : auto) -> auto {
  return square(n);
}
`);
    expectGood(res);
})
