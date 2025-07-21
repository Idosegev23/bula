// AccessibilityProvider - WCAG AA Compliance Component
// Provides comprehensive accessibility features across the entire website
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import styles from './AccessibilityProvider.module.css';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high';
  motionReduced: boolean;
  focusVisible: boolean;
  screenReaderAnnouncements: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    contrast: 'normal',
    motionReduced: false,
    focusVisible: false, // Start with normal focus, let users enhance if needed
    screenReaderAnnouncements: true
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Initialize accessibility settings from localStorage and system preferences
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsed }));
      } catch (error) {
        console.error('Error parsing accessibility settings:', error);
      }
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setSettings(prevSettings => ({
      ...prevSettings,
      motionReduced: prefersReducedMotion,
      contrast: prefersHighContrast ? 'high' : prevSettings.contrast
    }));
  }, []);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.setAttribute('data-font-size', settings.fontSize);
    
    // High contrast
    root.setAttribute('data-contrast', settings.contrast);
    
    // Reduced motion
    root.setAttribute('data-motion', settings.motionReduced ? 'reduced' : 'normal');
    
    // Focus visibility
    root.setAttribute('data-focus-visible', settings.focusVisible ? 'true' : 'false');

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Keyboard event handler for accessibility menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + A to toggle accessibility menu
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsMenuOpen(prev => !prev);
      }
      
      // Escape to close accessibility menu
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const announceToScreenReader = (message: string) => {
    if (settings.screenReaderAnnouncements) {
      setAnnouncement(message);
      setTimeout(() => setAnnouncement(''), 1000);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    announceToScreenReader(isMenuOpen ? 'תפריט נגישות נסגר' : 'תפריט נגישות נפתח');
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, announceToScreenReader }}>
      {children}
      
      {/* Skip Links */}
      <div className={styles.skipLinks}>
        <a href="#main-content" className={styles.skipLink}>
          דלג לתוכן הראשי
        </a>
        <a href="#main-navigation" className={styles.skipLink}>
          דלג לניווט הראשי
        </a>
        <a href="#footer" className={styles.skipLink}>
          דלג לכותרת התחתונה
        </a>
      </div>

      {/* Accessibility Menu Button */}
      <button
        className={styles.accessibilityButton}
        onClick={toggleMenu}
        aria-label="פתח תפריט נגישות"
        aria-expanded={isMenuOpen}
        aria-controls="accessibility-menu"
        title="Alt + A"
      >
        <span className={styles.accessibilityIcon}>♿</span>
        <span className={styles.accessibilityText}>נגישות</span>
      </button>

      {/* Accessibility Menu */}
      {isMenuOpen && (
        <div
          id="accessibility-menu"
          className={styles.accessibilityMenu}
          role="dialog"
          aria-label="תפריט הגדרות נגישות"
          aria-modal="true"
        >
          <div className={styles.menuHeader}>
            <h2 className={styles.menuTitle}>הגדרות נגישות</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
              aria-label="סגור תפריט נגישות"
            >
              ✕
            </button>
          </div>

          <div className={styles.menuContent}>
            {/* Font Size Control */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>גודל גופן</label>
              <div className={styles.buttonGroup} role="radiogroup" aria-label="בחירת גודל גופן">
                {[
                  { value: 'small', label: 'קטן' },
                  { value: 'medium', label: 'בינוני' },
                  { value: 'large', label: 'גדול' },
                  { value: 'extra-large', label: 'גדול מאוד' }
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.controlButton} ${
                      settings.fontSize === option.value ? styles.active : ''
                    }`}
                    onClick={() => {
                      updateSettings({ fontSize: option.value as any });
                      announceToScreenReader(`גודל גופן שונה ל${option.label}`);
                    }}
                    role="radio"
                    aria-checked={settings.fontSize === option.value}
                    aria-label={`גודל גופן ${option.label}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast Control */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>ניגודיות</label>
              <div className={styles.buttonGroup} role="radiogroup" aria-label="בחירת רמת ניגודיות">
                {[
                  { value: 'normal', label: 'רגילה' },
                  { value: 'high', label: 'גבוהה' }
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.controlButton} ${
                      settings.contrast === option.value ? styles.active : ''
                    }`}
                    onClick={() => {
                      updateSettings({ contrast: option.value as any });
                      announceToScreenReader(`ניגודיות שונתה ל${option.label}`);
                    }}
                    role="radio"
                    aria-checked={settings.contrast === option.value}
                    aria-label={`ניגודיות ${option.label}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Motion Control */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                <input
                  type="checkbox"
                  checked={settings.motionReduced}
                  onChange={(e) => {
                    updateSettings({ motionReduced: e.target.checked });
                    announceToScreenReader(
                      e.target.checked ? 'הפחתת תנועה הופעלה' : 'הפחתת תנועה בוטלה'
                    );
                  }}
                  className={styles.checkbox}
                />
                הפחת תנועות ואנימציות
              </label>
            </div>

            {/* Focus Visibility Control */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                <input
                  type="checkbox"
                  checked={settings.focusVisible}
                  onChange={(e) => {
                    updateSettings({ focusVisible: e.target.checked });
                    announceToScreenReader(
                      e.target.checked ? 'מיקוד מקלדת הופעל' : 'מיקוד מקלדת בוטל'
                    );
                  }}
                  className={styles.checkbox}
                />
                הדגש מיקוד מקלדת
              </label>
            </div>

            {/* Screen Reader Announcements */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                <input
                  type="checkbox"
                  checked={settings.screenReaderAnnouncements}
                  onChange={(e) => {
                    updateSettings({ screenReaderAnnouncements: e.target.checked });
                  }}
                  className={styles.checkbox}
                />
                הודעות לקורא מסך
              </label>
            </div>

            {/* Reset Button */}
            <button
              className={styles.resetButton}
              onClick={() => {
                const defaultSettings: AccessibilitySettings = {
                  fontSize: 'medium',
                  contrast: 'normal',
                  motionReduced: false,
                  focusVisible: false,
                  screenReaderAnnouncements: true
                };
                setSettings(defaultSettings);
                announceToScreenReader('הגדרות נגישות אופסו לברירת המחדל');
              }}
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}

      {/* Screen Reader Announcements */}
      <div
        className={styles.srOnly}
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {announcement}
      </div>

      {/* Overlay for menu */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </AccessibilityContext.Provider>
  );
};

// Hook to use accessibility context
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// HOC for accessible focus management
export const withAccessibleFocus = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<HTMLElement, P>((props, ref) => {
    const { announceToScreenReader } = useAccessibility();
    
    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const element = ref.current;
        const handleFocus = () => {
          announceToScreenReader(`מיקוד על ${element.tagName.toLowerCase()}`);
        };
        
        element.addEventListener('focus', handleFocus);
        return () => element.removeEventListener('focus', handleFocus);
      }
    }, [ref, announceToScreenReader]);

    return <Component {...props} ref={ref} />;
  });
};