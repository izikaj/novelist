import { noop } from 'underscore';
import assetUrl from '../api/assetUrl';
import isPresent from '../shared/isPresent';
import { loader as bookLoader } from './book';
import { show as getChapter } from '../api/chapters';
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

const IMG_URL = /src="(\/data\/.+?)"/g;
async function replaceImageUrls(chapter) {
  if (!IMG_URL.test(chapter.content)) return;

  const links = new Set();
  chapter.content.replace(IMG_URL, (_, link) => links.add(link));
  const mapping = {};
  await Promise.all(Array.from(links).map((src) => {
    return assetUrl(src).then((dst) => mapping[src] = dst).catch(noop);
  }));

  chapter.content = chapter.content.replace(IMG_URL, (_, link) => `src="${mapping[link] || link}"`);
}

const HTML_TABLE = /\<\s*table.*?\<\/\s*table\s*\>/ig;
async function wrapTables(chapter) {
  if (!HTML_TABLE.test(chapter.content)) return;

  chapter.content = chapter.content.replace(
    HTML_TABLE,
    (table) => `<div class="taable-wrap w-full max-w-full overflow-x-auto">${table}</div>`
  );
}

const later = (t = 100) => new Promise((d) => setTimeout(d, t))

async function $load({ params }) {
  setLoading(0);
  const [book, chapter] = await Promise.all(
    [bookLoader({ params }), getChapter(params.bookId, params.chapterId)]
  );
  if (!isPresent(chapter)) return;

  await replaceImageUrls(chapter).catch(noop);
  await wrapTables(chapter).catch(noop);
  await fillPrevNext(book, chapter).catch((e) => console.warn('fillPrevNext ERROR:', e));

  chapter.book = book;
  setChapter(chapter);

  // await later(3000);
  setLoading(100);

  return chapter;
}

export default $load;
