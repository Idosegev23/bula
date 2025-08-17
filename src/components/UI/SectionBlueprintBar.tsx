import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

type Props = { className?: string };

const SectionBlueprintBar: React.FC<Props> = ({ className = '' }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const parent = canvas.parentElement as HTMLElement;
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = 70;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const rc = rough.canvas(canvas);
      const margin = 16;
      const y = Math.round(height - 28);

      // main bar
      rc.line(margin, y, width - margin, y, { stroke: '#0B4F8A', strokeWidth: 1.1, roughness: 1.5 });
      // ticks
      const ticks = 6;
      for (let i = 1; i < ticks; i += 1) {
        const x = margin + ((width - margin * 2) / ticks) * i;
        rc.line(x, y - 8, x, y + 8, { stroke: '#0B4F8A', strokeWidth: 1 });
      }
      // corner angles
      rc.line(margin - 10, y - 10, margin, y, { stroke: '#c62828', strokeWidth: 1 });
      rc.line(width - margin + 10, y - 10, width - margin, y, { stroke: '#c62828', strokeWidth: 1 });
    };

    const ro = new ResizeObserver(draw);
    const parent = canvas.parentElement as HTMLElement;
    if (parent) ro.observe(parent);
    draw();
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} className={className} style={{ display: 'block', width: '100%', height: '70px', pointerEvents: 'none' }} />;
};

export default SectionBlueprintBar;

