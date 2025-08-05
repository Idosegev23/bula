// InstagramWidget - ווידג'ט אינסטגרם מ-LightWidget
import React, { useEffect, useRef, useState } from 'react';
import styles from './InstagramWidget.module.css';

interface InstagramWidgetProps {
  className?: string;
}

export const InstagramWidget: React.FC<InstagramWidgetProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Intersection Observer לטעינה lazy
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // טעינת הסקריפט של LightWidget
  useEffect(() => {
    if (!isVisible || isLoaded) return;

    // בדיקה אם הסקריפט כבר נטען
    if (document.querySelector('script[src*="lightwidget.js"]')) {
      setIsLoaded(true);
      return;
    }

    // יצירת הסקריפט
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load LightWidget script');
    };

    // הוספת הסקריפט לראש
    document.head.appendChild(script);

    return () => {
      // ניקוי הסקריפט בעת unmount
      const existingScript = document.querySelector('script[src*="lightwidget.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [isVisible, isLoaded]);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.instagramSection} ${className} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>העבודות שלנו באינסטגרם</h2>
          <p className={styles.sectionSubtitle}>
            עקבו אחרי הפרויקטים האחרונים שלנו ב-@bulla.studio
          </p>
        </div>
        
        <div 
          ref={widgetRef}
          className={`${styles.widgetContainer} ${isLoaded ? styles.loaded : styles.loading}`}
        >
          {isVisible && (
            <>
              {!isLoaded && (
                <div className={styles.loadingState}>
                  <div className={styles.loadingSpinner}></div>
                  <p>טוען פוסטים מאינסטגרם...</p>
                </div>
              )}
              
              <iframe 
                src="//lightwidget.com/widgets/e8b18f000bb55d7eba116bb01cde9b00.html" 
                scrolling="no" 
                allowTransparency={true}
                className={`lightwidget-widget ${styles.instagramFrame}`}
                style={{
                  width: '100%',
                  border: 0,
                  overflow: 'hidden',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
                onLoad={() => setIsLoaded(true)}
                title="Instagram Widget"
              />
            </>
          )}
        </div>
        
        <div className={styles.sectionFooter}>
          <a 
            href="https://www.instagram.com/bulla.studio/"
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.viewAllButton}
          >
            <span>עקבו אחרינו ב-@bulla.studio</span>
            <svg className={styles.viewAllArrow} viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
              <path d="m12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};