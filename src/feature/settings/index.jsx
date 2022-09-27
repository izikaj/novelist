import Panel from './Panel';

function Settings({ onClose }) {
  return (
    <div className="modal modal-bottom sm:modal-middle modal-open">
      <div
        className="fixed top-0 left-0 w-full h-full bg-neutral-focus opacity-50"
        onClick={onClose}
      />
      <div className="modal-box relative">
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >✕</button>
        <Panel />
      </div>
    </div>
  )
}

export default Settings
