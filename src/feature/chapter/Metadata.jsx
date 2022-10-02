import Date from '../../shared/Date';

const Timestamp = ({ chapter }) => {
  if (!chapter.timestamp) return;
  return (
    <p className="mt-6 text-center text-base-content">
      <i>Last update: <Date value={chapter.timestamp} /></i>
    </p>
  );
}

function Metadata({ chapter }) {
  return (
    <div className="my-4">
      <Timestamp chapter={chapter} />
    </div>
  );
}

export default Metadata;
