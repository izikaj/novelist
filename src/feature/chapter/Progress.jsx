import { useEffect, useRef } from 'react';
import { progress$ } from '../../signal/progress';

const commonCSS = 'h-1 absolute left-0 top-0';
const readCSS = `${commonCSS} bg-neutral-focus border-r-2 border-success z-9`;
const scrollCSS = `${commonCSS} bg-accent-focus z-10 transition-[width]`;

function Progress() {
  const scroll = useRef(null);
  const read = useRef(null);
  useEffect(() => {
    const sub = progress$.subscribe((data = {}) => {
      scroll.current.style.width = `${data.scroll || 0}%`;
      read.current.style.width = `${data.read || 0}%`;
    });
    return () => sub.unsubscribe();
  });
  return (
    <div className="progress-wrapper bg-neutral fixed top-0 left-0 w-full h-1 z-10">
      <div id="readProgress" className={readCSS} ref={read}></div>
      <div id="scrollProgress" className={scrollCSS} ref={scroll}></div>
    </div>
  );
}

export default Progress;
