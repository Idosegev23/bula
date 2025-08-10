import React from 'react';
import styles from './Services.module.css';
import { TechnicalServiceCards } from '../UI/TechnicalServiceCards';

interface ServicesIndexProps { className?: string }

export const ServicesIndex: React.FC<ServicesIndexProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.servicesPage} ${className}`}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>השירותים שלנו</h1>
            <p className={styles.heroSubtitle}>בחרו את השירות המתאים עבורכם</p>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <TechnicalServiceCards />
      </section>
    </main>
  );
};

export default ServicesIndex;

