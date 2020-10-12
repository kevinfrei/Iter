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
