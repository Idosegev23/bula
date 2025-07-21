// Header - קומפוננטת ראש עמוד מינימלית לBulla Studio
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // רשימת פריטי התפריט
  const navigationItems = [
    { label: 'בית', path: '/' },
    { label: 'שירותים', path: '/services' },
    { label: 'פרויקטים', path: '/projects' },
    { label: 'אדריכלים', path: '/architects' },
    { label: 'אודות', path: '/about' },
    { label: 'צור קשר', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${className}`} role="banner">
      <div className="container">
        <div className={styles.headerContent}>
          {/* לוגו */}
          <Link to="/" className={styles.logo} aria-label="בולה סטודיו - דף הבית">
            <span className={styles.logoText}>Bulla Studio</span>
          </Link>

          {/* ניווט דסקטופ */}
          <nav id="main-navigation" className={styles.desktopNav} role="navigation" aria-label="תפריט ראשי">
            <ul className={styles.navList} role="menubar">
              {navigationItems.map((item) => (
                <li key={item.path} className={styles.navItem} role="none">
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                    role="menuitem"
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* כפתור תפריט נייד */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="פתח תפריט ניווט"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* תפריט נייד */}
      {isMobileMenuOpen && (
        <>
          <div className={styles.mobileBackdrop} onClick={toggleMobileMenu}></div>
          <nav className={styles.mobileNav} role="navigation" aria-label="תפריט נייד">
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item) => (
                <li key={item.path} className={styles.mobileNavItem}>
                  <Link
                    to={item.path}
                    className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}; 