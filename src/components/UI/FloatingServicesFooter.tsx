import React, { useRef, useEffect, useState } from 'react';
import rough from 'roughjs';
import styles from './FloatingServicesFooter.module.css';

interface Service {
  id: string;
  title: string;
  subtitle: string;
}

interface FloatingServicesFooterProps {
  isVisible: boolean;
}

const services: Service[] = [
  {
    id: 'design',
    title: 'עיצוב אדריכלי',
    subtitle: 'תכנון ועיצוב'
  },
  {
    id: 'planning',
    title: 'ליווי וביצוע',
    subtitle: 'ניהול פרויקט'
  },
  {
    id: 'execution',
    title: 'יעוץ וליווי',
    subtitle: 'ייעוץ מקצועי'
  }
];

// רכיב כפתור עם מעגל כתב יד
const ServiceButton: React.FC<{ service: Service; index: number; onClick: () => void }> = ({ 
  service, 
  index, 
  onClick 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // התאמה לגודל האלמנט
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(scale, scale);

    // ניקוי מוחלט של כל המסך
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // וידוא שהCanvas שקוף לחלוטין ללא רקע
    ctx.globalAlpha = 1.0; 
    ctx.globalCompositeOperation = 'source-over';

    // ציור מעגל כתב יד עם Rough.js
    const rc = rough.canvas(canvas);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.45; // מעגל שתופס 90% מהכפתור

    // צבעים שונים לכל כפתור
    const colors = ['#d32f2f', '#1976d2', '#388e3c']; // אדום, כחול, ירוק
    const color = colors[index] || '#d32f2f';
    
    // ציור מעגל בכתב יד - רק קו, בלי מילוי כלל
    rc.circle(centerX, centerY, radius * 2, {
      stroke: color,
      strokeWidth: 2.2, // קו עב יותר
      roughness: 2.5, // חספוס למראה כתב יד
      bowing: 2.0, // עיוות טבעי
      fill: undefined, // אין מילוי - undefined במקום 'none'
      fillWeight: 0, // משקל מילוי אפס
      disableMultiStroke: false // מאפשר קווים מרובים לטבעיות
    });

  }, [index]);

  return (
    <div className={styles.service} onClick={onClick}>
      <canvas ref={canvasRef} className={styles.serviceCanvas} />
      <div className={styles.serviceContent}>
        <div className={styles.serviceTitle}>{service.title}</div>
        <div className={styles.serviceSubtitle}>{service.subtitle}</div>
      </div>
    </div>
  );
};

const FloatingServicesFooter: React.FC<FloatingServicesFooterProps> = ({ isVisible }) => {
  // השהיה קלה למניעת קפיצות
  const [delayedVisible, setDelayedVisible] = useState(false);

  useEffect(() => {
    let timer: number;
    
    if (isVisible) {
      // הופעה עם השהיה קטנה
      timer = setTimeout(() => {
        setDelayedVisible(true);
      }, 300); // 300ms השהיה
    } else {
      // היעלמות מיידית
      setDelayedVisible(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

    const handleServiceClick = () => {
    // גלילה חזרה לסקשן השירותים
    const servicesSection = document.getElementById('technical-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className={`${styles.floatingFooter} ${delayedVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.title}>השירותים שלנו</div>
        <div className={styles.services}>
          {services.map((service, index) => (
            <ServiceButton
              key={service.id}
              service={service}
              index={index}
                                onClick={handleServiceClick}
            />
          ))}
        </div>
        <div className={styles.closeButton} onClick={handleServiceClick}>
          ↑ חזרה לשירותים
        </div>
      </div>
    </div>
  );
};

export default FloatingServicesFooter;