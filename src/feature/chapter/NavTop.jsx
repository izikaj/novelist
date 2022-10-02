import { Link } from 'react-router-dom';

const LintToBottom = ({ book, chapter, ...tail }) => {
  if (!chapter) return '';

  const params = {
    rel: 'prev',
    to: `/${book.id}/${chapter.id}`,
    state: { position: 'bottom' },
    children: (
      <>
        <span className="font-thin">◀ Previous chapter</span>
        <span className="font-medium mt-2">{chapter.title}</span>
      </>
    ),
    ...tail
  };

  return <Link {...params} />;
}

function TopNavigation({ book, chapter }) {
  return (
    <section className="my-8">
      <LintToBottom
        book={book}
        chapter={chapter.prev}
        className="btn btn-outline flex flex-col flex-1 max-w-full h-auto py-2 normal-case"
      />
    </section>
  )
}

export default TopNavigation;
