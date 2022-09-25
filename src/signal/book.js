import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const compare = (a, b) => (a && a.id) == (b && b.id);
const entry = new BehaviorSubject(null).pipe(distinctUntilChanged(compare));
export const book$ = state(entry, null);
export const useBook = () => useStateObservable(book$);
export const setBook = (value) => entry.next(value);

export default entry;
