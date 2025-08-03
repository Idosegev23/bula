// FeaturedProjects - פיד אינסטגרם חי מ-@bulla.studio
import React, { useEffect, useRef, useState } from 'react';
import styles from './FeaturedProjects.module.css';

// הגדרת טיפוס עבור Instagram API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}



interface FeaturedProjectsProps {
  className?: string;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // רשימת פוסטים מדגימה (בפרקטיקה, אלה יהיו URLים אמיתיים מ-@bulla.studio)
  const sampleInstagramPosts = [
    'https://www.instagram.com/p/[POST_ID_1]/', // יש להחליף ב-ID אמיתי
    'https://www.instagram.com/p/[POST_ID_2]/', // יש להחליף ב-ID אמיתי  
    'https://www.instagram.com/p/[POST_ID_3]/', // יש להחליף ב-ID אמיתי
    'https://www.instagram.com/p/[POST_ID_4]/', // יש להחליף ב-ID אמיתי
    'https://www.instagram.com/p/[POST_ID_5]/', // יש להחליף ב-ID אמיתי
    'https://www.instagram.com/p/[POST_ID_6]/'  // יש להחליף ב-ID אמיתי
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // טעינת פוסטים מאינסטגרם
  useEffect(() => {
    setInstagramPosts(sampleInstagramPosts);
  }, []);

  // קומפוננטת embed לפוסט אינסטגרם בודד
  const InstagramEmbed: React.FC<{ postUrl: string; index: number }> = ({ postUrl, index }) => {
    
    useEffect(() => {
      // טעינת Instagram embed script
      if (!window.instgrm) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };
      } else {
        window.instgrm.Embeds.process();
      }
    }, []);

    // Placeholder עבור פוסטים שעדיין לא הוגדרו
    if (postUrl.includes('[POST_ID_')) {
      return (
        <div className={`${styles.instagramPlaceholder} ${isVisible ? styles.cardVisible : ''}`} 
             style={{ animationDelay: `${index * 0.1}s` }}>
          <div className={styles.placeholderContent}>
            <div className={styles.instagramIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#333" strokeWidth="2"/>
                <path d="m12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="#333" strokeWidth="2"/>
                <circle cx="18" cy="6" r="1" fill="#333"/>
              </svg>
            </div>
            <h3>@bulla.studio</h3>
            <p>פוסט #{index + 1} מאינסטגרם</p>
            <small>יש להחליף ב-POST ID אמיתי</small>
          </div>
        </div>
      );
    }

    return (
      <div className={`${styles.instagramPost} ${isVisible ? styles.cardVisible : ''}`} 
           style={{ animationDelay: `${index * 0.1}s` }}>
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
        >
          <div style={{ padding: '16px' }}>
            <a href={postUrl} target="_blank" rel="noopener noreferrer">
              צפה בפוסט באינסטגרם
            </a>
          </div>
        </blockquote>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className={`${styles.projectsSection} ${className} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>העבודות שלנו באינסטגרם</h2>
          <p className={styles.sectionSubtitle}>
            עקבו אחרי הפרויקטים האחרונים שלנו ב-@bulla.studio
          </p>
        </div>
        
        <div className={styles.instagramGrid}>
          {instagramPosts.map((postUrl, index) => (
            <InstagramEmbed key={index} postUrl={postUrl} index={index} />
          ))}
        </div>
        
        <div className={styles.sectionFooter}>
          <a 
            href="https://www.instagram.com/bulla.studio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.viewAllButton}
          >
            <span>עקבו אחרינו באינסטגרם</span>
            <svg className={styles.viewAllArrow} viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
              <path d="m12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}; 