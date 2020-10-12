// Nothing to see here

export const NothignToSeeHere = 1;

export declare type IterExpr<T> = {
  map: <U>(arg: (v: T) => U) => IterExpr<U>;
  forEach: (arg: (v: T) => void) => void;
  filter: (arg: (v: T) => boolean) => IterExpr<T>;
};
/*
function Iter<T>(col: Iterable<T>): IterExpr<T> {
  return { map: () => {}, forEach: () => {}, filter: () => {} };
}
*/
