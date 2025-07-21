// ComplexitySection - סקציית הבנת המורכבות עם סרט מדידה קבוע וחץ נע
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ComplexitySection.module.css';

interface ComplexitySectionProps {
  className?: string;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // השלבים של התהליך
  const processSteps = [
    {
      id: 'planning',
      title: 'תכנון',
      description: 'מדידה מדויקת ותכנון פרויקט מפורט עם שימוש בטכנולוגיות מתקדמות',
      measurement: 1.0,
      position: 20, // אחוז במסלול
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
      measurement: 2.5,
      position: 40,
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
      measurement: 4.2,
      position: 65,
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
      measurement: 5.8,
      position: 85,
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

  // אנימציית החץ על הסרט - פעם אחת בלבד
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
      
      // הצגת השלב אחרי שהחץ מגיע
      setTimeout(() => {
        setActiveStep(stepIndex);
      }, 800); // זמן עד שהחץ מגיע למיקום
      
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
            
            {/* סרט מדידה קבוע */}
            <div className={styles.measuringTapeContainer}>
              <div className={styles.measuringTape}>
                {/* סמנים על הסרט */}
                <div className={styles.tapeMarkings}>
                  {Array.from({ length: 21 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`${styles.tapeMark} ${i % 5 === 0 ? styles.majorMark : ''}`}
                      style={{ left: `${i * 5}%` }}
                    >
                      {i % 5 === 0 && (
                        <span className={styles.markLabel}>{i / 5}</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* החץ הנע */}
                <div 
                  className={styles.movingArrow}
                  style={{ left: `${arrowPosition}%` }}
                >
                  <div className={styles.arrowPointer}></div>
                  <div className={styles.arrowLine}></div>
                </div>
              </div>
            </div>

            {/* השלבים - יופיעו רק כשהחץ מגיע */}
            <div className={styles.processSteps}>
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`${styles.processStep} ${index === activeStep ? styles.active : ''}`}
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
                        {step.measurement.toFixed(1)}מ'
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