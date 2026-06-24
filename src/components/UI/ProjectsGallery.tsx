import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './ProjectsGallery.module.css';
import {
  projectsGalleryData,
  type GalleryBusiness,
  type GalleryParentCategory,
  type GallerySubCategory,
  type ParentCategoryId,
} from '../../data/projectsGallery';

export interface ProjectsGalleryProps {
  defaultCategory?: ParentCategoryId;
  /** מסנן אילו קטגוריות-אם יופיעו. */
  parents?: ParentCategoryId[];
  data?: GalleryParentCategory[];
  /** מילת הכותרת מעל הגלריה (kicker — `01 / גלריה`). */
  kicker?: string;
  /** הכותרת הראשית מעל הגלריה. אם לא מועבר — נשתמש בשם הקטגוריה. */
  title?: string;
  className?: string;
}

const ALL_SUB_ID = '__all__';

/** טווח span במשבצות גריד (רוחב × גובה). */
type BentoSpan = { w: number; h: number };

/** סיווג משבצת לפי יחס הממדים של התמונה: לרוחב→רחבה, לאורך→גבוהה, מרובעת→1×1. */
function spanForRatio(ratio: number | undefined, index: number, cols: number): BentoSpan {
  if (!ratio) return { w: 1, h: 1 }; // טרם נמדד — ברירת מחדל מרובעת
  if (index === 0 && cols >= 3 && ratio >= 1.1 && ratio <= 1.9) return { w: 2, h: 2 }; // פיצ'ר בולט
  if (ratio >= 1.5) return { w: 2, h: 1 }; // לרוחב → רחבה
  if (ratio <= 0.7) return { w: 1, h: 2 }; // לאורך → גבוהה
  return { w: 1, h: 1 };
}

type BentoCell = { r: number; c: number; w: number; h: number };

/**
 * אורז את המשבצות לגריד בעל `cols` עמודות (first-fit row-major — ממלא חורים כמו dense),
 * ואז "מותח" שכנים כדי לסגור כל תא שנשאר ריק → הגלריה תמיד יוצאת מלבן מלא בלי שוליים משוננים.
 */
type PackResult = { cells: BentoCell[]; owner: (number | undefined)[][]; rows: number };

