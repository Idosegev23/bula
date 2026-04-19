import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface PathConnectorProps {
  /** Direction of the curve */
  direction: 'left-to-right' | 'right-to-left';
  /** Height of the connector */
  height?: number;
  /** Width of the connector */
  width?: number;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Roughness level */
  roughness?: number;
  /** Fixed seed for consistent rendering */
  seed?: number;
  /** Additional class name */
  className?: string;
}

/**
 * PathConnector - קו מקווקו מתפתל בסגנון rough.js
 * מחבר בין שני שלבים במסלול
 */
export const PathConnector: React.FC<PathConnectorProps> = ({
  direction = 'left-to-right',
  height = 60,
  width = 200,
  stroke = '#888',
  strokeWidth = 2,
  roughness = 1.5,
  seed = 12345,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const rc = rough.svg(svg);
    
    // Create curved path
    const padding = 10;
    const startX = direction === 'left-to-right' ? padding : width - padding;
    const endX = direction === 'left-to-right' ? width - padding : padding;
    const startY = padding;
    const endY = height - padding;
    const midY = height / 2;
    
    // Control points for smooth S-curve
    const cp1X = startX;
    const cp1Y = midY;
    const cp2X = endX;
    const cp2Y = midY;

    const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

    const path = rc.path(pathData, {
      stroke,
      strokeWidth,
      roughness,
      seed,
      bowing: 0.5,
      strokeLineDash: [8, 6], // Dashed line
    });

    svg.appendChild(path);
  }, [direction, height, width, stroke, strokeWidth, roughness, seed]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
    />
  );
};

export default PathConnector;

