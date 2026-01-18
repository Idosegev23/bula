// Services - Main Services Page (One Stop Shop Process)
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Services.module.css';

interface ServicesProps {
  className?: string;
}

export const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  const location = useLocation();
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const [openGroup, setOpenGroup] = useState<number | null>(null);


  // --- new: mobile detection (same approach as your other component) ---
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // --------------------------------------------------------------------

  const stepTitles = [
    'סיור שטח',
    'מדידות או עבודה לפי תוכנית',
    'סקיצות העמדה',
    'סקיצות לבניית מותג גרפי',
    'אישורים ותכנון ייעודי',
    'עיצוב ותכנון והדמיות',
    'סט תוכניות עבודה',
    'בחירת ספקים וקבלני ביצוע',
    'ליווי בתהליך הבנייה',
    'עבודות משלימות והתאמות'
  ];

  const stepDetails = [
    {
      title: 'סיור שטח',
      description: `בשלב הזה אנחנו מגיעים למיקום ובוחנים את כל ההיבטים – גישה, סביבה, תנועה של לקוחות, מצב הנכס והאזור.
אנחנו מתעדים בתמונות ובווידאו, מזהים יתרונות ואתגרים, ומבצעים מדידות בסיסיות.
המטרה היא להבין את נקודת ההתחלה האמיתית ולהכין בסיס מידע מדויק להמשך.`,
      media: {
        type: 'gallery',
        items: ['/placeholder1.jpg', '/placeholder2.jpg', '/placeholder3.jpg']
      }
    },
    {
      title: 'מדידות או עבודה לפי תוכנית',
      description: `בשלב הזה אנחנו מודדים את כל החלל באמצעים מדויקים, או מאמתים את המידות מול תוכניות קיימות.
אנחנו מסמנים סטיות, מזהים מגבלות ומעדכנים את השרטוטים בהתאם.
כך יש לנו "מצב קיים" מדויק שמונע הפתעות בהמשך.`,
      media: {
        type: 'video',
        url: 'https://example.com/video.mp4'
      }
    },
    {
      title: 'סקיצות העמדה',
      description: `בשלב הזה אנחנו מתכננים פריסת חלל ראשונית בהתאם למטרות העסק – תפעול, חוויית לקוח, תדמית.
אנחנו בודקים חלופות שונות, מסדרים אזורי עבודה, שירות, תצוגה או מכירה, ובוחנים את הזרימה הכללית.
המטרה היא להגיע לחלופה אופטימלית לפני שנצלול לעיצוב.`,
      media: {
        type: 'gallery',
        items: ['/placeholder4.jpg', '/placeholder5.jpg']
      }
    },
    {
      title: 'סקיצות לבניית מותג גרפי',
      description: `בשלב הזה אנחנו מפתחים את הזהות הוויזואלית של העסק – לוגו, צבעים, טיפוגרפיה, אייקונים, שפת עיצוב.
אנחנו יוצרים חומרים שיתמכו בכל הפלטפורמות – דיגיטל, פרינט, שילוט, אריזות או מצגות.
זה הבסיס להופעה אחידה ומקצועית בכל נקודת מגע עם הלקוח.`,
      media: {
        type: 'gallery',
        items: ['/placeholder6.jpg', '/placeholder7.jpg', '/placeholder8.jpg']
      }
    },
    {
      title: 'אישורים ותכנון ייעודי',
      description: `בשלב הזה אנחנו מטפלים בכל הדרישות החוקיות והמקצועיות – רישוי עסקים, היתרים, תקנים, נגישות ובטיחות.
אנחנו מתאמים עם הרשויות, יועצים ומנהלי פרויקטים כדי לוודא שכל התהליך מתבצע בהתאם לחוק.
כך אפשר להתקדם בלי חשש לעיכובים בשלב הביצוע.`,
      media: {
        type: 'video',
        url: 'https://example.com/video2.mp4'
      }
    },
    {
      title: 'עיצוב ותכנון והדמיות',
      description: `בשלב הזה אנחנו מפתחים עיצוב מלא שמחבר בין המותג לבין החלל הפיזי.
אנחנו בוחרים חומרים, צבעים, תאורה, ריהוט ואביזרים, ומפיקים הדמיות תלת־ממד להמחשה מלאה.
המטרה היא שתדעו בדיוק איך ייראה העסק עוד לפני תחילת הביצוע.`,
      media: {
        type: 'gallery',
        items: ['/placeholder9.jpg', '/placeholder10.jpg', '/placeholder11.jpg', '/placeholder12.jpg']
      }
    },
    {
      title: 'סט תוכניות עבודה',
      description: `בשלב הזה אנחנו מפיקים סט ביצוע מלא – שרטוטים, מידות, מפרטים טכניים, כתב כמויות ותיאומים עם כל בעלי המקצוע.
כך כולם עובדים לפי אותו מסמך, בלי טעויות ובלי פרשנויות שונות.
השלב הזה חוסך כסף וזמן בשטח.`,
      media: {
        type: 'gallery',
        items: ['/placeholder13.jpg', '/placeholder14.jpg']
      }
    },
    {
      title: 'בחירת ספקים וקבלני ביצוע',
      description: `בשלב הזה אנחנו בוחרים יחד את הספקים והקבלנים שיבצעו את העבודה.
אנחנו משווים הצעות, בודקים המלצות, מקיימים סיורי קבלנים ומנהלים משא ומתן.
המטרה – לבחור את הגורמים המקצועיים ביותר במסגרת התקציב.`,
      media: {
        type: 'video',
        url: 'https://example.com/video3.mp4'
      }
    },
    {
      title: 'ליווי בתהליך הבנייה',
      description: `בשלב הזה אנחנו נמצאים בשטח באופן שוטף – מפקחים, בודקים איכות, פותרים בעיות בזמן אמת ומתאמים בין כל בעלי המקצוע.
אנחנו מנהלים ישיבות, עוקבים אחרי לוחות הזמנים ומוודאים שהכל מתקדם לפי התוכנית.
כך אתם יכולים להיות רגועים שהפרויקט בידיים טובות.`,
      media: {
        type: 'gallery',
        items: ['/placeholder15.jpg', '/placeholder16.jpg', '/placeholder17.jpg']
      }
    },
    {
      title: 'עבודות משלימות והתאמות',
      description: `בשלב הזה אנחנו מטפלים בכל העבודות המיוחדות – נגרות, מסגרות, הדפסות, שילוט, פתרונות טכנולוגיים ועוד.
אנחנו בודקים איכות, מבצעים התקנות, ומתאמים את כל הפרטים הקטנים שמייצרים את הגימור המושלם.
המטרה – שהעסק ייראה מוכן ומזמין ביום הפתיחה.`,
      media: {
        type: 'gallery',
        items: ['/placeholder18.jpg', '/placeholder19.jpg']
      }
    }
  ];


  const groupedSteps = [
    {
      groupTitle: 'שלב התכנון וההכנה',
      steps: [0, 1],
    },
    {
      groupTitle: 'שלב הקונספט והמיתוג',
      steps: [2, 3],
    },
    {
      groupTitle: 'אישורים ועיצוב מתקדם',
      steps: [4, 5],
    },
    {
      groupTitle: 'תוכניות וביצוע',
      steps: [6, 7],
    },
    {
      groupTitle: 'ליווי וסגירת פרויקט',
      steps: [8, 9],
    },
  ];
  

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  // CTA Canvas Effect
  useEffect(() => {
    const canvas = ctaCanvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawCtaElements();
    };

    const drawCtaElements = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // No background elements
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Hero Canvas Effect
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawHeroElements();
    };

    const drawHeroElements = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // No background elements
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  return (
    <main className={`${styles.servicesPage} ${className}`}>
      {/* conditional image based on isMobile */}
      {isMobile ? (
        <img
          src="/הקמת עסקים.webp"
          alt="הקמת עסקים"
          className={styles.decoration}
        />
      ) : (
        <img
          src="/הקמת עסקים דסקטופ.webp"
          alt="הקמת עסקים — דסקטופ"
          className={styles.decoration}
        />
      )}

      {/* Hero Section */}
      <section id="hero" className={styles.heroSection}>
        <canvas ref={heroCanvasRef} className={styles.heroCanvas}></canvas>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>עיצוב והקמת</div>
              {/* <div className={styles.shopBackground}>SHOP</div> */}
              <div>עסקים</div>
            </h1>
            {isMobile ? (
                <>
                  <p className={styles.heroSubtitle}>מרעיון לביצוע</p>
                  <p className={styles.heroSubtitle}>הכל במקום אחד</p>
                </>
              ) : (
                <>
                  <p className={styles.heroSubtitle}>
                    מרעיון לביצוע הכל במקום אחד
                    <img 
                      src="/כותרת הקמת עסקים.webp"
                      alt="הקמת עסקים"
                      className={styles.decorationLine}
                    />
                  </p>
                </>
              )}
          </div>
        </div>
      </section>
      {/* Process Section - Categories with Accordion */}
      <section id="commercial" className={styles.commercialSection}>
        <div className={styles.container}>
          <div className={styles.commercialInner}>
            <h3 className={styles.commercialTitle}>שלבים לבניית עסק חדש:</h3>
            
            <div className={styles.stepsContainer}>
  {groupedSteps.map((group, groupIndex) => {
    const isOpen = openGroup === groupIndex;

    return (
      <div key={groupIndex} className={styles.groupCard}>
        <div
          className={styles.groupHeader}
          onClick={() =>
            setOpenGroup(isOpen ? null : groupIndex)
          }
        >
          <h4 className={styles.groupTitle}>{group.groupTitle}</h4>
          <span className={styles.groupToggle}>
            {isOpen ? '−' : '+'}
          </span>
        </div>

        {isOpen && (
          <div className={styles.groupBody}>
            {group.steps.map((stepIndex) => (
              <button
                key={stepIndex}
                className={styles.stepItem}
                onClick={() => setSelectedStep(stepIndex)}
              >
                <span className={styles.stepNumber}>
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <span className={styles.stepText}>
                  {stepTitles[stepIndex]}
                </span>
                <span className={styles.stepArrow}>→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  })}
</div>


            {/* פופאפ פירוט השלב */}
            {selectedStep !== null && (
              <div className={styles.modalOverlay} onClick={() => setSelectedStep(null)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <button 
                    className={styles.closeButton}
                    onClick={() => setSelectedStep(null)}
                  >
                    ×
                  </button>
                  
                  <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{stepDetails[selectedStep].title}</h2>
                  </div>
                  
                  <div className={styles.modalBody}>
                    {/* מדיה - גלריה או וידאו */}
                    <div className={styles.mediaSection}>
                      {stepDetails[selectedStep].media.type === 'gallery' ? (
                        <div className={styles.gallery}>
                          {stepDetails[selectedStep].media.items?.map((item, index) => (
                            <div key={index} className={styles.galleryItem}>
                              <img src={item} alt={`${stepDetails[selectedStep].title} ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.videoContainer}>
                          <video controls className={styles.video}>
                            <source src={stepDetails[selectedStep].media.url} type="video/mp4" />
                            הדפדפן שלך לא תומך בוידאו.
                          </video>
                        </div>
                      )}
                    </div>
                    
                    {/* תוכן טקסטואלי */}
                    <div className={styles.textSection}>
                      <p className={styles.modalDescription}>
                        {stepDetails[selectedStep].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <canvas ref={ctaCanvasRef} className={styles.ctaCanvas}></canvas>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            {/* Gallery Preview */}
            <div className={styles.galleryPreview}>
              <h3 className={styles.galleryTitle}>עבודות שביצענו</h3>
              <div className={styles.galleryGrid}>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop&crop=center" alt="פרויקט בניה מסחרי" className={styles.galleryImage} />
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop&crop=center" alt="פרויקט משרדים מודרני" className={styles.galleryImage} />
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop&crop=center" alt="פרויקט מסעדה עיצוב פנים" className={styles.galleryImage} />
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop&crop=center" alt="פרויקט חנות מסחרית" className={styles.galleryImage} />
                </div>
              </div>
              <button className={styles.galleryViewMore}>
                צפייה בכל העבודות →
              </button>
            </div>
            
            <p className={styles.ctaSubtitle}>בואו נתחיל לבנות את העסק שלכם יחד</p>
                                    <div className={styles.ctaButtonContainer}>
                          <a 
                            href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20לקבל%20הצעת%20מחיר%20לליווי%20עסקי%20מלא"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.ctaButtonPrimary}
                          >
                            קבלת הצעת מחיר
                          </a>
                        </div>
          </div>
        </div>
      </section>
    </main>
  );
};
