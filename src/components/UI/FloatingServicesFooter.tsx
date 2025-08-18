import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './FloatingServicesFooter.module.css';

interface Service {
  id: string;
  href: string;
  titleDesktop: string;
  titleMobile: string;
}

interface ServiceWithTitle {
  id: string;
  href: string;
  title: string;
}

interface FloatingServicesFooterProps {
  isVisible: boolean;
}

const servicesData: Service[] = [
  {
    id: 'one-stop-shop',
    href: '/services/one-stop-shop#hero',
    titleDesktop: 'OSS לעסקים',
    titleMobile: 'OSS לעסקים',
  },
  {
    id: 'architects',
    href: '/services/architects#hero',
    titleDesktop: 'אדריכלים',
    titleMobile: 'אדריכלים',
  },
  {
    id: 'private',
    href: '/services#private',
    titleDesktop: 'רהיטים פרטיים',
    titleMobile: 'רהיטים פרטיים',
  },
];

const FloatingServicesFooter: React.FC<FloatingServicesFooterProps> = ({ isVisible }) => {
  const [services, setServices] = useState<ServiceWithTitle[]>([]);

  // Detect if mobile and update services titles accordingly
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const updatedServices = servicesData.map(({ id, href, titleDesktop, titleMobile }) => ({
      id,
      href,
      title: isMobile ? titleMobile : titleDesktop,
    }));

    setServices(updatedServices);
  }, []);

  // Delayed visibility for smooth appearance
  const [delayedVisible, setDelayedVisible] = useState(false);
  useEffect(() => {
    let timer: number;
    if (isVisible) {
      timer = window.setTimeout(() => setDelayedVisible(true), 300);
    } else {
      setDelayedVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

  const handleServiceClick = () => {
    const servicesSection = document.getElementById('technical-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div className={`${styles.floatingFooter} ${delayedVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.title}>השירותים שלנו</div>
        <div className={styles.services}>
          {services.map((service) => (
            <Link
              key={service.id}
              className={styles.service}
              to={service.href}
              aria-label={`נווט אל ${service.title}`}
              title={service.title} // Tooltip with full text, same as title
            >
              <div className={styles.serviceContent}>
                <div className={styles.serviceTitle}>{service.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.closeButton} onClick={handleServiceClick}>
          ↑ חזרה לשירותים
        </div>
      </div>
    </div>
  );
};

export default FloatingServicesFooter;
