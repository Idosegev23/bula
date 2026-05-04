import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './HotspotEditor.module.css';

interface Hotspot {
  id: string;
  label: string;
  /** All values stored as % of the image (0–100) */
  top: number;
  left: number;
  width: number;
  height: number;
  rotation: number; // degrees
}

const PRESETS = [
  'services',
  'private-clients',
  'branding',
  'architects',
  'shop',
  'digital',
  'instagram-screen',
];

const STORAGE_KEY_DESKTOP = 'bulla-hotspot-editor-desktop-v1';
const STORAGE_KEY_MOBILE = 'bulla-hotspot-editor-mobile-v1';

// אזורי דסקטופ — הקואורדינטות הסופיות שכבר נשמרו (מתוך .ai + עריכה ידנית).
const PRELOADED_DESKTOP: Hotspot[] = [
  { id: 'p-services', label: 'services', top: 18.05, left: 12.4, width: 18.02, height: 10.25, rotation: -13.8 },
  { id: 'p-private-clients', label: 'private-clients', top: 21.13, left: 42.08, width: 11.41, height: 13.01, rotation: -14.3 },
  { id: 'p-branding', label: 'branding', top: 34.43, left: 63.39, width: 10.57, height: 8.98, rotation: 0.4 },
  { id: 'p-architects', label: 'architects', top: 50.44, left: 24.83, width: 14.46, height: 10.36, rotation: -18.7 },
  { id: 'p-shop', label: 'shop', top: 55.65, left: 44.76, width: 18.49, height: 18.86, rotation: -16.3 },
  { id: 'p-digital', label: 'digital', top: 66.29, left: 69.59, width: 12.17, height: 4.71, rotation: 8.2 },
  { id: 'p-instagram-screen', label: 'instagram-screen', top: 33.95, left: 87.11, width: 5.71, height: 16.51, rotation: 8.3 },
];

