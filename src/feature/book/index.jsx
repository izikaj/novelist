import { useLoaderData } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Card from './Card';
import ChaptersList from './ChaptersList';

function View() {
  const book = useLoaderData();
  return (
    <>
      <main className="md:container md:mx-auto mb-5 px-1 md:px-0">
        <Breadcrumbs book={book} />
        <Card book={book} />
        <ChaptersList book={book} />
      </main>
    </>
  )
}

export default View;
