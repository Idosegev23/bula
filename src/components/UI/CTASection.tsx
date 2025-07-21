// CTASection - סקציית קריאה לפעולה סופית
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CTASection.module.css';

interface CTASectionProps {
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ className = '' }) => {
  return (
    <section className={`${styles.ctaSection} ${className}`}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            יש לכם פרויקט בדרך?
          </h2>
          <p className={styles.ctaSubtitle}>
            דברו איתנו – נחשוב יחד.
          </p>
          
          <div className={styles.ctaActions}>
            <Link to="/contact" className={`${styles.ctaButton} ${styles.primary}`}>
              צור קשר
            </Link>
            <a 
              href="https://wa.me/972501234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.secondary}`}
            >
              שלחו וואטסאפ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 