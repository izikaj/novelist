import { first$ } from '../signal/library';
import { all } from '../api/books';
import { firstValueFrom, timeout } from 'rxjs';
import { setLibrary } from '../signal/library';
import { setBook } from '../signal/book';
import { setChapter } from '../signal/chapter';
import { setLoading } from '../signal/loading';

export function cached(time = 200) {
  return firstValueFrom(first$.pipe(timeout(time)))
}

export async function loader() {
  let lib = await cached().catch(() => undefined);
  if (lib) return lib;

  return await all().then(books => {
    setLibrary(books);
    return books;
  }).catch(_err => []);
}

export default (opts) => {
  setLoading(0);
  setChapter(null);
  setBook(null);
  return loader(opts).then((d) => {
    setLoading(100);
    return d;
  }).catch((e) => {
    setLoading(100);
    throw e;
  });
}
