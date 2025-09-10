import React, { useEffect, useRef, useState } from 'react';
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
  const [activeSection, setActiveSection] = useState<number>(0);
  const activeSectionRef = useRef<number>(0);

  // פונקציה לגלילה לסקשן הבא (אנכית)
  const scrollToNext = () => {
    const currentScrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    const currentSection = Math.floor(currentScrollY / viewportHeight);
    const nextSection = Math.min(currentSection + 1, 2); // מקסימום 3 סקשנים (0,1,2)
    
    const targetScrollY = nextSection * viewportHeight;
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // גלילה ישירה לסקשן לפי אינדקס (0, 1, 2)
  const scrollToSection = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const pageY = window.scrollY || window.pageYOffset;
    const wrapperTop = wrapperRect.top + pageY;
    const wrapperHeight = wrapper.offsetHeight;
    const viewportH = window.innerHeight;

    const start = wrapperTop;
    const end = wrapperTop + wrapperHeight - viewportH;
    const anchors = [0, 0.633, 1.0];
    const clamped = Math.max(0, Math.min(2, index));
    const targetProgress = anchors[clamped];
    const targetY = start + (targetProgress * (end - start));

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const bg = bgRef.current;
      if (!wrapper || !bg) return;

      // חזרה לגלילה אנכית למובייל
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


      // עדכון רק סקשן פעיל - ללא תנועת רקע כלל
      const currentActive = progress < 0.3165 ? 0 : progress < 0.8165 ? 1 : 2;
      if (currentActive !== activeSectionRef.current) {
        activeSectionRef.current = currentActive;
        setActiveSection(currentActive);
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    // Event listeners לגלילה אנכית רגילה
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
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
          {/* הוראה לגלילה במובייל */}
          <div className={styles.swipeHint}>
            <span>גלול למטה לעוד תוכן</span>
            <div className={styles.swipeArrow}>↓</div>
          </div>
        </section>

        {/* Section 2 - Empty */}
        <section className={styles.section}>
        </section>

        {/* Section 3 - Empty */}
        <section className={styles.section}>
        </section>
      </div>
      
      {/* חץ ניווט אופקי */}
      <button 
        className={styles.navigationArrow}
        onClick={scrollToNext}
        aria-label="עבור לסקשן הבא"
        title="לחץ לעבור לסקשן הבא"
      >
        <div className={styles.arrowIcon}></div>
      </button>

      {/* אינדיקטור נקודות ניווט לסקשנים */}
      <nav className={styles.dotsNav} aria-label="ניווט סקשנים">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${activeSection === i ? styles.dotActive : ''}`}
            onClick={() => scrollToSection(i)}
            aria-label={`עבור לסקשן ${i + 1}`}
            aria-current={activeSection === i ? 'true' : undefined}
          />
        ))}
      </nav>
    </>
  );
};


