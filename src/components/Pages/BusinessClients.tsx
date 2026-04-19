import React from 'react';
import styles from './BusinessClients.module.css';
import { ProjectsGallery } from '../UI/ProjectsGallery';

export interface BusinessClientsProps {
  className?: string;
}

export const BusinessClients: React.FC<BusinessClientsProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.businessClientsPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>לקוחות</div>
              <div>עסקיים</div>
              {/* <span className={styles.backgroundText}>BUSINESS</span> */}
            </h1>
            <p className={styles.heroSubtitle}>
              פתרונות מקצועיים לעסק המצליח שלכם
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>העסק שלכם, ההצלחה שלנו</h2>
              <p className={styles.description}>
                אנחנו מבינים שהעסק שלכם הוא הרבה יותר ממקום עבודה - זה המקום שבו החזון שלכם מתגשם. 
                עם ניסיון עשיר בתכנון ועיצוב מרחבים מסחריים, אנחנו מלווים אתכם ביצירת סביבת עבודה מושלמת.
              </p>
              
              <h3 className={styles.subTitle}>התמחויות שלנו:</h3>
              <ul className={styles.servicesList}>
                <li>משרדים ומרחבי עבודה</li>
                <li>חנויות ומרחבי קמעונאות</li>
                <li>מסעדות ובתי קפה</li>
                <li>מרפאות ומכוני יופי</li>
                <li>חללי אירועים ומלונות</li>
                <li>מרחבים תעשייתיים</li>
              </ul>

              <h3 className={styles.subTitle}>השירותים שלנו כוללים:</h3>
              <ul className={styles.servicesList}>
                <li>תכנון מרחב מותאם לצרכי העסק</li>
                <li>עיצוב פנים מקצועי ויעיל</li>
                <li>ייעוץ בבחירת חומרים עמידים ואיכותיים</li>
                <li>ניהול פרויקט מקצועי</li>
                <li>תיאום עם רשויות ובעלי מקצוע</li>
                <li>ליווי עד השלמת הפרויקט</li>
              </ul>

              <p className={styles.description}>
                אנחנו יודעים שזמן זה כסף בעולם העסקים. לכן אנחנו עובדים ביעילות מקסימלית, 
                עם לוחות זמנים ברורים ותקשורת שוטפת. המטרה שלנו: להפוך את החזון שלכם למציאות 
                תוך מינימום הפרעות לפעילות העסקית.
              </p>
            </div>
            
            <div className={styles.imageContent}>
              <div className={styles.mainImage}>
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
                  alt="משרד מודרני ומעוצב"
                  className={styles.contentImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>פרויקטים שביצענו</h2>
          <ProjectsGallery parents={['businesses']} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>מוכנים להצליח?</h2>
            <p className={styles.ctaSubtitle}>בואו ניצור יחד את המרחב המושלם לעסק שלכם</p>
            <a 
              href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20לקבל%20הצעת%20מחיר%20לפרויקט%20עסקי"
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              קבלת הצעת מחיר
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
