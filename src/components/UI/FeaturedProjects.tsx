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

  // קונפיגורציה פשוטה עבור פוסטי @bulla.studio
  // כשיש פוסטים אמיתיים, פשוט החליפו את הURLים למטה
  const instagramConfig = {
    username: 'bulla.studio',
    posts: [
      // כשתתחילו לפרסם, החליפו את הקישורים האלה בפוסטים האמיתיים:
      // לדוגמה: 'https://www.instagram.com/p/ABC123DEF456/'
      null, // פוסט 1 - יוחלף בקישור אמיתי
      null, // פוסט 2 - יוחלף בקישור אמיתי
      null, // פוסט 3 - יוחלף בקישור אמיתי
      null, // פוסט 4 - יוחלף בקישור אמיתי
      null, // פוסט 5 - יוחלף בקישור אמיתי
      null, // פוסט 6 - יוחלף בקישור אמיתי
    ],
    // דוגמאות לפוסטים (תוכלו להוסיף פוסטים אמיתיים כשיהיו):
    examplePosts: [
      // 'https://www.instagram.com/p/ABC123DEF456/', // דוגמה לפוסט נגריה
      // 'https://www.instagram.com/p/GHI789JKL012/', // דוגמה לפוסט עיצוב
    ]
  };

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
    // בדיקה אם יש פוסטים אמיתיים להציג
    const realPosts = instagramConfig.posts.filter(post => post !== null);
    
    if (realPosts.length > 0) {
      // יש פוסטים אמיתיים - הצג אותם
      setInstagramPosts(realPosts);
    } else {
      // אין פוסטים אמיתיים עדיין - הצג placeholders
      setInstagramPosts(['placeholder-1', 'placeholder-2', 'placeholder-3', 'placeholder-4', 'placeholder-5', 'placeholder-6']);
    }
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
    if (postUrl.includes('placeholder-') || postUrl === null) {
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
            <h3>@{instagramConfig.username}</h3>
            <p>פוסט #{index + 1} מהעבודות שלנו</p>
            <small>נעדכן כשיהיו פוסטים חדשים</small>
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
            href={`https://www.instagram.com/${instagramConfig.username}/`}
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.viewAllButton}
          >
            <span>עקבו אחרינו ב-@{instagramConfig.username}</span>
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