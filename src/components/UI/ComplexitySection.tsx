// ComplexitySection - אנימציית סרט מדידה שחור לבן
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ComplexitySection.module.css';

interface ComplexitySectionProps {
  className?: string;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setCurrentStageTitle] = useState('מתחיל...');
  const [activeStages, setActiveStages] = useState<string[]>([]);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [targetArrowPosition, setTargetArrowPosition] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // 4 השלבים עם מיקומים קבועים (מימין לשמאל)
  const stages = [
    { id: '1', title: 'תכנון', description: 'מדידה מדויקת ותכנון פרויקט מפורט', position: 10 },
    { id: '2', title: 'עיצוב', description: 'יצירת תכניות מפורטות ותלת-ממד', position: 38 },
    { id: '3', title: 'ייצור', description: 'עיבוד מדויק ונגרות מקצועית', position: 65 },
    { id: '4', title: 'התקנה', description: 'התקנה מושלמת באתר הלקוח', position: 90 }
  ];

  // ציור סרט המדידה הסטטי עם חץ נע
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
    const tapeHeight = 80; // גובה הפס עצמו - עבה יותר

    // ניקוי Canvas
    ctx.clearRect(0, 0, width, height);

    // ציור רקע הסרט - לבן עם מסגרת שחורה (רק בחלק העליון)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, tapeHeight);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2; // מסגרת עבה יותר
    ctx.strokeRect(0, 0, width, tapeHeight);

    // ציור סמנים סטטיים על הסרט (מימין לשמאל)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1; // סמנים עבים יותר
    
    const markSpacing = 20; // רווח בין סמנים
    const totalMarks = Math.ceil(width / markSpacing);
    
    for (let i = 0; i <= totalMarks; i++) {
      const x = width - (i * markSpacing); // התחל מימין
      if (x < 0) continue;
      
      // כל 5 סמנים - סמן גדול
      const isLargeMark = i % 5 === 0;
      const markHeight = isLargeMark ? tapeHeight * 0.6 : tapeHeight * 0.3;
      
      ctx.lineWidth = isLargeMark ? 2 : 1; // סמנים גדולים עבים יותר
      ctx.beginPath();
      ctx.moveTo(x, (tapeHeight - markHeight) / 2);
      ctx.lineTo(x, (tapeHeight + markHeight) / 2);
      ctx.stroke();
      
      // מספור על הסמנים הגדולים (מתחיל מ-0 מימין)
      if (isLargeMark && x > 30 && x < width - 10) {
        ctx.fillStyle = '#000000';
        ctx.font = '14px monospace'; // פונט ללא בולד
        ctx.textAlign = 'center';
        ctx.fillText((i * 2).toString(), x, tapeHeight - 4);
      }
    }

    // אנימציה חלקה של החץ
    if (Math.abs(targetArrowPosition - arrowPosition) > 0.5) {
      const diff = targetArrowPosition - arrowPosition;
      const step = diff * 0.08; // מהירות האנימציה
      setArrowPosition(prev => prev + step);
    }

    // ציור החץ שמצביע למטה מחוץ לפס
    const arrowX = width - (arrowPosition / 100) * width;
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3; // קו החץ עבה יותר
    
    // קו החץ - מתחיל בקצה התחתון של הפס ויוצא למטה
    ctx.beginPath();
    ctx.moveTo(arrowX, tapeHeight - 2); // מתחיל בקצה התחתון של הפס
    ctx.lineTo(arrowX, tapeHeight + 25); // נמשך למטה מחוץ לפס
    ctx.stroke();
    
    // חץ משולש שמצביע למטה - מחוץ לפס (גדול יותר)
    ctx.beginPath();
    ctx.moveTo(arrowX, tapeHeight + 25); // קצה החץ
    ctx.lineTo(arrowX - 10, tapeHeight + 12); // צד שמאל - חץ גדול יותר
    ctx.lineTo(arrowX + 10, tapeHeight + 12); // צד ימין - חץ גדול יותר
    ctx.closePath();
    ctx.fill();

  }, [arrowPosition, targetArrowPosition]);

  // אנימציית החץ בין השלבים
  const startArrowAnimation = useCallback(() => {
    if (animationComplete) return;
    
    let currentStageIndex = 0;
    
    const moveToNextStage = () => {
      if (currentStageIndex >= stages.length) {
        setAnimationComplete(true);
        return;
      }
      
      const stage = stages[currentStageIndex];
      
      // הזז את החץ למיקום השלב עם אנימציה חלקה
      setTargetArrowPosition(stage.position);
      
      // עדכן את כותרת השלב מיד כשמתחילים לנוע אליו
      setCurrentStageTitle(stage.title);
      
      // הוסף את השלב לרשימת השלבים הפעילים
      setTimeout(() => {
        setActiveStages(prev => [...prev, stage.id]);
      }, 800);
      
      currentStageIndex++;
      
      // עבור לשלב הבא אחרי 2.5 שניות
      if (currentStageIndex < stages.length) {
        setTimeout(() => {
          moveToNextStage();
        }, 2500);
      } else {
        setAnimationComplete(true);
      }
    };
    
    moveToNextStage();
  }, [stages, animationComplete]);

  // ציור Canvas
  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      drawMeasureTape();
      // המשך אנימציה אם החץ עדיין זז או שהאנימציה לא הסתיימה
      if (!animationComplete || Math.abs(targetArrowPosition - arrowPosition) > 0.5) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawMeasureTape, isVisible, animationComplete, targetArrowPosition, arrowPosition]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // התחל אנימציה אחרי שנייה
          setTimeout(() => {
            startArrowAnimation();
          }, 1000);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -0px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, startArrowAnimation]);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.complexitySection} ${className} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        {/* כותרת */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            תהליך עבודה מדויק
          </h2>
          <p className={styles.subtitle}>
            מדידה מקצועית בכל שלב
          </p>
        </div>

        {/* סרט המדידה */}
        <div className={styles.tapeContainer}>
          <canvas
            ref={canvasRef}
            className={styles.measureTape}
          />
        </div>

        {/* השלבים */}
        <div className={styles.stagesContainer}>
          {stages.map((stage) => (
            <div 
              key={stage.id}
              className={`${styles.stage} ${activeStages.includes(stage.id) ? styles.active : ''}`}
            >
              <div className={styles.stageId}>{stage.id}</div>
              <h3 className={styles.stageTitle}>{stage.title}</h3>
              <p className={styles.stageDescription}>{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 