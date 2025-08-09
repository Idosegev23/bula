import React, { useRef, useEffect } from 'react';
import rough from 'roughjs';
import styles from './TechnicalServiceCards.module.css';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import FloatingServicesFooter from './FloatingServicesFooter';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

interface TechnicalServiceCardsProps {
  className?: string;
}

export const TechnicalServiceCards: React.FC<TechnicalServiceCardsProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  // זיהוי אם הסקשן נראה על המסך (עם השהיה לאנימציה חלקה)
  const isSectionVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.4, // יותר מדויק - 40% צריך להיות נראה
    rootMargin: '-80px 0px -80px 0px' // מרווח גדול יותר
  });

  const services: Service[] = [
    {
      id: 'commercial',
      title: 'עיצוב מסחרי',
      subtitle: 'לבעלי עסקים',
      description: 'תכנון ועיצוב חללים מסחריים'
    },
    {
      id: 'architects', 
      title: 'קשרי אדריכלים',
      subtitle: 'לאדריכלים',
      description: 'שירותים טכניים וייצור מקצועי'
    },
    {
      id: 'private',
      title: 'רהיטים פרטיים', 
      subtitle: 'ללקוחות פרטיים',
      description: 'ייצור רהיטים מותאמים אישית'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawBackgroundElements();
    };

    const drawBackgroundElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;

      // רשת רקע דקה כמו בתוכניות הנדסה
      const gridSize = 20;
      for (let x = 0; x <= canvasWidth; x += gridSize) {
        rc.line(x, 0, x, canvasHeight, {
          stroke: '#e8e8e8',
          strokeWidth: 0.5,
          roughness: 0.5
        });
      }
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        rc.line(0, y, canvasWidth, y, {
          stroke: '#e8e8e8',
          strokeWidth: 0.5,
          roughness: 0.5
        });
      }

      // קווי ציון וכותרות הנדסיות
      rc.line(50, 50, canvasWidth - 50, 50, {
        stroke: '#000000',
        strokeWidth: 2,
        roughness: 1.2
      });

      // כותרת הנדסית
      ctx.font = '12px monospace';
      ctx.fillStyle = '#000000';
      ctx.fillText('WOODCRAFT STUDIO - TECHNICAL DRAWING', 60, 45);
      ctx.fillText('SCALE: 1:100', canvasWidth - 150, 45);

      // חץ צפון
      const northX = canvasWidth - 80;
      const northY = 80;
      rc.line(northX, northY, northX, northY - 30, {
        stroke: '#000000',
        strokeWidth: 2,
        roughness: 1
      });
      rc.polygon([[northX - 5, northY - 25], [northX + 5, northY - 25], [northX, northY - 35]], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        roughness: 1
      });
      ctx.font = '10px monospace';
      ctx.fillText('N', northX - 3, northY + 15);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <>
      <section 
        id="technical-services"
        ref={sectionRef}
        className={`${styles.technicalCards} ${className}`}
      >
        <canvas ref={canvasRef} className={styles.backgroundCanvas} />
        
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>השירותים שלנו</h2>
            <p className={styles.subtitle}>תכניות טכניות ופתרונות מקצועיים</p>
          </div>

          <div className={styles.cardsGrid}>
            {services.map((service, index) => (
              <TechnicalCard 
                key={service.id} 
                service={service} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* פוטר צף - מופיע רק כשלא רואים את הסקשן */}
      <FloatingServicesFooter isVisible={!isSectionVisible} />
    </>
  );
};

interface TechnicalCardProps {
  service: Service;
  index: number;
}

