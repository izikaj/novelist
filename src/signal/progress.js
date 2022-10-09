import {
  BehaviorSubject, distinctUntilChanged, combineLatest, auditTime
} from 'rxjs';

export const scroll$ = new BehaviorSubject(0).pipe(distinctUntilChanged());
export const read$ = new BehaviorSubject(0).pipe(distinctUntilChanged());
const combined = combineLatest({ scroll: scroll$, read: read$ });

const RESET_COOLDOWN = 100;
let $resetCd = false;

combined.subscribe(({ scroll: sy, read: ry }) => {
  if (!$resetCd && sy > ry) read$.next(sy);
});

export const progress$ = combined.pipe(auditTime(100));
export const reset = () => {
  $resetCd = true;
  setTimeout(() => $resetCd = false, RESET_COOLDOWN);
  scroll$.next(0);
  read$.next(0);
};
