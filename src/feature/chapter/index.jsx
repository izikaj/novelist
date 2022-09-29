import { useLoaderData } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Pagination from './Pagination';
import Content from './Content';
import Progress from './Progress';
import Date from '../../shared/Date';

function View() {
  const chapter = useLoaderData();
  const book = (chapter && chapter.book) || {};

  return (
    <>
      <Progress />
      <main className="chapter md:container md:mx-auto px-1 md:px-0">
        <Breadcrumbs book={book} chapter={chapter} />
        <Content chapter={chapter} />
      </main>
      <Pagination book={book} chapter={chapter} />
      <p className="mt-6 text-center text-base-content">
        <i>Last update: <Date value={chapter.timestamp} /></i>
      </p>
    </>
  )
}

export default View
