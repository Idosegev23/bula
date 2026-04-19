// Architects - קשרי אדריכלים Page
// Text-focused minimalistic design following established patterns
import React, { useEffect, useRef, useState } from 'react';
import styles from './Architects.module.css';

interface ArchitectsProps {
  className?: string;
}

export const Architects: React.FC<ArchitectsProps> = ({ className = '' }) => {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  const services = [
    {
      id: 'product-engineering',
      title: 'הנדסת מוצר',
      description: 'אובייקטים מורכבים של נגרות ומסגרות – זוויות, רדיוסים וחיבורים. לוקחים את הפרט שכולם מפחדים ממנו ומבצעים אותו מדויק. אנחנו אוהבים את הדברים המסובכים.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1596638731647-58c1bf79c0cb?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'materials-consulting',
      title: 'ייעוץ בחומרי גלם וגמרים',
      description: 'לוח חומרים אמיתי – עץ, פורניר, מתכת, צבעים ופרזול. לא כל מה שיפה בקטלוג עובד במציאות, ואנחנו יודעים את ההבדל.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'shop-drawings',
      title: 'הכנת שופ דראוינג',
      description: 'שרטוטי ביצוע מפורטים עם חיבורים, מידות וחתכים שמתורגמים לפרט מדויק בשטח. הקסם קורה לפני שמתחילים לייצר.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'manufacturing',
      title: 'ייצור נגרות ומסגרות',
      description: 'עבודה אותנטית בנגרייה ובמסגרייה – מכונות בפעולה, ריתוך, חיתוך ושיוף. זה נראה כמו עבודה, כי זאת עבודה מדויקת.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'installation',
      title: 'התקנות',
      description: 'התקנה בשטח – יישור, כיוונון והתאמות אחרונות. גם כשמשהו לא יושב בול, אנחנו כן, ופותרים התאמות במקום.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'client-coordination',
      title: 'שיתוף פעולה מול לקוח קצה',
      description: 'פגישות עבודה משותפות עם האדריכל, הלקוח ואיש הביצוע – שרטוטים פתוחים, דוגמיות ושיחה סביב אותו שולחן. אנחנו חלק מהצוות, לא "עוד ספק".',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop']
      }
    }
  ];

  const benefits = [
    {
      id: 'architectural-language',
      title: 'מבינים את השפה האדריכלית',
      description: 'דיאלוג מקצועי וחלק עם צוותי תכנון ועיצוב. אנחנו דוברים את השפה שלכם ומבינים את הצרכים המיוחדים של כל פרויקט.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'transparency',
      title: 'שקיפות, זמינות, מקצועיות',
      description: 'עבודה בפתיחות מלאה ותקשורת רציפה. אנחנו מאמינים בשיתוף פעולה ובתקשורת ברורה לאורך כל הדרך.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop']
      }
    },
    {
      id: 'complex-experience',
      title: 'ניסיון עם פרטים מורכבים ורגולציה',
      description: 'התמחות בפרויקטים מאתגרים ועמידה בתקנים. הניסיון שלנו מאפשר לנו להתמודד עם האתגרים הטכניים המורכבים ביותר.',
      media: {
        type: 'gallery',
        items: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1596638731647-58c1bf79c0cb?w=400&h=400&fit=crop']
      }
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
      <img 
        src="/קשרי אדריכלים.webp"
        alt="קשרי אדריכלים"
        className={styles.decoration}
      />
      {/* Hero Section */}
      <section id="hero" className={styles.heroSection}>
        <canvas ref={heroCanvasRef} className={styles.heroCanvas}></canvas>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <div>קשרי</div>
              <div>אדריכלים</div>
              {/* <div className={styles.ampersand}>&</div>
              <div>MORE</div> */}
            </h1>
            <p className={styles.heroSubtitle}>
              שרטוטים, פרטים וייצור – נקי וברור
              <img 
                src="/פס כותרת קשרי אדריכלים.webp"
                alt="קשרי אדריכלים"
                className={styles.decorationLine}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>השירותים שלנו:</h2>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={styles.serviceCard}
                onClick={() => setSelectedService(index)}
              >
                <div className={styles.serviceNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description.split('.')[0] + '...'}</p>
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
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.id} 
                className={styles.benefitCard}
                onClick={() => setSelectedBenefit(index)}
              >
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description.split('.')[0] + '...'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            {/* Gallery Preview */}
            <div className={styles.galleryPreview}>
              <h3 className={styles.galleryTitle}>פרויקטים שביצענו</h3>
              <div className={styles.galleryGrid}>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop&crop=center" alt="פרויקט אדריכלי מסחרי" className={styles.galleryImage} />
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center" alt="פרויקט עיצוב פנים" className={styles.galleryImage} />
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop&crop=center" alt="פרויקט נגרות מותאמת" className={styles.galleryImage} />
                </div>
                <div className={styles.galleryItem}>
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop&crop=center" alt="פרויקט קונסטרוקציה" className={styles.galleryImage} />
                </div>
              </div>
              <button className={styles.galleryViewMore}>
                צפייה בכל הפרויקטים
              </button>
            </div>
            
            <p className={styles.ctaSubtitle}>בואו נתחיל לעבוד יחד על הפרויקט הבא</p>
            <div className={styles.ctaButtonContainer}>
              <a 
                href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20לקבל%20הצעת%20מחיר%20לליווי%20אדריכלי"
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.ctaButtonPrimary}
              >
                קבלת הצעת מחיר
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService !== null && (
        <div className={styles.modal} onClick={() => setSelectedService(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose} 
              onClick={() => setSelectedService(null)}
            >
              ×
            </button>
            <h3 className={styles.modalTitle}>{services[selectedService].title}</h3>
            <p className={styles.modalDescription}>{services[selectedService].description}</p>
            
            {services[selectedService].media && (
              <div className={styles.modalMedia}>
                {services[selectedService].media.type === 'gallery' && (
                  <div className={styles.modalGallery}>
                    {services[selectedService].media.items?.map((item, index) => (
                      <img 
                        key={index}
                        src={item} 
                        alt={`${services[selectedService].title} - תמונה ${index + 1}`}
                        className={styles.modalGalleryImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Benefit Modal */}
      {selectedBenefit !== null && (
        <div className={styles.modal} onClick={() => setSelectedBenefit(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose} 
              onClick={() => setSelectedBenefit(null)}
            >
              ×
            </button>
            <h3 className={styles.modalTitle}>{benefits[selectedBenefit].title}</h3>
            <p className={styles.modalDescription}>{benefits[selectedBenefit].description}</p>
            
            {benefits[selectedBenefit].media && (
              <div className={styles.modalMedia}>
                {benefits[selectedBenefit].media.type === 'gallery' && (
                  <div className={styles.modalGallery}>
                    {benefits[selectedBenefit].media.items?.map((item, index) => (
                      <img 
                        key={index}
                        src={item} 
                        alt={`${benefits[selectedBenefit].title} - תמונה ${index + 1}`}
                        className={styles.modalGalleryImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};