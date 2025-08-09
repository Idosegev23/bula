import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface HeroBlueprintCanvasProps {
  className?: string;
}

/**
 * Decorative blueprint-like measurement sketch layer for the hero.
 * Draws measurement lines, arrows, and notations in a subtle blueprint style.
 */
const HeroBlueprintCanvas: React.FC<HeroBlueprintCanvasProps> = ({ className = '' }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const parent = canvas.parentElement as HTMLElement;
      const rect = parent.getBoundingClientRect();
      const width = rect.width;

      const titleEl = parent.querySelector('h1');
      const subEl = parent.querySelector('p');
      const logoEl = parent.querySelector('div'); // first div is logo wrap

      const titleRect = titleEl?.getBoundingClientRect();
      const subRect = subEl?.getBoundingClientRect();
      const logoRect = logoEl?.getBoundingClientRect();

      // Height covers from top of logo/title to bottom of subtitle plus margin
      const topY = Math.min(
        titleRect ? titleRect.top : rect.top,
        logoRect ? logoRect.top : rect.top
      );
      const bottomY = Math.max(
        subRect ? subRect.bottom : rect.bottom,
        titleRect ? titleRect.bottom : rect.bottom
      );
      const height = Math.max(240, Math.ceil(bottomY - topY + 40));

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const rc = rough.canvas(canvas);

      // blueprint-style pen colors
      const colors = {
        measure: '#0B4F8A', // blue
        accent: '#c62828',  // red
        green: '#2e7d32',   // green
      } as const;

      // Helpers
      const arrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
        rc.line(x1, y1, x2, y2, { stroke: color, strokeWidth: 1.3, roughness: 1.9 });
        const ang = Math.atan2(y2 - y1, x2 - x1);
        const len = 12;
        rc.line(x2, y2, x2 - Math.cos(ang - 0.5) * len, y2 - Math.sin(ang - 0.5) * len, { stroke: color, strokeWidth: 1.2 });
        rc.line(x2, y2, x2 - Math.cos(ang + 0.5) * len, y2 - Math.sin(ang + 0.5) * len, { stroke: color, strokeWidth: 1.2 });
      };

      const angleMark = (x: number, y: number, size: number, color: string, rot = 0) => {
        const c = Math.cos(rot);
        const s = Math.sin(rot);
        const p1 = { x, y };
        const p2 = { x: x + c * size, y: y + s * size };
        const p3 = { x: x - s * size, y: y + c * size };
        rc.line(p1.x, p1.y, p2.x, p2.y, { stroke: color, strokeWidth: 1.1 });
        rc.line(p1.x, p1.y, p3.x, p3.y, { stroke: color, strokeWidth: 1.1 });
      };

      if (titleRect) {
        const tlx = titleRect.left - rect.left;
        const trx = titleRect.right - rect.left;
        const ttop = titleRect.top - rect.top;
        const tbot = titleRect.bottom - rect.top;

        // (Callout rectangle removed per request; now appears in the list section)

        // Rough scribbles behind title (subtle)
        rc.curve([
          [tlx, ttop - 8],
          [tlx + (trx - tlx) * 0.25, ttop - 20],
          [trx - (trx - tlx) * 0.25, ttop - 18],
          [trx, ttop - 6]
        ], { stroke: '#999', strokeWidth: 0.8, roughness: 2.2 });

        // Measurement bar under title
        const y = tbot + 18;
        arrow(tlx, y, trx, y, colors.measure);
        // ticks
        for (let i = 1; i < 4; i += 1) {
          const x = tlx + ((trx - tlx) / 4) * i;
          rc.line(x, y - 10, x, y + 10, { stroke: colors.measure, strokeWidth: 1.1 });
        }
        // corner angle marks
        angleMark(tlx - 10, ttop - 8, 14, colors.accent, -0.1);
        angleMark(trx + 10, ttop - 8, 14, colors.accent, Math.PI + 0.1);
        angleMark(tlx - 10, tbot + 8, 14, colors.accent, 0.1);
        angleMark(trx + 10, tbot + 8, 14, colors.accent, Math.PI - 0.1);
      }

      if (subRect) {
        const slx = subRect.left - rect.left;
        const srx = subRect.right - rect.left;
        const sbot = subRect.bottom - rect.top;
        // dashed measurement line (manual segments)
        const y = sbot + 14;
        const seg = 16;
        const gap = 10;
        let x = slx;
        while (x < srx) {
          const x2 = Math.min(x + seg, srx);
          rc.line(x, y, x2, y, { stroke: colors.green, strokeWidth: 1.1, roughness: 1.7 });
          x = x2 + gap;
        }
        // small arrows at ends
        arrow(slx, y, Math.min(slx + 40, srx), y, colors.green);
        arrow(srx, y, Math.max(srx - 40, slx), y, colors.green);
      }
    };

    const ro = new ResizeObserver(draw);
    const parent = canvas.parentElement as HTMLElement;
    if (parent) ro.observe(parent);
    draw();
    // Ensure fonts are loaded for correct canvas text metrics
    // @ts-ignore
    if (document.fonts && typeof (document as any).fonts.ready?.then === 'function') {
      // @ts-ignore
      (document as any).fonts.ready.then(() => draw());
    }
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      className={className}
    />
  );
};

export default HeroBlueprintCanvas;

