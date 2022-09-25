import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const initial = {
  read: 0,
  scroll: 0,
};

const entry = new BehaviorSubject(initial).pipe(distinctUntilChanged());
export const progress$ = state(entry, initial);
export const useProgress = () => useStateObservable(progress$);
export const setProgress = (value) => entry.next(value);

export default entry;
