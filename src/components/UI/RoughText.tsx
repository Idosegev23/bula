import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import styles from './RoughText.module.css';

interface RoughTextProps {
  text: string;
  className?: string;
  fontSize?: number;
  color?: string;
  roughness?: number;
}

export const RoughText: React.FC<RoughTextProps> = ({ 
  text, 
  className = '', 
  fontSize = 48,
  color = '#28939f',
  roughness = 1.5
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // רק אם עוד לא עשינו רנדר
    if (isRendered) return;
    
    const svg = svgRef.current;
    if (!svg) return;

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Create temporary text element to measure
    const tempText = document.createElement('span');
    tempText.style.fontSize = `${fontSize}px`;
    tempText.style.fontFamily = '"Rubik", Arial, sans-serif';
    tempText.style.fontWeight = 'bold';
    tempText.style.visibility = 'hidden';
    tempText.style.position = 'absolute';
    tempText.textContent = text;
    document.body.appendChild(tempText);
    
    const textWidth = tempText.offsetWidth;
    const textHeight = tempText.offsetHeight;
    document.body.removeChild(tempText);

    // Set SVG dimensions
    svg.setAttribute('width', `${textWidth + 40}`);
    svg.setAttribute('height', `${textHeight + 20}`);
    svg.setAttribute('viewBox', `0 0 ${textWidth + 40} ${textHeight + 20}`);

    // Initialize rough.js for SVG עם seed קבוע לקבלת תוצאה יציבה
    const rc = rough.svg(svg, { options: { seed: 12345 } });

    // Draw underline with rough.js
    const underlineY = textHeight + 5;
    const underline = rc.line(10, underlineY, textWidth + 10, underlineY, {
      stroke: color,
      strokeWidth: 3,
      roughness: roughness,
      seed: 12345
    });
    svg.appendChild(underline);

    // Add some decorative rough lines around the text
    const decorLine1 = rc.line(5, 10, textWidth + 15, 8, {
      stroke: color,
      strokeWidth: 1,
      roughness: roughness * 1.5,
      seed: 23456
    });
    svg.appendChild(decorLine1);

    const decorLine2 = rc.line(textWidth + 5, 5, textWidth + 25, textHeight - 5, {
      stroke: color,
      strokeWidth: 1,
      roughness: roughness * 1.5,
      seed: 34567
    });
    svg.appendChild(decorLine2);

    // Create text element
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', '20');
    textElement.setAttribute('y', `${textHeight - 5}`);
    textElement.setAttribute('font-family', '"Rubik", Arial, sans-serif');
    textElement.setAttribute('font-size', `${fontSize}`);
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('fill', color);
    textElement.setAttribute('stroke', color);
    textElement.setAttribute('stroke-width', '0.5');
    textElement.textContent = text;
    svg.appendChild(textElement);

    // סימון שסיימנו רנדר
    setIsRendered(true);

  }, [text, fontSize, color, roughness, isRendered]);

  return (
    <svg 
      ref={svgRef} 
      className={`${styles.roughText} ${className}`}
    />
  );
};
