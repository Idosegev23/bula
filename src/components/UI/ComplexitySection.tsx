// ComplexitySection - סקציית הבנת המורכבות
import React from 'react';
import styles from './ComplexitySection.module.css';

interface ComplexitySectionProps {
  className?: string;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ className = '' }) => {
  return (
    <section className={`${styles.complexitySection} ${className}`}>
      <div className={styles.content}>
        {/* הגדרת הבעיה */}
        <div className={styles.problemStatement}>
          <div className={styles.problemIcon}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
              <path d="M8 19L9 22L12 19L15 22L16 19" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <h2>המציאות העסקית מורכבת. הפתרון שלנו פשוט.</h2>
        </div>

        {/* הפתרון */}
        <div className={styles.solution}>
          <div className={styles.solutionIcon}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h3 className={styles.solutionTitle}>בולה סטודיו מספקים פתרון כולל</h3>
          
          <div className={styles.services}>
            <div className={styles.service}>
              <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>תכנון</span>
            </div>
            
            <span className={styles.separator}>+</span>
            
            <div className={styles.service}>
              <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none">
                <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>עיצוב</span>
            </div>
            
            <span className={styles.separator}>+</span>
            
            <div className={styles.service}>
              <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none">
                <path d="M14.5 4L20.5 10L14.5 16L8.5 10L14.5 4Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.5 8.5L4.5 10.5L6.5 12.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1.5 10.5H5.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>ייצור</span>
            </div>
            
            <span className={styles.separator}>+</span>
            
            <div className={styles.service}>
              <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none">
                <path d="M17 21V13H21L17 9H7L3 13H7V21H17Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 13V21" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M17 13V21" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>התקנה</span>
            </div>
          </div>
          
          <p className={styles.tagline}>
            <svg className={styles.taglineIcon} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M19.4 15A1.65 1.65 0 0 0 21 13.35A1.65 1.65 0 0 0 19.35 11.65A1.65 1.65 0 0 0 18 13.35V15H19.4Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M18.36 6.64L19.78 5.22" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            מתכנון ראשוני ועד למוצר מושלם
          </p>
        </div>
      </div>
    </section>
  );
}; 