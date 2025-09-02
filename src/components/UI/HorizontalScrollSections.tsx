import React, { useEffect, useRef } from 'react';
import styles from './HorizontalScrollSections.module.css';

export interface HorizontalScrollSectionsProps {
  className?: string;
  imageUrl?: string; // default: /homepage.png
}

export const HorizontalScrollSections: React.FC<HorizontalScrollSectionsProps> = ({
  className = '',
  imageUrl = '/homepage.png',
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

      // הזזת הרקע אופקית (0% -> 100%) לפי התקדמות הגלילה האנכית
      const posX = progress * 100;
      bg.style.backgroundPosition = `${posX}% center`;
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

      {/* Section 1 - Hero minimal with white logo */}
      <section className={styles.section}>
        <div className={styles.container}>
          <img src="/dirty_logo.svg" alt="Bulla Studio" className={styles.logo} />
          <p className={styles.subtitle}>יוצרים מרחבים שמספרים סיפור</p>
        </div>
      </section>

      {/* Section 2 - Services */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.headline}>השירותים שלנו</h2>
          <p className={styles.text}>ONE STOP SHOP – ליווי מקצה לקצה.</p>
          <div className={styles.serviceGrid}>
            <a href="/services" className={styles.serviceCard}>ליווי עסקי</a>
            <a href="/architects" className={styles.serviceCard}>ליווי אדריכלי</a>
            <a href="/private-clients" className={styles.serviceCard}>לקוחות פרטיים</a>
            <a href="/business-clients" className={styles.serviceCard}>לקוחות עסקיים</a>
          </div>
        </div>
      </section>

      {/* Section 3 - Full, centered content */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.headline}>בואו ניצור יחד</h2>
          <p className={styles.text}>תהליך מדויק, ירידה לפרטים והובלה מקצועית – עד למסירה.</p>
          <p className={styles.extra}>הצוות שלנו משלב חשיבה אסטרטגית ושפה עיצובית נקייה, עם ניהול פרויקט מוקפד.</p>
          <a
            href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20להתחיל%20פרויקט"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            קבלת הצעת מחיר
          </a>
        </div>
      </section>
    </div>
  );
};


