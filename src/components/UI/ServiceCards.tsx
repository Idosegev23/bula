import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import rough from 'roughjs';
import styles from './ServiceCards.module.css';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

interface ServiceCardsProps {
  className?: string;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const services: Service[] = [
    {
      id: 'one-stop-shop',
      title: 'one stop shop לעסק שלך',
      subtitle: 'ליווי מקצה לקצה',
      description: 'מהרעיון ועד פתיחת העסק – תהליך מלא ומדויק',
      icon: '🧭',
      color: '#FF6B35'
    },
    {
      id: 'architects',
      title: 'אדריכלים AND MORE',
      subtitle: 'לאדריכלים ומעצבים',
      description: 'שירותים טכניים מתקדמים ופתרונות יצירתיים מורכבים',
      icon: '📐',
      color: '#4ECDC4'
    },
    {
      id: 'private',
      title: 'רהיטים פרטיים',
      subtitle: 'ללקוחות פרטיים',
      description: 'ייצור רהיטים מותאמים אישית לבית ולמשרד',
      icon: '🪑',
      color: '#45B7D1'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // הגדרת גודל Canvas
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawRoughElements();
    };

    const drawRoughElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      // רקע עם פיזור נקודות אקראי
      for (let i = 0; i < 50; i++) {
        rc.circle(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          1 + Math.random() * 2,
          {
            fill: '#e8e8e8',
            fillStyle: 'solid',
            stroke: 'none',
            roughness: 2 + Math.random()
          }
        );
      }

      // כתמי צבע אורגניים במקום עיגולים גיאומטריים
      const blob1Path = `M${30 + Math.random() * 20},${40 + Math.random() * 20}
        Q${80 + Math.random() * 30},${20 + Math.random() * 20} ${120 + Math.random() * 20},${60 + Math.random() * 30}
        Q${100 + Math.random() * 25},${100 + Math.random() * 25} ${60 + Math.random() * 20},${90 + Math.random() * 20}
        Q${40 + Math.random() * 15},${70 + Math.random() * 15} ${30 + Math.random() * 20},${40 + Math.random() * 20} Z`;

      rc.path(blob1Path, {
        stroke: '#FFE066',
        strokeWidth: 1.5 + Math.random(),
        fill: '#FFE066',
        fillStyle: 'hachure',
        hachureGap: 6 + Math.random() * 4,
        roughness: 2.5 + Math.random(),
        bowing: 2 + Math.random(),
        hachureAngle: Math.random() * 180
      });

      // כתם צבע שני
      const blob2Path = `M${canvasWidth - 80 + Math.random() * 20},${60 + Math.random() * 30}
        Q${canvasWidth - 40 + Math.random() * 15},${30 + Math.random() * 20} ${canvasWidth - 20 + Math.random() * 10},${80 + Math.random() * 25}
        Q${canvasWidth - 50 + Math.random() * 20},${120 + Math.random() * 30} ${canvasWidth - 90 + Math.random() * 25},${100 + Math.random() * 20}
        Q${canvasWidth - 110 + Math.random() * 20},${70 + Math.random() * 15} ${canvasWidth - 80 + Math.random() * 20},${60 + Math.random() * 30} Z`;

      rc.path(blob2Path, {
        stroke: '#FF6B35',
        strokeWidth: 1.5 + Math.random(),
        fill: '#FF6B35',
        fillStyle: Math.random() > 0.5 ? 'zigzag' : 'dots',
        roughness: 2 + Math.random(),
        bowing: 1.5 + Math.random(),
        fillWeight: 1 + Math.random()
      });

      // קווים מתפתלים במקום קווים ישרים
      const wavyLine: [number, number][] = [];
      const steps = 20;
      const baseY = canvasHeight - 40;
      for (let i = 0; i <= steps; i++) {
        const x = (canvasWidth / steps) * i;
        const y = baseY + Math.sin(i * 0.3) * 10 + Math.random() * 5 - 2.5;
        wavyLine.push([x, y]);
      }
      
      rc.curve(wavyLine, {
        stroke: '#4ECDC4',
        strokeWidth: 2 + Math.random(),
        roughness: 2 + Math.random(),
        bowing: 1 + Math.random()
      });

      // צורות אורגניות קטנות פזורות
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        const size = 5 + Math.random() * 15;
        
        if (Math.random() > 0.6) {
          // עיגולים לא סדירים
          rc.circle(x, y, size, {
            stroke: '#45B7D1',
            strokeWidth: 1 + Math.random(),
            fill: Math.random() > 0.7 ? '#45B7D1' : 'none',
            fillStyle: 'cross-hatch',
            fillWeight: 0.5 + Math.random() * 0.5,
            roughness: 2.5 + Math.random(),
            bowing: 1.5 + Math.random()
          });
        } else {
          // משולשים לא סדירים
          const triangle: [number, number][] = [
            [x, y],
            [x + size * (0.5 + Math.random() * 0.5), y + size * (0.8 + Math.random() * 0.4)],
            [x - size * (0.5 + Math.random() * 0.5), y + size * (0.8 + Math.random() * 0.4)]
          ];
          rc.polygon(triangle, {
            stroke: '#9B59B6',
            strokeWidth: 1 + Math.random(),
            fill: Math.random() > 0.8 ? '#9B59B6' : 'none',
            fillStyle: 'hachure',
            roughness: 2 + Math.random(),
            bowing: 1 + Math.random()
          });
        }
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <section className={`${styles.serviceCards} ${className}`}>
      <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>השירותים שלנו</h2>
          <p className={styles.subtitle}>פתרונות מקצועיים ויצירתיים בעיצוב וייצור</p>
        </div>

        <div className={styles.cardsGrid}>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const cardCanvasRef = useRef<HTMLCanvasElement>(null);

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
      drawCardElements();
    };

