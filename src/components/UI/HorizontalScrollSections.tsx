import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HorizontalScrollSections.module.css';

export interface HorizontalScrollSectionsProps {
  className?: string;
  imageUrl?: string; // default: /homep.png
}

export const HorizontalScrollSections: React.FC<HorizontalScrollSectionsProps> = () => {
  const navigate = useNavigate();
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

  // במובייל - תמונה עם כפתורים קליקביליים
  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <img
          src="/mobileBG.png"
          alt="Woodcraft Background"
          className={styles.mobileBg}
        />
        
        {/* כפתור: ליווי עסקי - יצירת והקמת עסקים */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '31%',
            left: '16%',
            width: '60%',
            height: '5%',
            transform: 'rotate(15deg)',
          }}
          onClick={() => navigate('/services')}
          aria-label="ליווי עסקי"
        />
        <span 
          className={styles.arrowWrapper}
          style={{
            top: '31%',
            left: '25%',
            transform: 'rotate(15deg) scale(0.9)',
          }}
        >
          <img 
            src="/arrow.png" 
            alt=""
            className={styles.arrowIndicator}
          />
        </span>

        {/* כפתור: אדריכלים */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '44.5%',
            left: '10%',
            width: '50%',
            height: '5%',
            transform: 'rotate(-17deg)',
          }}
          onClick={() => navigate('/architects')}
          aria-label="אדריכלים"
        />
        <span 
          className={styles.arrowWrapper}
          style={{
            top: '48.7%',
            left: '9.5%',
            transform: 'rotate(-17deg) scale(0.9)',
          }}
        >
          <img 
            src="/arrow.png" 
            alt=""
            className={styles.arrowIndicator}
          />
        </span>

        {/* כפתור: לקוחות פרטיים - נגרות בהתאמה אישית */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '52%',
            left: '10%',
            width: '55%',
            height: '6%',
            transform: 'rotate(-15deg)',
          }}
          onClick={() => navigate('/private-clients')}
          aria-label="לקוחות פרטיים"
        />
        <span 
          className={styles.arrowWrapper}
          style={{
            top: '55.8%',
            left: '19%',
            transform: 'rotate(-15deg)',
          }}
        >
          <img 
            src="/arrow.png" 
            alt=""
            className={styles.arrowIndicator}
          />
        </span>
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


