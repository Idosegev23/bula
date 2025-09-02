import React from 'react';
import styles from './BusinessClients.module.css';
import { SmartGallery } from '../UI/SmartGallery';
import type { GalleryItem } from '../UI/SmartGallery';

export interface BusinessClientsProps {
  className?: string;
}

export const BusinessClients: React.FC<BusinessClientsProps> = ({ className = '' }) => {
  // נתוני הגלריה
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      alt: 'משרד מודרני עם עיצוב מתקדם',
      title: 'משרד מודרני',
      category: 'office',
      categories: ['commercial', 'office']
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      alt: 'חנות מסחרית מעוצבת',
      title: 'חנות מסחרית',
      category: 'retail',
      categories: ['commercial', 'retail']
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      alt: 'מסעדה אלגנטית',
      title: 'מסעדה יוקרתית',
      category: 'restaurants',
      categories: ['commercial', 'food-service', 'restaurants']
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
      alt: 'מרפאה מודרנית',
      title: 'מרפאה מודרנית',
      category: 'healthcare',
      categories: ['commercial', 'healthcare']
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop',
      alt: 'בית קפה מעוצב',
      title: 'בית קפה מעוצב',
      category: 'coffee-shops',
      categories: ['commercial', 'food-service', 'coffee-shops']
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      alt: 'אולם אירועים יוקרתי',
      title: 'אולם אירועים',
      category: 'hospitality',
      categories: ['commercial', 'hospitality']
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      alt: 'בניין משרדים מודרני',
      title: 'בניין משרדים',
      category: 'office',
      categories: ['commercial', 'office']
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      alt: 'חלל עבודה משותף',
      title: 'חלל עבודה משותף',
      category: 'office',
      categories: ['commercial', 'office']
    },
    {
      id: '9',
      src: 'https://images.unsplash.com/photo-1567521464027-f41150d05a54?w=600&h=400&fit=crop',
      alt: 'מאפייה מעוצבת',
      title: 'מאפייה בוטיק',
      category: 'bakeries',
      categories: ['commercial', 'food-service', 'bakeries']
    },
    {
      id: '10',
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      alt: 'בר מעוצב',
      title: 'בר מעוצב',
      category: 'bars',
      categories: ['commercial', 'food-service', 'bars']
    },
    {
      id: '11',
      src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      alt: 'מתחם תעשייתי',
      title: 'מתחם תעשייתי',
      category: 'industrial',
      categories: ['commercial', 'industrial']
    }
  ];

  return (
    <main className={`${styles.businessClientsPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>לקוחות</div>
              <div>עסקיים</div>
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
          <h2 className={styles.galleryTitle}>
            פרויקטים שביצענו
            <span className={styles.backgroundText}>BUSINESS</span>
          </h2>
          <SmartGallery 
            items={galleryItems}
            columns={3}
            spacing="medium"
            showCategoryFilter={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>מוכנים להצליח?</h2>
            <p className={styles.ctaSubtitle}>בואו ניצור יחד את המרחב המושלם לעסק שלכם</p>
            <button className={styles.ctaButton}>
              קבלת הצעת מחיר
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
