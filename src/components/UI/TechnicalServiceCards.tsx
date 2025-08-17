import React, { useRef, useEffect } from 'react';
import rough from 'roughjs';
import styles from './TechnicalServiceCards.module.css';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import FloatingServicesFooter from './FloatingServicesFooter';
import { Link } from 'react-router-dom';

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
      id: 'one-stop-shop',
      title: 'one stop shop לעסק שלך',
      subtitle: 'ליווי מקצה לקצה',
      description: 'מהרעיון ועד פתיחת העסק – תהליך מלא ומדויק'
    },
    {
      id: 'architects', 
      title: 'אדריכלים AND MORE',
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
  const buttonCanvasRef = useRef<HTMLCanvasElement>(null);
  const arrowCanvasRef = useRef<HTMLCanvasElement>(null);
  const measurementCanvasRef = useRef<HTMLCanvasElement>(null);
  const radiusCanvasRef = useRef<HTMLCanvasElement>(null);
  const widthMeasurementCanvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect למדידה אנכית - רק בכרטיס הראשון
  useEffect(() => {
    if (index !== 0) return; // רק בכרטיס הראשון
    
    const canvas = measurementCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateMeasurementCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawMeasurement();
    };

    const drawMeasurement = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // התאמה לגדלי מסך שונים - בודק גם רוחב מסך
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 768;
      
      // הציור רק אם יש מספיק מקום
      if (isMobile && screenWidth < 500) return; // לא מציג במסכים קטנים מדי
      if (w < 250 || h < 150) return;

      // פס מדידה אנכי - התאמה למובייל
      const measureX = isMobile ? w - 40 : w - 70; // קרוב יותר במובייל
      const measureStartY = isMobile ? 8 : 12;
      const measureEndY = h - (isMobile ? 5 : 8);

      // גדלים דינמיים למובייל
      const strokeWidth = isMobile ? 2.5 : 3;
      const lineTerminationLength = isMobile ? 6 : 8;
      const arrowSize = isMobile ? 3.5 : 4;
      const fontSize = isMobile ? '16px' : '24px'; // פונט גדול יותר במובייל
      const textOffset = isMobile ? 25 : 35;

      // קו המדידה הראשי
      rc.line(measureX, measureStartY, measureX, measureEndY, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: isMobile ? 2 : 3,
        bowing: isMobile ? 1.5 : 2.5
      });

      // קווי התחמה עליון ותחתון
      rc.line(measureX - lineTerminationLength, measureStartY, measureX + lineTerminationLength, measureStartY, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: 1.3
      });
      rc.line(measureX - lineTerminationLength, measureEndY, measureX + lineTerminationLength, measureEndY, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: 1.3
      });

      // חיצים עליון ותחתון - קטנים יותר במובייל
      rc.polygon([
        [measureX - arrowSize, measureStartY + (isMobile ? 8 : 12)], 
        [measureX + arrowSize, measureStartY + (isMobile ? 8 : 12)], 
        [measureX, measureStartY + 3]
      ], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        strokeWidth: strokeWidth - 1,
        roughness: 1.1
      });
      rc.polygon([
        [measureX - arrowSize, measureEndY - (isMobile ? 8 : 12)], 
        [measureX + arrowSize, measureEndY - (isMobile ? 8 : 12)], 
        [measureX, measureEndY - 3]
      ], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        strokeWidth: strokeWidth - 1,
        roughness: 1.1
      });

      // טקסט - קטן יותר במובייל
      ctx.font = `bold ${fontSize} MiriWin, serif`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(measureX + textOffset, (measureStartY + measureEndY) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(isMobile ? '8ס״מ' : '10 ס״מ', 0, 0);
      ctx.restore();
    };

    // ביצוע מיידי ועם השהיה
    updateMeasurementCanvas();
    const timer = setTimeout(() => {
      updateMeasurementCanvas();
    }, 1000); // השהיה לוודא שהכל נטען

    window.addEventListener('resize', updateMeasurementCanvas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateMeasurementCanvas);
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
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // מסגרת פשוטה עם rough.js
      const margin = 5;
      rc.rectangle(margin, margin, w - margin * 2, h - margin * 2, {
        stroke: '#333333',
        strokeWidth: 1.5,
        roughness: 1.8,
        bowing: 0.5,
        fill: 'transparent'
      });
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

  // useEffect לציור חץ Rough.js
  useEffect(() => {
    const canvas = arrowCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateArrowCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawArrow();
    };

    const drawArrow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // חץ גדול בRough.js
      const centerX = w / 2;
      const centerY = h / 2;
      const arrowSize = 10;

      // ציור חץ שמאלה - משולש עם קו
      // ראש החץ (מצביע שמאלה)
      rc.polygon([
        [centerX - arrowSize, centerY],
        [centerX - 2, centerY - 6],
        [centerX - 2, centerY + 6]
      ], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        strokeWidth: 2,
        roughness: 2,
        bowing: 1
      });

      // גוף החץ
      rc.line(centerX - 2, centerY, centerX + arrowSize, centerY, {
        stroke: '#000000',
        strokeWidth: 3,
        roughness: 2,
        bowing: 0.5
      });
    };

    updateArrowCanvas();
    const timer = setTimeout(() => {
      updateArrowCanvas();
    }, 1200); // אחרי הכפתור

    window.addEventListener('resize', updateArrowCanvas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateArrowCanvas);
    };
  }, [index]);

  // useEffect לסימון רדיוס - רק בכרטיס השני
  useEffect(() => {
    if (index !== 1) return; // רק בכרטיס השני
    
    const canvas = radiusCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateRadiusCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawRadiusAnnotation();
    };

    const drawRadiusAnnotation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // התאמה לגדלי מסך שונים - בודק גם רוחב מסך
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 768;
      
      // הציור רק אם יש מספיק מקום
      if (isMobile && screenWidth < 500) return; // לא מציג במסכים קטנים מדי
      if (w < 250 || h < 150) return;

      // נקודת מרכז הפינה השמאלית התחתונה - יחסי לקונטיינר
      const borderRadius = 32;
      const cornerX = borderRadius;
      const cornerY = h - borderRadius;
      
      // גדלים דינמיים למובייל
      const strokeWidth = isMobile ? 2 : 2.5;
      const dashLength = isMobile ? 3 : 4;
      const lineLength = isMobile ? 15 : 20;
      const verticalOffset = isMobile ? 40 : 65;
      const arrowLength = isMobile ? 35 : 50;
      const fontSize = isMobile ? '14px' : '16px'; // פונט גדול יותר במובייל
      
      // קו מקווקו מהפינה למרכז הרדיוס - קצר יותר במובייל
      const lineEndX = cornerX + lineLength;
      const lineEndY = cornerY - verticalOffset;
      rc.line(cornerX, cornerY, lineEndX, lineEndY, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: isMobile ? 1.5 : 2,
        strokeLineDash: [dashLength, dashLength],
        bowing: 0.5
      });

      // חץ עם מידה - מתחיל מסוף הקו המקווקו
      const arrowStartX = lineEndX + (isMobile ? 5 : 10);
      const arrowStartY = lineEndY;

      // קו הבסיס של החץ - קצר יותר במובייל
      rc.line(arrowStartX, arrowStartY, arrowStartX + arrowLength, arrowStartY, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: 1.5,
        bowing: 0.3
      });

      // ראש החץ - קטן יותר במובייל
      const arrowHeadSize = isMobile ? 3 : 5;
      rc.polygon([
        [arrowStartX + arrowLength + 2, arrowStartY],
        [arrowStartX + arrowLength - arrowHeadSize, arrowStartY - arrowHeadSize],
        [arrowStartX + arrowLength - arrowHeadSize, arrowStartY + arrowHeadSize]
      ], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        strokeWidth: strokeWidth - 0.5,
        roughness: 1.2
      });

      // טקסט המידה - קטן יותר במובייל
      ctx.font = `bold ${fontSize} MiriWin, serif`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      const radiusText = isMobile ? 'R=3ס״מ' : 'R=32px';
      ctx.fillText(radiusText, arrowStartX + arrowLength + (isMobile ? 5 : 8), arrowStartY + 5);
    };

    updateRadiusCanvas();
    const timer = setTimeout(() => {
      updateRadiusCanvas();
    }, 1500); // אחרי שהכל נטען

    window.addEventListener('resize', updateRadiusCanvas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRadiusCanvas);
    };
  }, [index]);

  // useEffect למדידת רוחב - רק בכרטיס השלישי
  useEffect(() => {
    if (index !== 2) return; // רק בכרטיס השלישי
    
    const canvas = widthMeasurementCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateWidthMeasurementCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawWidthMeasurement();
    };

    const drawWidthMeasurement = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // התאמה לגדלי מסך שונים - בודק גם רוחב מסך
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 768;
      
      // הציור רק אם יש מספיק מקום
      if (isMobile && screenWidth < 500) return; // לא מציג במסכים קטנים מדי
      if (w < 250 || h < 150) return;

      // פס מדידה אופקי - התאמה למובייל
      const measureY = 40;
      const marginSide = isMobile ? 8 : 12;
      const measureStartX = marginSide;
      const measureEndX = w - marginSide;

      // גדלים דינמיים למובייל
      const strokeWidth = isMobile ? 2.5 : 3;
      const lineTerminationLength = isMobile ? 6 : 8;
      const arrowDistance = isMobile ? 10 : 12;
      const arrowSize = isMobile ? 3.5 : 4;
      const fontSize = isMobile ? '16px' : '24px'; // פונט גדול יותר במובייל

      // קו המדידה הראשי
      rc.line(measureStartX, measureY, measureEndX, measureY, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: isMobile ? 2 : 3,
        bowing: isMobile ? 1.5 : 2.5
      });

      // קווי התחמה שמאלי וימני
      rc.line(measureStartX, measureY - lineTerminationLength, measureStartX, measureY + lineTerminationLength, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: 1.3
      });
      rc.line(measureEndX, measureY - lineTerminationLength, measureEndX, measureY + lineTerminationLength, {
        stroke: '#000000',
        strokeWidth: strokeWidth,
        roughness: 1.3
      });

      // חיצים שמאלי וימני - קטנים יותר במובייל
      rc.polygon([
        [measureStartX + arrowDistance, measureY - arrowSize], 
        [measureStartX + arrowDistance, measureY + arrowSize], 
        [measureStartX + 3, measureY]
      ], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        strokeWidth: strokeWidth - 1,
        roughness: 1.1
      });
      rc.polygon([
        [measureEndX - arrowDistance, measureY - arrowSize], 
        [measureEndX - arrowDistance, measureY + arrowSize], 
        [measureEndX - 3, measureY]
      ], {
        stroke: '#000000',
        fill: '#000000',
        fillStyle: 'solid',
        strokeWidth: strokeWidth - 1,
        roughness: 1.1
      });

      // טקסט - קטן יותר במובייל
      ctx.font = `bold ${fontSize} MiriWin, serif`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      const widthText = isMobile ? '6ס״מ' : '8 ס״מ';
      ctx.fillText(widthText, (measureStartX + measureEndX) / 2, measureY - 10);
    };

    // ביצוע מיידי ועם השהיה
    updateWidthMeasurementCanvas();
    const timer = setTimeout(() => {
      updateWidthMeasurementCanvas();
    }, 1000);

    window.addEventListener('resize', updateWidthMeasurementCanvas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidthMeasurementCanvas);
    };
  }, [index]);

  return (
    <div 
      className={styles.card}
      style={{
        animationDelay: `${index * 200}ms`
      }}
    >
      {/* Canvas למדידה - רק בכרטיס הראשון */}
      {index === 0 && <canvas ref={measurementCanvasRef} className={styles.measurementCanvas} />}
      
      {/* Canvas לסימון רדיוס - רק בכרטיס השני */}
      {index === 1 && <canvas ref={radiusCanvasRef} className={styles.radiusCanvas} />}
      
      {/* Canvas למדידת רוחב - רק בכרטיס השלישי */}
      {index === 2 && <canvas ref={widthMeasurementCanvasRef} className={styles.widthMeasurementCanvas} />}
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardSubtitle}>{service.subtitle}</p>
        <p className={styles.cardDescription}>{service.description}</p>

        <div className={styles.buttonWrapper}>
          <div className={styles.buttonMarkerBg}></div>
          <canvas ref={buttonCanvasRef} className={styles.buttonCanvas} />
          <Link to={service.id === 'one-stop-shop' ? '/services/one-stop-shop#hero' : `/services#${service.id}`} className={styles.ctaButton} aria-label={`נווט לעמוד השירותים - ${service.title}`}>
            <span>בואו נתחיל</span>
          </Link>
          <canvas ref={arrowCanvasRef} className={styles.roughArrowCanvas} />
        </div>
      </div>
    </div>
  );
};