// ComplexitySection - סקציית הבנת המורכבות עם סרט מדידה אינטראקטיבי
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ComplexitySection.module.css';

interface ComplexitySectionProps {
  className?: string;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentMeasurement, setCurrentMeasurement] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // השלבים של התהליך (בס"מ)
  const processSteps = [
    {
      id: 'planning',
      title: 'תכנון',
      description: 'מדידה מדויקת ותכנון פרויקט מפורט עם שימוש בטכנולוגיות מתקדמות',
      measurement: 15, // ס"מ
      position: 15, // אחוז במסלול
      backgroundImage: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M8 2L3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7L16 2H8Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 11H17" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 15H13" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="9" cy="12" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'design',
      title: 'עיצוב',
      description: 'יצירת תכניות מפורטות ותלת-ממד עם דגש על פונקציונליות ואסתטיקה',
      measurement: 35, // ס"מ
      position: 35, // אחוז במסלול
      backgroundImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'production',
      title: 'ייצור',
      description: 'עיבוד מדויק ונגרות מקצועית בסדנה המתקדמת שלנו עם כלים חדישים',
      measurement: 65, // ס"מ
      position: 65, // אחוז במסלול
      backgroundImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M14.7 6.3C16.2 7.8 16.2 10.2 14.7 11.7L11.7 14.7C10.2 16.2 7.8 16.2 6.3 14.7C4.8 13.2 4.8 10.8 6.3 9.3L9.3 6.3C10.8 4.8 13.2 4.8 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9.3 17.7L17.7 9.3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      )
    },
    {
      id: 'installation',
      title: 'התקנה',
      description: 'התקנה מושלמת והשלמת הפרויקט באתר הלקוח עם אחריות מלאה',
      measurement: 85, // ס"מ
      position: 85, // אחוז במסלול
      backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16 10L12 14L8 10" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      )
    }
  ];

  // ציור סרט המדידה ב-Canvas - פשוט שחור לבן
  const drawMeasureTape = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // ניקוי Canvas
    ctx.clearRect(0, 0, width, height);

    // ציור קו בסיס פשוט - שחור
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // ציור סמנים בpattern: 4 קטנים, 1 גדול, 4 קטנים, 1 גדול
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // סך הכל 10 סמנים (4+1+4+1) פרוסים על אורך הסרט
    const totalMarks = 10;
    const stepWidth = width / (totalMarks - 1);
    
    for (let i = 0; i < totalMarks; i++) {
      const x = i * stepWidth;
      let markHeight;
      
      // Pattern: 4 קטנים, 1 גדול, 4 קטנים, 1 גדול
      if (i === 4 || i === 9) { // הסמנים הגדולים
        markHeight = height * 0.8;
        ctx.lineWidth = 3;
      } else { // הסמנים הקטנים
        markHeight = height * 0.4;
        ctx.lineWidth = 2;
      }
      
      ctx.beginPath();
      ctx.moveTo(x, (height - markHeight) / 2);
      ctx.lineTo(x, (height + markHeight) / 2);
      ctx.stroke();
    }

    // ציור החץ - שחור פשוט
    const arrowX = (arrowPosition / 100) * width; // לא RTL כי החץ צריך ללכת מתחילת הסרט
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // חץ משולש פשוט
    ctx.beginPath();
    ctx.moveTo(arrowX, height / 2 - 15);
    ctx.lineTo(arrowX - 8, height / 2 - 25);
    ctx.lineTo(arrowX + 8, height / 2 - 25);
    ctx.closePath();
    ctx.fill();

    // קו החץ
    ctx.beginPath();
    ctx.moveTo(arrowX, height / 2 - 15);
    ctx.lineTo(arrowX, height / 2 + 15);
    ctx.stroke();

    // תצוגת מדידה נוכחית
    const currentCm = Math.round((arrowPosition / 100) * 100); // 0-100 ס"מ
    setCurrentMeasurement(currentCm);

  }, [arrowPosition]);

  // פונקציות עדכון מיקום החץ
  const updateArrowPosition = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, ((rect.width - x) / rect.width) * 100)); // RTL
    setArrowPosition(percentage);
  }, []);

  const updateArrowPositionTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, ((rect.width - x) / rect.width) * 100)); // RTL
    setArrowPosition(percentage);
  }, []);

  // טיפול באירועי עכבר ומגע
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    updateArrowPosition(e);
  }, [updateArrowPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    updateArrowPositionTouch(e);
  }, [updateArrowPositionTouch]);

  // אירועי עכבר גלובליים
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, ((rect.width - x) / rect.width) * 100)); // RTL
      setArrowPosition(percentage);
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, ((rect.width - x) / rect.width) * 100)); // RTL
      setArrowPosition(percentage);
    };

    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // ציור Canvas
  useEffect(() => {
    const animate = () => {
      drawMeasureTape();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawMeasureTape]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible && !animationCompleted) {
          setIsVisible(true);
          setTimeout(() => startMeasurementAnimation(), 1000);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, animationCompleted]);

  // אנימציית החץ - פעם אחת, השלבים נשארים
  const startMeasurementAnimation = useCallback(() => {
    if (animationCompleted) return;
    
    setIsAnimating(true);
    let stepIndex = 0;
    
    const animateToNextStep = () => {
      if (stepIndex >= processSteps.length) {
        // סיום אנימציה סופי
        setIsAnimating(false);
        setAnimationCompleted(true);
        return;
      }
      
      const currentStep = processSteps[stepIndex];
      
      // הזזת החץ למיקום השלב
      setArrowPosition(currentStep.position);
      
      // הצגת השלב אחרי שהחץ מגיע - השלב נשאר!
      setTimeout(() => {
        setActiveSteps(prev => [...prev, stepIndex]);
      }, 800);
      
      stepIndex++;
      
      // מעבר לשלב הבא אחרי 2.5 שניות
      setTimeout(() => {
        animateToNextStep();
      }, 2500);
    };
    
    animateToNextStep();
  }, [processSteps, animationCompleted]);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.complexitySection} ${className} ${isVisible ? styles.visible : ''} ${isAnimating ? styles.animating : ''}`}
    >
      {/* רקע מתקדם */}
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.container}>
        {/* הגדרת הבעיה */}
        <div className={styles.problemStatement}>
          <h2 className={styles.problemTitle}>
            המציאות העסקית מורכבת. 
            <span className={styles.titleAccent}>הפתרון שלנו פשוט.</span>
          </h2>
        </div>

        {/* הפתרון עם סרט מדידה */}
        <div className={styles.solution}>
          <h3 className={styles.solutionTitle}>בולה סטודיו מספקים פתרון כולל</h3>
          
          {/* אזור האנימציה */}
          <div className={styles.processAnimation}>
            
            {/* סרט מדידה Canvas */}
            <div className={styles.canvasContainer}>
              <canvas
                ref={canvasRef}
                className={styles.measureCanvas}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              />
              
              {/* תצוגת מדידה נוכחית */}
              <div className={styles.measurementDisplay}>
                <span className={styles.measurementValue}>{currentMeasurement} ס"מ</span>
                <span className={styles.measurementLabel}>מדידה מדויקת</span>
              </div>
            </div>

            {/* השלבים - נשארים אחרי הופעה */}
            <div className={styles.processSteps}>
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`${styles.processStep} ${activeSteps.includes(index) ? styles.active : ''}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.85)), url(${step.backgroundImage})`
                  }}
                >
                  <div className={styles.stepContent}>
                    <div className={styles.stepIcon}>
                      {step.icon}
                    </div>
                    
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.description}</p>
                    
                    {/* מחוון מדידה */}
                    <div className={styles.measurementIndicator}>
                      <span className={styles.measurementValue}>
                        {step.measurement} ס"מ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className={styles.tagline}>
            מתכנון ראשוני ועד למוצר מושלם - מדידה מדויקת בכל שלב
          </p>
        </div>
      </div>
    </section>
  );
}; 