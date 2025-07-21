// ParallaxSection - Sophisticated parallax scroll effects
import React, { useEffect, useRef, useState } from 'react';
import styles from './ParallaxSection.module.css';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
  rotate?: boolean;
  blur?: boolean;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  scale = false,
  rotate = false,
  blur = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;

      // Only apply effect when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const getTransform = () => {
    let transform = '';

    switch (direction) {
      case 'up':
        transform += `translateY(${-offset}px)`;
        break;
      case 'down':
        transform += `translateY(${offset}px)`;
        break;
      case 'left':
        transform += `translateX(${-offset}px)`;
        break;
      case 'right':
        transform += `translateX(${offset}px)`;
        break;
    }

    if (scale) {
      const scaleValue = 1 + (offset * 0.001);
      transform += ` scale(${Math.max(0.5, Math.min(1.5, scaleValue))})`;
    }

    if (rotate) {
      const rotateValue = offset * 0.1;
      transform += ` rotate(${rotateValue}deg)`;
    }

    return transform;
  };

  const getFilter = () => {
    if (blur) {
      const blurValue = Math.abs(offset) * 0.01;
      return `blur(${Math.min(10, blurValue)}px)`;
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={`${styles.parallaxSection} ${className}`}
      style={{
        transform: getTransform(),
        filter: getFilter(),
      }}
    >
      {children}
    </div>
  );
};