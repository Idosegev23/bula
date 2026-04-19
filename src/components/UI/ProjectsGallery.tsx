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
  data?: GalleryParentCategory[];
  className?: string;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  defaultCategory = 'businesses',
  data = projectsGalleryData,
  className = '',
}) => {
  const [activeParent, setActiveParent] = useState<ParentCategoryId>(defaultCategory);
  const [activeSub, setActiveSub] = useState<string>(
    () => data.find((c) => c.id === defaultCategory)?.subCategories[0]?.id ?? ''
  );
  const [lightboxBusiness, setLightboxBusiness] = useState<GalleryBusiness | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const parentTabsRef = useRef<HTMLDivElement>(null);
  const parentButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const thumbsSliderRef = useRef<HTMLDivElement>(null);
  const thumbButtonsRef = useRef<Record<number, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ width: number; offset: number }>({ width: 0, offset: 0 });

  const activeParentData = useMemo(
    () => data.find((c) => c.id === activeParent) ?? data[0],
    [data, activeParent]
  );

  const activeSubData = useMemo(
    () => activeParentData.subCategories.find((s) => s.id === activeSub) ?? activeParentData.subCategories[0],
    [activeParentData, activeSub]
  );

  const handleParentChange = useCallback(
    (id: ParentCategoryId) => {
      setActiveParent(id);
      const firstSub = data.find((c) => c.id === id)?.subCategories[0]?.id ?? '';
      setActiveSub(firstSub);
    },
    [data]
  );

  useEffect(() => {
    const btn = parentButtonsRef.current[activeParent];
    const container = parentTabsRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({
      width: btnRect.width,
      offset: btnRect.left - containerRect.left,
    });
  }, [activeParent, activeParentData]);

  const openLightbox = useCallback((business: GalleryBusiness) => {
    setLightboxBusiness(business);
    setLightboxIndex(0);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxBusiness(null);
    document.body.style.overflow = '';
  }, []);

  const showNext = useCallback(() => {
    if (!lightboxBusiness) return;
    setLightboxIndex((i) => (i + 1) % lightboxBusiness.images.length);
  }, [lightboxBusiness]);

  const showPrev = useCallback(() => {
    if (!lightboxBusiness) return;
    setLightboxIndex((i) => (i - 1 + lightboxBusiness.images.length) % lightboxBusiness.images.length);
  }, [lightboxBusiness]);

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
      <div className={styles.parentTabs} ref={parentTabsRef} role="tablist" aria-label="קטגוריות ראשיות">
        {data.map((category) => (
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
          style={{ width: indicator.width, transform: `translateX(${indicator.offset}px)` }}
          aria-hidden="true"
        />
      </div>

      <div className={styles.subTabs} role="tablist" aria-label="תתי קטגוריות">
        {activeParentData.subCategories.map((sub) => (
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
        <div className={styles.lightbox} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label={lightboxBusiness.name}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <header className={styles.lightboxHeader}>
              <div className={styles.lightboxTitles}>
                <h3 className={styles.lightboxName}>{lightboxBusiness.name}</h3>
                {lightboxBusiness.location && (
                  <p className={styles.lightboxLocation}>{lightboxBusiness.location}</p>
                )}
              </div>
              <div className={styles.lightboxCounter}>
                {lightboxIndex + 1} / {lightboxBusiness.images.length}
              </div>
              <button
                className={styles.lightboxClose}
                onClick={closeLightbox}
                aria-label="סגור"
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className={styles.lightboxStage}>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`}
                onClick={showPrev}
                aria-label="הקודם"
                type="button"
                disabled={lightboxBusiness.images.length <= 1}
              >
                <span aria-hidden="true">›</span>
              </button>

              <img
                key={lightboxIndex}
                src={lightboxBusiness.images[lightboxIndex]}
                alt={`${lightboxBusiness.name} — תמונה ${lightboxIndex + 1}`}
                className={styles.lightboxImage}
              />

              <button
                className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
                onClick={showNext}
                aria-label="הבא"
                type="button"
                disabled={lightboxBusiness.images.length <= 1}
              >
                <span aria-hidden="true">‹</span>
              </button>
            </div>

            {lightboxBusiness.images.length > 1 && (
              <div
                className={styles.carouselSlider}
                ref={thumbsSliderRef}
                role="tablist"
                aria-label="תמונות בגלריה"
              >
                {lightboxBusiness.images.map((img, i) => (
                  <button
                    key={img + i}
                    ref={(el) => {
                      thumbButtonsRef.current[i] = el;
                    }}
                    className={`${styles.carouselSlide} ${i === lightboxIndex ? styles.carouselSlideActive : ''}`}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`תמונה ${i + 1}`}
                    aria-selected={i === lightboxIndex}
                    role="tab"
                    type="button"
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className={styles.carouselThumb}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsGallery;
