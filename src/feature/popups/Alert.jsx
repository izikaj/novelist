function Alert({ onClose, popup }) {
  const { title, text, okText } = popup || {};
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
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        {text && <p className="py-4">{text}</p>}
        <div className="modal-action">
          <button onClick={onClose} type="button" className="btn btn-sm btn-success">
            {okText || 'Ok'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert;
