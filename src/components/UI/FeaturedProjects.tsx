// FeaturedProjects - סקציית פרויקטים נבחרים עם תמונות רקע
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedProjects.module.css';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  backgroundImage: string;
  link: string;
}

interface FeaturedProjectsProps {
  className?: string;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const projects: Project[] = [
    {
      id: 'cafe-green',
      title: 'קפה גריין',
      category: 'עיצוב מסחרי',
      location: 'רמת השרון',
      description: 'עיצוב מקום מקסים עם אווירה חמה ומזמינה לכל הגילאים',
      backgroundImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      link: '/projects/cafe-green'
    },
    {
      id: 'ima-office',
      title: 'משרד IMA',
      category: 'קשרי אדריכלים',
      location: 'תל אביב',
      description: 'משרד מודרני ופונקציונלי עם דגש על יעילות ונוחות עבודה',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      link: '/projects/ima-office'
    },
    {
      id: 'private-home',
      title: 'בית פרטי עין ורד',
      category: 'ריהוט בהתאמה',
      location: 'עין ורד',
      description: 'ריהוט יוקרתי ומותאם אישית לבית משפחתי מרווח ומפואר',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      link: '/projects/private-home'
    },
    {
      id: 'restaurant-urban',
      title: 'אורבן בר',
      category: 'עיצוב מסחרי',
      location: 'הרצליה',
      description: 'מסעדה עירונית מודרנית עם אווירה יוקרתית וחמה',
      backgroundImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      link: '/projects/restaurant-urban'
    },
    {
      id: 'clinic-design',
      title: 'מרפאת שיניים',
      category: 'קשרי אדריכלים',
      location: 'פתח תקווה',
      description: 'מרפאה מתקדמת עם עיצוב נקי ומרגיע לחוויית טיפול נעימה',
      backgroundImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      link: '/projects/clinic-design'
    },
    {
      id: 'villa-caesarea',
      title: 'וילה בקיסריה',
      category: 'ריהוט בהתאמה',
      location: 'קיסריה',
      description: 'וילה יוקרתית עם ריהוט מותאם לסגנון חיים מפואר ומרגיע',
      backgroundImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      link: '/projects/villa-caesarea'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`${styles.projectsSection} ${className} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>פרויקטים נבחרים</h2>
          <p className={styles.sectionSubtitle}>
            כמה מהעבודות האחרונות שלנו – מרעיון לביצוע מושלם
          </p>
        </div>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <Link 
              key={project.id} 
              to={project.link} 
              className={`${styles.projectCard} ${isVisible ? styles.cardVisible : ''}`}
              style={{
                backgroundImage: `linear-gradient(
                  135deg, 
                  rgba(0, 0, 0, 0.4) 0%, 
                  rgba(0, 0, 0, 0.2) 50%, 
                  rgba(0, 0, 0, 0.6) 100%
                ), url(${project.backgroundImage})`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* תוכן הכרטיס */}
              <div className={styles.projectContent}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <span className={styles.projectLocation}>{project.location}</span>
                </div>
                
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                {/* כפתור לפרטים נוספים */}
                <div className={styles.projectButton}>
                  <span>צפה בפרויקט</span>
                  <svg className={styles.buttonArrow} viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* overlay למעבר עכבר */}
              <div className={styles.projectOverlay}></div>
            </Link>
          ))}
        </div>
        
        <div className={styles.sectionFooter}>
          <Link to="/projects" className={styles.viewAllButton}>
            <span>צפו בכל הפרויקטים</span>
            <svg className={styles.viewAllArrow} viewBox="0 0 24 24" fill="none">
              <path d="M13 17L18 12L13 7M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}; 