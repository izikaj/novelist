import { BehaviorSubject, distinctUntilChanged, find } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';
import isPresent from '../shared/isPresent';

const entry = new BehaviorSubject([]).pipe(distinctUntilChanged());
export const library$ = state(entry, []);
export const useLibrary = () => useStateObservable(library$);
export const setLibrary = (value) => entry.next(value);

export const first$ = library$.pipe(find(lib => isPresent(lib)));

export default entry;
