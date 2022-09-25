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
          <h2>{ chapter.title }</h2>

          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        </article>
      </main>
      <Pagination book={book} chapter={chapter} />
    </>
  )
}

export default View
