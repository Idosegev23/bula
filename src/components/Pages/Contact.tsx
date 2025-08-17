// Contact - צור קשר Page
// Text-focused minimalistic design following established patterns
import React, { useState } from 'react';
import styles from './Contact.module.css';

interface ContactProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    alert('תודה על פנייתכם! נחזור אליכם בהקדם.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      id: 'phone',
      label: 'טלפון',
      value: '050-123-4567',
      link: 'tel:+972501234567'
    },
    {
      id: 'email',
      label: 'אימייל',
      value: 'info@bullastudio.com',
      link: 'mailto:info@bullastudio.com'
    },
    {
      id: 'address',
      label: 'כתובת',
      value: 'רחוב התעשייה 15, תל אביב',
      link: 'https://maps.google.com'
    },
    {
      id: 'hours',
      label: 'שעות פעילות',
      value: 'א׳-ה׳: 8:00-17:00',
      link: null
    }
  ];

  const projectTypes = [
    { value: '', label: 'בחרו סוג פרויקט' },
    { value: 'commercial', label: 'one stop shop לעסק שלך' },
    { value: 'architects', label: 'אדריכלים AND MORE' },
    { value: 'private', label: 'ריהוט לבית פרטי' },
    { value: 'consultation', label: 'ייעוץ כללי' },
    { value: 'other', label: 'אחר' }
  ];

  return (
    <main className={`${styles.contactPage} ${className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              בואו נתחיל לעבוד יחד
            </h1>
            <p className={styles.heroSubtitle}>
              יש לכם רעיון? פרויקט? שאלה? אנחנו כאן כדי לעזור
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactLayout}>
            {/* Contact Form */}
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>שלחו לנו הודעה</h2>
                <p className={styles.formDescription}>
                  מלאו את הפרטים ונחזור אליכם תוך 24 שעות
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      placeholder="השם שלכם"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      אימייל *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      טלפון
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="050-123-4567"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="projectType" className={styles.formLabel}>
                      סוג הפרויקט
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    תיאור הפרויקט *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    required
                    placeholder="ספרו לנו על הפרויקט שלכם, הצרכים והציפיות..."
                    rows={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'שולח...' : 'שלחו הודעה'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className={styles.infoContainer}>
              <div className={styles.infoHeader}>
                <h2 className={styles.infoTitle}>פרטי יצירת קשר</h2>
                <p className={styles.infoDescription}>
                  מוזמנים ליצור קשר בכל דרך שנוחה לכם
                </p>
              </div>

              <div className={styles.contactInfo}>
                {contactInfo.map((info) => (
                  <div key={info.id} className={styles.contactItem}>
                    <div className={styles.contactDetails}>
                      <h3 className={styles.contactLabel}>{info.label}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className={styles.contactValue}
                          target={info.id === 'address' ? '_blank' : undefined}
                          rel={info.id === 'address' ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={styles.contactValue}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  <span className={styles.mapText}>מפה אינטראקטיבית</span>
                  <p className={styles.mapSubtext}>הסדנה שלנו ברחוב התעשייה 15, תל אביב</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>שאלות נפוצות</h2>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>כמה זמן לוקח פרויקט טיפוסי?</h3>
              <p className={styles.faqAnswer}>
                זה תלוי בהיקף הפרויקט. פרויקט קטן יכול להיות מוכן תוך 2-3 שבועות, 
                פרויקט גדול יכול לקחת עד מספר חודשים.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>האם אתם עובדים עם אדריכלים?</h3>
              <p className={styles.faqAnswer}>
                בהחלט! יש לנו ניסיון רב בעבודה עם אדריכלים ומעצבים. 
                אנחנו מבינים את השפה המקצועית ומתאימים את עבודתנו לדרישות.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>איך נקבע המחיר?</h3>
              <p className={styles.faqAnswer}>
                המחיר נקבע לפי היקף הפרויקט, החומרים הנדרשים ומורכבות העבודה. 
                אנחנו נותנים הצעת מחיר מפורטת לאחר פגישת ייעוץ.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>יש אחריות על העבודה?</h3>
              <p className={styles.faqAnswer}>
                כמובן! אנחנו נותנים אחריות מלאה על כל העבודות שלנו 
                ועומדים מאחורי האיכות והמקצועיות.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};