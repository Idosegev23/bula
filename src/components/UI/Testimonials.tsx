// Testimonials - סקציית לקוחות מספרים
import React, { useState } from 'react';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

interface TestimonialsProps {
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'עינת',
      role: 'מעצבת',
      company: 'סטודיו לעיצוב מסחרי',
      content: 'בולה הם לא רק נגרייה – הם שותף אמיתי. הם הצילו לנו את הראש בייצור ובתיאומים.'
    },
    {
      id: 'testimonial-2',
      name: 'אמיר כהן',
      role: 'אדריכל',
      company: 'כהן אדריכלות',
      content: 'איכות הביצוע הגבוהה והמקצועיות של בולה הופכים כל פרויקט לחוויה חלקה ומוצלחת.'
    },
    {
      id: 'testimonial-3',
      name: 'שרה לוי',
      role: 'בעלת בית',
      company: 'לקוחה פרטית',
      content: 'הרגישות הטכנית והתכנון המפורט שקיבלנו מבולה הפכו את בניית הבית שלנו לחלום שמתגשם.'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={`${styles.testimonialsSection} ${className}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>לקוחות מספרים</h2>
        </div>
        
        <div className={styles.carousel}>
          <div className={styles.testimonialContainer}>
            <div className={styles.testimonial}>
              <blockquote className={styles.quote}>
                "{testimonials[activeIndex].content}"
              </blockquote>
              
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testimonials[activeIndex].name}</h4>
                  <p className={styles.authorRole}>
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.controls}>
            <button 
              onClick={prevTestimonial}
              className={styles.navButton}
              aria-label="טסטמוניאל קודם"
            >
              ←
            </button>
            
            <div className={styles.indicators}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`${styles.indicator} ${
                    index === activeIndex ? styles.active : ''
                  }`}
                  aria-label={`טסטמוניאל ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className={styles.navButton}
              aria-label="טסטמוניאל הבא"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 