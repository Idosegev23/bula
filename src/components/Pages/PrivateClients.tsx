import React from 'react';
import styles from './PrivateClients.module.css';
import { SmartGallery } from '../UI/SmartGallery';
import type { GalleryItem } from '../UI/SmartGallery';

export interface PrivateClientsProps {
  className?: string;
}

export const PrivateClients: React.FC<PrivateClientsProps> = ({ className = '' }) => {
  // נתוני הגלריה
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      alt: 'סלון מודרני עם עיצוב נקי',
      title: 'סלון מודרני',
      category: 'interior',
      categories: ['residential', 'interior', 'renovation']
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop',
      alt: 'מטבח עיצוב עם אי מרכזי',
      title: 'מטבח עיצוב',
      category: 'interior',
      categories: ['residential', 'interior', 'renovation']
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=400&fit=crop',
      alt: 'חדר שינה מעוצב בסגנון מינימליסטי',
      title: 'חדר שינה מינימליסטי',
      category: 'interior',
      categories: ['residential', 'interior']
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
      alt: 'פינת אוכל אלגנטית',
      title: 'פינת אוכל אלגנטית',
      category: 'interior',
      categories: ['residential', 'interior']
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      alt: 'חדר רחצה מודרני',
      title: 'חדר רחצה מודרני',
      category: 'interior',
      categories: ['residential', 'interior', 'renovation']
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
      alt: 'חלל מגורים פתוח',
      title: 'חלל מגורים פתוח',
      category: 'architecture',
      categories: ['residential', 'architecture', 'new-construction']
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&h=400&fit=crop',
      alt: 'בית פרטי עיצוב חוץ',
      title: 'בית פרטי מעוצב',
      category: 'architecture',
      categories: ['residential', 'architecture', 'new-construction']
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      alt: 'גינה ומרפסת מעוצבות',
      title: 'גינה ומרפסת',
      category: 'architecture',
      categories: ['residential', 'architecture']
    }
  ];

  return (
    <main className={`${styles.privateClientsPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>לקוחות</div>
              <div>פרטיים</div>
            </h1>
            <p className={styles.heroSubtitle}>
              פתרונות מותאמים אישית לבית שלכם
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>הבית שלכם, החלום שלנו</h2>
              <p className={styles.description}>
                אנחנו מבינים שהבית שלכם הוא הרבה יותר ממקום מגורים - זה המקום שבו החיים שלכם מתרחשים. 
                בגישה אישית ומקצועית, אנחנו מלווים אתכם בכל שלב של התהליך, מהתכנון הראשוני ועד לפרט האחרון.
              </p>
              
              <h3 className={styles.subTitle}>השירותים שלנו כוללים:</h3>
              <ul className={styles.servicesList}>
                <li>תכנון ועיצוב פנים מלא</li>
                <li>ליווי בבחירת חומרים וגימורים</li>
                <li>ניהול פרויקט מקצועי</li>
                <li>תיאום עם קבלנים ובעלי מקצוע</li>
                <li>פיקוח על ביצוע העבודות</li>
                <li>ייעוץ טכני ומקצועי</li>
              </ul>

              <p className={styles.description}>
                עם ניסיון של שנים רבות בתחום, אנחנו יודעים להתאים את עצמנו לכל סגנון חיים ותקציב. 
                מהשיפוץ הקטן ועד לבנייה מאפס - אנחנו כאן כדי להפוך את החזון שלכם למציאות.
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
            <h2 className={styles.ctaTitle}>מוכנים להתחיל?</h2>
            <p className={styles.ctaSubtitle}>בואו נתחיל לתכנן את הבית של החלומות שלכם</p>
            <button className={styles.ctaButton}>
              קבלת הצעת מחיר
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
