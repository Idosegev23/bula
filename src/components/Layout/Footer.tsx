// Footer - קומפוננטת פוטר מינימלית לBulla Studio
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    main: [
      { label: 'פרויקטים', path: '/projects' },
      { label: 'שירותים', path: '/services' },
      { label: 'אדריכלים', path: '/architects' },
      { label: 'אודות', path: '/about' },
    ],
    contact: [
      { label: 'צור קשר', path: '/contact' },
      { label: '03-1234567', href: 'tel:03-1234567' },
      { label: 'info@bullastudio.co.il', href: 'mailto:info@bullastudio.co.il' },
    ],
  };

  return (
    <footer id="footer" className={`${styles.footer} ${className}`} role="contentinfo">
      <div className="container">
        <div className={styles.footerContent}>
          {/* לוגו וטקסט ראשי */}
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogo}>
              <span className={styles.logoText}>Bulla Studio</span>
            </Link>
            <p className={styles.footerTagline}>
              בונים עסקים. מעצבים חוויות. מייצרים מציאות.
            </p>
          </div>

          {/* קישורים ראשיים */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerSectionTitle}>ניווט</h3>
            <ul className={styles.footerLinks}>
              {footerLinks.main.map((link) => (
                <li key={link.path} className={styles.footerLinkItem}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* יצירת קשר */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerSectionTitle}>יצירת קשר</h3>
            <ul className={styles.footerLinks}>
              {footerLinks.contact.map((contact) => (
                <li key={contact.label} className={styles.footerLinkItem}>
                  {contact.href ? (
                    <a 
                      href={contact.href} 
                      className={styles.footerLink}
                      target={contact.href.startsWith('mailto:') ? '_blank' : undefined}
                      rel={contact.href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                    >
                      {contact.label}
                    </a>
                  ) : (
                    <Link to={contact.path || '/'} className={styles.footerLink}>
                      {contact.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* קו תחתון */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              © {currentYear} Bulla Studio. כל הזכויות שמורות.
            </div>
            
            <div className={styles.footerCredit}>
              עוצב ופותח בידי <a href="https://github.com/idosegev" target="_blank" rel="noopener noreferrer">Ido Segev</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 