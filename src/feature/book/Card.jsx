import Image from '../../shared/Image';
import Date from '../../shared/Date';

function Card({book}) {
  return (
    <>
      <div className="flex mt-4 mb-4 gap-2 md:gap-6">
        <figure className="flex-none">
          <Image
            src={book.cover} width={150} height={220} alt={book.title}
            className="object-cover object-center w-[100px] md:w-[150px] h-[160px] md:h-[220px]"
          />
        </figure>
        <div
          className="md:pt-4 md:pb-4 flex flex-col gap-2"
          x-data="NovelForm" x-modelable="data" x-model="$store.novel"
        >
          <h2 className="card-title md:mb-4">{book.title}</h2>

          <div className="flex">
            <label className="flex-none w-[100px]">Chapters:</label>
            <p>{book.chaptersCount}</p>
          </div>
          <div className="flex">
            <label className="flex-none w-[100px]">Update:</label>
            <p><Date value={book.timestamp} /></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;