    const drawCardElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rc = rough.canvas(canvas);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // צורת כרטיס לא סדירה יותר - כמו ציור יד
      const cardPath = `M${15 + Math.random() * 5},${10 + Math.random() * 5} 
        Q${w/4 + Math.random() * 10},${5 + Math.random() * 8} ${w/2 + Math.random() * 5},${8 + Math.random() * 6}
        Q${3*w/4 + Math.random() * 8},${12 + Math.random() * 5} ${w - 15 + Math.random() * 5},${20 + Math.random() * 8}
        L${w - 8 + Math.random() * 4},${h/3 + Math.random() * 10}
        Q${w - 5 + Math.random() * 3},${2*h/3 + Math.random() * 12} ${w - 12 + Math.random() * 6},${h - 25 + Math.random() * 8}
        Q${3*w/4 + Math.random() * 10},${h - 8 + Math.random() * 4} ${w/2 + Math.random() * 8},${h - 5 + Math.random() * 6}
        Q${w/4 + Math.random() * 8},${h - 10 + Math.random() * 5} ${12 + Math.random() * 6},${h - 18 + Math.random() * 7}
        L${8 + Math.random() * 4},${2*h/3 + Math.random() * 10}
        Q${5 + Math.random() * 3},${h/3 + Math.random() * 8} ${15 + Math.random() * 5},${10 + Math.random() * 5} Z`;

      // מסגרת כרטיס אורגנית
      rc.path(cardPath, {
        stroke: service.color,
        strokeWidth: 3 + Math.random(),
        fill: '#ffffff',
        fillStyle: 'solid',
        roughness: 2.5 + Math.random(),
        bowing: 3 + Math.random() * 2
      });

      // כתם צבע אורגני במקום מלבן
      const blobPath = `M${25 + Math.random() * 10},${25 + Math.random() * 8}
        Q${w/3 + Math.random() * 15},${15 + Math.random() * 10} ${2*w/3 + Math.random() * 12},${30 + Math.random() * 12}
        Q${w - 30 + Math.random() * 8},${45 + Math.random() * 15} ${w - 40 + Math.random() * 10},${70 + Math.random() * 10}
        Q${2*w/3 + Math.random() * 12},${80 + Math.random() * 8} ${w/3 + Math.random() * 15},${75 + Math.random() * 6}
        Q${30 + Math.random() * 8},${60 + Math.random() * 12} ${25 + Math.random() * 10},${25 + Math.random() * 8} Z`;

      rc.path(blobPath, {
        stroke: service.color,
        strokeWidth: 2,
        fill: service.color,
        fillStyle: 'hachure',
        hachureAngle: 30 + (index * 45) + Math.random() * 20,
        hachureGap: 4 + Math.random() * 3,
        roughness: 2 + Math.random(),
        bowing: 2 + Math.random()
      });

      // עיגולים לא סדירים במקום עיגולים מושלמים
      const circleSize = 20 + Math.random() * 15;
      rc.circle(
        w - 50 + Math.random() * 20, 
        50 + Math.random() * 20, 
        circleSize, 
        {
          stroke: service.color,
          strokeWidth: 2 + Math.random(),
          fill: service.color,
          fillStyle: Math.random() > 0.5 ? 'dots' : 'zigzag',
          fillWeight: 1 + Math.random(),
          roughness: 2.5 + Math.random(),
          bowing: 2 + Math.random()
        }
      );

      // קווי רקע לא סדירים
      const numLines = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numLines; i++) {
        const y = h - 60 + i * 15 + Math.random() * 10;
        rc.line(
          25 + Math.random() * 10, 
          y, 
          w - 25 - Math.random() * 10, 
          y + Math.random() * 6 - 3, 
          {
            stroke: service.color,
            strokeWidth: 1 + Math.random(),
            roughness: 1.5 + Math.random(),
            bowing: 1 + Math.random()
          }
        );
      }

      // נקודות אקראיות
      for (let i = 0; i < 5 + Math.floor(Math.random() * 3); i++) {
        rc.circle(
          20 + Math.random() * (w - 40),
          20 + Math.random() * (h - 40),
          2 + Math.random() * 3,
          {
            stroke: service.color,
            fill: service.color,
            fillStyle: 'solid',
            roughness: 3 + Math.random()
          }
        );
      }
    };

    const timer = setTimeout(() => {
      updateCanvasSize();
    }, index * 200); // עיכוב הדרגתי לכל כרטיס

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [service.color, index]);

  return (
    <div 
      className={styles.card}
      style={{
        animationDelay: `${index * 200}ms`
      }}
    >
      <canvas ref={cardCanvasRef} className={styles.cardCanvas} />
      
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{service.icon}</span>
        </div>
        
        <div className={styles.textContent}>
          <h3 className={styles.cardTitle}>{service.title}</h3>
          <p className={styles.cardSubtitle}>{service.subtitle}</p>
          <p className={styles.cardDescription}>{service.description}</p>
        </div>

        <Link
          to={
            service.id === 'one-stop-shop'
              ? '/services/one-stop-shop#hero'
              : service.id === 'architects'
              ? '/services/architects#hero'
              : `/services#${service.id}`
          }
          className={styles.ctaButton}
          style={{ '--card-color': service.color } as React.CSSProperties}
        >
          קרא עוד
        </Link>
      </div>
    </div>
  );
};