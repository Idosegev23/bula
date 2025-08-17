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
    rc.rectangle(1, 1, size - 2, size - 2, { stroke: '#000', strokeWidth: 1.2, roughness: 1.8 });
    if (completed) {
      rc.line(4, size / 2, size / 2, size - 4, { stroke: '#2e7d32', strokeWidth: 2 });
      rc.line(size / 2, size - 4, size - 4, 4, { stroke: '#2e7d32', strokeWidth: 2 });
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
      rc.line(4, h / 2 - 3, w - 6, h / 2 - 1, { stroke: '#d32f2f', strokeWidth: 2, roughness: 2.2 });
      rc.line(4, h / 2 + 1, w - 6, h / 2 + 3, { stroke: '#d32f2f', strokeWidth: 2, roughness: 2.2 });
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
  const [businessName, setBusinessName] = useState<string>('שם העסק שלך');

  useEffect(() => {
    setCompleted(steps.map(() => false));
  }, [steps.length]);

  // לוגיקה חדשה: רק שלבים שכל השלבים הקודמים שלהם הושלמו זמינים
  const getCanInteract = (index: number) => {
    if (index === 0) return true; // השלב הראשון תמיד זמין
    // כל השלבים הקודמים חייבים להיות מושלמים
    return completed.slice(0, index).every(c => c);
  };

  // ברירת מחדל: הצג פירוט לשלב הראשון הלא־מושלם, רק אם הוא זמין
  const firstIncompleteIndex = completed.findIndex((c, i) => !c && getCanInteract(i));
  const activeDetailIndex = selectedIndex !== null ? selectedIndex : firstIncompleteIndex;

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.layout}>
        <div className={styles.listCol}>
          <div className={styles.calloutBlock}>
            <div className={styles.calloutWrap}>
              <svg className={styles.calloutSvg} width="100%" height="120" viewBox="0 0 600 120" preserveAspectRatio="xMidYMid meet">
                <rect x="10" y="20" width="580" height="80" fill="none" stroke="#c62828" strokeWidth="2" rx="6" ry="6" />
              </svg>
              <input
                type="text"
                className={styles.calloutInput}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="שם העסק שלך"
                aria-label="שם העסק"
              />
            </div>
          </div>
          <p className={styles.instructions}>
            לחיצה על שם השלב תציג פירוט. לחיצה על התיבה תסמן שהשלב הושלם. השלבים נפתחים בהדרגה לפי סיום השלב הקודם.
          </p>
          {/* הודעת התקדמות */}
          {firstIncompleteIndex > 0 && (
            <div className={styles.progressMessage}>
              ✅ השלמת {firstIncompleteIndex} שלבים! המשך לשלב הבא.
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
                      
                      // אם מסמנים שלב כמושלם, עבור אוטומטית לשלב הבא
                      if (!completed[i] && i < steps.length - 1) {
                        setTimeout(() => {
                          setSelectedIndex(i + 1);
                        }, 300); // השהיה קצרה לאנימציה
                      }
                    }}
                    onSelect={() => setSelectedIndex(i)}
                  />
                  {/* פירוט מתחת לשלב במובייל */}
                  {showDetailHere && (
                    <li className={styles.stepDetail}>
                      <div className={styles.detailContent}>
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

