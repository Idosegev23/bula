import React, { useEffect, useRef, useMemo } from 'react';
import rough from 'roughjs';

interface RoughBracketProps {
  height: number;
  direction?: 'right' | 'left';
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  seed?: number;
  className?: string;
}

/**
 * RoughBracket - סוגר מסולסל בסגנון כתב יד
 * משתמש ב-rough.js עם seed קבוע למניעת re-render
 */
export const RoughBracket: React.FC<RoughBracketProps> = ({
  height,
  direction = 'right',
  stroke = '#333',
  strokeWidth = 1.5,
  roughness = 1.2,
  seed = 12345,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // מחשבים את הנתיב פעם אחת
  const bracketWidth = 24;
  const padding = 8;
  const totalHeight = height + padding * 2;
  
  // יוצרים את הנתיב של הסוגר
  const pathData = useMemo(() => {
    const curveDepth = 12;
    const midY = totalHeight / 2;
    
    if (direction === 'right') {
      // סוגר פונה ימינה: }
      return `
        M ${bracketWidth - 4} ${padding}
        Q ${bracketWidth - curveDepth} ${padding} ${bracketWidth - curveDepth} ${midY - 20}
        Q ${bracketWidth - curveDepth} ${midY - 10} ${4} ${midY}
        Q ${bracketWidth - curveDepth} ${midY + 10} ${bracketWidth - curveDepth} ${midY + 20}
        Q ${bracketWidth - curveDepth} ${totalHeight - padding} ${bracketWidth - 4} ${totalHeight - padding}
      `;
    } else {
      // סוגר פונה שמאלה: {
      return `
        M ${4} ${padding}
        Q ${curveDepth} ${padding} ${curveDepth} ${midY - 20}
        Q ${curveDepth} ${midY - 10} ${bracketWidth - 4} ${midY}
        Q ${curveDepth} ${midY + 10} ${curveDepth} ${midY + 20}
        Q ${curveDepth} ${totalHeight - padding} ${4} ${totalHeight - padding}
      `;
    }
  }, [totalHeight, direction]);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    // מנקים תוכן קודם
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    const rc = rough.svg(svg);
    
    // יוצרים את הסוגר עם rough.js
    const bracket = rc.path(pathData, {
      stroke,
      strokeWidth,
      roughness,
      seed,
      bowing: 0.5,
    });
    
    svg.appendChild(bracket);
  }, [pathData, stroke, strokeWidth, roughness, seed]);

  return (
    <svg
      ref={svgRef}
      width={bracketWidth}
      height={totalHeight}
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    />
  );
};

export default RoughBracket;

