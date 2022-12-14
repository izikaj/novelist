import { Link } from 'react-router-dom';
import { update } from '../../api/user/chapters';

const commitChapter = (book, chapter) => {
  update(book.id, chapter.id, {
    progress: 100,
    title: chapter.title,
    digest: chapter.digest,
  });
}

const LintToTop = ({ book, chapter, target, ...tail }) => {
  if (!target) return '';

  const params = {
    rel: 'prev',
    to: `/${book.id}/${target.id}`,
    state: { position: 'top' },
    onClick: () => commitChapter(book, chapter),
    children: (
      <>
        <span className="font-thin">Next chapter ▶</span>
        <span className="font-medium mt-2">{target.title}</span>
      </>
    ),
    ...tail
  };

  return <Link {...params} />;
}

function TopNavigation({ book, chapter }) {
  return (
    <section className="my-8">
      <LintToTop
        book={book}
        chapter={chapter}
        target={chapter.next}
        className="btn btn-outline flex flex-col flex-1 max-w-full h-auto py-2 normal-case"
      />
    </section>
  )
}

export default TopNavigation;
