import React from 'react';
import styles from './MapPin.module.css';

interface MapPinProps {
  /** Step number to display */
  number: number;
  /** Title of the step */
  title: string;
  /** Click handler */
  onClick?: () => void;
  /** Position side */
  side?: 'left' | 'right';
  /** Additional class name */
  className?: string;
  /** Is this step active/selected */
  isActive?: boolean;
}

/**
 * MapPin - סמן מפה עם מספר וכותרת
 * כמו pin של גוגל מפס
 */
export const MapPin: React.FC<MapPinProps> = ({
  number,
  title,
  onClick,
  side = 'right',
  className = '',
  isActive = false,
}) => {
  return (
    <button
      type="button"
      className={`${styles.pinContainer} ${styles[side]} ${isActive ? styles.active : ''} ${className}`}
      onClick={onClick}
    >
      <div className={styles.pin}>
        <div className={styles.pinHead}>
          <span className={styles.pinNumber}>{String(number).padStart(2, '0')}</span>
        </div>
        <div className={styles.pinTail} />
      </div>
      <span className={styles.pinTitle}>{title}</span>
    </button>
  );
};

export default MapPin;

