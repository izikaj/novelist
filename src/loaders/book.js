import { show } from '../api/books';
import { cached as cachedLibrary } from './library';
import { setBook } from '../signal/book';
import { setChapter } from '../signal/chapter';
import { setLoading } from '../signal/loading';

function fetchSingle(id) {
  return show(id).catch(() => { throw 'server error' });
}

async function fetchCached(id) {
  const list = await cachedLibrary();
  for (let index = 0; index < list.length; index++) {
    if (list[index].id === id) return list[index];
  }

  throw 'not found';
}

export async function loader({ params }) {
  let book = await fetchCached(params.bookId).catch(() => { });
  book = book || await fetchSingle(params.bookId);
  setBook(book);
  return book;
}

export default (opts) => {
  setLoading(0);
  setChapter(null);
  return loader(opts).then((d) => {
    setLoading(100);
    return d;
  }).catch((e) => {
    setLoading(100);
    throw e;
  });
}
