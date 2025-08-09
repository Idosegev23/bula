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
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Array of rotating words with vintage handwriting fonts
  const rotatingWords = [
    { text: 'מעצבים חוויות.', font: 'Amatic SC' },
    { text: 'מייצרים מציאות.', font: 'Kalam' },
    { text: 'ממחישים חלומות.', font: 'Shadows Into Light' },
    { text: 'יוצרים פתרונות.', font: 'Caveat' },
    { text: 'בונים מותגים.', font: 'Dancing Script' },
    { text: 'מגשימים חזון.', font: 'Satisfy' },
    { text: 'מפתחים רעיונות.', font: 'Permanent Marker' },
    { text: 'משכללים תהליכים.', font: 'Indie Flower' },
    { text: 'מעצבים עתיד.', font: 'Great Vibes' },
    { text: 'חולמים גדול.', font: 'Architects Daughter' },
    { text: 'בונים יפה.', font: 'Homemade Apple' },
    { text: 'יוצרים קסם.', font: 'Covered By Your Grace' },
    { text: 'מביאים לחיים.', font: 'Patrick Hand' },
    { text: 'פותחים דרכים.', font: 'Schoolbell' },
    { text: 'מחברים לבבות.', font: 'Reenie Beanie' },
    { text: 'מכתבים סיפורים.', font: 'Just Me Again Down Here' }
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

  // Typewriter effect
  useEffect(() => {
    if (!isLoaded) return;

    const currentWord = rotatingWords[currentWordIndex].text;
    let timer: number;

    if (isDeleting) {
      // Deleting effect
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
        
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
        }
      }, 50); // Fast deletion
    } else if (isTyping) {
      // Typing effect
      timer = setTimeout(() => {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setIsTyping(false);
          // Pause before starting to delete
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Show complete text for 2 seconds
        }
      }, 80); // Typing speed
    }

    // Reset typing state when word changes
    if (displayedText === '' && !isDeleting) {
      setIsTyping(true);
    }

    return () => clearTimeout(timer);
  }, [currentWordIndex, displayedText, isTyping, isDeleting, isLoaded, rotatingWords]);

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
              className={styles.titleLineTypewriter} 
              style={{ fontFamily: `'${rotatingWords[currentWordIndex].font}', cursive` }}
            >
              {displayedText}<span className={styles.cursor}>|</span>
            </span>
          </h1>
          
          {/* Sharp Cutting Line */}
          <div ref={cuttingLineRef} className={styles.cuttingLine}></div>
          
          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            בולה סטודיו מתמחים בליווי כולל לעסקים – מתכנון חוויית הלקוח, דרך עיצוב וייצור, ועד התקנה בשטח.
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className={`${styles.scrollIndicator} ${isLoaded ? styles.loaded : ''}`}
          onClick={() => {
            const nextSection = document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="גלול למטה לתוכן נוסף"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const nextSection = document.querySelector('section:nth-of-type(2)');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        >
          <div className={styles.scrollArrow}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}; 