// Services - Main Services Page (One Stop Shop Process)
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Services.module.css';
import RoughLogo from '../UI/RoughLogo';
import HeroBlueprintCanvas from '../UI/HeroBlueprintCanvas';


interface ServicesProps {
  className?: string;
}

const stepGroups = [
    {
      title: 'שלב 1 – תכנון ומחקר',
      steps: [
        'סיור שטח',
        'מדידות או עבודה לפי תוכנית',
        'סקיצות העמדה'
      ]
    },
    {
      title: 'שלב 2 – עיצוב ומיתוג',
      steps: [
        'סקיצות לבניית מותג גרפי',
        'אישורים ותכנון ייעודי',
        'עיצוב ותכנון והדמיות'
      ]
    },
    {
      title: 'שלב 3 – הכנה לביצוע',
      steps: [
        'סט תוכניות עבודה',
        'בחירת ספקים וקבלני ביצוע'
      ]
    },
    {
      title: 'שלב 4 – ביצוע וגימור',
      steps: [
        'ליווי בתהליך הבנייה',
        'עבודות משלימות והתאמות'
      ]
    }
];

const stepDetailsGroups = [
    [
      `אנחנו מגיעים למיקום ובוחנים את כל ההיבטים – גישה, סביבה, תנועה של לקוחות, מצב הנכס והאזור. אנחנו מתעדים בתמונות ובווידאו, מזהים יתרונות ואתגרים, ומבצעים מדידות בסיסיות.`,
      `אנחנו מודדים את כל החלל באמצעים מדויקים, או מאמתים את המידות מול תוכניות קיימות. אנחנו מסמנים סטיות, מזהים מגבלות ומעדכנים את השרטוטים בהתאם.`,
      `אנחנו מתכננים פריסת חלל ראשונית בהתאם למטרות העסק – תפעול, חוויית לקוח, תדמית. אנחנו בודקים חלופות שונות ובוחנים את הזרימה הכללית.`
    ],
    [
      `אנחנו מפתחים את הזהות הוויזואלית של העסק – לוגו, צבעים, טיפוגרפיה, אייקונים, שפת עיצוב. אנחנו יוצרים חומרים שיתמכו בכל הפלטפורמות.`,
      `אנחנו מטפלים בכל הדרישות החוקיות והמקצועיות – רישוי עסקים, היתרים, תקנים, נגישות ובטיחות. אנחנו מתאמים עם הרשויות ויועצים.`,
      `אנחנו מפתחים עיצוב מלא שמחבר בין המותג לבין החלל הפיזי. אנחנו בוחרים חומרים, צבעים, תאורה, ריהוט ומפיקים הדמיות תלת־ממד.`
    ],
    [
      `אנחנו מפיקים סט ביצוע מלא – שרטוטים, מידות, מפרטים טכניים, כתב כמויות ותיאומים עם כל בעלי המקצוע. כך כולם עובדים לפי אותו מסמך.`,
      `אנחנו בוחרים יחד את הספקים והקבלנים שיבצעו את העבודה. אנחנו משווים הצעות, בודקים המלצות ומנהלים משא ומתן.`
    ],
    [
      `אנחנו נמצאים בשטח באופן שוטף – מפקחים, בודקים איכות, פותרים בעיות בזמן אמת ומתאמים בין כל בעלי המקצוע.`,
      `אנחנו מטפלים בכל העבודות המיוחדות – נגרות, מסגרות, הדפסות, שילוט, פתרונות טכנולוגיים. אנחנו בודקים איכות ומתאמים את כל הפרטים הקטנים.`
    ]
];

export const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  const location = useLocation();
  // חישוב מספר השלבים הכולל
  const totalSteps = stepGroups.reduce((total, group) => total + group.steps.length, 0);
  const [completed, setCompleted] = useState<boolean[]>(() => Array(totalSteps).fill(false));
  const [openSteps, setOpenSteps] = useState<boolean[]>(() => Array(totalSteps).fill(false));

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
              {stepGroups.map((group, groupIndex) => {
                let stepIndex = 0;
                // חישוב האינדקס הכולל לכל שלב
                for (let i = 0; i < groupIndex; i++) {
                  stepIndex += stepGroups[i].steps.length;
                }
                
                return (
                  <div key={groupIndex} className={styles.stepGroup}>
                    <h3 className={styles.groupTitle}>{group.title}</h3>
                    {group.steps.map((step, subIndex) => {
                      const currentIndex = stepIndex + subIndex;
                      return (
                        <div key={currentIndex} className={styles.stepBlock}>
                          <div 
                            className={styles.stepCard}
                            onClick={() => {
                              setOpenSteps(prev => {
                                const next = [...prev];
                                next[currentIndex] = !next[currentIndex];
                                return next;
                              });
                            }}
                          >
                            <div className={styles.stepHeader}>
                              <div 
                                className={styles.stepCheckbox}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCompleted(prev => {
                                    const next = [...prev];
                                    next[currentIndex] = !next[currentIndex];
                                    return next;
                                  });
                                }}
                              >
                                {completed[currentIndex] ? '✓' : '○'}
                              </div>
                              <h4 className={styles.stepTitle}>
                                {step}
                              </h4>
                            </div>
                            {openSteps[currentIndex] && (
                              <div className={styles.stepDetail}>
                                <p className={styles.stepDescription}>{stepDetailsGroups[groupIndex][subIndex]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};