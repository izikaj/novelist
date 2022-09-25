import ChapterLink from './ChapterLink';
import isPresent from '../../shared/isPresent';

function ChaptersList({ book }) {
  if (!isPresent(book && book.chapters)) return '';

  return (
    <section className="chapters relative">
      <ul className="flex flex-col gap-1">
        {
          book.chapters.map(
            (chapter) => <ChapterLink key={chapter.id} book={book} chapter={chapter} />
          )
        }
      </ul>
    </section>
  );
}

export default ChaptersList
