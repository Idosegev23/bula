// Hero - Bulla Studio Design & Fabrication
import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const cuttingLineRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Array of rotating words with their corresponding fonts
  const rotatingWords = [
    { text: 'מעצבים חוויות.', font: 'Playfair Display' },
    { text: 'מייצרים מציאות.', font: 'Dancing Script' },
    { text: 'ממחישים חלומות.', font: 'Shadows Into Light' },
    { text: 'יוצרים פתרונות.', font: 'Kalam' },
    { text: 'בונים מותגים.', font: 'Caveat' },
    { text: 'מגשימים חזון.', font: 'Amatic SC' },
    { text: 'מפתחים רעיונות.', font: 'Permanent Marker' },
    { text: 'משכללים תהליכים.', font: 'Satisfy' },
    { text: 'מעצבים עתיד.', font: 'Great Vibes' },
    { text: 'חולמים גדול.', font: 'Dancing Script' },
    { text: 'בונים יפה.', font: 'Caveat' },
    { text: 'יוצרים קסם.', font: 'Shadows Into Light' }
  ];

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

  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => 
        (prevIndex + 1) % rotatingWords.length
      );
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

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
            <span className={styles.titleLineFixed}>בונים עסקים.</span>
            <span 
              className={styles.titleLineRotating} 
              key={currentWordIndex}
              style={{ fontFamily: `'${rotatingWords[currentWordIndex].font}', cursive` }}
            >
              {rotatingWords[currentWordIndex].text}
            </span>
          </h1>
          
          {/* Sharp Cutting Line */}
          <div ref={cuttingLineRef} className={styles.cuttingLine}></div>
          
          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            בולה סטודיו מתמחים בליווי כולל לעסקים – מתכנון חוויית הלקוח, דרך עיצוב וייצור, ועד התקנה בשטח.
          </p>
        </div>
      </div>
    </section>
  );
}; 