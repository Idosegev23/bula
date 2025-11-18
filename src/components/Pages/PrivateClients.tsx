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
      src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop',
      alt: 'מטבח מודרני עם אי מרכזי',
      title: 'מטבח מודרני',
      category: 'kitchens',
      categories: ['kitchens', 'residential']
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=600&h=400&fit=crop',
      alt: 'מטבח קלאסי עם עץ',
      title: 'מטבח קלאסי',
      category: 'kitchens',
      categories: ['kitchens', 'residential']
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      alt: 'ארון בגדים מעוצב',
      title: 'ארון בגדים',
      category: 'closets',
      categories: ['closets', 'residential', 'carpentry']
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      alt: 'ספרייה מעוצבת מעץ',
      title: 'ספרייה מעוצבת',
      category: 'furniture',
      categories: ['furniture', 'residential', 'carpentry']
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
      alt: 'פינת אוכל עם שולחן עץ',
      title: 'פינת אוכל עץ',
      category: 'furniture',
      categories: ['furniture', 'residential', 'carpentry']
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop',
      alt: 'קיר עץ מעוצב',
      title: 'קיר עץ מעוצב',
      category: 'walls',
      categories: ['walls', 'residential', 'carpentry']
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop',
      alt: 'קיר אבן טבעית',
      title: 'קיר אבן טבעית',
      category: 'walls',
      categories: ['walls', 'residential']
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=400&fit=crop',
      alt: 'חדר שינה עם ארון נגרות',
      title: 'חדר שינה מעוצב',
      category: 'carpentry',
      categories: ['carpentry', 'residential', 'closets']
    },
    {
      id: '9',
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      alt: 'ארון אמבטיה מעוצב',
      title: 'ארון אמבטיה',
      category: 'closets',
      categories: ['closets', 'residential', 'carpentry']
    },
    {
      id: '10',
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      alt: 'ספסל עץ מעוצב',
      title: 'ספסל עץ מעוצב',
      category: 'furniture',
      categories: ['furniture', 'residential', 'carpentry']
    }
  ];

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
            <p className={styles.heroSubtitle}>
              פתרונות מותאמים אישית
            </p>
            <p className={styles.heroSubtitle}>
              לבית שלכם
            </p>
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
