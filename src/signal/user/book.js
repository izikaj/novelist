import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const entry = new BehaviorSubject(null).pipe(distinctUntilChanged());
export const book$ = state(entry, null);
export const useBook = () => useStateObservable(book$);
export const setBook = (value) => entry.next(value);

export default entry;
