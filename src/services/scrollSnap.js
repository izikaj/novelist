const noop = () => {};

function scrollSnap({
  onChange = noop,
  onFinish = noop,
  changeInterval = 200,
  finishTimeout = 100
} = {}) {
  let scrollActive = false;
  let y0 = window.pageYOffset;
  let dy = 0;
  let y;
  let finisher;
  let flusher;
  const root = window.document.firstElementChild;
  let height = root.scrollHeight;

  const update = () => {
    y = window.pageYOffset;
    dy = y - y0;
  }

  const call = (self, fn) => {
    if (typeof fn !== 'function') return;

    height = root.scrollHeight;
    fn.call(self, {
      y0,
      y,
      dy,
      height,
    });
  }

  return function () {
    if (scrollActive) clearTimeout(finisher);
    update();
    scrollActive = true;

    finisher = setTimeout(() => {
      update();
      scrollActive = false;
      call(this, onFinish);
      y0 = y;
    }, finishTimeout);

    if (!flusher) {
      call(this, onChange);
      flusher = setTimeout(() => flusher = undefined, changeInterval);
    }
  }
}

export default scrollSnap;
