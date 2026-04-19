import React from 'react';
import styles from './BullaShop.module.css';

export interface BullaShopProps {
  className?: string;
}

export const BullaShop: React.FC<BullaShopProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.shopPage} ${className}`}>
      <div className={styles.container}>
        <div className={styles.stamp}>
          <img src="/bulla_logo.svg" alt="" className={styles.logoSymbol} />
          <img src="/header-logo.svg" alt="Bulla Studio" className={styles.logoWordmark} />
          <span className={styles.stampDivider} />
          <p className={styles.shopMark}>Shop</p>
        </div>

        <h1 className={styles.title}>בקרוב</h1>
        <p className={styles.subtitle}>
          החנות של בולה סטודיו בדרך אליכם.
          <br />
          עד אז, מוזמנים לעקוב אחרינו ולהתעדכן.
        </p>

        <a
          href="https://www.instagram.com/bulla.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          עקבו באינסטגרם
        </a>
      </div>
    </main>
  );
};
