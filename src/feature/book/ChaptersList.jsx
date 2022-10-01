import ChapterLink from './ChapterLink';
import isPresent from '../../shared/isPresent';
import { useData } from '../../signal/user/chapters';

const ChaptersList = ({ book }) => {
  const data = useData();
  if (!isPresent(book && book.chapters)) return '';

  return (
    <section className="chapters relative">
      <h3>All Chapters:</h3>
      <ul className="flex flex-col gap-1">
        {
          book.chapters.map(
            (chapter) => <ChapterLink key={chapter.id} book={book} chapter={chapter} saved={data[chapter.id]} />
          )
        }
      </ul>
    </section>
  );
}

export default ChaptersList;
