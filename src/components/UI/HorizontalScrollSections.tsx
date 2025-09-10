import React, { useEffect, useRef } from 'react';
import styles from './HorizontalScrollSections.module.css';

export interface HorizontalScrollSectionsProps {
  className?: string;
  imageUrl?: string; // default: /homep.png
}

export const HorizontalScrollSections: React.FC<HorizontalScrollSectionsProps> = ({
  className = '',
  imageUrl = '/homep.png',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const bg = bgRef.current;
      if (!wrapper || !bg) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const pageY = window.scrollY || window.pageYOffset;
      const wrapperTop = wrapperRect.top + pageY;
      const wrapperHeight = wrapper.offsetHeight;
      const viewportH = window.innerHeight;

      const start = wrapperTop;
      const end = wrapperTop + wrapperHeight - viewportH;
      const progress = Math.min(1, Math.max(0, (pageY - start) / Math.max(1, (end - start))));

      // פרלקס אופקי פשוט: 0% -> 100% X
      const xPos = progress * 100;
      bg.style.backgroundPosition = `${xPos}% 50%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      {/* Fixed background that moves horizontally */}
      <div
        ref={bgRef}
        className={styles.bg}
        style={{ backgroundImage: `url('${imageUrl}')` }}
        aria-hidden="true"
      />

      {/* Section 1 */}
      <section className={styles.section}></section>

      {/* Section 2 */}
      <section className={styles.section}></section>

      {/* Section 3 */}
      <section className={styles.section}></section>
    </div>
  );
};


