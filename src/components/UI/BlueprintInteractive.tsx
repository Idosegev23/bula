import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import styles from './BlueprintInteractive.module.css';

interface BlueprintInteractiveProps {
  steps: string[];
  stepDetails?: string[];
  className?: string;
}

const useDpr = (): number => {
  const [dpr, setDpr] = useState<number>(window.devicePixelRatio || 1);
  useEffect(() => {
    const onResize = () => setDpr(window.devicePixelRatio || 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return dpr;
};

const StepRow: React.FC<{ title: string; completed: boolean; canInteract: boolean; onToggle: () => void; onSelect: () => void }>
  = ({ title, completed, canInteract, onToggle, onSelect }) => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cbRef = useRef<HTMLCanvasElement | null>(null);
  const scribbleRef = useRef<HTMLCanvasElement | null>(null);
  const dpr = useDpr();

  useEffect(() => {
    const canvas = cbRef.current;
    if (!canvas) return;
    const size = 30;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const rc = rough.canvas(canvas);
    // Regular rectangle instead of rough
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(1, 1, size - 2, size - 2);
    if (completed) {
      // Regular checkmark instead of rough
      ctx.strokeStyle = '#2e7d32';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(4, size / 2);
      ctx.lineTo(size / 2, size - 4);
      ctx.lineTo(size - 4, 4);
      ctx.stroke();
    }
  }, [completed, dpr]);

  useEffect(() => {
    const holder = titleRef.current;
    const canvas = scribbleRef.current;
    if (!holder || !canvas) return;
    const rect = holder.getBoundingClientRect();
    const w = Math.max(140, rect.width);
    const h = Math.max(28, rect.height);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (completed) {
      const rc = rough.canvas(canvas);
      rc.line(4, h / 2 - 3, w - 6, h / 2 - 1, { stroke: '#28939f', strokeWidth: 2, roughness: 2.2 });
      rc.line(4, h / 2 + 1, w - 6, h / 2 + 3, { stroke: '#28939f', strokeWidth: 2, roughness: 2.2 });
    }
  }, [completed, dpr]);

  return (
    <li className={`${styles.stepRow} ${!canInteract ? styles.disabled : ''}`}>
      <div className={styles.stepRight}>
        <button 
          type="button" 
          className={styles.cbBtn} 
          aria-label="סמן שלב" 
          onClick={canInteract ? onToggle : undefined}
          disabled={!canInteract}
        >
          <canvas ref={cbRef} className={styles.cbCanvas} />
        </button>
        <div
          className={styles.titleHolder}
          ref={titleRef}
          role="button"
          tabIndex={canInteract ? 0 : -1}
          onClick={canInteract ? onSelect : undefined}
          onKeyDown={canInteract ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect();
            }
          } : undefined}
          aria-label={canInteract ? `הצג פירוט עבור ${title}` : `שלב נעול - השלם קודם את השלבים הקודמים`}
        >
          <span className={styles.stepTitle}>{title}</span>
          <canvas ref={scribbleRef} className={styles.scribbleCanvas} />
        </div>
      </div>
    </li>
  );
};

