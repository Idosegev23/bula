// Services - Main Services Page (One Stop Shop Process)
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Services.module.css';
import RoughLogo from '../UI/RoughLogo';
import HeroBlueprintCanvas from '../UI/HeroBlueprintCanvas';


interface ServicesProps {
  className?: string;
}



export const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  const location = useLocation();
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    'שלב 1 – סיור שטח',
    'שלב 2 – מדידות או עבודה לפי תוכנית',
    'שלב 3 – סקיצות העמדה',
    'שלב 4 – סקיצות לבניית מותג גרפי',
    'שלב 5 – אישורים ותכנון ייעודי',
    'שלב 6 – עיצוב ותכנון והדמיות',
    'שלב 7 – סט תוכניות עבודה',
    'שלב 8 – בחירת ספקים וקבלני ביצוע',
    'שלב 9 – ליווי בתהליך הבנייה',
    'שלב 10 – עבודות משלימות והתאמות'
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

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);
  return (
    <main className={`${styles.servicesPage} ${className}`}>
      {/* Hero Section */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <HeroBlueprintCanvas />
            <div className={styles.heroLogoWrap}>
              <RoughLogo src="/bulla_logo.svg" className={styles.heroLogo} stroke="#000" strokeWidth={1.9} roughness={3.6} bowing={2.2} repeats={3} />
            </div>
            <h1 className={styles.heroTitle}>
              <div>ONE STOP SHOP</div>
              <div className={styles.boldText}>לעסק שלך</div>
            </h1>
            <p className={styles.heroSubtitle}>מרעיון לביצוע – הכל במקום אחד, בתהליך מסודר וברור</p>
          </div>
        </div>
      </section>
      {/* Process Section - Dedicated Page */}
      <section id="commercial" className={styles.commercialSection}>
        <div className={styles.container}>
          <div className={styles.commercialInner}>
            <h3 className={styles.commercialTitle}>בניית עסק חדש – שלבים</h3>
            
            <div className={styles.stepsContainer}>
              {steps.map((step, index) => (
                <div key={index} className={styles.stepBlock}>
                  <button 
                    className={styles.stepButton}
                    onClick={() => setSelectedStep(index)}
                  >
                    <span className={styles.stepIcon}>🔍</span>
                    <h4 className={styles.stepTitle}>{step}</h4>
                    <span className={styles.viewMore}>לחץ לפירוט</span>
                  </button>
                </div>
              ))}
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
    </main>
  );
};