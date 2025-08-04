'use client'; // only if you're using the app directory in Next.js 13+

import { useEffect, useRef, useState } from 'react';
import styles from './spinner.module.css';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

type SpinnerProps = {
  onFinish?: () => void;
};

const Spinner = ({ onFinish }: SpinnerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [scaleOutLogo, setScaleOutLogo] = useState(false);


  useEffect(() => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector('#Logo') as SVGPathElement | null;
    if (!path) return;

    path.style.visibility = 'hidden';

    const splitPaths = (path: SVGPathElement): SVGPathElement[] => {
      const rawPath = MotionPathPlugin.getRawPath(path);
      const parent = path.parentNode;
      const attributes = Array.from(path.attributes);
      const newPaths: SVGPathElement[] = [];

      rawPath.forEach((segment: any[]) => {
        const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        attributes.forEach(attr => {
          newPath.setAttribute(attr.name, attr.value);
        });
        const d = `M${segment[0]},${segment[1]}C${segment.slice(2).join(',')}`;
        newPath.setAttribute('d', d);
        if (parent) parent.insertBefore(newPath, path);
        newPath.style.visibility = 'visible'; 
        newPaths.push(newPath);
      });

      if (parent) parent.removeChild(path);
      return newPaths;
    };

    const paths = splitPaths(path);
    const totalDistance = paths.reduce((sum, p) => sum + p.getTotalLength(), 0);
    const duration = 1.5;

    const tl = gsap.timeline();

    paths.forEach(segment => {
      const segmentLength = segment.getTotalLength();
      tl.from(segment, {
        drawSVG: 0,
        duration: duration * (segmentLength / totalDistance),
        ease: 'none'
      });
    });

  // Start scale-out first
  const timeout = setTimeout(() => {
    setScaleOutLogo(true); // 🔥 Trigger logo zoom-out

    // After logo scaled out, start fade-out of background
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);

      // After fade-out transition, hide spinner completely
      const hideTimeout = setTimeout(() => {
        setShowSpinner(false);
        if (onFinish) onFinish(); // 🔥 Notify parent
      }, 600); // Wait for fade transition to complete

      return () => clearTimeout(hideTimeout);
    }, 400); // Wait for scaleOut animation (~400ms)

    return () => clearTimeout(fadeTimeout);
  }, duration * 1000 + 200); // Wait until GSAP animation finishes

  // Manual dismiss (for dev / emergency)
  (window as any).dismissSpinner = () => {
    setScaleOutLogo(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowSpinner(false), 600);
    }, 400);
  };

    return () => clearTimeout(timeout);
  }, [onFinish]);

  if (!showSpinner) return null;


  return (
    <div className={`${styles.spinnerWrapper} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.spinnerContainer}>           
      <div className={`${styles.logo} ${scaleOutLogo ? styles.scaleOut : ''}`}>
        <svg
          ref={svgRef}
          width="221"
          viewBox="0 0 528 495"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Logo"
            d="M364.07,76.54l-.05-.1-100.24-30.17-.07-.02-100.11,30.11-.11.03-55.45,123.3-.39,1.41,98.65,165.06v62.86l28.26,19.72h58.35l29.33-19.72v-63.01l98.01-164.84.07-.11-56.26-124.53ZM316.51,367.94v53.83l-99.16-53.83h99.16ZM207.89,357.87l-93.69-157.18.05-.12,65.97-32.08,27.66,189.37ZM179.82,165.69l-63.83,31.03,51.66-114.88,12.17,83.84ZM174.53,81.42h178.6l-89.33,43.43-89.27-43.43ZM260.7,126.36l-78.33,38.08-11.9-81.98,90.23,43.9ZM253.36,312.69l4.46-17.83,16.57,16.26-21.03,1.58ZM272.26,244.47l33.51,33.18-9.56,30.98-8.32,1.01-33.52-31.99-.29-.28-14.74,45.81,44.88-2.64,12.16,11.58-5.71,30.07h-47.79l-21.02-81.86,50.42-35.86ZM301.28,362.19l6.4-33.7-10.02-9.56,6.52-.78,13.39-43.34.04-.14-44.07-43.68-.15-.15-63.3,44.99-.14.1,22.68,86.26h-21.61l-28.25-194.77,81.02-39.47,81.7,39.87-29.77,194.37h-14.45ZM348.48,166.06l12.52-81.68,50.51,112.35-63.03-30.67ZM266.89,126.36l91.77-44.62-12.73,83.07-79.04-38.45ZM413.29,200.69l-94.37,158.28,29.13-190.11,65.19,31.72.05.11ZM176.66,78.82l87.06-26.19,86.99,26.19h-174.05ZM310.72,423.07h-97.61v-54.93l97.61,54.93ZM236.85,443.01l-19.93-13.14h94.16l-20.42,13.14h-53.8Z"
            stroke="#000000"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      </div>
    </div>
  );
};

export default Spinner;
