export declare type IterExpr<T> = {
  forEach: (fn: (v: T) => void) => void;
  reduce: <U>(
    fn: (prevVal: U, curVal: T, index?: number) => U,
    initVal: U,
  ) => U;

  every: (fn: (v: T, idx: number) => unknown) => boolean;
  all: (fn: (v: T, idx: number) => unknown) => boolean;
  some: (fn: (v: T, idx: number) => unknown) => boolean;

  filter: (fn: (v: T, idx: number) => boolean) => IterExpr<T>;
  where: (fn: (v: T, idx: number) => boolean) => IterExpr<T>;

  map: <U>(fn: (v: T, idx: number) => U) => IterExpr<U>;
  select: <U>(fn: (v: T, idx: number) => U) => IterExpr<U>;

  toArray: () => T[];
  toIterable: () => Iterable<T>;
  entries: () => Iterable<[number, T]>;
  values: () => Iterable<T>;
};

export function Iter<T>(col: Iterable<T>): IterExpr<T> {
  // TODO: Make a helper to allow cached results
  function forEach(arg: (v: T) => void) {
    for (const v of col) {
      arg(v);
    }
  }
  function* runFilter(fn: (v: T, index: number) => boolean) {
    let idx = 0;
    for (const i of col) {
      if (fn(i, idx++)) {
        yield i;
      }
    }
  }
  function filter(fn: (v: T, index: number) => boolean) {
    return Iter(runFilter(fn));
  }
  function* runMap<U>(fn: (v: T, index: number) => U) {
    let idx = 0;
    for (const i of col) {
      yield fn(i, idx++);
    }
  }
  function map<U>(fn: (v: T, index: number) => U) {
    return Iter(runMap(fn));
  }
  function reduce<U>(fn: (pv: U, cv: T, index: number) => U, initVal: U) {
    let val = initVal;
    let i = 0;
    for (const cur of col) {
      val = fn(val, cur, i++);
    }
    return val;
  }
  function toArray() {
    const res = [];
    for (const cur of col) {
      res.push(cur);
    }
    return res;
  }
  function toIterable() {
    return col;
  }
  function* entries(): Generator<[number, T]> {
    let i = 0;
    for (const v of col) {
      yield [i, v];
      i++;
    }
  }
  function every(fn: (v: T, index: number) => unknown) {
    let idx = 0;
    for (const val of col) {
      if (!fn(val, idx++)) {
        return false;
      }
    }
    return true;
  }
  function some(fn: (v: T, index: number) => unknown) {
    let idx = 0;
    for (const val of col) {
      if (fn(val, idx++)) {
        return true;
      }
    }
    return false;
  }

  return {
    forEach,
    filter,
    where: filter,
    map,
    select: map,
    reduce,
    every,
    all: every,
    some,
    toArray,
    toIterable,
    entries,
    values: toIterable,
  };
}

/*
function MakeArray(count: number): number[] {
  const data: number[] = Array(count) as number[];
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.round(Math.random() * 100);
  }
  return data;
}

// How do I want to use this stuff?

function ArrayUsage(count: number) {
  const data = MakeArray(count)
    .filter((d) => d % 2 === 0)
    .reduce((pv, cv) => pv + cv, 0);
  console.log(data);
}

function* MakeIter(count: number) {
  for (let i = 0; i < count; i++) {
    yield Math.round(Math.random() * 100);
  }
  return count;
}

function MakeHugeIter(count: number) {
  return Iter(MakeIter(count));
}

function IterUsage(count: number) {
  const data = MakeHugeIter(count)
    .filter((d) => d % 2 === 0)
    .reduce((pv, cv) => pv + cv, 0);
  console.log(data);
}
ArrayUsage(100);
for (let i = 1; i < 14; i++) {
  const before = Date.now();
  ArrayUsage(1 << (i * 2));
  const elapsed = Date.now() - before;
  console.log(`Array ${i}: ${elapsed}`);
}
IterUsage(100);
for (let i = 1; i < 14; i++) {
  const before = Date.now();
  IterUsage(1 << (i * 2));
  const elapsed = Date.now() - before;
  console.log(`Array ${i}: ${elapsed}`);
}

*/
