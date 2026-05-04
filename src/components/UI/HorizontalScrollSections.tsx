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
  const [imageLoaded, setImageLoaded] = useState(false);


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
          src="/mobile.webp"
          alt="Woodcraft Background"
          className={styles.mobileBg}
          loading="eager"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* כל הקואורדינטות עודכנו ידנית דרך Hotspot Editor (?mode=mobile),
           ונשמרו ב-hotspots-mobile.json. */}

        {/* עיצוב והקמת עסקים — מניפת צבעים בראש */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '10.32%',
            left: '7.38%',
            width: '67.8%',
            height: '3.95%',
            transform: 'rotate(-22.6deg)',
          }}
          onClick={() => navigate('/services')}
          aria-label="עיצוב והקמת עסקים"
        />

        {/* נגרות בהתאמה אישית — בלוק חיתוך עץ */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '27.19%',
            left: '11.12%',
            width: '37.3%',
            height: '4.59%',
            transform: 'rotate(-8.5deg)',
          }}
          onClick={() => navigate('/private-clients')}
          aria-label="נגרות בהתאמה אישית"
        />

        {/* קשרי אדריכלים — מניפת פנטון */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '37.42%',
            left: '27.75%',
            width: '49.41%',
            height: '4.23%',
            transform: 'rotate(-13.9deg)',
          }}
          onClick={() => navigate('/architects')}
          aria-label="קשרי אדריכלים"
        />

        {/* בולה שופ — מסך הלפטופ */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '47.06%',
            left: '0.85%',
            width: '62.42%',
            height: '7.57%',
            transform: 'rotate(25.4deg)',
          }}
          onClick={() => navigate('/shop')}
          aria-label="Bulla Shop"
        />

        {/* מיתוג — קלפים + פלטת צבעים */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '62.77%',
            left: '10.43%',
            width: '37.22%',
            height: '3.29%',
          }}
          onClick={() => navigate('/branding')}
          aria-label="מיתוג"
        />

        {/* BULLA Digital — מדבקה + עכבר */}
        <button
          className={styles.mobileClickableArea}
          style={{
            position: 'absolute',
            top: '77.41%',
            left: '10.44%',
            width: '41.32%',
            height: '1.85%',
            transform: 'rotate(9.7deg)',
          }}
          onClick={() => navigate('/digital')}
          aria-label="Bulla Digital"
        />

        {/* אייפון — וידאו אינסטגרם נטען לתוך המסך הפנימי */}
        <a
          href="https://www.instagram.com/bulla.studio/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: '84.26%',
            left: '20.34%',
            width: '23.01%',
            height: '7.5%',
            transform: 'rotate(8.5deg)',
            zIndex: 999,
            overflow: 'hidden',
            borderRadius: '12px',
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
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <source src="/instegram.mp4" type="video/mp4" />
          </video>
        </a>

        {/* כוס קפה — לינק חיצוני ל-Coffeeland Club */}
        <a
          href="https://www.coffelandclub.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: '57.67%',
            left: '14%',
            width: '13.56%',
            height: '3.82%',
            transform: 'rotate(-15.7deg)',
            display: 'block',
          }}
          aria-label="Coffeeland Club"
        />
      </div>
    );
  }

  // בדסקטופ - הירו של "שולחן עבודה" עם הדמיה חדשה (אתר בולה 2026)
  // התמונה 4800×2700 כוללת את כל התוויות מצוירות בתוכה — אזורי הקליק שקופים מעליהן.
  // המיקומים מבוססים על אומדן חזותי ראשוני, ניתן לכוון בעין על גבי הדף החי.
  return (
    <div className={styles.desktopHero}>
      <img
        src="/desktop.webp"
        alt="Bulla Studio - שולחן עבודה"
        className={styles.desktopHeroImage}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setImageLoaded(true)}
      />

      {/* כל הקואורדינטות הבאות מקורן ב-Hotspot Editor (ב-localhost/hotspot-edit) —
         המשתמש סימן ידנית על התמונה החיה ושלח דרך כפתור "Send to Claude". */}

      {/* עיצוב והקמת עסקים — מניפת צבעים שמאל-עליון */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '18.05%',
          left: '12.4%',
          width: '18.02%',
          height: '10.25%',
          transform: 'rotate(-13.8deg)',
        }}
        onClick={() => navigate('/services')}
        aria-label="עיצוב והקמת עסקים"
      />

      {/* נגרות בהתאמה אישית — בלוק חיתוך עץ, מרכז-עליון */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '21.13%',
          left: '42.08%',
          width: '11.41%',
          height: '13.01%',
          transform: 'rotate(-14.3deg)',
        }}
        onClick={() => navigate('/private-clients')}
        aria-label="נגרות בהתאמה אישית"
      />

      {/* מיתוג — קלפים עם עלים + פלטת צבעים. מנותב לדף הדיגיטל */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '34.43%',
          left: '63.39%',
          width: '10.57%',
          height: '8.98%',
          transform: 'rotate(0.4deg)',
        }}
        onClick={() => navigate('/branding')}
        aria-label="מיתוג"
      />

      {/* קשרי אדריכלים — מניפת פנטון מרכז-שמאל */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '50.44%',
          left: '24.83%',
          width: '14.46%',
          height: '10.36%',
          transform: 'rotate(-18.7deg)',
        }}
        onClick={() => navigate('/architects')}
        aria-label="קשרי אדריכלים"
      />

      {/* בולה שופ — מסך הלפטופ במרכז */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '55.65%',
          left: '44.76%',
          width: '18.49%',
          height: '18.86%',
          transform: 'rotate(-16.3deg)',
        }}
        onClick={() => navigate('/shop')}
        aria-label="Bulla Shop"
      />

      {/* BULLA Digital — מדבקה + עכבר ימין-מרכז */}
      <button
        className={styles.desktopClickableArea}
        style={{
          position: 'absolute',
          top: '66.29%',
          left: '69.59%',
          width: '12.17%',
          height: '4.71%',
          transform: 'rotate(8.2deg)',
        }}
        onClick={() => navigate('/digital')}
        aria-label="Bulla Digital"
      />

      {/* אייפון — מסך הטלפון בימין-עליון; וידאו אינסטגרם נטען לתוך המסך */}
      <a
        href="https://www.instagram.com/bulla.studio/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          top: '33.95%',
          left: '87.11%',
          width: '5.71%',
          height: '16.51%',
          transform: 'rotate(8.3deg)',
          overflow: 'hidden',
          borderRadius: '14px',
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
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <source src="/instegram.mp4" type="video/mp4" />
        </video>
      </a>

      {/* כוס קפה — לינק חיצוני ל-Coffeeland Club */}
      <a
        href="https://www.coffelandclub.co.il/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          top: '22.26%',
          left: '64.55%',
          width: '3.95%',
          height: '8.78%',
          transform: 'rotate(-14.6deg)',
          display: 'block',
        }}
        aria-label="Coffeeland Club"
      />
    </div>
  );
};


