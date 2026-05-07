/* global React, ReactDOM */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "burgundy",
  "headlineStyle": "warm",
  "showMarquee": true
}/*EDITMODE-END*/;

const ORDER_URL = "https://www.foodora.no/restaurant/mp6m/yalla-habibi-restaurant?srsltid=AfmBOorG6y4X6SyN6G6Tgz5r5SYo0ODJYcHjyfcQnAXhymti8p9MGgcm";
const TIKTOK_URL = "https://www.tiktok.com/@yalla.habibi.restaurant";

const ACCENT_PALETTES = {
  burgundy: { burgundy: "#7B1F1F", deep: "#5C1515", terracotta: "#C8442A", gold: "#C99A3F", goldSoft: "#E5C88A" },
  terracotta: { burgundy: "#B5482C", deep: "#8C3520", terracotta: "#E26A3F", gold: "#D8A050", goldSoft: "#F0D399" },
  saffron:   { burgundy: "#9C5A1F", deep: "#724215", terracotta: "#C8762A", gold: "#D9A440", goldSoft: "#EFD495" },
  olive:     { burgundy: "#5E6B2A", deep: "#434D1C", terracotta: "#8C8E3D", gold: "#C99A3F", goldSoft: "#E5C88A" },
};

function App() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply accent palette
  React.useEffect(() => {
    const p = ACCENT_PALETTES[tweaks.accent] || ACCENT_PALETTES.burgundy;
    const r = document.documentElement;
    r.style.setProperty("--burgundy", p.burgundy);
    r.style.setProperty("--burgundy-deep", p.deep);
    r.style.setProperty("--terracotta", p.terracotta);
    r.style.setProperty("--gold", p.gold);
    r.style.setProperty("--gold-soft", p.goldSoft);
  }, [tweaks.accent]);

  return (
    <>
      <Header orderUrl={ORDER_URL} />
      <main>
        <Hero orderUrl={ORDER_URL} />
        <MenuSection />
        <TikTokSection tiktokUrl={TIKTOK_URL} />
        <OrderSection orderUrl={ORDER_URL} />
        <HoursLocation />
      </main>
      <Footer orderUrl={ORDER_URL} tiktokUrl={TIKTOK_URL} />

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Brand">
            <window.TweakRadio
              label="Accent palette"
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
              options={["burgundy", "terracotta", "saffron", "olive"]}
            />
          </window.TweakSection>
          <window.TweakSection title="Hero">
            <window.TweakToggle
              label="Show food marquee"
              value={!!tweaks.showMarquee}
              onChange={(v) => {
                setTweak("showMarquee", v);
                const m = document.querySelector(".marquee");
                if (m) m.style.display = v ? "" : "none";
              }}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
