import React, { useEffect, useRef, useState } from 'react';
import styles from './HorizontalParallax.module.css';

export interface HorizontalParallaxProps {
  className?: string;
}

export const HorizontalParallax: React.FC<HorizontalParallaxProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // חישוב אחוז הגלילה של הקונטיינר
      const scrollStart = containerRect.top;
      
      // כאשר הקונטיינר נכנס למסך עד שהוא יוצא
      const totalScrollDistance = containerHeight + windowHeight;
      const currentScrolled = Math.max(0, windowHeight - scrollStart);
      const progress = Math.min(1, Math.max(0, currentScrolled / totalScrollDistance));

      setScrollProgress(progress);

      // הזזת התמונה ימינה בהתאם לאחוז הגלילה
      const maxTranslateX = -(imageRef.current.offsetWidth - window.innerWidth);
      const translateX = progress * maxTranslateX;
      
      imageRef.current.style.transform = `translateX(${translateX}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // קריאה ראשונית

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles.parallaxContainer} ${className}`}>
      <div className={styles.contentOverlay}>
        <div className={styles.textContent}>
          <h1 className={styles.mainTitle}>
            <div>בולה</div>
            <div>סטודיו</div>
            <span className={styles.backgroundText}>CREATE</span>
          </h1>
          <p className={styles.subtitle}>
            יוצרים מרחבים שמספרים סיפור
          </p>
          <div className={styles.ctaButtons}>
            <a 
              href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20לקבל%20מידע%20נוסף"
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              בואו נתחיל
            </a>
          </div>
        </div>
        
        {/* אינדיקטור התקדמות */}
        <div className={styles.progressIndicator}>
          <div 
            className={styles.progressBar}
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <div 
        ref={imageRef}
        className={styles.parallaxImage}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&h=800&fit=crop&crop=center')`
        }}
      />
    </div>
  );
};
