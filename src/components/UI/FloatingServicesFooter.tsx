import React, { useState, useEffect } from 'react';
import styles from './FloatingServicesFooter.module.css';

interface Service {
  id: string;
  title: string;
  subtitle: string;
}

interface FloatingServicesFooterProps {
  isVisible: boolean;
}

const services: Service[] = [
  {
    id: 'design',
    title: 'עיצוב אדריכלי',
    subtitle: 'תכנון ועיצוב'
  },
  {
    id: 'planning',
    title: 'ליווי וביצוע',
    subtitle: 'ניהול פרויקט'
  },
  {
    id: 'execution',
    title: 'יעוץ וליווי',
    subtitle: 'ייעוץ מקצועי'
  }
];

// רכיב כפתור פשוט ובולט
const ServiceButton: React.FC<{ service: Service; onClick: () => void }> = ({ 
  service, 
  onClick 
}) => {
  return (
    <button className={styles.service} onClick={onClick}>
      <div className={styles.serviceContent}>
        <div className={styles.serviceTitle}>{service.title}</div>
        {/* <div className={styles.serviceSubtitle}>{service.subtitle}</div> */}
      </div>
    </button>
  );
};

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