function attemptPack(spans: BentoSpan[], cols: number): PackResult {
  const occ: boolean[][] = [];
  const ensure = (r: number) => {
    while (occ.length <= r) occ.push(new Array<boolean>(cols).fill(false));
  };
  const fits = (r: number, c: number, w: number, h: number) => {
    if (c + w > cols) return false;
    for (let i = 0; i < h; i++) {
      ensure(r + i);
      for (let j = 0; j < w; j++) if (occ[r + i][c + j]) return false;
    }
    return true;
  };
  const fill = (r: number, c: number, w: number, h: number) => {
    for (let i = 0; i < h; i++) {
      ensure(r + i);
      for (let j = 0; j < w; j++) occ[r + i][c + j] = true;
    }
  };

  const cells: BentoCell[] = spans.map((s) => {
    const w = Math.min(Math.max(1, s.w), cols);
    const h = Math.max(1, s.h);
    for (let r = 0; ; r++) {
      ensure(r);
      for (let c = 0; c < cols; c++) {
        if (fits(r, c, w, h)) {
          fill(r, c, w, h);
          return { r, c, w, h };
        }
      }
    }
  });

  const rows = occ.length;
  if (rows === 0) return { cells, owner: [], rows: 0 };

  // מפת בעלות: איזה תא שייך לאיזו משבצת
  const owner: (number | undefined)[][] = Array.from({ length: rows }, () =>
    new Array<number | undefined>(cols).fill(undefined)
  );
  cells.forEach((p, idx) => {
    for (let i = 0; i < p.h; i++) for (let j = 0; j < p.w; j++) owner[p.r + i][p.c + j] = idx;
  });

  // מעבר מתיחה: כל תא ריק מורחב מהשכן הצמוד (משמאל/מימין/מלמעלה/מלמטה)
  const tryFill = (r: number, c: number): boolean => {
    // שמאל → להרחיב ימינה
    const left = c > 0 ? owner[r][c - 1] : undefined;
    if (left !== undefined) {
      const p = cells[left];
      let ok = true;
      for (let i = 0; i < p.h; i++) if (owner[p.r + i][c] !== undefined) { ok = false; break; }
      if (ok) { for (let i = 0; i < p.h; i++) owner[p.r + i][c] = left; p.w += 1; return true; }
    }
    // מעל → להרחיב מטה
    const top = r > 0 ? owner[r - 1][c] : undefined;
    if (top !== undefined) {
      const p = cells[top];
      let ok = true;
      for (let j = 0; j < p.w; j++) if (owner[r][p.c + j] !== undefined) { ok = false; break; }
      if (ok) { for (let j = 0; j < p.w; j++) owner[r][p.c + j] = top; p.h += 1; return true; }
    }
    // ימין → להרחיב שמאלה
    const right = c < cols - 1 ? owner[r][c + 1] : undefined;
    if (right !== undefined) {
      const p = cells[right];
      if (p.c === c + 1) {
        let ok = true;
        for (let i = 0; i < p.h; i++) if (owner[p.r + i][c] !== undefined) { ok = false; break; }
        if (ok) { for (let i = 0; i < p.h; i++) owner[p.r + i][c] = right; p.c -= 1; p.w += 1; return true; }
      }
    }
    // מתחת → להרחיב מעלה
    const bottom = r < rows - 1 ? owner[r + 1][c] : undefined;
    if (bottom !== undefined) {
      const p = cells[bottom];
      if (p.r === r + 1) {
        let ok = true;
        for (let j = 0; j < p.w; j++) if (owner[r][p.c + j] !== undefined) { ok = false; break; }
        if (ok) { for (let j = 0; j < p.w; j++) owner[r][p.c + j] = bottom; p.r -= 1; p.h += 1; return true; }
      }
    }
    return false;
  };

  let changed = true;
  let guard = 0;
  while (changed && guard++ < cols * rows + 1) {
    changed = false;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (owner[r][c] === undefined && tryFill(r, c)) changed = true;
      }
    }
  }

  return { cells, owner, rows };
}

/**
 * עוטף את האריזה עם ערובת מלבן: אם פריסת היחסים השאירה חור נדיר (interlock),
 * נופלים לאחור לגריד אחיד (1×1) שלא יכול ליצור חורים — תמיד יוצא מלבן מלא.
 */
