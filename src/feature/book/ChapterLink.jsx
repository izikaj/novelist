import { Link } from 'react-router-dom';

function ChapterLink({ book, chapter }) {
  return (
    <li
      className="chapter relative flex items-center pl-2 gap-2"
      x-data="chapteritem"
    >
      <div className="chapter-progress bg-neutral absolute top-0 left-0 h-full"></div>
      <button disabled className="opacity-30 relative inline-block h-4 w-4 b-0 flex-none">
      </button>
      <Link
        to={`/${book.id}/${chapter.id}`} className="relative"
        title={'ch' + chapter.id + ': ' + chapter.title}
      >{chapter.title}</Link>
    </li>
  );
}

export default ChapterLink;
