// FeaturedProjects - סקציית פרויקטים נבחרים
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedProjects.module.css';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image?: string;
  link: string;
}

interface FeaturedProjectsProps {
  className?: string;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ className = '' }) => {
  const projects: Project[] = [
    {
      id: 'cafe-green',
      title: 'קפה גריין',
      category: 'עיצוב מסחרי',
      location: 'רמת השרון',
      link: '/projects/cafe-green'
    },
    {
      id: 'ima-office',
      title: 'משרד IMA',
      category: 'קשרי אדריכלים',
      location: 'תל אביב',
      link: '/projects/ima-office'
    },
    {
      id: 'private-home',
      title: 'בית פרטי',
      category: 'ריהוט בהתאמה',
      location: 'עין ורד',
      link: '/projects/private-home'
    },
    {
      id: 'restaurant-urban',
      title: 'אורבן בר',
      category: 'עיצוב מסחרי',
      location: 'הרצליה',
      link: '/projects/restaurant-urban'
    },
    {
      id: 'clinic-design',
      title: 'מרפאת שיניים',
      category: 'קשרי אדריכלים',
      location: 'פתח תקווה',
      link: '/projects/clinic-design'
    },
    {
      id: 'villa-caesarea',
      title: 'וילה בקיסריה',
      category: 'ריהוט בהתאמה',
      location: 'קיסריה',
      link: '/projects/villa-caesarea'
    }
  ];

  return (
    <section className={`${styles.projectsSection} ${className}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>פרויקטים נבחרים</h2>
          <p className={styles.sectionSubtitle}>
            כמה מהעבודות האחרונות שלנו – מרעיון לביצוע
          </p>
        </div>
        
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={project.link} 
              className={styles.projectCard}
            >
              <div className={styles.projectImage}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderText}>תמונת פרויקט</span>
                </div>
              </div>
              
              <div className={styles.projectInfo}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <span className={styles.projectLocation}>{project.location}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className={styles.sectionFooter}>
          <Link to="/projects" className={styles.viewAllButton}>
            צפו בכל הפרויקטים
          </Link>
        </div>
      </div>
    </section>
  );
}; 