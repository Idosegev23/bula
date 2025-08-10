import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './FloatingServicesFooter.module.css';

interface Service { id: string; title: string; href: string }

interface FloatingServicesFooterProps {
  isVisible: boolean;
}

const services: Service[] = [
  { id: 'one-stop-shop', title: 'one stop shop לעסק שלך', href: '/services/one-stop-shop#hero' },
  { id: 'architects', title: 'קשרי אדריכלים', href: '/services#architects' },
  { id: 'private', title: 'רהיטים פרטיים', href: '/services#private' },
];

// רכיב כפתור פשוט ובולט
const ServiceButton: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
  <Link className={styles.service} to={service.href} onClick={onClick} aria-label={`נווט אל ${service.title}`}>
    <div className={styles.serviceContent}>
      <div className={styles.serviceTitle}>{service.title}</div>
    </div>
  </Link>
);

const FloatingServicesFooter: React.FC<FloatingServicesFooterProps> = ({ isVisible }) => {
  // השהיה קלה למניעת קפיצות
  const [delayedVisible, setDelayedVisible] = useState(false);

  useEffect(() => {
    let timer: number;
    
    if (isVisible) {
      // הופעה עם השהיה קטנה
      timer = setTimeout(() => {
        setDelayedVisible(true);
      }, 300); // 300ms השהיה
    } else {
      // היעלמות מיידית
      setDelayedVisible(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

    const handleServiceClick = () => {
    // גלילה חזרה לסקשן השירותים
    const servicesSection = document.getElementById('technical-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className={`${styles.floatingFooter} ${delayedVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.title}>השירותים שלנו</div>
        <div className={styles.services}>
          {services.map((service) => (
            <ServiceButton
              key={service.id}
              service={service}
              onClick={handleServiceClick}
            />
          ))}
        </div>
        <div className={styles.closeButton} onClick={handleServiceClick}>↑ חזרה לשירותים</div>
      </div>
    </div>
  );
};

export default FloatingServicesFooter;