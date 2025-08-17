// TargetAudiences - שלושה תחומים עיקריים עם תמונות רקע
import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import styles from './TargetAudiences.module.css';

interface TargetAudiencesProps {
  className?: string;
}

export const TargetAudiences: React.FC<TargetAudiencesProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // טעינת אנימציית Lottie
  useEffect(() => {
    fetch('./lottie/tape-measure.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
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
  }, [isVisible]);

  // Scroll Observer for floating buttons
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if we've reached the end of the section (bottom of section is visible or past)
      const reachedSectionEnd = sectionRect.bottom <= windowHeight * 0.8;
      
      if (reachedSectionEnd && !isFloating) {
        setIsFloating(true);
        setTimeout(() => setShowFloating(true), 100);
      } else if (!reachedSectionEnd && isFloating) {
        setShowFloating(false);
        setTimeout(() => setIsFloating(false), 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFloating]);

  // Handle floating button click
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  // Carousel navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % targetAudiences.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + targetAudiences.length) % targetAudiences.length);
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const targetAudiences = [
    {
      id: 'commercial',
      title: 'עיצוב מסחרי',
      description: 'ליווי כולל להקמת עסק – תכנון חוויה, עיצוב, רגולציה, ייצור והתקנה מושלמת',
      backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M3 21H21V19H3V21Z" fill="currentColor"/>
          <path d="M5 19V7L12 2L19 7V19H17V9H7V19H5Z" fill="currentColor"/>
          <path d="M9 11H11V13H9V11Z" fill="currentColor"/>
          <path d="M13 11H15V13H13V11Z" fill="currentColor"/>
          <path d="M9 15H11V17H9V15Z" fill="currentColor"/>
          <path d="M13 15H15V17H13V15Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'architects',
      title: 'אדריכלים AND MORE',
      description: 'שירותים טכניים מתקדמים וייצור מקצועי לאדריכלים ומעצבים עם דיוק מושלם',
      backgroundImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      id: 'private',
      title: 'ריהוט לבתים פרטיים',
      description: 'פרטי נגרות יוקרתיים בהתאמה אישית מושלמת לפי תוכניות ודרישות מדויקות',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Lottie Divider */}
      {animationData && (
        <div className={styles.lottieDivider}>
          <Lottie 
            animationData={animationData}
            loop={true}
            autoplay={true}
            className={styles.lottieAnimation}
          />
        </div>
      )}

      <section 
        ref={sectionRef}
        className={`${styles.audiencesSection} ${className} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.container}>
          {/* כותרת הסקציה */}
          <div className={styles.titleSection}>
            <h2 className={styles.sectionTitle}>
              אנחנו מתמחים בשלושה תחומים עיקריים
            </h2>
            <p className={styles.sectionSubtitle}>
              כל תחום מקבל את מלוא המקצועיות והתשומת לב שלנו
            </p>
          </div>

          {/* Mobile Carousel Controls */}
          <div className={styles.mobileCarousel}>
            {/* Navigation Arrows */}
            <button 
              className={`${styles.carouselArrow} ${styles.prevArrow}`}
              onClick={prevSlide}
              aria-label="עבר לקרוסלה הקודמת"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Carousel Container */}
            <div className={styles.carouselContainer}>
              <div 
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {targetAudiences.map((audience, index) => (
                  <div 
                    key={audience.id}
                    className={`${styles.carouselSlide} ${isVisible ? styles.cardVisible : ''}`}
                    style={{
                      backgroundImage: `linear-gradient(
                        135deg, 
                        rgba(139, 90, 66, 0.85) 0%, 
                        rgba(139, 90, 66, 0.75) 50%, 
                        rgba(139, 90, 66, 0.85) 100%
                      ), url(${audience.backgroundImage})`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    {/* תוכן הכרטיס */}
                    <div className={styles.cardContent}>
                      <div className={styles.cardIcon}>
                        {audience.icon}
                      </div>
                      
                      <h3 className={styles.cardTitle}>{audience.title}</h3>
                      <p className={styles.cardDescription}>{audience.description}</p>
                      
                      {/* כפתור לפרטים נוספים */}
                      <button className={styles.cardButton}>
                        <span>לפרטים נוספים</span>
                        <svg className={styles.buttonArrow} viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* overlay למעבר עכבר */}
                    <div className={styles.cardOverlay}></div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className={`${styles.carouselArrow} ${styles.nextArrow}`}
              onClick={nextSlide}
              aria-label="עבר לקרוסלה הבאה"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className={styles.carouselDots}>
              {targetAudiences.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.carouselDot} ${index === activeSlide ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`עבר לסליידה ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid - אחד ליד השני */}
          <div className={styles.audiencesGrid}>
            {targetAudiences.map((audience, index) => (
              <div 
                key={audience.id}
                className={`${styles.audienceCard} ${isVisible ? styles.cardVisible : ''}`}
                style={{
                  backgroundImage: `linear-gradient(
                    135deg, 
                    rgba(139, 90, 66, 0.85) 0%, 
                    rgba(139, 90, 66, 0.75) 50%, 
                    rgba(139, 90, 66, 0.85) 100%
                  ), url(${audience.backgroundImage})`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* תוכן הכרטיס */}
                <div className={styles.cardContent}>
                  <div className={styles.cardIcon}>
                    {audience.icon}
                  </div>
                  
                  <h3 className={styles.cardTitle}>{audience.title}</h3>
                  <p className={styles.cardDescription}>{audience.description}</p>
                  
                  {/* כפתור לפרטים נוספים */}
                  <button className={styles.cardButton}>
                    <span>לפרטים נוספים</span>
                    <svg className={styles.buttonArrow} viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* overlay למעבר עכבר */}
                <div className={styles.cardOverlay}></div>
              </div>
            ))}
          </div>

          {/* סיכום */}
          <div className={styles.summarySection}>
            <p className={styles.tagline}>
              מתכנון ראשוני ועד למוצר מושלם - אנחנו כאן לכל שלב בדרך
            </p>
          </div>
        </div>
      </section>

      {/* Lottie Divider תחתון */}
      {animationData && (
        <div className={styles.lottieDivider}>
          <Lottie 
            animationData={animationData}
            loop={true}
            autoplay={true}
            className={styles.lottieAnimation}
          />
        </div>
      )}

      {/* Floating Buttons */}
      {isFloating && (
        <div className={`${styles.floatingContainer} ${showFloating ? styles.floatingVisible : ''}`}>
          <div className={styles.floatingButtons}>
            {targetAudiences.map((audience, index) => (
              <button
                key={audience.id}
                className={`${styles.floatingButton} ${showFloating ? styles.buttonVisible : ''}`}
                onClick={scrollToSection}
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`חזור לסקשן ${audience.title}`}
              >
                <div className={styles.floatingIcon}>
                  {audience.icon}
                </div>
                <span className={styles.floatingTitle}>{audience.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}; 