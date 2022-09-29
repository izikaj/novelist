import { Link } from 'react-router-dom';
import Image from '../../shared/Image';
import Date from '../../shared/Date';

function Card({ book }) {
  const linking = {
    to: `/${book.id}`,
    state: { position: 'top' }
  }
  return (
    <div key={book.id} className="md:w-1/2 md:p-2">
      <div className="card card-side bg-base-300 shadow-xl bg-neutral">
        <figure className="flex-none">
          <Link {...linking} className="novel-card-cover">
            <Image
              src={book.cover} width={100} height={160} alt={book.title}
              className="object-cover object-center w-[100px] h-[160px]"
            />
          </Link>
        </figure>
        <div className="card-body py-4 px-3 md:px-5">
          <h2 className="card-title line-clamp-2">
            <Link {...linking} className="link">
              {book.title}
            </Link>
          </h2>
          <p>
            Chapters: {book.chaptersCount}<br />
            Update: <Date value={book.timestamp} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
