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
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number>(0);

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


      // אפקטים מותאמים לנקודות המגנט המדויקות:
      // סקשן 1 (0-33%): עד נקודת המגנט הראשונה
      // סקשן 2 מגנט: 63.3% progress = Background 60.8% X, 61.3% Y, Zoom 1.30x
      // סקשן 3 מגנט: 100% progress = Background 100% X, 80% Y, Zoom 1.70x
      
      let posX, posY, scale = 1;
      
      if (progress <= 0.633) {
        // סקשן 1 + חלק מסקשן 2: עד נקודת המגנט של סקשן 2
        const sectionProgress = progress / 0.633;
        posX = sectionProgress * 60.8; // 0% -> 60.8% (נקודת המגנט)
        posY = 15 + (sectionProgress * 46.3); // 15% -> 61.3% (נקודת המגנט)
        scale = 1.2 + (sectionProgress * 0.1); // 1.2 -> 1.3 (נקודת המגנט)
      } else {
        // סקשן 3: ממגנט סקשן 2 למגנט סקשן 3
        const sectionProgress = (progress - 0.633) / (1.0 - 0.633);
        posX = 60.8 + (sectionProgress * 39.2); // 60.8% -> 100%
        posY = 61.3 + (sectionProgress * 18.7); // 61.3% -> 80%
        scale = 1.3 + (sectionProgress * 0.4); // 1.3 -> 1.7
      }
      
      bg.style.backgroundPosition = `${posX}% ${posY}%`;
      bg.style.transform = `scale(${scale})`;


      // 🧲 MAGNETIC SCROLL - מגנט JavaScript חכם
      lastScrollTimeRef.current = Date.now();
      
      // מוחק טיימר קודם אם קיים
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // מחכה 150ms אחרי עצירת גלילה ואז קופץ לסקשן הקרוב
      scrollTimeoutRef.current = window.setTimeout(() => {
        const targetProgress = progress < 0.3165 ? 0 : progress < 0.8165 ? 0.633 : 1.0;
        const targetScrollY = start + (targetProgress * (end - start));
        
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      }, 150);
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
      // ניקוי הטיימר המגנטי
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
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
    </>
  );
};


