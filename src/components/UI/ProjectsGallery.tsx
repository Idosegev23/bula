import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './ProjectsGallery.module.css';
import {
  projectsGalleryData,
  type GalleryBusiness,
  type GalleryParentCategory,
  type ParentCategoryId,
} from '../../data/projectsGallery';

export interface ProjectsGalleryProps {
  defaultCategory?: ParentCategoryId;
  /** מסנן אילו קטגוריות-אם יופיעו. אם מועברת רק קטגוריה אחת — שורת הכרטיסיות-אם מוסתרת אוטומטית. */
  parents?: ParentCategoryId[];
  data?: GalleryParentCategory[];
  className?: string;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  defaultCategory,
  parents,
  data = projectsGalleryData,
  className = '',
}) => {
  const filteredData = useMemo(
    () => (parents && parents.length ? data.filter((c) => parents.includes(c.id)) : data),
    [data, parents]
  );

  const initialParent = defaultCategory && filteredData.some((c) => c.id === defaultCategory)
    ? defaultCategory
    : filteredData[0]?.id ?? 'businesses';

  const [activeParent, setActiveParent] = useState<ParentCategoryId>(initialParent);
  const [activeSub, setActiveSub] = useState<string>(
    () => filteredData.find((c) => c.id === initialParent)?.subCategories[0]?.id ?? ''
  );
  const [lightboxBusiness, setLightboxBusiness] = useState<GalleryBusiness | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const parentTabsRef = useRef<HTMLDivElement>(null);
  const parentButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const thumbsSliderRef = useRef<HTMLDivElement>(null);
  const thumbButtonsRef = useRef<Record<number, HTMLButtonElement | null>>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const suppressScrollSyncRef = useRef(false);
  const [indicator, setIndicator] = useState<{ width: number; offset: number }>({ width: 0, offset: 0 });

  const activeParentData = useMemo(
    () => filteredData.find((c) => c.id === activeParent) ?? filteredData[0],
    [filteredData, activeParent]
  );

  const activeSubData = useMemo(
    () => activeParentData?.subCategories.find((s) => s.id === activeSub) ?? activeParentData?.subCategories[0],
    [activeParentData, activeSub]
  );

  const showParentTabs = filteredData.length > 1;

  const handleParentChange = useCallback(
    (id: ParentCategoryId) => {
      setActiveParent(id);
      const firstSub = filteredData.find((c) => c.id === id)?.subCategories[0]?.id ?? '';
      setActiveSub(firstSub);
    },
    [filteredData]
  );

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

  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

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

  return (
    <div className={`${styles.gallery} ${className}`} dir="rtl">
      {showParentTabs && (
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
      )}

      <div className={styles.subTabs} role="tablist" aria-label="תתי קטגוריות">
        {activeParentData?.subCategories.map((sub) => (
          <button
            key={sub.id}
            className={`${styles.subTab} ${activeSub === sub.id ? styles.subTabActive : ''}`}
            onClick={() => setActiveSub(sub.id)}
            role="tab"
            aria-selected={activeSub === sub.id}
            type="button"
          >
            {sub.label}
          </button>
        ))}
      </div>

      <div className={styles.grid} key={`${activeParent}-${activeSub}`}>
        {activeSubData?.businesses.map((business, index) => (
          <button
            key={business.id}
            className={styles.card}
            onClick={() => openLightbox(business)}
            style={{ animationDelay: `${index * 60}ms` }}
            type="button"
            aria-label={`פתיחת גלריה של ${business.name}`}
          >
            <div className={styles.cardImageWrap}>
              <img
                src={business.images[0]}
                alt={business.name}
                className={styles.cardImage}
                loading="lazy"
              />
              <span className={styles.cardCount}>{business.images.length}</span>
            </div>
            <div className={styles.cardMeta}>
              <h3 className={styles.cardName}>{business.name}</h3>
              {business.location && <p className={styles.cardLocation}>{business.location}</p>}
            </div>
          </button>
        ))}
      </div>

      {lightboxBusiness && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxBusiness.name}
          onClick={closeLightbox}
        >
          {/* כפתור סגירה צף — נשאר גלוי וקליקבילי בכל מצב וגודל מסך */}
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="סגור גלריה"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>

          {/* כותרת עליונה דקה */}
          <div
            className={styles.lightboxTopbar}
            onClick={(e) => e.stopPropagation()}
          >
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

          {/* במת תמונות — scroll-snap אופקי: swipe במובייל, חצים בדסקטופ */}
          <div
            className={styles.lightboxStage}
            ref={stageRef}
            onClick={(e) => e.stopPropagation()}
            dir="ltr"
          >
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

          {/* חצי ניווט — מופיעים רק בדסקטופ, לא חוסמים את התמונה */}
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

          {/* רצועת thumbnails בתחתית — תמיד thumbnails אמיתיים, גם במובייל */}
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
