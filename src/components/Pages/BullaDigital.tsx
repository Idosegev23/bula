import React from 'react';
import RotatingText from '../UI/RotatingText/RotatingText';
import PixelBlast from '../UI/PixelBlast/PixelBlast';
import styles from './BullaDigital.module.css';

export interface BullaDigitalProps {
  className?: string;
}

const processSteps = [
  { num: '01', title: 'אבחון', body: 'מבינים את העסק, הקהל, המטרות. שואלים הרבה שאלות.' },
  { num: '02', title: 'תכנון', body: 'אפיון, תוכן, סקיצות ו-wireframes. לפני שנוגעים בקוד.' },
  { num: '03', title: 'בנייה', body: 'מעצבים, בונים, בודקים, מחדדים. עד שזה מרגיש נכון.' },
  { num: '04', title: 'ליווי', body: 'עולים לאוויר, עוקבים, משפרים, שומרים על התחזוקה.' }
];

const techStack = ['React', 'Next.js', 'Figma', 'GPT', 'Claude', 'n8n', 'Supabase', 'Vercel'];

export const BullaDigital: React.FC<BullaDigitalProps> = ({ className = '' }) => {
  return (
    <main className={`${styles.digitalPage} ${className}`}>
      {/* Hero */}
      <section className={styles.heroSection}>
        {/* Technical drawing corners */}
        <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

        <div className={styles.container}>
          {/* Terminal-style meta strip */}
          <div className={styles.heroMeta} aria-hidden="true">
            <span className={styles.metaItem}>bulla/digital</span>
            <span className={styles.metaBar} />
            <span className={styles.metaItem}>v.2026</span>
            <span className={styles.metaBar} />
            <span className={styles.metaStatus}>
              <span className={styles.statusDot} />
              <span>online</span>
            </span>
          </div>

          <div className={styles.stamp}>
            <img src="/bulla_logo.svg" alt="" className={styles.heroLogoSymbol} />
            <img src="/header-logo.svg" alt="Bulla Studio" className={styles.heroLogoWordmark} />
            <span className={styles.stampDivider} />
            <p className={styles.heroMark}>Digital</p>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>הסטודיו הדיגיטלי</span>
            <span className={styles.heroLine}>
              <span className={styles.heroConnector}>ל</span>
              <span className={styles.rotatorWrap}>
                <RotatingText
                  texts={['מיתוג', 'אתרים', 'אוטומציות', 'AI']}
                  staggerFrom="last"
                  staggerDuration={0.025}
                  rotationInterval={2400}
                  splitLevelClassName={styles.rotatorWord}
                  transition={{ type: 'spring', damping: 28, stiffness: 360 }}
                />
              </span>
              <span className={styles.srOnly}>מיתוג, אתרים, אוטומציות ו-AI</span>
            </span>
          </h1>

          <p className={styles.heroTagline}>
            סטודיו אחד. אחריות אחת.<span className={styles.taglineSep} aria-hidden="true"> · </span>מהשלד הראשוני ועד ההשקה לאוויר.
          </p>

          <div className={styles.heroCTAs}>
            <a
              href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20בייעוץ%20לסטודיו%20הדיגיטלי"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroPrimary}
            >
              <span>בואו נדבר</span>
              <span className={styles.heroPrimaryArrow} aria-hidden="true">←</span>
            </a>
            <a href="#services" className={styles.heroSecondary}>
              או ראו מה אנחנו עושים
            </a>
          </div>

          <div className={styles.scrollMarker} aria-hidden="true">
            <span className={styles.scrollRule}>
              <span className={styles.tick} />
              <span className={styles.tick} />
              <span className={styles.tick} />
              <span className={`${styles.tick} ${styles.tickMajor}`} />
              <span className={styles.tick} />
              <span className={styles.tick} />
              <span className={styles.tick} />
            </span>
            <span className={styles.scrollLabel}>scroll</span>
          </div>
        </div>
      </section>

      {/* Manifesto — רקע של פיקסלים אינטראקטיביים שמתקשר ישירות ל"בפיקסלים" */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoBg} aria-hidden="true">
          <PixelBlast
            variant="square"
            pixelSize={5}
            color="#28939f"
            patternScale={2.6}
            patternDensity={1}
            pixelSizeJitter={0.25}
            enableRipples
            rippleSpeed={0.38}
            rippleThickness={0.12}
            rippleIntensityScale={1.4}
            speed={0.45}
            edgeFade={0.35}
            transparent
          />
        </div>
        <div className={`${styles.container} ${styles.manifestoContent}`}>
          <p className={styles.manifestoText}>
            <span className={styles.manifestoLine}>נגרות.</span>
            <span className={styles.manifestoLine}>בפיקסלים.</span>
          </p>
          <p className={styles.manifestoSub}>
            מודדים כל פיקסל כמו שאנחנו מודדים כל חיבור בעץ.
          </p>
        </div>
      </section>

      {/* Services — each with its own motif */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesHeader}>
            <span className={styles.sectionKicker}>01 / שירותים</span>
            <h2 className={styles.sectionTitle}>מה אנחנו עושים</h2>
          </div>

          <div className={styles.servicesGrid}>
            {/* Branding */}
            <article className={`${styles.service} ${styles.serviceBranding}`}>
              <div className={styles.serviceBody}>
                <span className={styles.serviceIndex}>01</span>
                <h3 className={styles.serviceTitle}>מיתוג</h3>
                <p className={styles.serviceDesc}>
                  זהות ויזואלית מלאה — לוגו, צבעים, טיפוגרפיה ושפה גרפית שמתאימה לעסק שלכם כמו מידה.
                </p>
              </div>
              <div className={styles.motif}>
                <div className={styles.swatchRow}>
                  <span className={styles.swatch} style={{ background: '#1a1a1a' }} />
                  <span className={styles.swatch} style={{ background: '#c9b79c' }} />
                  <span className={styles.swatch} style={{ background: '#8c6a4f' }} />
                  <span className={styles.swatch} style={{ background: '#f0ead6' }} />
                  <span className={styles.swatch} style={{ background: '#28939f' }} />
                </div>
                <div className={styles.typeSpecimen}>
                  <span className={styles.typeLight}>Aa</span>
                  <span className={styles.typeRegular}>Aa</span>
                  <span className={styles.typeBold}>Aa</span>
                </div>
                <div className={styles.specimenMeta}>
                  <span>Heebo / Light · Regular · Bold</span>
                </div>
              </div>
            </article>

            {/* Websites */}
            <article className={`${styles.service} ${styles.serviceWebsites}`}>
              <div className={styles.serviceBody}>
                <span className={styles.serviceIndex}>02</span>
                <h3 className={styles.serviceTitle}>אתרים</h3>
                <p className={styles.serviceDesc}>
                  דפי נחיתה, אתרי תדמית וחנויות — מודרניים, מהירים, נטענים תוך שנייה ומומרים טוב.
                </p>
              </div>
              <div className={styles.motif}>
                <div className={styles.browser}>
                  <div className={styles.browserBar}>
                    <span className={styles.browserDot} style={{ background: '#ff5f56' }} />
                    <span className={styles.browserDot} style={{ background: '#ffbd2e' }} />
                    <span className={styles.browserDot} style={{ background: '#27c93f' }} />
                    <div className={styles.browserUrl}>
                      <span className={styles.browserProtocol}>https://</span>
                      <span className={styles.browserDomain}>bulla.studio</span>
                      <span className={styles.browserPath}>/your-brand</span>
                    </div>
                  </div>
                  <div className={styles.browserBody}>
                    <div className={styles.browserSkeleton} style={{ width: '60%' }} />
                    <div className={styles.browserSkeleton} style={{ width: '85%' }} />
                    <div className={styles.browserSkeleton} style={{ width: '45%' }} />
                    <div className={styles.browserPreviewBox} />
                  </div>
                </div>
              </div>
            </article>

            {/* Automations */}
            <article className={`${styles.service} ${styles.serviceAutomations}`}>
              <div className={styles.serviceBody}>
                <span className={styles.serviceIndex}>03</span>
                <h3 className={styles.serviceTitle}>אוטומציות</h3>
                <p className={styles.serviceDesc}>
                  מחברים בין הכלים של העסק ומרוויחים שעות בשבוע — לידים, CRM, חשבוניות, מיילים, דיווחים.
                </p>
              </div>
              <div className={styles.motif}>
                <svg className={styles.flowSvg} viewBox="0 0 320 140" fill="none" aria-hidden="true">
                  {/* nodes */}
                  <g>
                    <rect x="8" y="52" width="72" height="36" rx="4" className={styles.flowNode} />
                    <text x="44" y="74" className={styles.flowLabel} textAnchor="middle">טופס</text>
                  </g>
                  <g>
                    <rect x="124" y="16" width="72" height="36" rx="4" className={styles.flowNode} />
                    <text x="160" y="38" className={styles.flowLabel} textAnchor="middle">CRM</text>
                  </g>
                  <g>
                    <rect x="124" y="88" width="72" height="36" rx="4" className={styles.flowNode} />
                    <text x="160" y="110" className={styles.flowLabel} textAnchor="middle">מייל</text>
                  </g>
                  <g>
                    <rect x="240" y="52" width="72" height="36" rx="4" className={`${styles.flowNode} ${styles.flowNodeAccent}`} />
                    <text x="276" y="74" className={`${styles.flowLabel} ${styles.flowLabelAccent}`} textAnchor="middle">לקוח</text>
                  </g>
                  {/* connectors */}
                  <path d="M80 70 Q 102 70, 124 34" className={styles.flowLine} strokeDasharray="4 4" />
                  <path d="M80 70 Q 102 70, 124 106" className={styles.flowLine} strokeDasharray="4 4" />
                  <path d="M196 34 Q 218 34, 240 70" className={styles.flowLine} strokeDasharray="4 4" />
                  <path d="M196 106 Q 218 106, 240 70" className={styles.flowLine} strokeDasharray="4 4" />
                </svg>
              </div>
            </article>

            {/* AI Bots */}
            <article className={`${styles.service} ${styles.serviceAI}`}>
              <div className={styles.serviceBody}>
                <span className={styles.serviceIndex}>04</span>
                <h3 className={styles.serviceTitle}>בוטים ו-AI</h3>
                <p className={styles.serviceDesc}>
                  סוכני AI שחיים בוואטסאפ או באתר — עונים, מתזמנים, מוכרים ומטפלים בלידים 24/7.
                </p>
              </div>
              <div className={styles.motif}>
                <div className={styles.chat}>
                  <div className={`${styles.chatBubble} ${styles.chatUser}`}>
                    אפשר לתאם פגישה לשבוע הבא?
                  </div>
                  <div className={`${styles.chatBubble} ${styles.chatBot}`}>
                    בטח. יש לי יום שלישי ב-10:30 או רביעי ב-14:00. מה עדיף?
                  </div>
                  <div className={`${styles.chatBubble} ${styles.chatTyping}`} aria-label="הבוט מקליד">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.servicesHeader}>
            <span className={styles.sectionKicker}>02 / תהליך</span>
            <h2 className={styles.sectionTitle}>איך אנחנו עובדים</h2>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <div key={step.num} className={styles.processStep}>
                <span className={styles.processNum}>{step.num}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className={styles.techSection}>
        <div className={styles.container}>
          <span className={styles.sectionKicker}>03 / סט כלים</span>
          <h2 className={styles.sectionTitle}>הכלים שאנחנו עובדים איתם</h2>
          <div className={styles.techRow}>
            {techStack.map((tech) => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <span className={styles.ctaPrompt}>$ נתחיל?</span>
            <h2 className={styles.ctaTitle}>
              ספרו לנו מה הפרויקט — ונחשב יחד את הדרך הקצרה אליו.
            </h2>
            <div className={styles.ctaRow}>
              <a
                href="https://wa.me/972549739577?text=שלום,%20אני%20מעוניין%20בייעוץ%20לסטודיו%20הדיגיטלי"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                שליחת פרויקט
              </a>
              <a href="mailto:bulla.hstudio@gmail.com" className={styles.ctaSecondary}>
                או במייל
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
