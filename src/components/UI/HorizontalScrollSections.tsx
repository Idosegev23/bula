import React, { useEffect, useState } from 'react';
import styles from './HorizontalScrollSections.module.css';

export interface HorizontalScrollSectionsProps {
  className?: string;
  imageUrl?: string; // default: /homep.png
}

export const HorizontalScrollSections: React.FC<HorizontalScrollSectionsProps> = ({
  className = '',
  imageUrl = '/homep.png',
}) => {
  // זיהוי מובייל
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // במובייל - רק תמונה אחת ניתנת לגלילה
  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <img
          src="/mobileBG.png"
          alt="Woodcraft Background"
          className={styles.mobileBg}
        />
      </div>
    );
  }

  // בדסקטופ - המבנה הקיים
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* Fixed background rotated 90 degrees */}
      <div
        className={styles.bg}
        style={{ backgroundImage: `url('${imageUrl}')` }}
        aria-hidden="true"
      />

      {/* Section 1 */}
      <section className={styles.section}></section>

      {/* Section 2 */}
      <section className={styles.section}></section>

      {/* Section 3 */}
      <section className={styles.section}></section>
    </div>
  );
};


