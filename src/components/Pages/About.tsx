import React from 'react';
import styles from './About.module.css';

export interface AboutProps {
  className?: string;
}

export const About: React.FC<AboutProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.aboutPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>אודות</div>
              <div>בולה סטודיו</div>
            </h1>
            <p className={styles.heroSubtitle}>
              יוצרים מרחבים שמספרים סיפור
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>הסיפור שלנו</h2>
              <p className={styles.description}>
                בולה סטודיו נוסד מתוך אהבה עמוקה לעיצוב ויצירה. אנחנו מאמינים שכל מרחב יכול 
                לספר סיפור, ושכל פרויקט הוא הזדמנות ליצור משהו מיוחד ובלתי נשכח.
              </p>
              
              <p className={styles.description}>
                עם שנים של ניסיון בתכנון ועיצוב מרחבים, אנחנו מביאים גישה ייחודית שמשלבת 
                מקצועיות גבוהה עם חשיבה יצירתית. כל פרויקט מתחיל בהקשבה - להבין את החזון, 
                את הצרכים, ואת הסיפור שרוצים לספר.
              </p>

              <p className={styles.description}>
                המטרה שלנו היא לא רק ליצור מרחבים יפים, אלא מרחבים שעובדים. מרחבים שמשפרים 
                את איכות החיים, מגבירים פרודוקטיביות, ויוצרים חוויות בלתי נשכחות.
              </p>
            </div>
            
            <div className={styles.imageContent}>
              <div className={styles.mainImage}>
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop" 
                  alt="הצוות שלנו בעבודה"
                  className={styles.contentImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הערכים שלנו</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>מקצועיות</h3>
              <p className={styles.valueDescription}>
                אנחנו מביאים ידע מקצועי עמיק, ניסיון רב, ומחויבות לאיכות הגבוהה ביותר בכל פרויקט.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>יצירתיות</h3>
              <p className={styles.valueDescription}>
                כל פרויקט הוא הזדמנות ליצור משהו ייחודי ומיוחד, שמשקף את האישיות והצרכים של הלקוח.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>שירות אישי</h3>
              <p className={styles.valueDescription}>
                אנחנו מאמינים בליווי צמוד ואישי, בהקשבה אמיתית, ובהתאמה מלאה לצרכים הייחודיים של כל לקוח.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>קיימות</h3>
              <p className={styles.valueDescription}>
                אנחנו שואפים לעיצוב אחראי, עם דגש על חומרים איכותיים, עמידים וידידותיים לסביבה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>התהליך שלנו</h2>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>הקשבה וחקירה</h3>
              <p className={styles.stepDescription}>
                אנחנו מתחילים בהכרת הלקוח, הבנת הצרכים, החזון והסגנון האישי.
              </p>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>תכנון ועיצוב</h3>
              <p className={styles.stepDescription}>
                פיתוח קונספט עיצובי, תוכניות מפורטות והדמיות תלת-ממדיות.
              </p>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>ביצוע וליווי</h3>
              <p className={styles.stepDescription}>
                ניהול הפרויקט, תיאום עם קבלנים ופיקוח על איכות הביצוע.
              </p>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>04</div>
              <h3 className={styles.stepTitle}>מסירה והשלמה</h3>
              <p className={styles.stepDescription}>
                סיום הפרויקט, מסירת המרחב המוגמר וליווי לאחר המסירה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>מוכנים להתחיל?</h2>
            <p className={styles.ctaSubtitle}>בואו ניצור יחד את המרחב המושלם שלכם</p>
            <a 
              href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20להתחיל%20פרויקט%20חדש"
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              בואו נתחיל לתכנן
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};