export const BlueprintInteractive: React.FC<BlueprintInteractiveProps> = ({ steps, stepDetails = [], className = '' }) => {
  const [completed, setCompleted] = useState<boolean[]>(() => steps.map(() => false));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);


  useEffect(() => {
    setCompleted(steps.map(() => false));
  }, [steps.length]);

  // לוגיקה חדשה: כל השלבים זמינים תמיד (ללא סדר ספציפי)
  const getCanInteract = (index: number) => {
    return true; // כל השלבים תמיד זמינים
  };

  // ברירת מחדל: הצג פירוט לשלב הראשון הלא־מושלם
  const firstIncompleteIndex = completed.findIndex(c => !c);
  const activeDetailIndex = selectedIndex !== null ? selectedIndex : firstIncompleteIndex;

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.layout}>
        <div className={styles.listCol}>
          <p className={styles.instructions}>
            לחיצה על שם השלב תציג פירוט. לחיצה על התיבה תסמן שהשלב הושלם. ניתן לבחור כל שלב בכל עת.
          </p>
          {/* הודעת התקדמות */}
          {completed.filter(Boolean).length > 0 && (
            <div className={styles.progressMessage}>
              ✅ השלמת {completed.filter(Boolean).length} מתוך {steps.length} שלבים!
            </div>
          )}
          <ul className={styles.stepList}>
            {steps.map((t, i) => {
              const canInteract = getCanInteract(i);
              const showDetailHere = activeDetailIndex === i && stepDetails[i];
              return (
                <React.Fragment key={i}>
                  <StepRow
                    title={t}
                    completed={!!completed[i]}
                    canInteract={canInteract}
                    onToggle={() => {
                      setCompleted(prev => {
                        const next = [...prev];
                        next[i] = !next[i];
                        return next;
                      });
                      
                      // אם מסמנים שלב כמושלם, השאר את הבחירה הנוכחית
                      // (אין יותר מעבר אוטומטי לשלב הבא)
                    }}
                    onSelect={() => setSelectedIndex(i)}
                  />
                  {/* פירוט מתחת לשלב במובייל */}
                  {showDetailHere && (
                    <li className={styles.stepDetail}>
                      <div className={styles.detailContent}>
                        <div className={styles.mobileNavigationControls}>
                          <button 
                            className={styles.mobileNavButton}
                            onClick={() => {
                              const prevIndex = i > 0 ? i - 1 : steps.length - 1;
                              setSelectedIndex(prevIndex);
                            }}
                            aria-label="שלב קודם"
                          >
                            ← קודם
                          </button>
                          
                          <button 
                            className={styles.mobileCompleteButton}
                            onClick={() => {
                              setCompleted(prev => {
                                const next = [...prev];
                                next[i] = !next[i];
                                return next;
                              });
                            }}
                            aria-label={completed[i] ? "בטל סימון שלב" : "סמן שלב כמושלם"}
                          >
                            {completed[i] ? '✓ מושלם' : '○ סמן'}
                          </button>
                          
                          <button 
                            className={styles.mobileNavButton}
                            onClick={() => {
                              const nextIndex = i < steps.length - 1 ? i + 1 : 0;
                              setSelectedIndex(nextIndex);
                            }}
                            aria-label="שלב הבא"
                          >
                            הבא →
                          </button>
                        </div>
                        
                        <h4 className={styles.detailTitle}>{t}</h4>
                        <p className={styles.detailBody}>{stepDetails[i]}</p>
                      </div>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <aside className={styles.detailCol} aria-live="polite">
          {activeDetailIndex !== -1 && stepDetails[activeDetailIndex] && (
            <>
              <div className={styles.navigationControls}>
                <button 
                  className={styles.navButton}
                  onClick={() => {
                    const prevIndex = activeDetailIndex > 0 ? activeDetailIndex - 1 : steps.length - 1;
                    setSelectedIndex(prevIndex);
                  }}
                  aria-label="שלב קודם"
                >
                  <span className={styles.navArrow}>←</span>
                  שלב קודם
                </button>
                
                <button 
                  className={styles.completeButton}
                  onClick={() => {
                    setCompleted(prev => {
                      const next = [...prev];
                      next[activeDetailIndex] = !next[activeDetailIndex];
                      return next;
                    });
                  }}
                  aria-label={completed[activeDetailIndex] ? "בטל סימון שלב" : "סמן שלב כמושלם"}
                >
                  <span className={styles.checkIcon}>
                    {completed[activeDetailIndex] ? '✓' : '○'}
                  </span>
                  {completed[activeDetailIndex] ? 'בטל סימון' : 'סמן כמושלם'}
                </button>
                
                <button 
                  className={styles.navButton}
                  onClick={() => {
                    const nextIndex = activeDetailIndex < steps.length - 1 ? activeDetailIndex + 1 : 0;
                    setSelectedIndex(nextIndex);
                  }}
                  aria-label="שלב הבא"
                >
                  שלב הבא
                  <span className={styles.navArrow}>→</span>
                </button>
              </div>
              
              <h4 className={styles.detailTitle}>{steps[activeDetailIndex]}</h4>
              <p className={styles.detailBody}>{stepDetails[activeDetailIndex]}</p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BlueprintInteractive;

