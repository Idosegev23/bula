// About - מי אנחנו Page
// Text-focused minimalistic design following established patterns
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

interface AboutProps {
  className?: string;
}

export const About: React.FC<AboutProps> = ({ className = '' }) => {
  const teamMembers = [
    {
      id: 'founder',
      name: 'יואב כהן',
      role: 'מייסד וראש הסדנה',
      description: 'נגר מנוסה עם ראייה עיצובית ייחודית',
      image: '/images/team/yoav.jpg'
    },
    {
      id: 'designer',
      name: 'מיכל לוי',
      role: 'מעצבת פנים',
      description: 'מתמחה בעיצוב מרחבים מסחריים ופרטיים',
      image: '/images/team/michal.jpg'
    },
    {
      id: 'manager',
      name: 'דני אברהם',
      role: 'מנהל פרויקטים',
      description: 'אחראי על ליווי הפרויקטים מהתכנון לביצוע',
      image: '/images/team/danny.jpg'
    },
    {
      id: 'craftsman',
      name: 'אמיר דוד',
      role: 'מומחה נגרות',
      description: 'בעל ניסיון רב בעבודות נגרות מורכבות',
      image: '/images/team/amir.jpg'
    }
  ];

  const testimonials = [
    {
      id: 'client1',
      text: 'הצוות של בולה הפך חלום לממשות. מקצועיות, יצירתיות ודקדקנות ברמה הגבוהה ביותר.',
      author: 'שרה כהן',
      role: 'בעלת קפה גריין'
    },
    {
      id: 'architect1',
      text: 'שותפות אמיתית עם הבנה עמוקה של השפה האדריכלית. התוצאה עלתה על הציפיות.',
      author: 'אדר׳ מיכאל רוזן',
      role: 'אדריכל מוביל'
    },
    {
      id: 'client2',
      text: 'מהשלב הראשון ועד למסירה - ליווי מקצועי ואמין. ממליצה בחום!',
      author: 'רונית אברהם',
      role: 'לקוחה פרטית'
    }
  ];

  const stats = [
    {
      id: 'projects',
      number: '50+',
      label: 'פרויקטים הושלמו'
    },
    {
      id: 'clients',
      number: '35+',
      label: 'לקוחות מרוצים'
    },
    {
      id: 'experience',
      number: '5',
      label: 'שנות ניסיון'
    },
    {
      id: 'satisfaction',
      number: '100%',
      label: 'שביעות רצון'
    }
  ];

  const videos = [
    {
      id: 'workshop',
      title: 'הצצה לסדנה',
      description: 'איך אנחנו עובדים יום יום',
      thumbnail: '/images/videos/workshop-thumb.jpg'
    },
    {
      id: 'installation',
      title: 'התקנה בשטח',
      description: 'מהסדנה ללקוח',
      thumbnail: '/images/videos/installation-thumb.jpg'
    },
    {
      id: 'design-process',
      title: 'תהליך התכנון',
      description: 'מרעיון לביצוע',
      thumbnail: '/images/videos/design-thumb.jpg'
    }
  ];

  return (
    <main className={`${styles.aboutPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroMedia}>
          <div className={styles.heroImagePlaceholder}>
            <span className={styles.heroMediaText}>
              וידאו/תמונה - הצצה חיה לעבודה היומיומית
            </span>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              אנחנו בולה – עיצוב שהוא עשייה
            </h1>
            <p className={styles.heroDescription}>
              אנחנו מאמינים שעיצוב טוב הוא כזה שמתחיל ברעיון ומסתיים במוצר מושלם. 
              כל פרויקט הוא סיפור ייחודי שאנחנו מספרים יחד עם הלקוח, 
              מהשלב הראשון של החלום ועד לרגע המרגש של המסירה.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>הצוות שלנו</h2>
            <p className={styles.sectionSubtitle}>
              אנשי מקצוע מנוסים עם תשוקה לעיצוב ויצירה
            </p>
          </div>
          
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamMember}>
                <div className={styles.memberImagePlaceholder}>
                  <span className={styles.memberImageText}>תמונת {member.name}</span>
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberDescription}>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className={styles.videoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>בולה בפעולה</h2>
            <p className={styles.sectionSubtitle}>
              גלריית סרטונים מהשטח - צפו איך אנחנו עובדים
            </p>
          </div>
          
          <div className={styles.videoGrid}>
            {videos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <div className={styles.videoPlayButton}>▶</div>
                  <span className={styles.videoPlaceholderText}>{video.title}</span>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.videoDescription}>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>מה אומרים עלינו</h2>
          </div>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <p className={styles.authorName}>{testimonial.author}</p>
                  <p className={styles.authorRole}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>בולה במספרים</h2>
          </div>
          
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>רוצים לעבוד איתנו?</h2>
            <p className={styles.ctaDescription}>
              בואו נכיר ונתחיל לתכנן יחד את הפרויקט הבא שלכם
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaButton}>
                בואו נכיר
              </Link>
              <Link to="/projects" className={styles.ctaButtonSecondary}>
                צפו בעבודות שלנו
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};