const TechnicalCard: React.FC<TechnicalCardProps> = ({ service, index }) => {
  const cardCanvasRef = useRef<HTMLCanvasElement>(null);
  const buttonCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cardCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawTechnicalElements();
    };

    const drawTechnicalElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      
      // התאמה רספונסיבית לגודל הכרטיס
      const isMobile = h <= 150; // כרטיס קטן (מובייל)
      const isTablet = h > 150 && h <= 300; // כרטיס בינוני (טאבלט)
      
      // הגדלות דינמיות לפי גודל המסך
      const margin = isMobile ? 8 : 15; // מרווח מהקצה
      const strokeWidth = isMobile ? 1.5 : 2; // עובי קו
      const textSize = isMobile ? 8 : 10; // גודל טקסט

      // הגדרת רדיוסים רספונסיביים וצבעי עט לפי כרטיס
      const baseRadiusConfigs = [
        { topLeft: 20, topRight: 8, bottomRight: 25, bottomLeft: 12 },   // כרטיס 1
        { topLeft: 15, topRight: 30, bottomRight: 10, bottomLeft: 22 }, // כרטיס 2  
        { topLeft: 12, topRight: 18, bottomRight: 28, bottomLeft: 6 }    // כרטיס 3
      ];
      
      // התאמת רדיוסים לגודל המסך
      const radiusScale = isMobile ? 0.6 : (isTablet ? 0.8 : 1);
      const baseConfig = baseRadiusConfigs[index] || baseRadiusConfigs[0];
      const radiusConfig = {
        topLeft: Math.max(6, Math.round(baseConfig.topLeft * radiusScale)),
        topRight: Math.max(4, Math.round(baseConfig.topRight * radiusScale)),
        bottomRight: Math.max(6, Math.round(baseConfig.bottomRight * radiusScale)),
        bottomLeft: Math.max(4, Math.round(baseConfig.bottomLeft * radiusScale))
      };
      
      // צבעי עט לכל כרטיס
      const penColors = ['#d32f2f', '#1976d2', '#388e3c']; // אדום, כחול, ירוק
      const penColor = penColors[index] || '#d32f2f';
      
      const { topLeft: topLeftRadius, topRight: topRightRadius, bottomRight: bottomRightRadius, bottomLeft: bottomLeftRadius } = radiusConfig;

      // מסגרת הכרטיס עם רדיוס לא סימטרי (דינמי לפי גודל)
      const cardPath = `M${margin + topLeftRadius},${margin} 
        L${w - margin - topRightRadius},${margin} 
        Q${w - margin},${margin} ${w - margin},${margin + topRightRadius}
        L${w - margin},${h - margin - bottomRightRadius}
        Q${w - margin},${h - margin} ${w - margin - bottomRightRadius},${h - margin}
        L${margin + bottomLeftRadius},${h - margin}
        Q${margin},${h - margin} ${margin},${h - margin - bottomLeftRadius}
        L${margin},${margin + topLeftRadius}
        Q${margin},${margin} ${margin + topLeftRadius},${margin} Z`;

      rc.path(cardPath, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: 1.5,
        fill: '#ffffff',
        fillStyle: 'solid'
      });

      // סימוני זוויות מחוץ לרדיוס - רק במסכים גדולים ופינות גדולות
      const minRadiusForAnnotation = isMobile ? 10 : 12;
      
      // הגדרת משתנים לאלמנטים הנדסיים (כדי שיהיו זמינים לכל הפינות)
      const lineExtension = isMobile ? 12 : 20;
      const arcSize = isMobile ? 18 : 25;
      const arcOffset = isMobile ? 6 : 10;
      const textOffset = isMobile ? 18 : 25;
      
      // פינה שמאל עליון - אם יש רדיוס גדול ולא במובייל קטן מדי
      if (!isMobile && topLeftRadius >= minRadiusForAnnotation) {
        const centerX = margin + topLeftRadius;
        const centerY = margin + topLeftRadius;
        
        // קו מהמרכז החוצה לציון הרדיוס (רספונסיבי)
        rc.line(centerX, centerY, centerX - topLeftRadius - lineExtension, centerY - topLeftRadius - lineExtension, {
          stroke: penColor,
          strokeWidth: strokeWidth * 0.8,
          strokeLineDash: [3, 3],
          roughness: 1.2
        });
        
        // קשת הזווית מחוץ לרדיוס (קטנה יותר במובייל)
        rc.arc(centerX - topLeftRadius - arcOffset, centerY - topLeftRadius - arcOffset, arcSize, arcSize, 0, Math.PI * 0.5, false, {
          stroke: penColor,
          strokeWidth: strokeWidth * 0.7,
          roughness: 1.3
        });
        
        // כתב יד לרדיוס (קטן יותר במובייל)
        ctx.font = `${textSize}px serif`;
        ctx.fillStyle = penColor;
        ctx.save();
        ctx.translate(centerX - topLeftRadius - textOffset, centerY - topLeftRadius - textOffset);
        ctx.rotate(-0.1);
        ctx.fillText(`R${topLeftRadius}`, 0, 0);
        ctx.restore();
      }
      
      // פינה ימין עליון - אם יש רדיוס גדול ולא במובייל קטן מדי
      if (!isMobile && topRightRadius >= minRadiusForAnnotation) {
        const centerX = w - margin - topRightRadius;
        const centerY = margin + topRightRadius;
        
        // קו מהמרכז החוצה (רספונסיבי)
        rc.line(centerX, centerY, centerX + topRightRadius + lineExtension, centerY - topRightRadius - lineExtension, {
          stroke: penColor,
          strokeWidth: strokeWidth * 0.8,
          strokeLineDash: [3, 3],
          roughness: 1.2
        });
        
        // קשת הזווית (רספונסיבי)
        rc.arc(centerX + topRightRadius + arcOffset, centerY - topRightRadius - arcOffset, arcSize, arcSize, Math.PI * 0.5, Math.PI, false, {
          stroke: penColor,
          strokeWidth: strokeWidth * 0.7,
          roughness: 1.3
        });
        
        // כתב יד לרדיוס (רספונסיבי)
        ctx.font = `${textSize}px serif`;
        ctx.fillStyle = penColor;
        ctx.save();
        ctx.translate(centerX + topRightRadius + (textOffset * 0.6), centerY - topRightRadius - textOffset);
        ctx.rotate(0.1);
        ctx.fillText(`R${topRightRadius}`, 0, 0);
        ctx.restore();
      }
      
      // פינה ימין תחתון - אם יש רדיוס גדול ולא במובייל קטן מדי
      if (!isMobile && bottomRightRadius >= minRadiusForAnnotation) {
        const centerX = w - margin - bottomRightRadius;
        const centerY = h - margin - bottomRightRadius;
        
        // קו מהמרכז החוצה
        rc.line(centerX, centerY, centerX + bottomRightRadius + 20, centerY + bottomRightRadius + 20, {
          stroke: penColor,
          strokeWidth: 1.5,
          strokeLineDash: [4, 4],
          roughness: 1.2
        });
        
        // קשת הזווית
        rc.arc(centerX + bottomRightRadius + 10, centerY + bottomRightRadius + 10, 25, 25, Math.PI, Math.PI * 1.5, false, {
          stroke: penColor,
          strokeWidth: 1.2,
          roughness: 1.3
        });
        
        // כתב יד לרדיוס
        ctx.font = '10px serif';
        ctx.fillStyle = penColor;
        ctx.save();
        ctx.translate(centerX + bottomRightRadius + 15, centerY + bottomRightRadius + 25);
        ctx.rotate(-0.1);
        ctx.fillText(`R${bottomRightRadius}`, 0, 0);
        ctx.restore();
      }
      
      // פינה שמאל תחתון - אם יש רדיוס גדול
      if (bottomLeftRadius >= 15) {
        const centerX = 15 + bottomLeftRadius;
        const centerY = h - 15 - bottomLeftRadius;
        
        // קו מהמרכז החוצה
        rc.line(centerX, centerY, centerX - bottomLeftRadius - 20, centerY + bottomLeftRadius + 20, {
          stroke: penColor,
          strokeWidth: 1.5,
          strokeLineDash: [4, 4],
          roughness: 1.2
        });
        
        // קשת הזווית
        rc.arc(centerX - bottomLeftRadius - 10, centerY + bottomLeftRadius + 10, 25, 25, Math.PI * 1.5, Math.PI * 2, false, {
          stroke: penColor,
          strokeWidth: 1.2,
          roughness: 1.3
        });
        
        // כתב יד לרדיוס
        ctx.font = '10px serif';
        ctx.fillStyle = penColor;
        ctx.save();
        ctx.translate(centerX - bottomLeftRadius - 25, centerY + bottomLeftRadius + 15);
        ctx.rotate(0.1);
        ctx.fillText(`R${bottomLeftRadius}`, 0, 0);
        ctx.restore();
      }

      // מדידות וסימונים הנדסיים - רק במסכים גדולים
      if (!isMobile) {
        // מדידת רוחב בחלק העליון
        const measureY = 35;
        const measureStartX = 50;
        const measureEndX = w - 50;
      
      // קו המדידה הראשי
      rc.line(measureStartX, measureY, measureEndX, measureY, {
        stroke: penColor,
        strokeWidth: 1,
        roughness: 1.2
      });

      // קווי התחמה
      rc.line(measureStartX, measureY - 5, measureStartX, measureY + 5, {
        stroke: penColor,
        strokeWidth: 1,
        roughness: 1
      });
      rc.line(measureEndX, measureY - 5, measureEndX, measureY + 5, {
        stroke: penColor,
        strokeWidth: 1,
        roughness: 1
      });

      // חיצים
      rc.polygon([[measureStartX + 8, measureY - 3], [measureStartX + 8, measureY + 3], [measureStartX + 2, measureY]], {
        stroke: penColor,
        fill: penColor,
        fillStyle: 'solid',
        roughness: 1
      });
      rc.polygon([[measureEndX - 8, measureY - 3], [measureEndX - 8, measureY + 3], [measureEndX - 2, measureY]], {
        stroke: penColor,
        fill: penColor,
        fillStyle: 'solid',
        roughness: 1
      });

      // כתב יד למידה
      const measurements = ['24cm', '18cm', '32cm'];
      ctx.font = '12px serif';
      ctx.fillStyle = penColor;
      ctx.save();
      ctx.translate((measureStartX + measureEndX) / 2, measureY - 10);
      ctx.rotate(-0.05); // סיבוב קל לכתב יד
      ctx.fillText(measurements[index], -15, 0);
      ctx.restore();

      // קווי עזר ושרטוטי פרטים נוספים
      if (index === 0) {
        // כרטיס ראשון - פרטי חיבור
        rc.circle(w - 40, h - 40, 15, {
          stroke: penColor,
          strokeWidth: 1,
          roughness: 1.5
        });
        ctx.font = '8px monospace';
        ctx.fillStyle = penColor;
        ctx.fillText('DETAIL A', w - 70, h - 20);
      } else if (index === 1) {
        // כרטיס שני - חתך
        rc.line(w - 60, h - 50, w - 20, h - 20, {
          stroke: penColor,
          strokeWidth: 1.5,
          strokeLineDash: [5, 5],
          roughness: 1.2
        });
        ctx.fillStyle = penColor;
        ctx.fillText('SECTION B-B', w - 80, h - 10);
      } 
      // else {
      //   // כרטיס שלישי - הערה
      //   rc.rectangle(w - 80, h - 50, 60, 20, {
      //     stroke: penColor,
      //     strokeWidth: 1,
      //     roughness: 1.5
      //   });
      //   ctx.font = '7px monospace';
      //   ctx.fillStyle = penColor;
      //   ctx.fillText('SEE DWG', w - 75, h - 35);
      //   ctx.fillText('NO. 001', w - 70, h - 25);
      // }

      // מספור הכרטיס
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = penColor;
      ctx.fillText(`${String(index + 1).padStart(2, '0')}`, 25, h - 25);
      } // סגירת התנאי !isMobile
    };

    const timer = setTimeout(() => {
      updateCanvasSize();
    }, index * 300);

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [index]);

  // useEffect נפרד לכפתור עם עיגולי ציור יד
  useEffect(() => {
    const canvas = buttonCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateButtonCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawButtonElements();
    };

    const drawButtonElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // וידוא שהcanvas שקוף לחלוטין
      ctx.globalCompositeOperation = 'source-over';
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // מרכז הכפתור
      const centerX = w / 2;
      const centerY = h / 2;

      // קבלת אותו הצבע כמו הכרטיס
      const penColors = ['#d32f2f', '#1976d2', '#388e3c']; // אדום, כחול, ירוק
      const penColor = penColors[index] || '#d32f2f';

      // גודל המסגרת (mobile-first: מתחיל קטן יותר)
      const buttonWidth = w * 0.7;
      const buttonHeight = h * 0.45;
      
      // קואורדינטות הפינות
      const left = centerX - buttonWidth / 2;
      const right = centerX + buttonWidth / 2;
      const top = centerY - buttonHeight / 2;
      const bottom = centerY + buttonHeight / 2;

      // כרטיס 2 יהיה לא סגור (חסר הקו התחתון)
      if (index === 1) {
        // מסגרת לא סגורה - קווים נפרדים דקים
        // קו עליון
        rc.line(left, top, right, top, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
        // קו ימני
        rc.line(right, top, right, bottom - 5, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
        // קו שמאלי
        rc.line(left, top, left, bottom - 5, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
        // הקו התחתון חסר - זה מה שעושה אותו פתוח
      } else {
        // מסגרת סגורה - קווים נפרדים דקים
        // קו עליון
        rc.line(left, top, right, top, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
        // קו ימני
        rc.line(right, top, right, bottom, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
        // קו תחתון
        rc.line(right, bottom, left, bottom, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
        // קו שמאלי
        rc.line(left, bottom, left, top, {
          stroke: penColor, strokeWidth: 1.5, roughness: 2.5, bowing: 1.5
        });
      }


    };

    const timer = setTimeout(() => {
      updateButtonCanvasSize();
    }, index * 300 + 600); // מעט אחרי הכרטיס

    window.addEventListener('resize', updateButtonCanvasSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateButtonCanvasSize);
    };
  }, [index]);

  return (
    <div 
      className={styles.card}
      style={{
        animationDelay: `${index * 200}ms`
      }}
    >
      <canvas ref={cardCanvasRef} className={styles.cardCanvas} />
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardSubtitle}>{service.subtitle}</p>
        <p className={styles.cardDescription}>{service.description}</p>

        <div className={styles.buttonWrapper}>
          <canvas ref={buttonCanvasRef} className={styles.buttonCanvas} />
          <button className={styles.ctaButton}>
            <span>תוכנית מפורטת</span>
            <svg width="80" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};