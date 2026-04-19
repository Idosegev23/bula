import React from 'react';
import styles from './PrivateClients.module.css';
import { ProjectsGallery } from '../UI/ProjectsGallery';

export interface PrivateClientsProps {
  className?: string;
}

export const PrivateClients: React.FC<PrivateClientsProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.privateClientsPage} ${className}`}>
      <img 
        src="/נגרות.webp"
        alt="נגרות"
        className={styles.decoration}
      />
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>נגרות</div>
              <div>בהתאמה אישית</div>
              {/* <span className={styles.backgroundText}>DESIGN</span> */}
            </h1>
              <img
                src="/פס כותרת נגרות.webp"
                alt="נגרות"
                className={styles.decorationLine}
              />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>בלי תבניות. בלי הגבלות.</h2>
              <p className={styles.description}>
                אנחנו מייצרים נגרות בהתאמה אישית מלאה – מפריטים פשוטים לבית ועד אובייקטים מורכבים, מיוחדים וכאלה שלא רואים כל יום.
                כל רעיון שעולה בדעת המעצב, אנחנו יודעים לקחת ולתרגם לעבודה מדויקת בשטח.
              </p>

              <h3 className={styles.subTitle}>חופש מלא בעיצוב ובחומר</h3>
              <p className={styles.description}>
                אנחנו עובדים עם מגוון רחב של חומרים, גימורים ושיטות חיבור, ומאפשרים חופש תכנוני אמיתי:
                זוויות מיוחדות, רדיוסים, שילובי חומרים ופתרונות לא שגרתיים – הכול בהתאמה לחלל, לשימוש ולאופי הפרויקט.
              </p>

              <h3 className={styles.subTitle}>רב־גוניות שמכסה הכול</h3>
              <p className={styles.description}>הנגרות שלנו מתאימה ל:</p>
              <ul className={styles.servicesList}>
                <li>נגרות ביתית פשוטה ויומיומית</li>
                <li>נגרות מורכבת עם דרישות גבוהות</li>
                <li>חללים מסחריים ועסקיים</li>
                <li>אובייקטים ייחודיים, ניסיוניים או יוצאי דופן</li>
              </ul>
              <p className={styles.description}>
                כל פרויקט מקבל את אותה רמת מחשבה, דיוק ותשומת לב.
              </p>

              <h3 className={styles.subTitle}>נגרות שחושבת יחד עם התכנון</h3>
              <p className={styles.description}>
                כחלק מסטודיו לעיצוב ותכנון, הנגרות אצלנו היא חלק מתהליך שלם.
                אנחנו מבינים שרטוטים, עובדים בשיתוף עם מעצבים ולקוחות, ויודעים לפתור פרטים כבר בשלב התכנון – לפני שהם הופכים לבעיה.
              </p>

              <h3 className={styles.subTitle}>מה השירות כולל</h3>
              <ul className={styles.servicesList}>
                <li>פגישות תכנון וליווי בהתאם להיקף הפרויקט</li>
                <li>חשיבה משותפת על פתרונות נגרות וביצוע</li>
                <li>בחירת חומרים, גימורים ופרזול שמתאימים לעיצוב ולשימוש</li>
                <li>ייצור בנגרייה שלנו לפי מלאכת אומן</li>
                <li>התאמות, דיוקים וליווי עד התקנה וגמר</li>
              </ul>

              <h3 className={styles.subTitle}>מלאכת אומן. גישה פרקטית.</h3>
              <p className={styles.description}>
                אנחנו מקפידים על עבודה מדויקת, חומרי גלם איכותיים וגימור נקי –
                נגרות שנראית טוב, מרגישה נכון, ומחזיקה לאורך זמן.
              </p>
            </div>
            
            <div className={styles.imageContent}>
              <div className={styles.mainImage}>
                <img 
                  src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&h=400&fit=crop" 
                  alt="עיצוב פנים מודרני לבית פרטי"
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
          <h2 className={styles.galleryTitle}>מהפרויקטים שלנו</h2>
          <ProjectsGallery parents={['carpentry']} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>מוכנים להתחיל?</h2>
            <p className={styles.ctaSubtitle}>בואו נתחיל לתכנן את הבית של החלומות שלכם</p>
            <a 
              href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20לקבל%20הצעת%20מחיר%20לפרויקט%20בית%20פרטי"
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
