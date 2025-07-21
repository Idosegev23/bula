// Hero - Bulla Studio Design & Fabrication
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const cuttingLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = cuttingLineRef.current;
    if (line) {
      // Trigger the cutting animation after component mounts
      setTimeout(() => {
        line.classList.add(styles.animate);
      }, 100);
    }
  }, []);

  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Main Headline */}
          <h1 className={styles.heroTitle}>
            בונים עסקים. מעצבים חוויות. מייצרים מציאות.
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
              צפו בעבודות
            </Link>
            
            <Link to="/process" className={`${styles.btn} ${styles.btnSecondary}`}>
              איך אנחנו עובדים
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}; 