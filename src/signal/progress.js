import {
  BehaviorSubject, distinctUntilChanged, combineLatest, auditTime
} from 'rxjs';
// import { state, useStateObservable } from '@react-rxjs/core';

export const scroll$ = new BehaviorSubject(0).pipe(distinctUntilChanged());
export const read$ = new BehaviorSubject(0).pipe(distinctUntilChanged());
const combined = combineLatest({ scroll: scroll$, read: read$ });

combined.subscribe(({ scroll: sy, read: ry }) => {
  if (sy > ry) read$.next(sy);
});

export const progress$ = combined.pipe(auditTime(100));
export const reset = () => {
  scroll$.next(0);
  read$.next(0);
};
