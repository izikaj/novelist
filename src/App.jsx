import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutRoot from './layout/Root';

import LibraryView from './feature/library';
import BookView from './feature/book';
import ChapterView from './feature/chapter';
import NotFound from './shared/NotFound';

import libraryLoader from './loaders/library';
import bookLoader from './loaders/book';
import chapterLoader from './loaders/chapter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoot />,
    errorElement: <NotFound type="root" />,
    children: [
      {
        index: true,
        // loader: libraryLoader,
        element: <LibraryView />,
      },
      {
        path: '/:bookId',
        // loader: bookLoader,
        element: <BookView />,
        errorElement: <NotFound type="book" />,
      },
      {
        path: '/:bookId/:chapterId',
        // loader: chapterLoader,
        element: <ChapterView />,
        errorElement: <NotFound type="chapter" />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
