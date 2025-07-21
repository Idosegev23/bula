// ComplexitySection - סקציית הבנת המורכבות
import React from 'react';
import styles from './ComplexitySection.module.css';

interface ComplexitySectionProps {
  className?: string;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ className = '' }) => {
  return (
    <section className={`${styles.complexitySection} ${className}`}>
      <div className={styles.container}>
        {/* הגדרת הבעיה */}
        <div className={styles.problemStatement}>
          <h2 className={styles.problemTitle}>המציאות העסקית מורכבת. הפתרון שלנו פשוט.</h2>
        </div>

        {/* הפתרון */}
        <div className={styles.solution}>
          <h3 className={styles.solutionTitle}>בולה סטודיו מספקים פתרון כולל</h3>
          
          <div className={styles.processText}>
            <p className={styles.processDescription}>
              תכנון + עיצוב + ייצור + התקנה
            </p>
          </div>
          
          <p className={styles.tagline}>
            מתכנון ראשוני ועד למוצר מושלם
          </p>
        </div>
      </div>
    </section>
  );
}; 