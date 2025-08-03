// FeaturedProjects - פיד אינסטגרם אוטומטי מ-@bulla.studio
import React, { useEffect, useRef, useState } from 'react';
import styles from './FeaturedProjects.module.css';
import { instagramService } from '../../services/instagramService';
import type { InstagramPost } from '../../types/instagram';



interface FeaturedProjectsProps {
  className?: string;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // קונפיגורציה - אוטומטית מ-environment variables
  const instagramConfig = {
    username: import.meta.env.VITE_INSTAGRAM_USERNAME || 'bulla.studio',
    postsToShow: parseInt(import.meta.env.VITE_POSTS_TO_SHOW || '6'),
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

  // טעינת פוסטים אוטומטית מאינסטגרם
  useEffect(() => {
    const loadInstagramPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🔄 טוען פוסטים מאינסטגרם...');
        const posts = await instagramService.fetchPosts();
        setInstagramPosts(posts);
        console.log(`✅ נטענו ${posts.length} פוסטים בהצלחה`);
      } catch (err) {
        console.error('❌ שגיאה בטעינת פוסטים:', err);
        setError('שגיאה בטעינת פוסטים מאינסטגרם');
        // טעינת fallback posts
        const fallbackPosts = await instagramService.fetchPosts();
        setInstagramPosts(fallbackPosts);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstagramPosts();
    
    // רענון אוטומטי כל 5 דקות
    const interval = setInterval(loadInstagramPosts, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // קומפוננטת פוסט אינסטגרם
  const InstagramPostCard: React.FC<{ post: InstagramPost; index: number }> = ({ post, index }) => {
    const isPlaceholder = post.id.startsWith('placeholder-');
    
    if (isPlaceholder) {
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
            <p>{isLoading ? 'טוען פוסטים...' : 'בקרוב פוסטים חדשים'}</p>
            <small>{error ? 'נסה שוב בעוד רגע' : 'מתעדכן אוטומטית'}</small>
          </div>
        </div>
      );
    }

    return (
      <div className={`${styles.instagramPost} ${isVisible ? styles.cardVisible : ''}`} 
           style={{ animationDelay: `${index * 0.1}s` }}>
        <a href={post.permalink} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
          <div className={styles.postImage}>
            <img 
              src={post.thumbnail_url || post.media_url} 
              alt={post.caption.substring(0, 100) + '...'} 
              loading="lazy"
            />
            {post.media_type === 'VIDEO' && (
              <div className={styles.videoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            )}
          </div>
          
          <div className={styles.postContent}>
            <div className={styles.postCaption}>
              {post.caption.substring(0, 120)}{post.caption.length > 120 ? '...' : ''}
            </div>
            
            <div className={styles.postMeta}>
              <span className={styles.postDate}>
                {new Date(post.timestamp).toLocaleDateString('he-IL')}
              </span>
              <span className={styles.viewOnInstagram}>
                צפה באינסטגרם ←
              </span>
            </div>
          </div>
        </a>
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
          {instagramPosts.map((post, index) => (
            <InstagramPostCard key={post.id} post={post} index={index} />
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