import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../signal/user';
import watchBook from './watch/book';
import watchChapter from './watch/chapter';
import watchScroll from './watch/scroll';
import watchProgress from './watch/progress';
import watchSettings from './watch/settings';
import watchLastChapter from './watch/lastChapter';

const BG_NS = ' -- BACKGROUND -- ';

function $start() {
  // console.warn('BUILD BACKGROUND');
  onAuthStateChanged(auth, setUser);

  watchBook();
  watchChapter();
  watchScroll();
  watchProgress();
  watchSettings();
  watchLastChapter();

  return this;
}

window[BG_NS] || (window[BG_NS] = $start());
