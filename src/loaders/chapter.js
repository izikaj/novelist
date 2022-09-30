import assetUrl from '../api/assetUrl';
import isPresent from '../shared/isPresent';
import { loader as bookLoader } from './book';
import { show as getChapter } from '../api/chapters';
// import { show as getProgress } from '../api/user/chapters';
import { setChapter } from '../signal/chapter';
import { setLoading } from '../signal/loading';

const chIds = (book) => {
  return Object.keys(book.chapters).map(ch => parseInt(ch, 10)).sort(
    (a, b) => a < b ? -1 : (a > b ? 1 : 0)
  );
}

async function fillPrevNext(book, chapter) {
  const ids = chIds(book);
  const pos = ids.indexOf(chapter.id);
  chapter.prev = book.chapters[ids[pos - 1]];
  chapter.next = book.chapters[ids[pos + 1]];
}

const IMG_URL = /src="(\/data\/novels\/.+?)"/g;
async function replaceImageUrls(chapter) {
  if (!IMG_URL.test(chapter.content)) return;

  const links = new Set();
  chapter.content.replace(IMG_URL, (_, link) => links.add(link));
  const mapping = {};
  await Promise.all(Array.from(links).map(src => {
    return assetUrl(src).then((dst) => mapping[src] = dst).catch(() => { });
  }));

  chapter.content = chapter.content.replace(IMG_URL, (_, link) => `src="${mapping[link] || link}"`);
}

const sleep = (t) => new Promise((r) => setTimeout(r, t));

async function $load({ params }) {
  const book = await bookLoader({ params });
  const chapter = await getChapter(book.id, params.chapterId);
  if (!isPresent(chapter)) return;

  await replaceImageUrls(chapter).catch(() => { });
  await fillPrevNext(book, chapter).catch((e) => console.warn('fillPrevNext ERROR:', e));

  chapter.book = book;
  setChapter(chapter);

  return chapter;
}

export default $load;
