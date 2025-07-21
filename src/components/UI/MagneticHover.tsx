// MagneticHover - Sophisticated magnetic hover effect
import React, { useRef, useEffect } from 'react';
import styles from './MagneticHover.module.css';

interface MagneticHoverProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  speed?: number;
}

export const MagneticHover: React.FC<MagneticHoverProps> = ({
  children,
  className = '',
  strength = 0.3,
  speed = 0.2
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) * strength;
      const deltaY = (y - centerY) * strength;
      
      element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) perspective(1000px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0) perspective(1000px)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`${styles.magneticHover} ${className}`}
      style={{
        transition: `transform ${speed}s cubic-bezier(0.23, 1, 0.32, 1)`
      }}
    >
      {children}
    </div>
  );
};