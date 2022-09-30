import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const entry = new BehaviorSubject(undefined).pipe(distinctUntilChanged());
export const loading$ = state(entry, undefined);
export const useLoading = () => useStateObservable(loading$);
export const setLoading = (value) => entry.next(value);

let ticker, last;

function $tick() {
  console.log('tick!');
  const next = last + (100 - last) * 0.1;
  entry.next(next);
}

entry.subscribe(value => {
  last = value;
  if (value === 0) {
    if (ticker) clearInterval(ticker);
    ticker = setInterval($tick, 200);
  }
  if (value === 100) {
    if (ticker) clearInterval(ticker);
    ticker = undefined;
    setTimeout(() => entry.next(undefined), 1000);
  }
});


export default entry;
