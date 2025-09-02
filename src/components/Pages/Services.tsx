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
  const [completed, setCompleted] = useState<boolean[]>(() => Array(10).fill(false));
  const [openSteps, setOpenSteps] = useState<boolean[]>(() => Array(10).fill(false));

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
    `בשלב הזה אנחנו מגיעים למיקום ובוחנים את כל ההיבטים – גישה, סביבה, תנועה של לקוחות, מצב הנכס והאזור.
אנחנו מתעדים בתמונות ובווידאו, מזהים יתרונות ואתגרים, ומבצעים מדידות בסיסיות.
המטרה היא להבין את נקודת ההתחלה האמיתית ולהכין בסיס מידע מדויק להמשך.`,
    `בשלב הזה אנחנו מודדים את כל החלל באמצעים מדויקים, או מאמתים את המידות מול תוכניות קיימות.
אנחנו מסמנים סטיות, מזהים מגבלות ומעדכנים את השרטוטים בהתאם.
כך יש לנו "מצב קיים" מדויק שמונע הפתעות בהמשך.`,
    `בשלב הזה אנחנו מתכננים פריסת חלל ראשונית בהתאם למטרות העסק – תפעול, חוויית לקוח, תדמית.
אנחנו בודקים חלופות שונות, מסדרים אזורי עבודה, שירות, תצוגה או מכירה, ובוחנים את הזרימה הכללית.
המטרה היא להגיע לחלופה אופטימלית לפני שנצלול לעיצוב.`,
    `בשלב הזה אנחנו מפתחים את הזהות הוויזואלית של העסק – לוגו, צבעים, טיפוגרפיה, אייקונים, שפת עיצוב.
אנחנו יוצרים חומרים שיתמכו בכל הפלטפורמות – דיגיטל, פרינט, שילוט, אריזות או מצגות.
זה הבסיס להופעה אחידה ומקצועית בכל נקודת מגע עם הלקוח.`,
    `בשלב הזה אנחנו מטפלים בכל הדרישות החוקיות והמקצועיות – רישוי עסקים, היתרים, תקנים, נגישות ובטיחות.
אנחנו מתאמים עם הרשויות, יועצים ומנהלי פרויקטים כדי לוודא שכל התהליך מתבצע בהתאם לחוק.
כך אפשר להתקדם בלי חשש לעיכובים בשלב הביצוע.`,
    `בשלב הזה אנחנו מפתחים עיצוב מלא שמחבר בין המותג לבין החלל הפיזי.
אנחנו בוחרים חומרים, צבעים, תאורה, ריהוט ואביזרים, ומפיקים הדמיות תלת־ממד להמחשה מלאה.
המטרה היא שתדעו בדיוק איך ייראה העסק עוד לפני תחילת הביצוע.`,
    `בשלב הזה אנחנו מפיקים סט ביצוע מלא – שרטוטים, מידות, מפרטים טכניים, כתב כמויות ותיאומים עם כל בעלי המקצוע.
כך כולם עובדים לפי אותו מסמך, בלי טעויות ובלי פרשנויות שונות.
השלב הזה חוסך כסף וזמן בשטח.`,
    `בשלב הזה אנחנו בוחרים יחד את הספקים והקבלנים שיבצעו את העבודה.
אנחנו משווים הצעות, בודקים המלצות, מקיימים סיורי קבלנים ומנהלים משא ומתן.
המטרה – לבחור את הגורמים המקצועיים ביותר במסגרת התקציב.`,
    `בשלב הזה אנחנו נמצאים בשטח באופן שוטף – מפקחים, בודקים איכות, פותרים בעיות בזמן אמת ומתאמים בין כל בעלי המקצוע.
אנחנו מנהלים ישיבות, עוקבים אחרי לוחות הזמנים ומוודאים שהכל מתקדם לפי התוכנית.
כך אתם יכולים להיות רגועים שהפרויקט בידיים טובות.`,
    `בשלב הזה אנחנו מטפלים בכל העבודות המיוחדות – נגרות, מסגרות, הדפסות, שילוט, פתרונות טכנולוגיים ועוד.
אנחנו בודקים איכות, מבצעים התקנות, ומתאמים את כל הפרטים הקטנים שמייצרים את הגימור המושלם.
המטרה – שהעסק ייראה מוכן ומזמין ביום הפתיחה.`
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
                  <div className={styles.stepHeader}>
                    <div 
                      className={styles.stepCheckbox}
                      onClick={() => {
                        setCompleted(prev => {
                          const next = [...prev];
                          next[index] = !next[index];
                          return next;
                        });
                      }}
                    >
                      {completed[index] ? '✓' : '○'}
                    </div>
                    <h4 
                      className={styles.stepTitle}
                      onClick={() => {
                        setOpenSteps(prev => {
                          const next = [...prev];
                          next[index] = !next[index];
                          return next;
                        });
                      }}
                    >
                      {step}
                    </h4>
                  </div>
                  {openSteps[index] && (
                    <div className={styles.stepDetail}>
                      <p className={styles.stepDescription}>{stepDetails[index]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};