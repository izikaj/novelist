import { useLoaderData } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Pagination from './Pagination';

function View() {
  const chapter = useLoaderData();
  const book = (chapter && chapter.book) || {};

  return (
    <>
      <main className="chapter md:container md:mx-auto px-1 md:px-0">
        <Breadcrumbs book={book} chapter={chapter} />
        <article className="prose mt-4 px-1">
          <h2>{chapter.title}</h2>

          <div
            className="max-w-[98vw]"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </article>
      </main>
      <Pagination book={book} chapter={chapter} />
      <p className="mt-6 text-center text-base-content">
        <i>Last update: {chapter.timestamp}</i>
      </p>
    </>
  )
}

export default View
