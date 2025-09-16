import {test} from 'vitest'
import {parseAndTypecheck} from "../typechecker";
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

test('auto_fix', () => {
    const res = parseAndTypecheck(`
language core;
extend with #type-reconstruction;

fn main(f : auto) -> auto {
    return f(f)
}

// main = X1 -> X2
// X1 = X3 -> X2
// X3 = X1

`);
    expectTypeError(res, error_type.ERROR_OCCURS_CHECK_INFINITE_TYPE);
})

test('auto_let', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #let-bindings;


fn main(n : auto) -> auto {
  return let zeroFun = (fn (a : auto) {return a}) in zeroFun(0)
}
`);
    expectGood(res)
})

test('auto_nat_rec', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

fn Nat::add(n : auto) -> auto {
  return fn(m : auto) {
    return Nat::rec(n, m, fn(i : auto) {
      return succ( i );
    });
  };
}

// fn Nat::add(n : Nat) -> (fn(Nat) -> Nat) {
//   return fn(m : Nat) {
//     return Nat::rec(n, m, fn(i : Nat) {
//       return fn(r : Nat) { return succ(r) } })
//   }
// }

fn main(n : auto) -> auto {
  return Nat::add(n)
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('auto_nat_rec2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

// addition of natural numbers
fn Nat::add(n : Nat) -> auto {
  return fn(m : Nat) {
    return Nat::rec(n, m, fn(i : Nat) {
      return fn(r : Nat) {
        return succ( r ); // r := r + 1
      };
    });
  };
}

// square, computed as a sum of odd numbers
fn square(nn : Nat) -> Nat {
  return Nat::rec(nn, 0, fn(ii : Nat) {
      return fn(rr : Nat) {
        // r := r + (2*i + 1)
        return Nat::add(ii)( Nat::add(ii)( succ( rr )));
      };
  });
}

fn main(n : auto) -> auto {
  return 0;
}
`);
    expectGood(res);
})

test('auto_nat_rec3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction;

fn Nat::add(n : auto) -> auto {
  return fn(m : auto) {
    return Nat::rec(n, m, fn(i : auto) {
      return succ( i );
    });
  };
}

// fn Nat::add(n : Nat) -> (fn(Nat) -> Nat) {
//   return fn(m : Nat) {
//     return Nat::rec(n, m, fn(i : Nat) {
//       return fn(r : Nat) { return succ(r) } })
//   }
// }

fn main(n : auto) -> auto {
  return Nat::add(n)
}

`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('auto_list', () => {
    const res = parseAndTypecheck(`
language core;
extend with #type-reconstruction, #lists;

fn main(arg : auto) -> auto {
  return [arg, 0]
}`);
    expectGood(res)
})

test('auto_list2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn main(arg : Nat) -> [[auto]] {
  return (fn(x : auto) {
    return [[0], [0]];
  })(0);
}
`);
    expectGood(res)
})

test('auto_list3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : Nat) -> [[auto]] {
  return (fn(x : auto) {
    return [[0], [0]];
  })(0);
}

fn main(arg : Nat) -> [[auto]] {
  return foo(0);
}
`);
    expectGood(res)
})

test('auto_list4', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : Nat) -> [[auto]] {
  return (fn(x : auto) {
    return [[], []];
  })(0);
}

fn main(arg : Nat) -> [[Bool]] {
  return foo(0);
}
`);
    expectGood(res)
})

test('auto_list5', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : Nat) -> [[auto]] {
  return [];
}

fn main(arg : Nat) -> [[Bool]] {
  return foo(0);
}
`);
    expectGood(res)
})

test('auto_list6', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : auto) -> [[auto]] {
  return arg;
}

fn main(arg : auto) -> [[Bool]] {
  return foo(arg);
}
`);
    expectGood(res)
})

test('auto_list7', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : auto) -> [[auto]] {
  return bar(arg);
}

fn bar(arg : auto) -> [[auto]] {
  return arg;
}

fn main(arg : auto) -> [[Bool]] {
  return foo(arg);
}
`);
    expectGood(res)
})

test('auto_list8', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : auto) -> [[auto]] {
  return bar(arg);
}

fn bar(arg : auto) -> [[auto]] {
  return arg;
}

fn main(arg : auto) -> [[Bool]] {
  return foo(bar(arg));
}
`);
    expectGood(res)
})

test('auto_list9', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : auto) -> [[auto]] {
  return bar(arg);
}

fn bar(arg : auto) -> [[auto]] {
  return arg;
}

fn main(arg : auto) -> [[auto]] {
  return foo(bar(arg));
}
`);
    expectGood(res)
})

test('auto_list_bad', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn main(arg : Nat) -> [[Bool]] {
  return (fn(x : auto) {
    return [[0], [0]];
  })(0);
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('auto_list_bad2', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : Nat) -> [[auto]] {
  return (fn(x : auto) {
    return [[0], [0]];
  })(0);
}

fn main(arg : Nat) -> [[Bool]] {
  return foo(0);
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})

test('auto_list_bad3', () => {
    const res = parseAndTypecheck(`
language core;

extend with #type-reconstruction, #lists;

fn foo(arg : auto) -> [[auto]] {
  return arg;
}

fn main(arg : Nat) -> [[Bool]] {
  return foo(0);
}
`);
    expectTypeError(res, error_type.ERROR_UNEXPECTED_TYPE_FOR_EXPRESSION)
})
