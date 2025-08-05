// Services - Main Services Page
import React from 'react';
import styles from './Services.module.css';


interface ServicesProps {
  className?: string;
}

export const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.servicesPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              השירותים שלנו
            </h1>
            <p className={styles.heroSubtitle}>
              פתרונות מקצועיים בתחומי העיצוב והייצור
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {/* Commercial Design */}
            <div className={styles.service}>
              <div className={styles.serviceNumber}>01</div>
              <h2 className={styles.serviceTitle}>עיצוב מסחרי</h2>
              <p className={styles.serviceDescription}>
                ליווי כולל להקמת עסק – תכנון חוויית לקוח, עיצוב מרחבים, 
                התאמה לרגולציה, ייצור מותאם אישית והתקנה מושלמת
              </p>
              <div className={styles.serviceDetails}>
                <h3 className={styles.detailsTitle}>מה כלול:</h3>
                <ul className={styles.detailsList}>
                  <li>ייעוץ ותכנון חוויית לקוח</li>
                  <li>עיצוב אדריכלי ופנים</li>
                  <li>התאמה לדרישות רגולציה</li>
                  <li>ייצור רהיטים ואלמנטים מותאמים</li>
                  <li>ליווי וביצוע התקנה</li>
                </ul>
              </div>
            </div>

            {/* Architect Relations */}
            <div className={styles.service}>
              <div className={styles.serviceNumber}>02</div>
              <h2 className={styles.serviceTitle}>קשרי אדריכלים</h2>
              <p className={styles.serviceDescription}>
                שירותים טכניים מתקדמים לאדריכלים ומעצבים – 
                תכנון טכני, ייצור מדויק ופתרונות יצירתיים לפרויקטים מורכבים
              </p>
              <div className={styles.serviceDetails}>
                <h3 className={styles.detailsTitle}>מה כלול:</h3>
                <ul className={styles.detailsList}>
                  <li>ייעוץ טכני ותכנון מפורט</li>
                  <li>שירותי CAD ותכנון תלת-ממד</li>
                  <li>ייצור לפי תוכניות ודרישות מיוחדות</li>
                  <li>ליווי פרויקטים מורכבים</li>
                  <li>שירותי התקנה מקצועיים</li>
                </ul>
              </div>
            </div>

            {/* Private Furniture */}
            <div className={styles.service}>
              <div className={styles.serviceNumber}>03</div>
              <h2 className={styles.serviceTitle}>ריהוט לבתים פרטיים</h2>
              <p className={styles.serviceDescription}>
                פתרונות נגרות יוקרתיים בהתאמה אישית – 
                מטבחים, ארונות, ריהוט מיוחד ופתרונות אחסון מותאמים לבית שלכם
              </p>
              <div className={styles.serviceDetails}>
                <h3 className={styles.detailsTitle}>מה כלול:</h3>
                <ul className={styles.detailsList}>
                  <li>ייעוץ ותכנון מותאם אישית</li>
                  <li>עיצוב מטבחים וארונות</li>
                  <li>ריהוט מיוחד לפי הזמנה</li>
                  <li>פתרונות אחסון חכמים</li>
                  <li>התקנה ואחריות מלאה</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className={styles.processSection}>
            <h2 className={styles.processTitle}>איך אנחנו עובדים</h2>
            <div className={styles.processFlow}>
              <div className={styles.processStep}>
                <span className={styles.processNumber}>01</span>
                <span className={styles.processText}>פגישת ייעוץ וגיבוש הצרכים</span>
              </div>
              <div className={styles.processArrow}>←</div>
              <div className={styles.processStep}>
                <span className={styles.processNumber}>02</span>
                <span className={styles.processText}>תכנון ועיצוב מפורט</span>
              </div>
              <div className={styles.processArrow}>←</div>
              <div className={styles.processStep}>
                <span className={styles.processNumber}>03</span>
                <span className={styles.processText}>ייצור ברמה גבוהה</span>
              </div>
              <div className={styles.processArrow}>←</div>
              <div className={styles.processStep}>
                <span className={styles.processNumber}>04</span>
                <span className={styles.processText}>התקנה ומסירה</span>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>מעוניינים להתחיל פרויקט?</h2>
            <p className={styles.ctaDescription}>
              צרו קשר לפגישת ייעוץ חינם ונתחיל לתכנן את הפרויקט שלכם
            </p>
            <div className={styles.ctaButtons}>
              <a href="tel:+972-XX-XXX-XXXX" className={styles.ctaButton}>
                חייגו עכשיו
              </a>
              <a href="mailto:info@bullastudio.com" className={styles.ctaButtonSecondary}>
                שלחו מייל
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};