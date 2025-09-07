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
      const wrapperHeight = wrapper.offsetHeight; // צפוי להיות ~300vh
      const viewportH = window.innerHeight;

      // התחלת תנועה כשאנחנו מגיעים לתחילת ה-wrapper עד סיומו
      const start = wrapperTop;
      const end = wrapperTop + wrapperHeight - viewportH;
      const raw = (pageY - start) / Math.max(1, (end - start));
      const progress = Math.min(1, Math.max(0, raw));

      // אפקטים שונים לכל סקשן:
      // סקשן 1 (0-33%): התחלה משמאל למעלה, תנועה אלכסונית עדינה
      // סקשן 2 (33-66%): תנועה אלכסונית מהירה יותר
      // סקשן 3 (66-100%): זום פנימה ותנועה אלכסונית
      
      let posX, posY, scale = 1;
      
      if (progress <= 0.33) {
        // סקשן 1: תנועה עדינה מהצד השמאלי העליון
        const sectionProgress = progress / 0.33;
        posX = sectionProgress * 30; // 0% -> 30%
        posY = sectionProgress * 15; // 0% -> 15%
      } else if (progress <= 0.66) {
        // סקשן 2: תנועה אלכסונית מהירה יותר
        const sectionProgress = (progress - 0.33) / 0.33;
        posX = 30 + (sectionProgress * 40); // 30% -> 70%
        posY = 15 + (sectionProgress * 25); // 15% -> 40%
      } else {
        // סקשן 3: זום פנימה ותנועה אלכסונית להשלמה
        const sectionProgress = (progress - 0.66) / 0.34;
        posX = 70 + (sectionProgress * 30); // 70% -> 100%
        posY = 40 + (sectionProgress * 20); // 40% -> 60%
        scale = 1 + (sectionProgress * 0.2); // זום עדין
      }
      
      bg.style.backgroundPosition = `${posX}% ${posY}%`;
      bg.style.transform = `scale(${scale})`;
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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

      {/* Section 1 - Hero minimal - רק התמונה */}
      <section className={styles.section}>
      </section>

      {/* Section 2 - Empty */}
      <section className={styles.section}>
      </section>

      {/* Section 3 - Empty */}
      <section className={styles.section}>
      </section>
    </div>
  );
};


