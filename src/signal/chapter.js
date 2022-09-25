import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';

const entry = new BehaviorSubject(null).pipe(distinctUntilChanged());
export const chapter$ = state(entry, null);
export const useChapter = () => useStateObservable(chapter$);
export const setChapter = (value) => entry.next(value);

export default entry;
