import React, { useEffect, useState } from 'react';
import styles from './HorizontalScrollSections.module.css';

export interface HorizontalScrollSectionsProps {
  className?: string;
  imageUrl?: string; // default: /homep.png
}

export const HorizontalScrollSections: React.FC<HorizontalScrollSectionsProps> = () => {
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

  // בדסקטופ - רק הירו עם התמונה homep.png
  return (
    <div className={styles.desktopHero}>
      <img
        src="/homep.png"
        alt="Woodcraft Hero"
        className={styles.desktopHeroImage}
      />
    </div>
  );
};


