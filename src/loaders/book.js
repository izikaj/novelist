import { show } from '../api/books';
import { cached as cachedLibrary } from './library';
import { setBook } from '../signal/book';
import { setChapter } from '../signal/chapter';

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
  setChapter(null);
  return loader(opts);
}
