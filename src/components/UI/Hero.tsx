// Hero - Bulla Studio Design & Fabrication
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const cuttingLineRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sequential animation trigger
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      const line = cuttingLineRef.current;
      if (line) {
        setTimeout(() => {
          line.classList.add(styles.animate);
        }, 600); // After title animation
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.hero} ${className}`}>
      {/* Dark overlay for text readability */}
      <div className={styles.overlay}></div>
      
      <div className={styles.heroContainer}>
        <div 
          ref={heroContentRef}
          className={`${styles.heroContent} ${isLoaded ? styles.loaded : ''}`}
        >
          {/* Main Headline with dramatic entrance */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>בונים עסקים.</span>
            <span className={styles.titleLine2}>מעצבים חוויות.</span>
            <span className={styles.titleLine3}>מייצרים מציאות.</span>
          </h1>
          
          {/* Sharp Cutting Line */}
          <div ref={cuttingLineRef} className={styles.cuttingLine}></div>
          
          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            בולה סטודיו מתמחים בליווי כולל לעסקים – מתכנון חוויית הלקוח, דרך עיצוב וייצור, ועד התקנה בשטח.
          </p>
          
          {/* CTA Buttons */}
          <div className={styles.heroActions}>
            <Link to="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>צפו בעבודות</span>
            </Link>
            
            <Link to="/process" className={`${styles.btn} ${styles.btnSecondary}`}>
              <span>איך אנחנו עובדים</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}; 