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

const StepRow: React.FC<{ title: string; completed: boolean; onToggle: () => void; onSelect: () => void }>
  = ({ title, completed, onToggle, onSelect }) => {
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
    <li className={styles.stepRow}>
      <div className={styles.stepRight}>
        <button type="button" className={styles.cbBtn} aria-label="סמן שלב" onClick={onToggle}>
          <canvas ref={cbRef} className={styles.cbCanvas} />
        </button>
        <div
          className={styles.titleHolder}
          ref={titleRef}
          role="button"
          tabIndex={0}
          onClick={onSelect}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect();
            }
          }}
          aria-label={`הצג פירוט עבור ${title}`}
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

  // ברירת מחדל: הצג פירוט לשלב הראשון הלא־מושלם, ניתן לעבור ידנית ע"י בחירה
  const firstIncompleteIndex = completed.findIndex((c) => !c);
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
            לחיצה על שם השלב תציג כאן פירוט. לחיצה על התיבה תסמן שהשלב הושלם.
          </p>
          <ul className={styles.stepList}>
            {steps.map((t, i) => (
              <StepRow
                key={i}
                title={t}
                completed={!!completed[i]}
                onToggle={() => setCompleted(prev => {
                  const next = [...prev];
                  next[i] = !next[i];
                  return next;
                })}
                onSelect={() => setSelectedIndex(i)}
              />
            ))}
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

