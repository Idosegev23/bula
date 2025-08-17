// Header - קומפוננטת ראש עמוד מינימלית לBulla Studio
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // טיפול בגלילה - רק עבור שינוי רקע
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true); // Force white background and black text on other pages
      return;
    }
  
    // בדף הבית - התחל שקוף
    setIsScrolled(false);
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on load
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  

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

  // דחיפת התוכן למטה כאשר התפריט פתוח
  useEffect(() => {
    const header = document.querySelector('header');
    const appElement = document.querySelector('.App');
    
    const updateHeaderHeight = () => {
      if (header && isMobileMenuOpen && appElement) {
        const actualHeight = header.offsetHeight;
        // עדכון המרחק הדינמי
        document.documentElement.style.setProperty('--menu-push-distance', `${actualHeight}px`);
        // הוספת class לApp
        appElement.classList.add('menu-open');
      }
    };

    if (isMobileMenuOpen) {
      // עדכן מיד ואז כל 50ms (20fps) - איטי יותר לאנימציה חלקה
      updateHeaderHeight();
      const interval = setInterval(updateHeaderHeight, 50);
      
      // עצור את האינטרבל אחרי 1000ms (כשהאנימציה מסתיימת)
      setTimeout(() => {
        clearInterval(interval);
        updateHeaderHeight(); // עדכון אחרון
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      // חזרה למצב רגיל - איפוס מוחלט
      if (appElement) {
        appElement.classList.remove('menu-open');
      }
      
      // איפוס מוחלט של כל המשתנים
      document.documentElement.style.setProperty('--menu-push-distance', '0px');
      
      // ביטול מפורש של כל margin-top שעלול להיות
      const mainContent = document.querySelector('#main-content') as HTMLElement;
      if (mainContent) {
        mainContent.style.marginTop = '0px';
        mainContent.style.transform = '';
      }
      
      // אם אנחנו בדף הבית ולא גללנו - חזרה לשקיפות
      if (location.pathname === '/' && window.scrollY <= 50) {
        setIsScrolled(false);
      }
    }
  }, [isMobileMenuOpen]);





  return (
    <header 
      className={`${styles.header} ${className} ${isScrolled ? styles.scrolled : ''} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`} 
      role="banner"
    >
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* כפתור תפריט נייד - צד שמאל */}
          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "סגור תפריט ניווט" : "פתח תפריט ניווט"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          {/* לוגו - צד ימין */}
          <Link to="/" className={styles.logo} aria-label="בולה סטודיו - דף הבית">
            <svg 
              className={styles.logoSvg}
              viewBox="0 0 1250.76 140.35" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M103.18,92.59c-.21,26.18-22.42,37.43-63.8,37.1-9.41-.07-26.69-.71-39.38-1.32l1.59-38.12L1.02,0l51.58.15c28.21.22,45.38,11.56,45.21,32.88-.11,13.73-7.82,24.11-20.83,29.6,17.75,4.46,26.32,13.95,26.19,29.96M70.4,90.8c.07-8.39-5.72-12.77-17.37-15.39l-22.12.35-.34,11.7.36,19.05c5.32.57,10.68.84,14.21.87,15.76.13,25.17-5.12,25.26-16.56M39.97,22.91l-7.88-.06-.74,30.24,18.53.67c9.69-2.2,14.53-6.77,14.61-16.67.08-10.67-6.23-14.04-24.52-14.18"/>
              <path d="M238.37,86.8c0,29.23-20.43,45.31-56.51,45.02-35.31-.28-54.48-16.67-53.22-45.9l.41-20.07-.24-64.84,31.99.25-2.17,80.34c-.37,16.5,7.7,24.2,24.71,24.34,17.01.14,25.46-7.44,25.32-23.94l-.62-80.36,32.25.26-1.53,65.33-.4,19.56Z"/>
              <polygon points="347.24 131.13 271.8 130.53 273.61 92.41 272.82 2.16 305.36 2.42 302.87 89.61 303.25 104.58 347.7 104.93 349.48 107.27 347.24 131.13"/>
              <polygon points="445.81 131.91 370.36 131.31 372.18 93.20 371.38 2.94 403.9 3.2 401.43 90.39 401.81 105.36 446.28 105.71 448.01 108.05 445.81 131.91"/>
              <path d="M547.16,132.72l-3.41-18.59-2.23-7.38-25.91-.48-22.85.32-1.82,5.36-3.96,20.29-31.27-.25L501.69,3.98l37.84.3,39.89,128.69-32.27-.26ZM520.74,33.35l-2.02-.02-17.39,48.96,16.48.38,17.05-.12-14.11-49.21Z"/>
              <path d="M693.71,8.57l-1.1,4.8-1.63.26c-8.82-4.38-18.16-6.02-25.15-6.08-21.99-.17-34.15,14.73-34.25,27.82-.25,31.36,66.25,27.35,65.95,65.66-.15,18.49-17.15,34.42-41.53,34.23-11.02-.09-24.1-3.39-33.72-9.89l.34-5.11,1.31-.24c9.34,6.75,21.91,10.07,32.11,10.15,22.24.18,36.01-14.45,36.12-28.94.27-33.46-66.21-28.9-65.92-66.43.14-17.93,16.33-32.51,40.17-32.32,6.99.06,16.85,1.43,27.29,6.09"/>
              <polygon points="818.03 9.55 795.75 9.1 775.44 8.94 774.43 135.4 769.07 135.36 770.07 8.9 750.23 8.74 727.21 8.83 726.41 7.77 727.25 3.47 818.33 4.19 818.85 5.28 818.03 9.55"/>
              <path d="M942.28,89.65c.59,30.31-17.8,47.82-49.14,47.57-31.6-.25-48.89-17.52-48.1-48.34l.43-19.29.52-65.11,5.62.04-1.22,84.12c-.47,27.88,14.69,43.26,42.8,43.49,28.13.22,43.57-14.92,43.79-42.8l.67-84.12,5.31.04-.67,84.4Z"/>
              <path d="M1018.52,4.96c39.35.31,60.91,22.98,60.59,63.19-.36,45.52-23.36,70.81-64.08,70.48-5.91-.05-32.42-.79-42.32-1.42l1.05-131.55,44.76-.7ZM1073.75,68.37c.3-37.25-19.4-57.76-55.57-58.05-4.53-.04-30.28.54-39.12.75l-.96,121.09c9.11.6,32.15,1.34,37.24,1.38,36.97.29,58.07-22.86,58.41-65.18"/>
              <rect x="1040.46" y="69.97" width="131.55" height="5.36" transform="translate(1024.79 1178.28) rotate(-89.54)"/>
              <path d="M1250.76,71.68c-.35,44.5-21.98,68.97-60.29,68.66-36.71-.29-57.13-24.31-56.8-66.92.34-43.14,21.69-67.05,60.25-66.75,36.95.29,57.16,23.75,56.84,65.01M1139.26,73.24c-.32,39.9,18,61.75,51.24,62.02,34.81.28,54.56-22.08,54.88-63.09.31-38.54-18.01-59.86-51.76-60.13-34.86-.28-54.05,21.26-54.36,61.2"/>
            </svg>
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
        </div>
      </div>

      {/* תפריט נייד */}
      {isMobileMenuOpen && (
        <>
          <div 
            className={styles.mobileBackdrop} 
            onClick={toggleMobileMenu}
            aria-hidden="true"
          ></div>
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
