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
          src="/BullaMobile.png"
          alt="Woodcraft Background"
          className={styles.mobileBg}
          loading="eager"
          fetchPriority="high"
        />
        
        {/* סרטון בתוך מסך האייפון - עם לינק לאינסטגרם */}
        <a
          href="https://www.instagram.com/bulla.studio/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: '69.2%',
            left: '48%',
            width: '23%',
            height: '11%',
            transform: 'rotate(25deg)',
            zIndex: 999,
            cursor: 'pointer',
            display: 'block',
          }}
          aria-label="בקרו אותנו באינסטגרם"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x5-playsinline="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              pointerEvents: 'none',
            }}
          >
            <source src="/instegram.mp4" type="video/mp4" />
          </video>
        </a>
        
        {/* כפתור: ליווי עסקי - יצירת והקמת עסקים */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '31.5%',
            left: '25.1%',
            width: '47.3%',
            height: '3.7%',
            transform: 'rotate(18deg)',
          }}
          onClick={() => navigate('/services')}
          aria-label="ליווי עסקי"
        />

        {/* כפתור: אדריכלים */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '45.6%',
            left: '-1.5%',
            width: '57%',
            height: '5%',
            transform: 'rotate(-18deg)',
            clipPath: 'polygon(19% 28%, 87% 0%, 90% 93%, 21% 92%)',
          }}
          onClick={() => navigate('/architects')}
          aria-label="אדריכלים"
        />

        {/* כפתור: לקוחות פרטיים - נגרות בהתאמה אישית */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '52.3%',
            left: '18.5%',
            width: '38.5%',
            height: '6.2%',
            transform: 'rotate(-17deg)',
          }}
          onClick={() => navigate('/private-clients')}
          aria-label="לקוחות פרטיים"
        />
      </div>
    );
  }

  // בדסקטופ - הירו עם התמונה homep.png וכפתורים קליקביליים
  return (
    <div className={styles.desktopHero}>
      <img
        src="/homep.png"
        alt="Woodcraft Hero"
        className={styles.desktopHeroImage}
        loading="eager"
        fetchPriority="high"
      />
      
      {/* כפתור: ליווי עסקי - יצירת והקמת עסקים */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '20.5%',
          left: '43%',
          width: '16%',
          height: '8%',
          transform: 'rotate(18deg)',
        }}
        onClick={() => navigate('/services')}
        aria-label="ליווי עסקי"
      />

      {/* כפתור: אדריכלים */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '60%',
          left: '43%',
          width: '14%',
          height: '10%',
          transform: 'rotate(-35deg)',
        }}
        onClick={() => navigate('/architects')}
        aria-label="אדריכלים"
      />

      {/* כפתור: לקוחות פרטיים - נגרות בהתאמה אישית */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '27%',
          left: '60%',
          width: '11%',
          height: '11%',
          transform: 'rotate(-13deg)',
        }}
        onClick={() => navigate('/private-clients')}
        aria-label="לקוחות פרטיים"
      />

      {/* אייפון - לינק לאינסטגרם עם סרטון */}
      <a
        href="https://www.instagram.com/bulla.studio/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '54.8%',
          left: '80.2%',
          width: '7.3%',
          height: '26%',
          transform: 'rotate(-10deg)',
          overflow: 'hidden',
        }}
        aria-label="בקרו אותנו באינסטגרם"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
          }}
        >
          <source src="/instegram.mp4" type="video/mp4" />
        </video>
      </a>
    </div>
  );
};


