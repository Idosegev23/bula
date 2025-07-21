// ProcessSteps - Text-focused minimalistic design
import React from 'react';
import styles from './ProcessSteps.module.css';

interface ProcessStepsProps {
  className?: string;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ className = '' }) => {
  return (
    <section className={`${styles.processSection} ${className}`}>
      <div className={styles.container}>
        {/* Section Title */}
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>
            תהליך העבודה שלנו
          </h2>
        </div>

        {/* Process Steps Grid */}
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>01</div>
            <h3 className={styles.stepTitle}>רעיון</h3>
            <p className={styles.stepDescription}>
              הבנת הצרכים והחזון שלכם
            </p>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>02</div>
            <h3 className={styles.stepTitle}>תכנון ועיצוב</h3>
            <p className={styles.stepDescription}>
              פיתוח תוכניות מדויקות ועיצוב פונקציונלי
            </p>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>03</div>
            <h3 className={styles.stepTitle}>ייצור</h3>
            <p className={styles.stepDescription}>
              נגרייה ומסגרייה ברמה הגבוהה ביותר
            </p>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>04</div>
            <h3 className={styles.stepTitle}>התקנה ופיקוח</h3>
            <p className={styles.stepDescription}>
              ביצוע מושלם והקפדה על כל הפרטים
            </p>
          </div>
        </div>
        
        <div className={styles.tagline}>
          כל שלב מבוצע בקפידה ובמקצועיות מלאה
        </div>
      </div>
    </section>
  );
}; 