import React, { useRef, useEffect, useState } from 'react';
import styles from './TrueHorizontalScroll.module.css';

export interface TrueHorizontalScrollProps {
  className?: string;
  imageUrl?: string;
}

export const TrueHorizontalScroll: React.FC<TrueHorizontalScrollProps> = ({
  className = '',
  imageUrl = '/homep.png',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // מניעת גלילה אנכית בדף הבית
    document.body.style.overflow = 'hidden';

    // טיפול בגלילה עם גלגל העכבר - הפיכה לגלילה אופקית
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const scrollAmount = e.deltaY > 0 ? 100 : -100;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + scrollAmount));
      
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    };

    // טיפול בניווט עם מקלדת
    const handleKeyDown = (e: KeyboardEvent) => {
      const sectionWidth = window.innerWidth;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextSection = Math.min(currentSection + 1, 2);
        container.scrollTo({
          left: nextSection * sectionWidth,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevSection = Math.max(currentSection - 1, 0);
        container.scrollTo({
          left: prevSection * sectionWidth,
          behavior: 'smooth'
        });
      }
    };

    // טיפול בעדכון הסקשן הנוכחי
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const sectionWidth = window.innerWidth;
      const newSection = Math.round(scrollLeft / sectionWidth);
      setCurrentSection(newSection);
    };

    // מניעת גלילה אנכית גלובלית
    const preventVerticalScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', preventVerticalScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', preventVerticalScroll);
    };
  }, [currentSection]);

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      {/* סקשן 1 - הערו */}
      <div className={styles.section} style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className={styles.content}>
          <h1 className={styles.title}>בולה סטודיו</h1>
          <p className={styles.subtitle}>יוצרים מרחבים שמספרים סיפור</p>
          <div className={styles.scrollHint}>
            <span>גלול ימינה →</span>
          </div>
        </div>
      </div>

      {/* סקשן 2 - שירותים */}
      <div className={styles.section} style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>השירותים שלנו</h2>
          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>עיצוב פנים</div>
            <div className={styles.serviceCard}>נגרות מותאמת</div>
            <div className={styles.serviceCard}>ייעוץ מקצועי</div>
          </div>
        </div>
      </div>

      {/* סקשן 3 - קריאה לפעולה */}
      <div className={styles.section} style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>בואו נתחיל</h2>
          <p className={styles.ctaText}>מוכנים ליצור משהו מדהים יחד?</p>
          <a 
            href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20לקבל%20מידע%20נוסף"
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            צור קשר
          </a>
        </div>
      </div>

      {/* אינדיקטור סקשנים */}
      <div className={styles.sectionIndicator}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${styles.dot} ${currentSection === index ? styles.active : ''}`}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  left: index * window.innerWidth,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
