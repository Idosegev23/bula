// Architects - קשרי אדריכלים Page
// Text-focused minimalistic design following established patterns
import React, { useEffect, useRef } from 'react';
import styles from './Architects.module.css';

interface ArchitectsProps {
  className?: string;
}

export const Architects: React.FC<ArchitectsProps> = ({ className = '' }) => {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
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



  // Hero Canvas Effect - Logo watermark only
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawHeroElements();
    };

    const drawHeroElements = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Logo background only
      const logoX = canvas.width / 2 - 80;
      const logoY = canvas.height / 2 - 80;
      ctx.globalAlpha = 0.015;
      
      // Create logo using basic canvas drawing
      ctx.strokeStyle = '#28939f';
      ctx.lineWidth = 1;
      ctx.strokeRect(logoX, logoY, 160, 160);
      
      ctx.globalAlpha = 1;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <main className={`${styles.architectsPage} ${className}`}>
      {/* Hero Section */}
      <section id="hero" className={styles.heroSection}>
        <canvas ref={heroCanvasRef} className={styles.heroCanvas}></canvas>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div className={styles.mainTitle}>אדריכלים</div>
              <div className={styles.overlayTitle}>& MORE</div>
            </h1>
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