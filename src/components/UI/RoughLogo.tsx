import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface RoughLogoProps {
  src: string; // path to svg
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  repeats?: number; // draw each path multiple times for extra sketchiness
}

/**
 * Draws an external SVG (paths) using rough.js on a responsive canvas.
 * Scales to container width while maintaining the SVG viewBox aspect ratio.
 */
const RoughLogo: React.FC<RoughLogoProps> = ({
  src,
  className = '',
  stroke = '#000',
  strokeWidth = 1.8,
  roughness = 3.2,
  bowing = 2.0,
  repeats = 2,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewBoxRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const pathsRef = useRef<string[]>([]);
  const [ready, setReady] = useState(false);

  // Load SVG once
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const res = await fetch(src);
      const text = await res.text();
      if (!isMounted) return;
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) return;
      const vb = svg.getAttribute('viewBox') || '0 0 100 100';
      const [vx, vy, vw, vh] = vb.split(/\s+/).map(Number);
      viewBoxRef.current = { x: vx || 0, y: vy || 0, w: vw || 100, h: vh || 100 };
      const pathNodes = Array.from(doc.querySelectorAll('path'));
      pathsRef.current = pathNodes.map((p) => p.getAttribute('d') || '').filter(Boolean);
      setReady(true);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [src]);

  // Resize + draw
  useEffect(() => {
    if (!ready) return;
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const rect = wrapper.getBoundingClientRect();
      const vb = viewBoxRef.current;
      if (!vb) return;
      const width = Math.max(160, rect.width);
      const aspect = vb.h / vb.w;
      const height = Math.max(120, Math.round(width * aspect * 0.6));

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const rc = rough.canvas(canvas);

      // Scale & center
      const scale = Math.min(width / vb.w, height / vb.h);
      const scaledW = vb.w * scale;
      const scaledH = vb.h * scale;
      const offsetX = (width - scaledW) / 2;
      const offsetY = (height - scaledH) / 2;

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);
      ctx.translate(-vb.x, -vb.y);

      for (const d of pathsRef.current) {
        for (let r = 0; r < Math.max(1, repeats); r += 1) {
          rc.path(d, { stroke, strokeWidth, roughness: roughness + Math.random() * 0.6, bowing: bowing + Math.random() * 0.4, seed: Math.floor(Math.random() * 10_000) });
        }
      }
      ctx.restore();
    };

    const ro = new ResizeObserver(() => draw());
    ro.observe(wrapper);
    draw();
    return () => ro.disconnect();
  }, [ready, stroke, strokeWidth, roughness, bowing]);

  return (
    <div ref={wrapperRef} className={className}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default RoughLogo;

