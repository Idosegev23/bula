// Projects - Main Projects Page
// Text-focused minimalistic design following established patterns
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Projects.module.css';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  description: string;
  link: string;
}

interface ProjectsProps {
  className?: string;
}

export const Projects: React.FC<ProjectsProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 'cafe-green',
      title: 'קפה גריין',
      category: 'עיצוב מסחרי',
      location: 'רמת השרון',
      year: 2024,
      description: 'עיצוב מרחב קפה בוטיק עם דגש על חוויית לקוח מושלמת ואסתטיקה מינימליסטית',
      link: '/projects/cafe-green'
    },
    {
      id: 'ima-office',
      title: 'משרד IMA',
  category: 'אדריכלים AND MORE',
      location: 'תל אביב',
      year: 2024,
      description: 'שיתוף פעולה עם אדריכלים במרחב משרדי מודרני עם פתרונות נגרות מותאמים',
      link: '/projects/ima-office'
    },
    {
      id: 'private-home',
      title: 'בית פרטי בעין ורד',
      category: 'ריהוט בהתאמה',
      location: 'עין ורד',
      year: 2023,
      description: 'ריהוט מלא לבית פרטי כולל מטבח, ארונות ופתרונות אחסון יצירתיים',
      link: '/projects/private-home'
    },
    {
      id: 'restaurant-urban',
      title: 'אורבן בר',
      category: 'עיצוב מסחרי',
      location: 'הרצליה',
      year: 2023,
      description: 'עיצוב בר-מסעדה עכשווי עם דגש על אווירה צעירה ואנרגטית',
      link: '/projects/restaurant-urban'
    },
    {
      id: 'clinic-design',
      title: 'מרפאת שיניים',
  category: 'אדריכלים AND MORE',
      location: 'פתח תקווה',
      year: 2023,
      description: 'פרויקט מורכב עם דרישות טכניות מיוחדות ועיצוב פונקציונלי',
      link: '/projects/clinic-design'
    },
    {
      id: 'villa-caesarea',
      title: 'וילה בקיסריה',
      category: 'ריהוט בהתאמה',
      location: 'קיסריה',
      year: 2023,
      description: 'פרויקט יוקרה עם ריהוט מותאם אישית ואלמנטים ייחודיים',
      link: '/projects/villa-caesarea'
    },
    {
      id: 'tech-office',
      title: 'משרדי הייטק',
      category: 'עיצוב מסחרי',
      location: 'תל אביב',
      year: 2022,
      description: 'מרחב עבודה חדשני עם פתרונות נגרות גמישים ועיצוב מודרני',
      link: '/projects/tech-office'
    },
    {
      id: 'penthouse-tlv',
      title: 'פנטהאוז תל אביב',
      category: 'ריהוט בהתאמה',
      location: 'תל אביב',
      year: 2022,
      description: 'פרויקט פנטהאוז עם ריהוט יוקרתי ופתרונות עיצוב ייחודיים',
      link: '/projects/penthouse-tlv'
    },
    {
      id: 'boutique-hotel',
      title: 'מלון בוטיק',
  category: 'אדריכלים AND MORE',
      location: 'יפו',
      year: 2022,
      description: 'שיתוף עם אדריכלים בפרויקט מלון בוטיק עם דגש על זהות ייחודית',
      link: '/projects/boutique-hotel'
    }
  ];

  const categories = [
    { id: 'all', name: 'כל הפרויקטים' },
    { id: 'עיצוב מסחרי', name: 'עיצוב מסחרי' },
  { id: 'אדריכלים AND MORE', name: 'אדריכלים AND MORE' },
    { id: 'ריהוט בהתאמה', name: 'ריהוט בהתאמה' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <main className={`${styles.projectsPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              הפרויקטים שלנו
            </h1>
            <p className={styles.heroSubtitle}>
              מרעיון לביצוע – צפו בעבודות שלנו ברחבי הארץ
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.categoriesFilter}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.active : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectNumber}>
                  {String(project.year).slice(-2)}
                </div>
                
                <div className={styles.projectContent}>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <span className={styles.projectLocation}>{project.location}</span>
                  </div>
                  
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  
                  <Link to={project.link} className={styles.projectLink}>
                    צפו בפרויקט
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className={styles.statsSection}>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>פרויקטים הושלמו</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>5</div>
                <div className={styles.statLabel}>שנות ניסיון</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>שביעות רצון לקוחות</div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>מעוניינים בפרויקט דומה?</h2>
            <p className={styles.ctaDescription}>
              בואו נתכנן יחד את הפרויקט הבא שלכם
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaButton}>
                צרו קשר
              </Link>
              <Link to="/services" className={styles.ctaButtonSecondary}>
                השירותים שלנו
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};