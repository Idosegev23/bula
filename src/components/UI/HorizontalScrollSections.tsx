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
  const bgRef = useRef<HTMLImageElement>(null);
  const [activeSection] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const pinchStartDistanceRef = useRef<number>(0);
  const pinchStartScaleRef = useRef<number>(1);
  const lastPanXRef = useRef<number | null>(null);
  const lastPanYRef = useRef<number | null>(null);

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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

  // במובייל - ניווט חופשי: השארנו פונקציה ריקה כדי לשמור על ה-API
  const scrollToSection = (index: number) => { return index; };

  // מחוות מגע: pinch-to-zoom + pan (כאשר מוגדל)
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const getDistance = (a: Touch, b: Touch) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchStartDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
        pinchStartScaleRef.current = scale;
      } else if (e.touches.length === 1 && scale > 1) {
        lastPanXRef.current = e.touches[0].clientX;
        lastPanYRef.current = e.touches[0].clientY;
      }
    };

    const onMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const d = getDistance(e.touches[0], e.touches[1]);
        const ratio = d / Math.max(1, pinchStartDistanceRef.current);
        const next = Math.max(1, Math.min(4, pinchStartScaleRef.current * ratio));
        setScale(next);
      } else if (e.touches.length === 1 && scale > 1) {
        e.preventDefault();
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        if (lastPanXRef.current != null && lastPanYRef.current != null) {
          const dx = x - lastPanXRef.current!;
          const dy = y - lastPanYRef.current!;
          const maxX = (window.innerWidth * (scale - 1)) / 2;
          const maxY = (window.innerHeight * (scale - 1)) / 2;
          setTranslateX(prev => clamp(prev + dx, -maxX, maxX));
          setTranslateY(prev => clamp(prev + dy, -maxY, maxY));
        }
        lastPanXRef.current = x;
        lastPanYRef.current = y;
      }
    };

    const onEnd = () => {
      lastPanXRef.current = null;
      lastPanYRef.current = null;
    };

    bg.addEventListener('touchstart', onStart, { passive: true });
    bg.addEventListener('touchmove', onMove, { passive: false });
    bg.addEventListener('touchend', onEnd);
    bg.addEventListener('touchcancel', onEnd);

    return () => {
      bg.removeEventListener('touchstart', onStart as EventListener);
      bg.removeEventListener('touchmove', onMove as EventListener);
      bg.removeEventListener('touchend', onEnd as EventListener);
      bg.removeEventListener('touchcancel', onEnd as EventListener);
    };
  }, [scale]);

  // איפוס זום ומיקום
  const handleResetView = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  return (
    <>
      <div ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
        {/* Fixed background that moves horizontally */}
        <img
          ref={bgRef}
          className={styles.bg}
          src={imageUrl}
          alt="רקע דף הבית"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})` }}
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

      {/* כפתור איפוס תצוגה */}
      <button
        type="button"
        className={styles.resetButton}
        onClick={handleResetView}
        aria-label="איפוס תצוגה"
        title="איפוס זום ומיקום"
      >
        איפוס
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


