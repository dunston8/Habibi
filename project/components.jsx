/* global React */
const { useState, useEffect, useRef } = React;

// ------------------------------------------------------------------
// Reveal-on-scroll wrapper
// ------------------------------------------------------------------
function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const delayCls = delay ? ` delay-${delay}` : "";
  return (
    <As ref={ref} className={`reveal${delayCls} ${visible ? "visible" : ""} ${className}`.trim()} {...rest}>
      {children}
    </As>
  );
}

// ------------------------------------------------------------------
// Brand mark + name
// ------------------------------------------------------------------
function Brand({ inverted = false }) {
  return (
    <a href="#top" className="brand">
      <div className="brand-mark"><img src="assets/logo.png" alt="Yalla Habibi" /></div>
      <div className="brand-name" style={inverted ? { color: "var(--bg)" } : {}}>
        Yalla Habibi
        <small>Restaurant · Oslo</small>
      </div>
    </a>
  );
}

// ------------------------------------------------------------------
// Header
// ------------------------------------------------------------------
function Header({ orderUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#meny", label: "Meny" },
    { href: "#tilbud", label: "Tilbud" },
    { href: "#apningstider", label: "Åpningstider" },
    { href: "#finn-oss", label: "Finn oss" },
  ];

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a className="btn btn-primary header-cta" href={orderUrl} target="_blank" rel="noreferrer">
            Bestill nå
            <span className="arrow">→</span>
          </a>
          <button className={`menu-btn ${open ? "open" : ""}`} aria-label="Meny" onClick={() => setOpen((o) => !o)}>
            <span></span>
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a className="btn btn-primary btn-lg" href={orderUrl} target="_blank" rel="noreferrer" onClick={close}>
          Bestill på Foodora
          <span className="arrow">→</span>
        </a>
      </div>
    </header>
  );
}

