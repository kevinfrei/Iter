#!/usr/bin/env node

export declare type IterExpr<T> = {
  forEach: (arg: (v: T) => void) => void;
  // filter: (arg: (v: T) => boolean) => IterExpr<T>;
  // map: <U>(arg: (v: T) => U) => IterExpr<U>;
};

export function Iter<T>(
  col: Iterable<T>,
  dontCacheResults?: boolean,
): IterExpr<T> {
  const results: T[] | null = dontCacheResults ? null : [];
  // TODO: Make a helper to hide the cached results
  function helper(): Iterable<T> {
    return results || [...col];
  }
  function forEach(arg: (v: T) => void) {
    // This is NOT the right way to walk over the Iterable if it's been cached
    for (const v of helper()) {
      arg(v);
    }
  }
  return { forEach };
}

function MakeArray(count: number): number[] {
  const data: number[] = Array(count) as number[];
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.round(Math.random() * 100);
  }
  return data;
}

// How do I want to use this stuff?

function ArrayUsage() {
  const data = MakeArray(15000000);
  //  const datas = data.map((e) => [e, e + 1, e + 2, e + 3, e + 4]);
  //  const appends = [].concat(...datas);
  const tmp = data.filter((d) => d % 2 === 0);
  const sum = tmp.reduce((pv, cv) => pv + cv);
  console.log(sum);
}
/*
function IterUsage() {
  const data = MakeHugeIter(15000000);
  const tmp = data.filter((d) => d % 2 === 0);
  const sum = tmp.reduce((pv, cv) => pv + cv);
}
*/

ArrayUsage();