function packBento(spans: BentoSpan[], cols: number): BentoCell[] {
  const hasHole = (res: PackResult) => res.owner.some((row) => row.some((v) => v === undefined));
  let res = attemptPack(spans, cols);
  if (hasHole(res)) res = attemptPack(spans.map(() => ({ w: 1, h: 1 })), cols);
  return res.cells;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  defaultCategory,
  parents,
  data = projectsGalleryData,
  kicker,
  title,
  className = '',
}) => {
  const filteredData = useMemo(
    () => (parents && parents.length ? data.filter((c) => parents.includes(c.id)) : data),
    [data, parents]
  );

  const initialParent =
    defaultCategory && filteredData.some((c) => c.id === defaultCategory)
      ? defaultCategory
      : filteredData[0]?.id ?? 'businesses';

  const [activeParent, setActiveParent] = useState<ParentCategoryId>(initialParent);
  const [activeSub, setActiveSub] = useState<string>(ALL_SUB_ID);
  const [lightboxBusiness, setLightboxBusiness] = useState<GalleryBusiness | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filterKey, setFilterKey] = useState(0); // לאניס את האנימציה ברענון פילטר
  const [cols, setCols] = useState(2); // מספר עמודות הבנטו — רספונסיבי (2 / 3 / 4)
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({}); // יחס ממדים נמדד לפי id

  const parentTabsRef = useRef<HTMLDivElement>(null);
  const parentButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const thumbsSliderRef = useRef<HTMLDivElement>(null);
  const thumbButtonsRef = useRef<Record<number, HTMLButtonElement | null>>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const suppressScrollSyncRef = useRef(false);
  const [indicator, setIndicator] = useState<{ width: number; offset: number }>({ width: 0, offset: 0 });

  const activeParentData: GalleryParentCategory | undefined = useMemo(
    () => filteredData.find((c) => c.id === activeParent) ?? filteredData[0],
    [filteredData, activeParent]
  );

  // פריטים מוצגים — לפי תת-קטגוריה פעילה או "הכל"
  const visibleBusinesses = useMemo<GalleryBusiness[]>(() => {
    if (!activeParentData) return [];
    if (activeSub === ALL_SUB_ID) {
      return activeParentData.subCategories.flatMap((s) => s.businesses);
    }
    const sub = activeParentData.subCategories.find((s) => s.id === activeSub);
    return sub ? sub.businesses : [];
  }, [activeParentData, activeSub]);

  const totalParentCount = useMemo<number>(
    () => activeParentData?.subCategories.reduce((sum, s) => sum + s.businesses.length, 0) ?? 0,
    [activeParentData]
  );

  // מספר עמודות הבנטו לפי רוחב המסך — מובייל-פירסט (2 / 3 / 4)
  useEffect(() => {
    const computeCols = () => {
      const w = window.innerWidth;
      setCols(w >= 960 ? 4 : w >= 600 ? 3 : 2);
    };
    computeCols();
    window.addEventListener('resize', computeCols);
    return () => window.removeEventListener('resize', computeCols);
  }, []);

  // מדידת יחס הממדים האמיתי של כל תמונה כשהיא נטענת
  const handleImageLoad = useCallback((id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    setImageRatios((prev) => (Math.abs((prev[id] ?? 0) - ratio) < 0.001 ? prev : { ...prev, [id]: ratio }));
  }, []);

  // פריסת הבנטו — span לכל תמונה לפי היחס שלה, ואז אריזה למלבן נקי
  const galleryLayout = useMemo<BentoCell[]>(() => {
    const spans = visibleBusinesses.map((b, i) => spanForRatio(imageRatios[b.id], i, cols));
    if (spans.length) spans[spans.length - 1] = { w: 1, h: 1 }; // המשבצת האחרונה תמיד 1×1 — מונע מתיחות קיצוניות
    return packBento(spans, cols);
  }, [visibleBusinesses, imageRatios, cols]);

  const showParentTabs = filteredData.length > 1;

  const handleParentChange = useCallback((id: ParentCategoryId) => {
    setActiveParent(id);
    setActiveSub(ALL_SUB_ID);
    setFilterKey((k) => k + 1);
  }, []);

  const handleSubChange = useCallback((id: string) => {
    setActiveSub(id);
    setFilterKey((k) => k + 1);
  }, []);

  const recomputeIndicator = useCallback(() => {
    const btn = parentButtonsRef.current[activeParent];
    const container = parentTabsRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({
      width: btnRect.width,
      offset: btnRect.left - containerRect.left,
    });
  }, [activeParent]);

  useEffect(() => {
    if (!showParentTabs) return;
    recomputeIndicator();
    window.addEventListener('resize', recomputeIndicator);
    return () => window.removeEventListener('resize', recomputeIndicator);
  }, [recomputeIndicator, activeParentData, showParentTabs]);

  // ---- Lightbox ----
  const openLightbox = useCallback((business: GalleryBusiness) => {
    setLightboxBusiness(business);
    setLightboxIndex(0);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxBusiness(null);
    document.body.style.overflow = '';
  }, []);

  const goToIndex = useCallback((targetIndex: number) => {
    const stage = stageRef.current;
    if (!stage) {
      setLightboxIndex(targetIndex);
      return;
    }
    suppressScrollSyncRef.current = true;
    stage.scrollTo({ left: targetIndex * stage.clientWidth, behavior: 'smooth' });
    setLightboxIndex(targetIndex);
    window.setTimeout(() => {
      suppressScrollSyncRef.current = false;
    }, 450);
  }, []);

  const showNext = useCallback(() => {
    if (!lightboxBusiness) return;
    const count = lightboxBusiness.images.length;
    goToIndex((lightboxIndex + 1) % count);
  }, [lightboxBusiness, lightboxIndex, goToIndex]);

  const showPrev = useCallback(() => {
    if (!lightboxBusiness) return;
    const count = lightboxBusiness.images.length;
    goToIndex((lightboxIndex - 1 + count) % count);
  }, [lightboxBusiness, lightboxIndex, goToIndex]);

  useEffect(() => {
    if (!lightboxBusiness) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showNext();
      else if (e.key === 'ArrowRight') showPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxBusiness, closeLightbox, showNext, showPrev]);

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    []
  );

  // סנכרון אינדקס פעיל לפי מיקום הגלילה בתצוגת ה-stage
  useEffect(() => {
    if (!lightboxBusiness) return;
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    const handleScroll = () => {
      if (suppressScrollSyncRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const width = stage.clientWidth;
        if (!width) return;
        const index = Math.round(stage.scrollLeft / width);
        setLightboxIndex((prev) => (prev === index ? prev : index));
      });
    };
    stage.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      stage.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [lightboxBusiness]);

  // גלילה של רצועת ה-thumbs כך שה-thumb הפעיל תמיד ממורכז
  useEffect(() => {
    if (!lightboxBusiness) return;
    const slider = thumbsSliderRef.current;
    const thumb = thumbButtonsRef.current[lightboxIndex];
    if (!slider || !thumb) return;
    const sliderRect = slider.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const delta = thumbRect.left + thumbRect.width / 2 - (sliderRect.left + sliderRect.width / 2);
    slider.scrollBy({ left: delta, behavior: 'smooth' });
  }, [lightboxIndex, lightboxBusiness]);

  // כותרת תצוגה — אם הועבר prop, אחרת label של הקטגוריה הראשית
  const displayTitle = title ?? activeParentData?.label ?? 'גלריה';
  const headerKicker = kicker ?? '01 / גלריה';
  const subCategories: GallerySubCategory[] = activeParentData?.subCategories ?? [];

  return (
    <div className={`${styles.gallery} ${className}`} dir="rtl">
      {/* ===== הדר הגלריה ===== */}
      <header className={styles.galleryHeader}>
        <div className={styles.headerKicker}>{headerKicker}</div>

        {showParentTabs ? (
          // 2+ קטגוריות — להציג טאבים
          <div className={styles.parentTabs} ref={parentTabsRef} role="tablist" aria-label="קטגוריות ראשיות">
            {filteredData.map((category) => (
              <button
                key={category.id}
                ref={(el) => {
                  parentButtonsRef.current[category.id] = el;
                }}
                className={`${styles.parentTab} ${activeParent === category.id ? styles.parentTabActive : ''}`}
                onClick={() => handleParentChange(category.id)}
                role="tab"
                aria-selected={activeParent === category.id}
                type="button"
              >
                {category.label}
              </button>
            ))}
            <span
              className={styles.parentIndicator}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.offset}px)`,
                visibility: indicator.width > 0 ? 'visible' : 'hidden',
              }}
              aria-hidden="true"
            />
          </div>
        ) : (
          // קטגוריה יחידה — להציג ככותרת מהממת
          <h2 className={styles.headerTitle}>{displayTitle}</h2>
        )}

        <div className={styles.headerCount}>
          <span className={styles.countNum}>{visibleBusinesses.length}</span>
          <span className={styles.countLabel}>
            {visibleBusinesses.length === totalParentCount
              ? 'פרויקטים בקטגוריה'
              : `מתוך ${totalParentCount} פרויקטים`}
          </span>
        </div>
      </header>

      {/* ===== Sub-tabs (כדורי פילטר) ===== */}
      {subCategories.length > 1 && (
        <div className={styles.subTabs} role="tablist" aria-label="תתי קטגוריות">
          <button
            className={`${styles.subTab} ${activeSub === ALL_SUB_ID ? styles.subTabActive : ''}`}
            onClick={() => handleSubChange(ALL_SUB_ID)}
            role="tab"
            aria-selected={activeSub === ALL_SUB_ID}
            type="button"
          >
            הכל
            <span className={styles.subTabCount}>{totalParentCount}</span>
          </button>
          {subCategories.map((sub) => (
            <button
              key={sub.id}
              className={`${styles.subTab} ${activeSub === sub.id ? styles.subTabActive : ''}`}
              onClick={() => handleSubChange(sub.id)}
              role="tab"
              aria-selected={activeSub === sub.id}
              type="button"
            >
              {sub.label}
              <span className={styles.subTabCount}>{sub.businesses.length}</span>
            </button>
          ))}
        </div>
      )}

      {/* ===== Grid / Empty State ===== */}
      {visibleBusinesses.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyMark}>—</div>
          <p className={styles.emptyText}>בקרוב — נעדכן את הקטגוריה בקרוב.</p>
        </div>
      ) : (
        <div
          className={styles.grid}
          key={filterKey}
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {visibleBusinesses.map((business, index) => {
            const cell = galleryLayout[index];
            return (
            <button
              key={business.id}
              className={styles.card}
              onClick={() => openLightbox(business)}
              style={{
                animationDelay: `${Math.min(index, 8) * 50}ms`,
                gridColumn: cell ? `${cell.c + 1} / span ${cell.w}` : undefined,
                gridRow: cell ? `${cell.r + 1} / span ${cell.h}` : undefined,
              }}
              type="button"
              aria-label={`פתיחת גלריה של ${business.name}`}
            >
              <div className={styles.cardImageWrap}>
                <img
                  src={business.images[0]}
                  alt={business.name}
                  className={styles.cardImage}
                  loading="lazy"
                  onLoad={(e) => handleImageLoad(business.id, e)}
                />
                {business.images.length > 1 && (
                  <span className={styles.cardCount}>{business.images.length}</span>
                )}
                <div className={styles.cardOverlay}>
                  <div className={styles.cardOverlayInner}>
                    <h3 className={styles.cardName}>{business.name}</h3>
                    {business.location && <p className={styles.cardLocation}>{business.location}</p>}
                    <span className={styles.cardArrow} aria-hidden="true">
                      ←
                    </span>
                  </div>
                </div>
              </div>
            </button>
            );
          })}
        </div>
      )}

      {/* ===== Lightbox (כפי שבנינו קודם — full-screen scroll-snap) ===== */}
      {lightboxBusiness && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxBusiness.name}
          onClick={closeLightbox}
        >
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="סגור גלריה"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className={styles.lightboxTopbar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxTitles}>
              <h3 className={styles.lightboxName}>{lightboxBusiness.name}</h3>
              {lightboxBusiness.location && (
                <p className={styles.lightboxLocation}>{lightboxBusiness.location}</p>
              )}
            </div>
            <div className={styles.lightboxCounter}>
              <span className={styles.lightboxCounterCurrent}>{lightboxIndex + 1}</span>
              <span className={styles.lightboxCounterDivider}>/</span>
              <span>{lightboxBusiness.images.length}</span>
            </div>
          </div>

          <div className={styles.lightboxStage} ref={stageRef} onClick={(e) => e.stopPropagation()} dir="ltr">
            {lightboxBusiness.images.map((img, i) => (
              <div key={img + i} className={styles.lightboxSlide}>
                <img
                  src={img}
                  alt={`${lightboxBusiness.name} — תמונה ${i + 1}`}
                  className={styles.lightboxImage}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {lightboxBusiness.images.length > 1 && (
            <>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="הקודם"
                type="button"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="הבא"
                type="button"
              >
                <span aria-hidden="true">›</span>
              </button>
            </>
          )}

          {lightboxBusiness.images.length > 1 && (
            <div
              className={styles.lightboxThumbs}
              ref={thumbsSliderRef}
              role="tablist"
              aria-label="תמונות בגלריה"
              onClick={(e) => e.stopPropagation()}
              dir="ltr"
            >
              {lightboxBusiness.images.map((img, i) => (
                <button
                  key={img + i}
                  ref={(el) => {
                    thumbButtonsRef.current[i] = el;
                  }}
                  className={`${styles.lightboxThumb} ${i === lightboxIndex ? styles.lightboxThumbActive : ''}`}
                  onClick={() => goToIndex(i)}
                  aria-label={`תמונה ${i + 1}`}
                  aria-selected={i === lightboxIndex}
                  role="tab"
                  type="button"
                >
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsGallery;
