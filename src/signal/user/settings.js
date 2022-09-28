import { BehaviorSubject, map, auditTime, distinctUntilChanged } from 'rxjs';
import { state, useStateObservable } from '@react-rxjs/core';
import withLayUp from '../../shared/withLayUp';

const entry = (new BehaviorSubject({})).pipe(withLayUp()).pipe(auditTime(100));
export const data$ = state(entry, {});
export const useData = () => useStateObservable(data$);
export const setData = (value) => entry.next(value);

const $$cache = {};

const buildFiltered = (key, initial) => {
  const filtered = state(
    entry.pipe(map(v => v && v[key])).pipe(distinctUntilChanged()),
    initial
  )
  // create infinite subscription to keep value
  filtered.subscribe();
  return filtered;
}

export const filteredBy = (key, initial) => {
  return $$cache[key] || ($$cache[key] = buildFiltered(key, initial));
}

export const useKeyData = (key, initial) => {
  return useStateObservable(filteredBy(key, initial));
}

export default entry;