// אזורי מובייל — 4 מתוכם מתוך .ai (Fm153-156), 3 הערכות חזותיות.
const PRELOADED_MOBILE: Hotspot[] = [
  { id: 'p-services', label: 'services', top: 8.10, left: 7.39, width: 68.27, height: 8.57, rotation: 0 },
  { id: 'p-private-clients', label: 'private-clients', top: 26.72, left: 10.5, width: 39.44, height: 5.38, rotation: 0 },
  { id: 'p-architects', label: 'architects', top: 35.89, left: 22.37, width: 59.54, height: 7.86, rotation: 0 },
  { id: 'p-shop', label: 'shop', top: 44.5, left: 18.5, width: 53, height: 11, rotation: 0 },
  { id: 'p-branding', label: 'branding', top: 56, left: 12, width: 60, height: 14, rotation: 0 },
  { id: 'p-digital', label: 'digital', top: 75.5, left: 10.04, width: 45.45, height: 7.5, rotation: 0 },
  { id: 'p-instagram-screen', label: 'instagram-screen', top: 86.5, left: 5, width: 22, height: 9, rotation: 0 },
];

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export const HotspotEditor: React.FC = () => {
  // מצב — desktop / mobile — נקבע מ-URL `?mode=mobile`
  const mode: 'desktop' | 'mobile' = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') === 'mobile' ? 'mobile' : 'desktop';
  }, []);

  const STORAGE_KEY = mode === 'mobile' ? STORAGE_KEY_MOBILE : STORAGE_KEY_DESKTOP;
  const PRELOADED = mode === 'mobile' ? PRELOADED_MOBILE : PRELOADED_DESKTOP;
  const IMAGE_URL = mode === 'mobile' ? '/mobile.webp' : '/desktop.webp';
  const IMAGE_W = mode === 'mobile' ? 1179 : 4800;
  const IMAGE_H = mode === 'mobile' ? 6056 : 2700;

  const [hotspots, setHotspots] = useState<Hotspot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return PRELOADED;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);

  // Drag state for new rectangle
  const drawState = useRef<{ start: { x: number; y: number } | null; current: { x: number; y: number } | null }>({
    start: null,
    current: null,
  });
  const [drawingRect, setDrawingRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  // Drag state for moving an existing hotspot
  const moveState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  // Drag state for resizing an existing hotspot
  const resizeState = useRef<{ id: string; corner: 'nw' | 'ne' | 'sw' | 'se'; startRect: Hotspot } | null>(null);

  // Drag state for rotating an existing hotspot
  // centerPx — center of the hotspot in pixels of the image's bounding rect
  // startRotation — rotation at start of drag
  // startMouseAngle — angle from center to mouse at start (in degrees)
  const rotateState = useRef<{
    id: string;
    centerPx: { x: number; y: number };
    startRotation: number;
    startMouseAngle: number;
  } | null>(null);

  // Send-to-Claude status
  const [sendStatus, setSendStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  // רוחב תצוגת התמונה בעריכה (מועיל במיוחד למובייל — תמונה צרה וגבוהה)
  const [viewWidth, setViewWidth] = useState<number>(mode === 'mobile' ? 420 : 1400);

  // scroll-to-selected: כשבוחרים hotspot ב-sidebar, גלול ה-canvas אליו
  const scrollToHotspot = (id: string) => {
    const wrap = imageRef.current;
    if (!wrap) return;
    const target = hotspots.find((h) => h.id === id);
    if (!target) return;
    const wrapRect = wrap.getBoundingClientRect();
    const canvasEl = wrap.parentElement;
    if (!canvasEl) return;
    // מרכז ה-hotspot בקואורדינטות התמונה
    const targetTopPx = (target.top / 100) * wrapRect.height + (target.height / 200) * wrapRect.height;
    // מרכוז יחסי ל-viewport של ה-canvas
    const desiredScrollTop = wrap.offsetTop + targetTopPx - canvasEl.clientHeight / 2;
    canvasEl.scrollTo({ top: desiredScrollTop, behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hotspots));
    } catch {
      // ignore (probably storage quota)
    }
  }, [hotspots]);

  // ---- Helpers to convert client coords → image % ----
  const toPct = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: clamp(((clientX - rect.left) / rect.width) * 100),
      y: clamp(((clientY - rect.top) / rect.height) * 100),
    };
  }, []);

  // ---- Drawing new hotspot (drag empty area) ----
  const handleImagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return; // clicked an existing hotspot
    const pos = toPct(e.clientX, e.clientY);
    if (!pos) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawState.current = { start: pos, current: pos };
    setDrawingRect({ top: pos.y, left: pos.x, width: 0, height: 0 });
    setSelectedId(null);
  };

  const handleImagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Drawing
    if (drawState.current.start) {
      const pos = toPct(e.clientX, e.clientY);
      if (!pos) return;
      drawState.current.current = pos;
      const start = drawState.current.start;
      setDrawingRect({
        top: Math.min(start.y, pos.y),
        left: Math.min(start.x, pos.x),
        width: Math.abs(pos.x - start.x),
        height: Math.abs(pos.y - start.y),
      });
    }

    // Moving
    if (moveState.current) {
      const { id, offsetX, offsetY } = moveState.current;
      const pos = toPct(e.clientX, e.clientY);
      if (!pos) return;
      setHotspots((prev) =>
        prev.map((h) =>
          h.id === id
            ? {
                ...h,
                left: clamp(pos.x - offsetX),
                top: clamp(pos.y - offsetY),
              }
            : h
        )
      );
    }

    // Rotating
    if (rotateState.current) {
      const { id, centerPx, startRotation, startMouseAngle } = rotateState.current;
      const rect = imageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = e.clientX - rect.left - centerPx.x;
      const dy = e.clientY - rect.top - centerPx.y;
      const currentAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      let delta = currentAngle - startMouseAngle;
      // Normalize to [-180, 180]
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      const newRotation = Math.round((startRotation + delta) * 10) / 10;
      setHotspots((prev) => prev.map((h) => (h.id === id ? { ...h, rotation: newRotation } : h)));
      return;
    }

    // Resizing
    if (resizeState.current) {
      const { id, corner, startRect } = resizeState.current;
      const pos = toPct(e.clientX, e.clientY);
      if (!pos) return;
      setHotspots((prev) =>
        prev.map((h) => {
          if (h.id !== id) return h;
          let { top, left, width, height } = startRect;
          if (corner === 'nw') {
            const right = startRect.left + startRect.width;
            const bottom = startRect.top + startRect.height;
            left = Math.min(pos.x, right - 0.5);
            top = Math.min(pos.y, bottom - 0.5);
            width = right - left;
            height = bottom - top;
          } else if (corner === 'ne') {
            const bottom = startRect.top + startRect.height;
            top = Math.min(pos.y, bottom - 0.5);
            width = Math.max(0.5, pos.x - startRect.left);
            height = bottom - top;
          } else if (corner === 'sw') {
            const right = startRect.left + startRect.width;
            left = Math.min(pos.x, right - 0.5);
            width = right - left;
            height = Math.max(0.5, pos.y - startRect.top);
          } else if (corner === 'se') {
            width = Math.max(0.5, pos.x - startRect.left);
            height = Math.max(0.5, pos.y - startRect.top);
          }
          return {
            ...h,
            top: clamp(top),
            left: clamp(left),
            width: clamp(width),
            height: clamp(height),
          };
        })
      );
    }
  };

  const handleImagePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // Finish drawing
    if (drawState.current.start && drawState.current.current) {
      const start = drawState.current.start;
      const end = drawState.current.current;
      const top = Math.min(start.y, end.y);
      const left = Math.min(start.x, end.x);
      const width = Math.abs(end.x - start.x);
      const height = Math.abs(end.y - start.y);
      drawState.current = { start: null, current: null };
      setDrawingRect(null);

      if (width > 0.5 && height > 0.5) {
        const label = window.prompt(
          'שם האזור — בחר אחד מהרשימה הקיימת או כתוב חדש:\n\n' + PRESETS.join(', '),
          PRESETS[0]
        );
        if (label) {
          const id = `${label}-${Date.now()}`;
          const newSpot: Hotspot = { id, label, top, left, width, height, rotation: 0 };
          setHotspots((prev) => [...prev, newSpot]);
          setSelectedId(id);
        }
      }
    }
    moveState.current = null;
    resizeState.current = null;
    rotateState.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleRotatePointerDown = (e: React.PointerEvent<HTMLDivElement>, hotspot: Hotspot) => {
    e.stopPropagation();
    setSelectedId(hotspot.id);
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Center of hotspot in pixels (relative to image)
    const cx = ((hotspot.left + hotspot.width / 2) / 100) * rect.width;
    const cy = ((hotspot.top + hotspot.height / 2) / 100) * rect.height;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top - cy;
    const startMouseAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    rotateState.current = {
      id: hotspot.id,
      centerPx: { x: cx, y: cy },
      startRotation: hotspot.rotation,
      startMouseAngle,
    };
    // Capture so move events keep flowing even past hotspot edges
    imageRef.current?.setPointerCapture(e.pointerId);
  };

  // ---- Hotspot interactions ----
  const handleHotspotPointerDown = (e: React.PointerEvent<HTMLDivElement>, hotspot: Hotspot) => {
    e.stopPropagation();
    setSelectedId(hotspot.id);
    const pos = toPct(e.clientX, e.clientY);
    if (!pos) return;
    moveState.current = {
      id: hotspot.id,
      offsetX: pos.x - hotspot.left,
      offsetY: pos.y - hotspot.top,
    };
  };

  const handleResizePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    hotspot: Hotspot,
    corner: 'nw' | 'ne' | 'sw' | 'se'
  ) => {
    e.stopPropagation();
    setSelectedId(hotspot.id);
    resizeState.current = { id: hotspot.id, corner, startRect: { ...hotspot } };
  };

  const removeHotspot = (id: string) => {
    setHotspots((prev) => prev.filter((h) => h.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateRotation = (id: string, rotation: number) => {
    setHotspots((prev) => prev.map((h) => (h.id === id ? { ...h, rotation } : h)));
  };

  // ---- Export ----
  const exportedJSX = useMemo(() => {
    const linesPerSpot = (h: Hotspot) => {
      const fmt = (n: number) => `${n.toFixed(2)}%`;
      const lines = [
        `      {/* ${h.label} */}`,
        `      <button`,
        `        className={styles.desktopClickableArea}`,
        `        style={{`,
        `          position: 'absolute',`,
        `          top: '${fmt(h.top)}',`,
        `          left: '${fmt(h.left)}',`,
        `          width: '${fmt(h.width)}',`,
        `          height: '${fmt(h.height)}',`,
      ];
      if (h.rotation !== 0) {
        lines.push(`          transform: 'rotate(${h.rotation}deg)',`);
      }
      lines.push(`        }}`);
      lines.push(`        onClick={() => navigate('/${h.label}')}`);
      lines.push(`        aria-label="${h.label}"`);
      lines.push(`      />`);
      return lines.join('\n');
    };
    return hotspots.map(linesPerSpot).join('\n\n');
  }, [hotspots]);

  const exportedJSON = useMemo(
    () =>
      JSON.stringify(
        hotspots.map((h) => ({
          label: h.label,
          top: `${h.top.toFixed(2)}%`,
          left: `${h.left.toFixed(2)}%`,
          width: `${h.width.toFixed(2)}%`,
          height: `${h.height.toFixed(2)}%`,
          ...(h.rotation !== 0 ? { rotation: `${h.rotation}deg` } : {}),
        })),
        null,
        2
      ),
    [hotspots]
  );

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(
      () => alert('הועתק ל-clipboard ✓'),
      () => alert('כשל בהעתקה')
    );
  };

  const resetAll = () => {
    if (confirm('למחוק את כל ה-hotspots?')) {
      setHotspots([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const reloadDefaults = () => {
    if (confirm('לטעון מחדש את הערכים מהקוד?')) {
      setHotspots(PRELOADED);
    }
  };

  const switchMode = (newMode: 'desktop' | 'mobile') => {
    if (newMode === mode) return;
    const params = new URLSearchParams(window.location.search);
    if (newMode === 'mobile') params.set('mode', 'mobile');
    else params.delete('mode');
    window.location.search = params.toString();
  };

  const buildPayload = () => ({
    savedAt: new Date().toISOString(),
    mode,
    imageWidth: IMAGE_W,
    imageHeight: IMAGE_H,
    hotspots: hotspots.map((h) => ({
      label: h.label,
      top: Number(h.top.toFixed(2)),
      left: Number(h.left.toFixed(2)),
      width: Number(h.width.toFixed(2)),
      height: Number(h.height.toFixed(2)),
      rotation: Number(h.rotation.toFixed(2)),
    })),
  });

  const downloadJsonFallback = (payload: object) => {
    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hotspots.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  const sendToClaude = async () => {
    if (isSending) return;
    setSendStatus(null);
    setIsSending(true);
    const payload = buildPayload();
    try {
      const res = await fetch('/__save-hotspots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      // אם ה-endpoint לא קיים, Vite יחזיר את ה-index.html — נבדוק שה-content-type הוא JSON
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error(`endpoint לא נענה (status ${res.status}). הפעל מחדש npm run dev`);
      }
      const data = await res.json();
      if (data?.ok) {
        setSendStatus({
          ok: true,
          message: `נשלח לקלוד ✓  ·  ${hotspots.length} hotspots  ·  ${new Date().toLocaleTimeString()}`,
        });
      } else {
        throw new Error(data?.error ?? 'שגיאה לא ידועה מהשרת');
      }
    } catch (err) {
      // Fallback — מוריד קובץ JSON שאפשר לגרור לצ'אט
      downloadJsonFallback(payload);
      setSendStatus({
        ok: false,
        message: 'שמירה לשרת נכשלה — הורדתי לך קובץ hotspots.json. גרור אותו לצ׳אט. (' + String(err) + ')',
      });
    } finally {
      setIsSending(false);
      window.setTimeout(() => setSendStatus(null), 8000);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <h1>HOTSPOT EDITOR · {mode.toUpperCase()}</h1>
        <button
          onClick={() => switchMode('desktop')}
          className={mode === 'desktop' ? styles.primary : ''}
        >
          🖥 Desktop
        </button>
        <button
          onClick={() => switchMode('mobile')}
          className={mode === 'mobile' ? styles.primary : ''}
        >
          📱 Mobile
        </button>
        <button onClick={sendToClaude} className={styles.send}>
          📨 Send to Claude
        </button>
        <button onClick={() => setShowExport((v) => !v)} className={styles.primary}>
          {showExport ? 'Hide export' : 'Show JSX'}
        </button>
        <button onClick={() => copy(exportedJSX)}>Copy JSX</button>
        <button onClick={() => copy(exportedJSON)}>Copy JSON</button>
        <button onClick={reloadDefaults}>Reload defaults</button>
        <button onClick={resetAll} className={styles.danger}>
          Reset all
        </button>
        <label style={{ marginLeft: 8 }}>
          רוחב:
          <input
            type="range"
            min={mode === 'mobile' ? 240 : 600}
            max={mode === 'mobile' ? 900 : 1800}
            step={20}
            value={viewWidth}
            onChange={(e) => setViewWidth(Number(e.target.value))}
            style={{ verticalAlign: 'middle', marginRight: 6 }}
          />
          <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 50, display: 'inline-block' }}>
            {viewWidth}px
          </span>
        </label>
        {sendStatus && (
          <span className={sendStatus.ok ? styles.statusOk : styles.statusErr}>{sendStatus.message}</span>
        )}
        <span className={styles.help}>
          גרירה = מלבן חדש · בחירה ואז: גרירה=הזזה · פינות=גודל · עיגול עליון=סיבוב
        </span>
      </div>

      <div className={styles.layout}>
        <div className={styles.canvas}>
          <div
            ref={imageRef}
            className={`${styles.imageWrap} ${mode === 'mobile' ? styles.imageWrapMobile : ''}`}
            style={{
              backgroundImage: `url('${IMAGE_URL}')`,
              aspectRatio: `${IMAGE_W} / ${IMAGE_H}`,
              width: `${viewWidth}px`,
              maxWidth: '100%',
            }}
            onPointerDown={handleImagePointerDown}
            onPointerMove={handleImagePointerMove}
            onPointerUp={handleImagePointerUp}
          >
            {hotspots.map((h) => (
              <div
                key={h.id}
                className={`${styles.hotspot} ${selectedId === h.id ? styles.hotspotSelected : ''}`}
                style={{
                  top: `${h.top}%`,
                  left: `${h.left}%`,
                  width: `${h.width}%`,
                  height: `${h.height}%`,
                  transform: h.rotation ? `rotate(${h.rotation}deg)` : undefined,
                  transformOrigin: 'center center',
                }}
                onPointerDown={(e) => handleHotspotPointerDown(e, h)}
              >
                <span className={styles.hotspotLabel}>{h.label}</span>
                <button
                  className={styles.hotspotDelete}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHotspot(h.id);
                  }}
                  aria-label="delete"
                >
                  ×
                </button>
                {selectedId === h.id && (
                  <>
                    <div
                      className={`${styles.handle} ${styles.handleNW}`}
                      onPointerDown={(e) => handleResizePointerDown(e, h, 'nw')}
                    />
                    <div
                      className={`${styles.handle} ${styles.handleNE}`}
                      onPointerDown={(e) => handleResizePointerDown(e, h, 'ne')}
                    />
                    <div
                      className={`${styles.handle} ${styles.handleSW}`}
                      onPointerDown={(e) => handleResizePointerDown(e, h, 'sw')}
                    />
                    <div
                      className={`${styles.handle} ${styles.handleSE}`}
                      onPointerDown={(e) => handleResizePointerDown(e, h, 'se')}
                    />
                    <div className={styles.rotateLine} aria-hidden="true" />
                    <div
                      className={styles.rotateHandle}
                      onPointerDown={(e) => handleRotatePointerDown(e, h)}
                      title="גרור לסיבוב"
                    />
                  </>
                )}
              </div>
            ))}

            {drawingRect && (
              <div
                className={styles.drawingRect}
                style={{
                  top: `${drawingRect.top}%`,
                  left: `${drawingRect.left}%`,
                  width: `${drawingRect.width}%`,
                  height: `${drawingRect.height}%`,
                }}
              />
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <h2>Hotspots ({hotspots.length})</h2>
          {hotspots.length === 0 && <div className={styles.empty}>גרור על התמונה כדי ליצור מלבן ראשון</div>}
          {hotspots.map((h) => (
            <div
              key={h.id}
              className={`${styles.hotspotItem} ${selectedId === h.id ? styles.selected : ''}`}
              onClick={() => {
                setSelectedId(h.id);
                scrollToHotspot(h.id);
              }}
            >
              <strong>{h.label}</strong>
              <div className={styles.coords}>
                <span>top: {h.top.toFixed(2)}%</span>
                <span>left: {h.left.toFixed(2)}%</span>
                <span>w: {h.width.toFixed(2)}%</span>
                <span>h: {h.height.toFixed(2)}%</span>
              </div>
              <div className={styles.rotationRow}>
                <label>rotation:</label>
                <input
                  type="number"
                  value={h.rotation}
                  step={0.5}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateRotation(h.id, Number(e.target.value))}
                />
                <span>°</span>
              </div>
              <div className={styles.itemActions}>
                <button onClick={(e) => { e.stopPropagation(); setSelectedId(h.id); }}>select</button>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHotspot(h.id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}

          {showExport && (
            <div className={styles.exportPanel}>
              <h2>JSX</h2>
              <pre>{exportedJSX}</pre>
              <button onClick={() => copy(exportedJSX)} className={styles.primary}>
                Copy JSX to clipboard
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* כפתור Send צף — תמיד גלוי, גדול, ברור */}
      <div className={styles.floatingHint}>
        {sendStatus
          ? sendStatus.message
          : `${hotspots.length} hotspots · לחיצה שולחת לקלוד`}
      </div>
      <button
        type="button"
        onClick={sendToClaude}
        disabled={isSending}
        className={
          styles.floatingSend +
          (isSending ? ` ${styles.busy}` : '') +
          (sendStatus?.ok ? ` ${styles.success}` : '') +
          (sendStatus && !sendStatus.ok ? ` ${styles.error}` : '')
        }
      >
        {isSending ? '⏳ שולח...' : '📨 שלח לקלוד'}
        <small>{hotspots.length} hotspots</small>
      </button>
    </div>
  );
};

export default HotspotEditor;
