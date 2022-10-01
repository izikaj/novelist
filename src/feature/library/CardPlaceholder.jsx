function CardPlaceholder({ book }) {
  return (
    <div className="md:w-1/2 md:p-2">
      <div className="card card-side bg-base-300 shadow-xl bg-neutral">
        <figure className="flex-none">
          <div className="novel-card-cover">
            <div
              width={100} height={160}
              className="object-cover object-center w-[100px] h-[160px]"
            />
          </div>
        </figure>
        <div className="card-body py-4 px-3 md:px-5">
          <h2 className="card-title line-clamp-2">
            <span className="link">
              ...
            </span>
          </h2>
          <p>
            Chapters: -<br />
            Update: -
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardPlaceholder;
