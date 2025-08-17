import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

type Props = {
  text: string;
  className?: string;
  fontUrl?: string; // default MiriWin
  sizePx?: number;  // logical font size baseline
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  repeats?: number;
  startEvent?: string; // wait for this event before starting
  doneEvent?: string;  // dispatch when finished
  direction?: 'rtl' | 'ltr';
};

const RoughHandwriteText: React.FC<Props> = ({
  text,
  className = '',
  fontUrl = '/miriwin-webfont copy.ttf',
  sizePx = 36,
  stroke = '#000',
  strokeWidth = 1.2,
  roughness = 1.6,
  bowing = 0.8,
  repeats = 1,
  startEvent = 'spinner:finished',
  doneEvent = 'handwrite:done:subtitle',
  direction = 'rtl',
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [readyToStart, setReadyToStart] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => setReadyToStart(true);
    window.addEventListener(startEvent, handler);
    return () => window.removeEventListener(startEvent, handler);
  }, [startEvent]);

  useEffect(() => {
    if (!readyToStart) return;
    let stopped = false;

    (async () => {
      let font: any | null = null;
      try {
        const opentype: any = await import('opentype.js');
        font = await new Promise((resolve, reject) => {
          opentype.load(fontUrl, (err: any, f: any) => (err ? reject(err) : resolve(f)));
        });
      } catch (e) {
        // Fallback: no vector font available
        font = null;
      }

      const canvas = ref.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;

      // Measure parent
      const parent = canvas.parentElement as HTMLElement;
      const rect = parent.getBoundingClientRect();

      // If no font, draw a simple fallback text so that something is visible
      if (!font) {
        const pad = 12;
        const width = Math.ceil(rect.width);
        const height = Math.ceil(sizePx + pad * 2);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${sizePx}px MiriWin, 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = stroke;
        ctx.fillText(text, width / 2, height / 2);
        window.dispatchEvent(new CustomEvent(doneEvent));
        return;
      }

      // Build path manually to support RTL properly
      const pad = 8;
      const unitsPerEm = font.unitsPerEm || 1000;
      const glyphs: any[] = font.stringToGlyphs(text);
      const glyphScale = sizePx / unitsPerEm;
      // total advance width
      const advances = glyphs.map((g) => (g.advanceWidth || 0) * glyphScale);
      const totalAdvance = advances.reduce((a, b) => a + b, 0);
      // compose one commands array from glyph paths
      let composed: any[] = [];
      let xCursor = direction === 'rtl' ? pad + totalAdvance : pad;
      const yBaseline = sizePx + pad; // baseline
      for (let gi = 0; gi < glyphs.length; gi += 1) {
        const g = glyphs[gi];
        const gw = advances[gi];
        const gx = direction === 'rtl' ? xCursor - gw : xCursor;
        const gPath: any = g.getPath(gx / glyphScale, yBaseline / glyphScale, sizePx);
        composed = composed.concat(gPath.commands || []);
        xCursor += direction === 'rtl' ? -gw : gw;
      }
      // Create a temp path to get bbox
      const temp = font.getPath(' ', pad, sizePx + pad, sizePx);
      (temp as any).commands = composed;
      const bbox = temp.getBoundingBox();
      const logicalW = (direction === 'rtl' ? totalAdvance : (bbox.x2 - bbox.x1)) + pad * 2;
      const logicalH = bbox.y2 - bbox.y1 + pad * 2;

      // Scale to fit parent width
      const scale = Math.min(rect.width / logicalW, 1.0);
      const width = Math.ceil(logicalW * scale);
      const height = Math.ceil(logicalH * scale);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rc = rough.canvas(canvas);

      // Convert commands progressively to simulate handwriting
      const cmds = composed as any[];
      // כתיבה רגועה יותר ופחות מקושקשת
      const chunk = Math.max(1, Math.floor(cmds.length / 100));
      let i = 0;

      const renderUpTo = (endIdx: number) => {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        // Use logical coordinates then scale, and flip Y axis properly
        ctx.scale(scale, scale);
        ctx.translate(0, logicalH);
        ctx.scale(1, -1);
        ctx.translate(-bbox.x1 + pad, -bbox.y1 + pad);
        // Build partial path data
        let d = '';
        for (let j = 0; j < endIdx && j < cmds.length; j += 1) {
          const c = cmds[j];
          if (c.type === 'M') d += `M${c.x} ${c.y}`;
          else if (c.type === 'L') d += `L${c.x} ${c.y}`;
          else if (c.type === 'C') d += `C${c.x1} ${c.y1} ${c.x2} ${c.y2} ${c.x} ${c.y}`;
          else if (c.type === 'Q') d += `Q${c.x1} ${c.y1} ${c.x} ${c.y}`;
          else if (c.type === 'Z') d += 'Z';
        }
        rc.path(d, { stroke, strokeWidth, roughness, bowing });
        ctx.restore();
      };

      const step = () => {
        if (stopped) return;
        i += chunk;
        renderUpTo(i);
        if (i < cmds.length) {
          requestAnimationFrame(step);
        } else {
          window.dispatchEvent(new CustomEvent(doneEvent));
        }
      };

      renderUpTo(1);
      requestAnimationFrame(step);
    })();

    return () => {
      stopped = true;
    };
  }, [readyToStart, text, fontUrl, sizePx, stroke, strokeWidth, roughness, bowing, repeats, doneEvent]);

  return <canvas ref={ref} className={className} style={{ display: 'block' }} />;
};

export default RoughHandwriteText;

