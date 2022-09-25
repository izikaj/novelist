import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../signal/user';
import { book$ } from '../signal/book';
import { chapter$ } from '../signal/chapter';
import { user$ } from '../signal/user';
import { combineLatest } from 'rxjs';
import watchBook from './watch/book';
import watchChapter from './watch/chapter';

const BG_NS = ' -- BACKGROUND -- ';

function $start() {
  console.warn('BUILD BACKGROUND');
  onAuthStateChanged(auth, setUser);

  combineLatest({ user$, book$ }).subscribe(({ book$: book, user$: user }) => {
    // console.warn('<<<< BOOK', 'book:', book, 'user:', user);
    watchBook(user && book && book.id);
  });

  combineLatest({ user$, chapter$ }).subscribe(({ chapter$: chapter, user$: user }) => {
    // console.warn('<<<< CHAPTER', 'chapter:', chapter, 'user:', user);
    if (!(user && chapter)) return watchChapter();
    watchChapter(chapter.book.id, chapter.id);
  });

  return this;
}

window[BG_NS] || (window[BG_NS] = $start());