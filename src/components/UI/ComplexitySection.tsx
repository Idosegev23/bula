// ComplexitySection - סקציית הבנת המורכבות עם אנימציית סרט מדידה מתקדמת
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ComplexitySection.module.css';

interface ComplexitySectionProps {
  className?: string;
}

export const ComplexitySection: React.FC<ComplexitySectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [tapePosition, setTapePosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [measurementValue, setMeasurementValue] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);

  // השלבים של התהליך עם אנימציות מתקדמות
  const processSteps = [
    {
      id: 'planning',
      title: 'תכנון',
      description: 'מדידה מדויקת ותכנון פרויקט',
      measurement: 1.0,
      color: '#2E8B57', // ירוק יער
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M8 2L3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7L16 2H8Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 11H17" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 15H13" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="9" cy="12" r="1" fill="currentColor"/>
        </svg>
      ),
      tools: ['📐', '📏', '✏️']
    },
    {
      id: 'design',
      title: 'עיצוב',
      description: 'יצירת תכניות מפורטות ותלת-ממד',
      measurement: 2.5,
      color: '#4169E1', // כחול מלכותי
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
        </svg>
      ),
      tools: ['🖥️', '🎨', '📊']
    },
    {
      id: 'production',
      title: 'ייצור',
      description: 'עיבוד מדויק ונגרות מקצועית',
      measurement: 4.2,
      color: '#DC143C', // אדום כרמזי
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M14.7 6.3C16.2 7.8 16.2 10.2 14.7 11.7L11.7 14.7C10.2 16.2 7.8 16.2 6.3 14.7C4.8 13.2 4.8 10.8 6.3 9.3L9.3 6.3C10.8 4.8 13.2 4.8 14.7 6.3Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9.3 17.7L17.7 9.3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      ),
      tools: ['🔨', '🪚', '⚒️']
    },
    {
      id: 'installation',
      title: 'התקנה',
      description: 'התקנה מושלמת והשלמת הפרויקט',
      measurement: 5.8,
      color: '#FF8C00', // כתום כהה
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16 10L12 14L8 10" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      ),
      tools: ['🔧', '📦', '✅']
    }
  ];

  // אנימציה חלקה של מספרי המדידה
  const animateNumber = useCallback((target: number, duration: number = 1000) => {
    const start = measurementValue;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function עם bounce
      const easeOutBounce = (t: number) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
      };
      
      const easedProgress = easeOutBounce(progress);
      const currentValue = start + (target - start) * easedProgress;
      
      setMeasurementValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [measurementValue]);

  // Intersection Observer מתקדם
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => startAdvancedAnimation(), 800);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  // אנימציה מתקדמת של סרט המדידה
  const startAdvancedAnimation = useCallback(() => {
    setIsAnimating(true);
    let stepIndex = 0;
    
    const animateStep = () => {
      if (stepIndex >= processSteps.length) {
        // סיום מחזור - התחלה מחדש אחרי 4 שניות
        setTimeout(() => {
          setActiveStep(0);
          setTapePosition(0);
          setMeasurementValue(0);
          stepIndex = 0;
          startAdvancedAnimation();
        }, 4000);
        return;
      }
      
      const currentStep = processSteps[stepIndex];
      const targetPosition = ((stepIndex + 1) / processSteps.length) * 100;
      
      // הצגת שלב נוכחי
      setActiveStep(stepIndex);
      
      // אנימציה של סרט המדידה
      setTapePosition(targetPosition);
      
      // אנימציה של מספר המדידה
      animateNumber(currentStep.measurement, 1200);
      
      stepIndex++;
      setTimeout(animateStep, 2000); // כל שלב נמשך 2 שניות
    };
    
    animateStep();
  }, [animateNumber, processSteps]);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.complexitySection} ${className} ${isVisible ? styles.visible : ''} ${isAnimating ? styles.animating : ''}`}
    >
      {/* רקע מתקדם עם תבנית עץ */}
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.container}>
        {/* הגדרת הבעיה עם אפקט */}
        <div className={styles.problemStatement}>
          <h2 className={styles.problemTitle}>
            המציאות העסקית מורכבת. 
            <span className={styles.titleAccent}>הפתרון שלנו פשוט.</span>
          </h2>
        </div>

        {/* הפתרון עם אנימציית מדידה מתקדמת */}
        <div className={styles.solution}>
          <h3 className={styles.solutionTitle}>בולה סטודיו מספקים פתרון כולל</h3>
          
          {/* אזור האנימציה המתקדם */}
          <div className={styles.processAnimation}>
            
            {/* סרט מדידה מתקדם עם אפקטים */}
            <div className={styles.measuringTapeContainer}>
              <div className={styles.measuringTape}>
                <div className={styles.tapeBackground}></div>
                <div 
                  className={styles.tapeProgress}
                  style={{ width: `${tapePosition}%` }}
                >
                  <div className={styles.tapeGradient}></div>
                  <div className={styles.tapeMarkings}>
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className={styles.tapeMark} style={{ left: `${i * 8.33}%` }}></div>
                    ))}
                  </div>
                  <div className={styles.tapeTip}>
                    <div className={styles.tapeTipInner}></div>
                  </div>
                </div>
              </div>
              
              {/* תצוגת מדידה דיגיטלית */}
              <div className={styles.digitalDisplay}>
                <div className={styles.displayScreen}>
                  <span className={styles.measurementNumber}>
                    {measurementValue.toFixed(1)}
                  </span>
                  <span className={styles.measurementUnit}>מ'</span>
                </div>
                <div className={styles.displayLabel}>מדידה מדויקת</div>
              </div>
            </div>

            {/* השלבים עם אנימציות מתקדמות */}
            <div className={styles.processSteps}>
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`${styles.processStep} ${index <= activeStep ? styles.active : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    '--step-color': step.color
                  } as React.CSSProperties}
                >
                  {/* כלי עבודה מרחפים */}
                  <div className={styles.floatingTools}>
                    {step.tools.map((tool, toolIndex) => (
                      <span 
                        key={toolIndex} 
                        className={styles.floatingTool}
                        style={{ animationDelay: `${toolIndex * 0.5}s` }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  <div className={styles.stepContent}>
                    <div className={styles.stepIcon}>
                      {step.icon}
                      <div className={styles.iconGlow}></div>
                    </div>
                    
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.description}</p>
                    
                    {/* מחוון מדידה מתקדם */}
                    <div className={styles.measurementIndicator}>
                      <div className={styles.measurementRuler}>
                        <div className={styles.rulerMarks}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <div key={i} className={styles.rulerMark}></div>
                          ))}
                        </div>
                      </div>
                      <span className={styles.measurementValue}>
                        {step.measurement.toFixed(1)}מ'
                      </span>
                    </div>
                    
                    {/* בר התקדמות */}
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill}
                        style={{ width: index <= activeStep ? '100%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* סרט מדידה תלת-ממדי בתחתית */}
            <div className={styles.tape3D}>
              <div className={styles.tapeReel}>
                <div className={styles.reelSide}></div>
                <div className={styles.reelCenter}></div>
                <div className={styles.tapeUnwinding}></div>
              </div>
              <div className={styles.tapeBrand}>
                <span>BULLA STUDIO</span>
                <span>PRECISION MEASURE</span>
              </div>
            </div>
          </div>
          
          <p className={styles.tagline}>
            <span className={styles.taglineIcon}>🎯</span>
            מתכנון ראשוני ועד למוצר מושלם - מדידה מדויקת בכל שלב
            <span className={styles.taglineAccent}>דיוק של 0.1 מילימטר</span>
          </p>
        </div>
      </div>
    </section>
  );
}; 