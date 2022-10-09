import { useRef, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { noop } from 'underscore';

const BackDrop = ({ onClose, closeable }) => {
  const action = closeable ? onClose : noop;
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-neutral-focus opacity-50"
      onClick={action}
    />
  );
}

function PopupWithOverlay({ onClose, children, hideOnClickOutside = true, boxCss = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    disableBodyScroll(target);
    return () => enableBodyScroll(target);
  });

  return (
    <div className="modal modal-bottom sm:modal-middle modal-open">
      <BackDrop onClose={onClose} closeable={hideOnClickOutside} />
      <div className={`modal-box relative ${boxCss}`} ref={ref}>
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >✕</button>
        {children}
      </div>
    </div>
  )
}

export default PopupWithOverlay;