// ------------------------------------------------------------------
// Hero
// ------------------------------------------------------------------
function Hero({ orderUrl }) {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <Reveal as="span" className="eyebrow">Trondheimsveien 14 · Oslo</Reveal>
          <Reveal delay={1} as="h1" style={{ marginTop: 18 }}>
            God mat,<br />varme smaker<br />— <span className="accent">og en hyggelig pause</span> i hverdagen.
          </Reveal>
          <Reveal delay={2}>
            <p className="hero-sub">
              Hos Yalla Habibi serverer vi shawarma, pizza og arabiske retter laget for å deles. En koselig nabolagsrestaurant
              for hele familien — kom innom, eller få maten levert hjem.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-lg" href={orderUrl} target="_blank" rel="noreferrer">
                Bestill nå <span className="arrow">→</span>
              </a>
              <a className="btn btn-ghost btn-lg" href="#apningstider">Åpningstider</a>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="hero-meta">
              <div>Familievennlig <strong>Stort barnemeny-utvalg</strong></div>
              <div>Take-away & levering <strong>Foodora i Oslo</strong></div>
              <div>Åpent sent <strong>Til 03 fre & lør</strong></div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="hero-stage">
            <div className="ring"></div>
            <div className="ring-2"></div>
            <div className="plate p1"><img src="assets/mixgrill.png" alt="Mixgrill med ris og brød" /></div>
            <div className="plate p2"><img src="assets/shawarma.png" alt="Shawarma" /></div>
            <div className="plate p3"><img src="assets/pizza.png" alt="Pizza" /></div>
            <div className="plate p4"><img src="assets/muhammara.png" alt="Muhammara" /></div>
            <div className="plate p5"><img src="assets/kibbeh.png" alt="Kibbeh" /></div>

            <div className="hero-badge">
              <svg viewBox="0 0 132 132" aria-hidden="true">
                <defs>
                  <path id="circle-text" d="M 66, 66 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
                </defs>
                <text fill="currentColor">
                  <textPath href="#circle-text" startOffset="0">FRISK · HJEMMELAGET · DELES SAMMEN · FRISK · HJEMMELAGET · DELES SAMMEN · </textPath>
                </text>
              </svg>
              <span className="star">✦</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Shawarma <em className="dot"></em> Pizza <em className="dot"></em> Mixgrill <em className="dot"></em> Falafel <em className="dot"></em> Barnemeny <em className="dot"></em> Hummus <em className="dot"></em> Kebab <em className="dot"></em> Muhammara <em className="dot"></em>&nbsp;</span>
          <span>Shawarma <em className="dot"></em> Pizza <em className="dot"></em> Mixgrill <em className="dot"></em> Falafel <em className="dot"></em> Barnemeny <em className="dot"></em> Hummus <em className="dot"></em> Kebab <em className="dot"></em> Muhammara <em className="dot"></em>&nbsp;</span>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Menu highlights
// ------------------------------------------------------------------
const DISHES = [
  { tag: "Husets favoritt", img: "assets/shawarma.png", title: "Shawarma-tallerken", desc: "Saftig kylling- eller oksekjøtt med pommes, syltede agurker og hvitløkssaus.", price: "fra 169 kr", cat: "Shawarma" },
  { tag: "Stensteinsovn", img: "assets/pizza.png", title: "Habibi Pizza", desc: "Tynn bunn, modne tomater, oliven og friske urter — laget i steinovn.", price: "fra 159 kr", cat: "Pizza" },
  { tag: "Klassiker", img: "assets/mixgrill.png", title: "Mixgrill", desc: "Lammespyd, kyllingspyd og kebab servert med ris, brød og grønt.", price: "fra 245 kr", cat: "Arabisk mat" },
  { tag: "Til å dele", img: "assets/muhammara.png", title: "Mezze & smårett", desc: "Muhammara, hummus og kibbeh — våre små retter satt i sentrum av bordet.", price: "fra 89 kr", cat: "Mezze" },
];

function MenuSection() {
  return (
    <section className="section" id="meny">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal as="span" className="eyebrow">Vår meny</Reveal>
            <Reveal delay={1} as="h2" style={{ marginTop: 18 }}>
              Shawarma, pizza<br />og arabiske smaker<br />— <em style={{ color: "var(--burgundy)" }}>laget for å deles.</em>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="lead">
              Vi lager rettene fra bunnen av hver dag. Enkelt, ærlig og godt — slik mat skal smake. Her er noen av favorittene fra menyen.
            </p>
          </Reveal>
        </div>

        <div className="menu-grid">
          {DISHES.map((d, i) => (
            <Reveal key={d.title} delay={Math.min(i + 1, 4)} className="dish-wrap">
              <article className="dish">
                <div className="dish-photo">
                  <img src={d.img} alt={d.title} />
                  <span className="dish-tag">{d.tag}</span>
                </div>
                <div className="dish-body">
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
                <div className="dish-foot">
                  <span className="dish-price">{d.price}</span>
                  <span className="dish-cat">{d.cat}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {["Shawarma", "Pizza", "Barnemeny", "Mezze", "Mixgrill", "Falafel", "Vegetar", "Dessert"].map((c) => (
              <span key={c} style={{
                padding: "10px 18px",
                border: "1px solid var(--line-strong)",
                borderRadius: 999,
                fontSize: 13,
                color: "var(--ink-soft)",
                background: "rgba(255,255,255,0.5)"
              }}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// TikTok offers
// ------------------------------------------------------------------
function TikTokSection({ tiktokUrl }) {
  return (
    <section className="section" id="tilbud" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="tiktok">
            <div className="tiktok-orb"></div>
            <div className="tiktok-grid">
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>Følg oss · @yalla.habibi.restaurant</span>
                <h2 style={{ marginTop: 18 }}>
                  Sjekk våre <em>tilbud på TikTok</em>
                </h2>
                <p className="lead">
                  Ukens shawarma-tilbud, familietilbud og overraskelser fra kjøkkenet — vi legger ut de beste tilbudene først på TikTok.
                  Trykk følg, så går du ikke glipp av noe.
                </p>
                <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a className="btn btn-gold btn-lg" href={tiktokUrl} target="_blank" rel="noreferrer">
                    Åpne TikTok <span className="arrow" style={{ background: "rgba(0,0,0,.12)" }}>↗</span>
                  </a>
                  <a className="btn btn-ghost btn-lg" href="#meny" style={{ color: "var(--bg)", borderColor: "rgba(251,246,238,.2)" }}>
                    Se menyen
                  </a>
                </div>
                <div style={{ marginTop: 32, display: "flex", gap: 28, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(251,246,238,.5)" }}>
                  <div>Nye tilbud <strong style={{ display: "block", color: "var(--bg)", fontFamily: "var(--sans)", fontSize: 14, letterSpacing: 0, textTransform: "none", marginTop: 6 }}>hver uke</strong></div>
                  <div>Behind the scenes <strong style={{ display: "block", color: "var(--bg)", fontFamily: "var(--sans)", fontSize: 14, letterSpacing: 0, textTransform: "none", marginTop: 6 }}>fra kjøkkenet</strong></div>
                  <div>Bli med i fellesskapet <strong style={{ display: "block", color: "var(--bg)", fontFamily: "var(--sans)", fontSize: 14, letterSpacing: 0, textTransform: "none", marginTop: 6 }}>av Habibi-fans</strong></div>
                </div>
              </div>

              <div className="tt-phone">
                <div className="notch"></div>
                <div className="tt-feed">
                  <div className="clip">
                    <img src="assets/shawarma.png" alt="Shawarma-tilbud" />
                    <div className="label"><span className="heart"></span>Mandagstilbud — shawarma + drikke 149,-</div>
                  </div>
                  <div className="clip">
                    <img src="assets/pizza.png" alt="Familiepizza" />
                    <div className="label"><span className="heart"></span>Familiepizza — to store til 299,-</div>
                  </div>
                  <div className="clip">
                    <img src="assets/mixgrill.png" alt="Mixgrill" />
                    <div className="label"><span className="heart"></span>Helgens mixgrill for to</div>
                  </div>
                </div>
                <div className="tt-side">
                  <div>♥</div>
                  <div>💬</div>
                  <div>↗</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Order CTA
// ------------------------------------------------------------------
function OrderSection({ orderUrl }) {
  return (
    <section className="section" id="bestill" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="order">
            <div className="order-deco"></div>
            <div className="order-plate"><img src="assets/kibbeh.png" alt="" /></div>
            <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
              <span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Bestill hjem · Foodora</span>
              <h2 style={{ marginTop: 18 }}>
                Sulten? <em>Vi leverer.</em>
              </h2>
              <p className="lead">
                Få favorittene dine rett hjem med Foodora. Bestilling tar under et minutt — og kjøkkenet vårt setter i gang så snart ordren tikker inn.
              </p>
              <div className="order-ctas">
                <a className="btn btn-gold btn-lg" href={orderUrl} target="_blank" rel="noreferrer">
                  Bestill på Foodora <span className="arrow" style={{ background: "rgba(0,0,0,.12)" }}>→</span>
                </a>
                <a className="btn btn-ghost btn-lg" href="#finn-oss" style={{ color: "var(--bg)", borderColor: "rgba(251,246,238,.22)" }}>
                  Eller kom innom oss
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Hours + Location
// ------------------------------------------------------------------
const HOURS = [
  { day: "Mandag", time: "14 – 00" },
  { day: "Tirsdag", time: "14 – 00" },
  { day: "Onsdag", time: "14 – 00" },
  { day: "Torsdag", time: "14 – 00" },
  { day: "Fredag", time: "14 – 03" },
  { day: "Lørdag", time: "14 – 03" },
  { day: "Søndag", time: "14 – 00" },
];

function getStatus() {
  const now = new Date();
  const dayIdx = (now.getDay() + 6) % 7; // Mon=0
  const hour = now.getHours();
  const closesAt = (dayIdx === 4 || dayIdx === 5) ? 27 : 24; // 03 = 27 next day
  const open = hour >= 14 || hour < (closesAt - 24);
  return { todayIdx: dayIdx, open };
}

function HoursLocation() {
  const status = getStatus();
  return (
    <section className="section" id="apningstider">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal as="span" className="eyebrow">Praktisk</Reveal>
            <Reveal delay={1} as="h2" style={{ marginTop: 18 }}>
              Når vi er åpne,<br />og hvor du finner oss.
            </Reveal>
          </div>
        </div>

        <div className="facts">
          <Reveal>
            <div className="card">
              <span className="eyebrow">Åpningstider</span>
              <div className={`status-pill ${status.open ? "" : "closed"}`} style={{ marginTop: 18 }}>
                <span className="dot"></span>
                {status.open ? "Åpent nå — vi tar imot bestillinger" : "Stengt akkurat nå"}
              </div>
              <div className="hours-list">
                {HOURS.map((h, i) => (
                  <div key={h.day} className={`hours-row ${i === status.todayIdx ? "today" : ""}`}>
                    <div className="day">{h.day}{i === status.todayIdx ? " — i dag" : ""}</div>
                    <div className="time">{h.time}</div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 24, fontSize: 13, color: "var(--ink-mute)" }}>
                Kjøkkenet stenger 30 min før restauranten. Ved høytider — sjekk TikTok for oppdateringer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} id="finn-oss">
            <div className="card map-card">
              <div className="map-canvas">
                <svg viewBox="0 0 600 450" preserveAspectRatio="none" aria-hidden="true">
                  {/* Streets */}
                  <g stroke="rgba(42,24,16,.10)" strokeWidth="22" fill="none" strokeLinecap="round">
                    <path d="M -20 240 L 620 220" />
                    <path d="M 280 -20 L 320 470" />
                  </g>
                  <g stroke="rgba(42,24,16,.06)" strokeWidth="10" fill="none" strokeLinecap="round">
                    <path d="M -20 100 L 620 80" />
                    <path d="M -20 360 L 620 380" />
                    <path d="M 100 -20 L 80 470" />
                    <path d="M 480 -20 L 520 470" />
                  </g>
                  {/* Blocks */}
                  <g fill="rgba(201,154,63,.08)">
                    <rect x="120" y="120" width="140" height="80" rx="6" />
                    <rect x="340" y="110" width="120" height="90" rx="6" />
                    <rect x="120" y="260" width="160" height="90" rx="6" />
                    <rect x="340" y="260" width="140" height="90" rx="6" />
                  </g>
                  {/* Park */}
                  <circle cx="100" cy="380" r="48" fill="rgba(107,122,58,.18)" />
                  {/* Street label */}
                  <text x="300" y="436" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="rgba(42,24,16,.4)" letterSpacing="2">TRONDHEIMSVEIEN</text>
                </svg>
                <div className="map-pin">
                  <div className="head"><span>✦</span></div>
                  <div className="pulse"></div>
                </div>
              </div>
              <div className="map-info">
                <div className="addr">
                  <small>Adresse</small>
                  Trondheimsveien 14, 0560 Oslo
                </div>
                <a className="btn btn-primary" href="https://maps.google.com/?q=Trondheimsveien+14,+Oslo" target="_blank" rel="noreferrer">
                  Finn veien <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Footer
// ------------------------------------------------------------------
function Footer({ orderUrl, tiktokUrl }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand inverted />
            <p style={{ marginTop: 24, fontSize: 14, maxWidth: 38 + "ch", lineHeight: 1.6 }}>
              En koselig nabolagsrestaurant i Oslo. Shawarma, pizza, mezze og barnemeny — laget for hele familien.
            </p>
          </div>
          <div>
            <h4>Besøk oss</h4>
            <ul>
              <li>Trondheimsveien 14</li>
              <li>0560 Oslo</li>
              <li><a href="https://maps.google.com/?q=Trondheimsveien+14,+Oslo" target="_blank" rel="noreferrer">Vis på kart →</a></li>
            </ul>
          </div>
          <div>
            <h4>Åpningstider</h4>
            <ul>
              <li>Man – tor: 14 – 00</li>
              <li>Fre – lør: 14 – 03</li>
              <li>Søndag: 14 – 00</li>
            </ul>
          </div>
          <div>
            <h4>Lenker</h4>
            <ul>
              <li><a href={orderUrl} target="_blank" rel="noreferrer">Bestill på Foodora →</a></li>
              <li><a href={tiktokUrl} target="_blank" rel="noreferrer">Følg på TikTok →</a></li>
              <li><a href="#meny">Se menyen</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yalla Habibi Restaurant</span>
          <span>Laget med ❤ i Oslo</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Reveal, Brand, Header, Hero, MenuSection, TikTokSection, OrderSection, HoursLocation, Footer,
});
