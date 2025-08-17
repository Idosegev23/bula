// Architects - קשרי אדריכלים Page
// Text-focused minimalistic design following established patterns
import React from 'react';
import { Link } from 'react-router-dom';
import HeroBlueprintCanvas from '../UI/HeroBlueprintCanvas';
import styles from './Architects.module.css';
import SectionBlueprintBar from '../UI/SectionBlueprintBar';

interface ArchitectsProps {
  className?: string;
}

export const Architects: React.FC<ArchitectsProps> = ({ className = '' }) => {
  const services = [
    {
      id: 'product-engineering',
      title: 'הנדסת מוצר',
      description: 'פיתוח טכני מתקדם והתאמת פתרונות לדרישות מיוחדות'
    },
    {
      id: 'materials-consulting',
      title: 'ייעוץ בחומרי גלם וגמרים',
      description: 'הכוונה מקצועית בבחירת חומרים איכותיים ומתאימים'
    },
    {
      id: 'shop-drawings',
      title: 'הכנת שופ-דראוינג',
      description: 'תכניות ביצוע מפורטות וליווי טכני לאורך הפרויקט'
    },
    {
      id: 'manufacturing',
      title: 'ייצור נגרות ומסגרות',
      description: 'ייצור מדויק ברמה גבוהה בהתאם לתוכניות ודרישות'
    },
    {
      id: 'installation',
      title: 'התקנות',
      description: 'ביצוע התקנה מקצועי עם קפידה על כל הפרטים'
    },
    {
      id: 'client-coordination',
      title: 'שיתוף פעולה מול לקוח קצה',
      description: 'ליווי ותיאום עם הלקוח הסופי במהלך הפרויקט'
    }
  ];

  const benefits = [
    {
      id: 'architectural-language',
      title: 'מבינים את השפה האדריכלית',
      description: 'דיאלוג מקצועי וחלק עם צוותי תכנון ועיצוב'
    },
    {
      id: 'transparency',
      title: 'שקיפות, זמינות, מקצועיות',
      description: 'עבודה בפתיחות מלאה ותקשורת רציפה'
    },
    {
      id: 'complex-experience',
      title: 'ניסיון עם פרטים מורכבים ורגולציה',
      description: 'התמחות בפרויקטים מאתגרים ועמידה בתקנים'
    }
  ];

  const architectProjects = [
    {
      id: 'ima-office',
      title: 'משרד IMA',
      location: 'תל אביב',
      description: 'שיתוף פעולה במרחב משרדי מודרני עם פתרונות נגרות מותאמים'
    },
    {
      id: 'clinic-design',
      title: 'מרפאת שיניים',
      location: 'פתח תקווה',
      description: 'פרויקט מורכב עם דרישות טכניות מיוחדות ועיצוב פונקציונלי'
    },
    {
      id: 'boutique-hotel',
      title: 'מלון בוטיק',
      location: 'יפו',
      description: 'שיתוף עם אדריכלים בפרויקט מלון בוטיק עם זהות ייחודית'
    }
  ];

  return (
    <main className={`${styles.architectsPage} ${className}`}>
      {/* Hero Section */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <HeroBlueprintCanvas />
            <h1 className={styles.heroTitle}>אדריכלים AND MORE</h1>
            <p className={styles.heroSubtitle}>
              שרטוטים, פרטים וייצור – נקי וברור
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>השירותים שלנו</h2>
            <SectionBlueprintBar />
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section replaced as technical examples */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>דוגמאות טכניות</h2>
            <SectionBlueprintBar />
          </div>
          
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <div key={benefit.id} className={styles.benefitCard}>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>פרויקטים נבחרים</h2>
            <SectionBlueprintBar />
          </div>
          
          <div className={styles.projectsGrid}>
            {architectProjects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectLocation}>{project.location}</p>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <Link to={`/projects/${project.id}`} className={styles.projectLink}>
                    פרטים נוספים
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.projectsFooter}>
            <Link to="/projects" className={styles.viewAllButton}>
              צפו בכל הפרויקטים
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>בואו נתחיל לעבוד יחד</h2>
            <p className={styles.ctaDescription}>
              מזמינים אדריכלים ומעצבים לשיתוף פעולה מקצועי ואמין
            </p>
            <div className={styles.ctaButtons}>
              <a href="tel:+972-XX-XXX-XXXX" className={styles.ctaButton}>
                התקשרו עכשיו
              </a>
              <a href="mailto:architects@bullastudio.com" className={styles.ctaButtonSecondary}>
                שלחו מייל
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};