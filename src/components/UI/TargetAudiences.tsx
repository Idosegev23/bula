// TargetAudiences - Text-focused minimalistic design
import React from 'react';
import styles from './TargetAudiences.module.css';

interface TargetAudiencesProps {
  className?: string;
}

export const TargetAudiences: React.FC<TargetAudiencesProps> = ({ className = '' }) => {
  return (
    <section className={`${styles.audiencesSection} ${className}`}>
      <div className={styles.container}>
        {/* Section Title */}
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>
            אנחנו מתמחים בשלושה תחומים עיקריים
          </h2>
        </div>

        {/* Audiences Content */}
        <div className={styles.audiencesGrid}>
          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>עיצוב מסחרי</h3>
            <p className={styles.audienceDescription}>
              ליווי כולל להקמת עסק – תכנון חוויה, עיצוב, רגולציה, ייצור
            </p>
          </div>
          
          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>קשרי אדריכלים</h3>
            <p className={styles.audienceDescription}>
              שירותים טכניים + ייצור לאדריכלים ומעצבים
            </p>
          </div>
          
          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>ריהוט לבתים פרטיים</h3>
            <p className={styles.audienceDescription}>
              פרטי נגרות יוקרתיים בהתאמה אישית לפי תוכניות
            </p>
          </div>
        </div>
        
        <div className={styles.tagline}>
          כל פרויקט מקבל את מלוא תשומת הלב והמקצועיות שלנו
        </div>
      </div>
    </section>
  );
}; 