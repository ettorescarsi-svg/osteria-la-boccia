import { createFileRoute } from "@tanstack/react-router";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const THEFORK = "https://www.thefork.it/search?cityId=&q=Osteria%20La%20Boccia%20Padova";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Via+Soncin+39+35141+Padova";
const TEL = "tel:+390497353604";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Osteria La Boccia — Cucina tipica padovana in Via Soncin" },
      { name: "description", content: "Osteria tipica nel centro di Padova: piatti della tradizione veneta, aperitivi e vino. 20–30 € a persona. Prenota su TheFork." },
      { property: "og:title", content: "Osteria La Boccia — Padova" },
      { property: "og:description", content: "La tradizione padovana nel cuore di Padova. Prenota un tavolo in Via Soncin, 39." },
    ],
  }),
  component: Index,
});

type Dish = { name: string; desc: string; price: string; vegan?: boolean; pick?: boolean };
const MENU: { id: string; title: string; dishes: Dish[] }[] = [
  { id: "primi", title: "I Primi della Tradizione", dishes: [
    { name: "Bigoli all'anatra", desc: "Bigoli al torchio con ragù d'anatra dei Colli Euganei", price: "12 €", pick: true },
    { name: "Risotto al radicchio", desc: "Radicchio tardivo di Treviso e Monte Veronese", price: "13 €" },
    { name: "Pasta e fagioli", desc: "Fagioli di Lamon, rosmarino e olio del Garda", price: "10 €", vegan: true },
  ]},
  { id: "secondi", title: "I Secondi & Contorni", dishes: [
    { name: "Baccalà alla vicentina", desc: "Con polenta di mais Marano morbida", price: "16 €", pick: true },
    { name: "Fegato alla veneziana", desc: "Cipolla bianca stufata lentamente", price: "14 €" },
    { name: "Verdure di stagione", desc: "Dagli orti della bassa padovana, alla griglia", price: "6 €", vegan: true },
  ]},
  { id: "aperitivi", title: "Aperitivi & Happy Hour", dishes: [
    { name: "Spritz padovano", desc: "Aperol, prosecco e seltz, come vuole la tradizione", price: "4 €", pick: true },
    { name: "Cicchetti misti", desc: "Baccalà mantecato, sarde in saor, polpette", price: "9 €" },
    { name: "Tagliere della Boccia", desc: "Salumi e formaggi veneti, mostarda e pane", price: "14 €" },
  ]},
  { id: "dolci", title: "Opzioni Vegane & Dessert", dishes: [
    { name: "Polenta e funghi", desc: "Funghi chiodini trifolati e prezzemolo", price: "11 €", vegan: true },
    { name: "Tiramisù della casa", desc: "Mascarpone fresco e caffè, ricetta della nonna", price: "6 €", pick: true },
    { name: "Torta di mele vegana", desc: "Mele del Veneto e cannella", price: "5 €", vegan: true },
  ]},
];

function Index() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <header className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {[hero1, hero2, hero3].map((src) => (
            <div key={src} className="hero-slide" style={{ backgroundImage: `url(${src})` }} />
          ))}
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-cream">
          <p className="mb-4 font-hand text-3xl text-brass">Padova · dal cuore del Veneto</p>
          <h1 className="text-5xl font-bold leading-tight sm:text-7xl">Osteria La Boccia</h1>
          <p className="mt-4 font-menu text-xl italic sm:text-2xl">La tradizione padovana nel cuore di Padova</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="rounded-full border border-brass/50 bg-wood/40 px-4 py-2 backdrop-blur">4.5/5 ⭐ su 395+ Recensioni Google | 8.7/10 su TheFork</span>
            <span className="rounded-full border border-brass/50 bg-wood/40 px-4 py-2 backdrop-blur">20 – 30 € a persona</span>
          </div>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={THEFORK} target="_blank" rel="noopener" className="rounded-md bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-card transition hover:brightness-110">Prenota un Tavolo</a>
            <a href="#menu" className="rounded-md border border-cream/70 px-8 py-4 font-semibold transition hover:bg-cream/10">Scopri il Menu</a>
          </div>
        </div>
      </header>

      <main>
        {/* BENTO */}
        <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="servizi">
          <h2 id="servizi" className="mb-10 text-center text-4xl text-primary">L'osteria, in breve</h2>
          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <article className="rounded-xl bg-primary p-8 text-primary-foreground shadow-card md:col-span-2">
              <span className="text-3xl" aria-hidden>🍷</span>
              <h3 className="mt-4 text-2xl">Happy Hour & Aperitivo</h3>
              <p className="mt-2 opacity-85">Spritz, ombre di vino e cicchetti al banco, come nelle vere osterie venete.</p>
            </article>
            <article className="rounded-xl border bg-card p-8 shadow-card">
              <span className="text-3xl" aria-hidden>🚪</span>
              <h3 className="mt-4 text-2xl">Sala Privata</h3>
              <p className="mt-2 text-muted-foreground">Per cene di famiglia, compleanni e serate tra amici.</p>
            </article>
            <article className="rounded-xl border bg-card p-8 shadow-card">
              <span className="text-3xl" aria-hidden>🌿</span>
              <h3 className="mt-4 text-2xl">Vegani & Vegetariani</h3>
              <p className="mt-2 text-muted-foreground">Piatti della tradizione ripensati con l'orto.</p>
            </article>
            <article className="rounded-xl bg-wood p-8 text-wood-foreground shadow-card">
              <span className="text-3xl" aria-hidden>📍</span>
              <h3 className="mt-4 text-2xl">Dove</h3>
              <address className="mt-2 not-italic opacity-85">Via Soncin, 39<br />35141 Padova (PD)</address>
            </article>
            <a href={TEL} className="group rounded-xl border-2 border-brass bg-card p-8 shadow-card transition hover:bg-secondary">
              <span className="text-3xl" aria-hidden>📞</span>
              <h3 className="mt-4 text-2xl">Chiamaci</h3>
              <p className="mt-2 text-xl font-semibold text-primary group-hover:underline">049 735 3604</p>
            </a>
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="bg-wood px-4 py-20 sm:px-6" aria-labelledby="menu-title">
          <div className="mx-auto max-w-6xl">
            <h2 id="menu-title" className="text-center text-4xl text-wood-foreground">La Lavagna dell'Osteria</h2>
            <p className="mt-3 text-center font-hand text-2xl text-brass">Tocca una scheda per scoprire i piatti del giorno.</p>
            <div className="chalkboard mt-10 rounded-xl p-4 sm:p-8">
              <div className="menu-tabs">
                {MENU.map((cat, i) => (
                  <div key={cat.id} className="contents">
                    <input type="radio" name="menu" id={`m-${cat.id}`} className="menu-radio sr-only" defaultChecked={i === 0} />
                    <label htmlFor={`m-${cat.id}`} className="menu-tab flex cursor-pointer flex-col p-5">
                      <span className="text-brass font-hand text-2xl">n° {i + 1}</span>
                      <h3 className="menu-tab-title chalk-text mt-2 text-2xl">{cat.title}</h3>
                      <div className="menu-tab-body">
                        <div>
                          <ul className="mt-6 space-y-5">
                            {cat.dishes.map((d) => (
                              <li key={d.name} className="border-b border-dashed border-cream/20 pb-4">
                                <div className="flex items-baseline justify-between gap-4">
                                  <span className="chalk-text text-xl font-bold">{d.name}</span>
                                  <span className="chalk-hand shrink-0">{d.price}</span>
                                </div>
                                <p className="chalk-muted mt-1 font-menu text-base italic">{d.desc}</p>
                                <div className="mt-2 flex gap-2 font-hand text-lg">
                                  {d.vegan && <span className="rounded-full border border-cream/40 px-2 py-0.5">🌱 Vegano</span>}
                                  {d.pick && <span className="rounded-full bg-brass px-2 py-0.5 text-accent-foreground">★ Consigliato dall'Osteria</span>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ORARI */}
        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-2" aria-labelledby="orari">
          <div>
            <h2 id="orari" className="text-4xl text-primary">Orari di apertura</h2>
            <dl className="mt-8 divide-y rounded-xl border bg-card">
              <div className="p-6">
                <dt className="font-serif text-xl">Venerdì, Sabato, Domenica</dt>
                <dd className="mt-1 text-muted-foreground">12:00 – 14:30 &nbsp;|&nbsp; 19:00 – 23:00</dd>
              </div>
              <div className="p-6">
                <dt className="font-serif text-xl">Lunedì – Giovedì</dt>
                <dd className="mt-1 text-muted-foreground">19:00 – 23:00</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-primary p-10 text-primary-foreground shadow-card">
            <h3 className="text-3xl">Riserva il tuo tavolo</h3>
            <p className="mt-3 opacity-85">Prenota online in pochi secondi, oppure chiamaci per l'ultimo minuto.</p>
            <a href={THEFORK} target="_blank" rel="noopener" className="mt-8 rounded-md bg-brass px-6 py-4 text-center font-semibold text-accent-foreground transition hover:brightness-110">Prenota Subito con TheFork</a>
            <a href={TEL} className="mt-4 text-center underline-offset-4 hover:underline">Last-minute? Chiama lo 049 735 3604</a>
          </div>
        </section>

        {/* MAPPA */}
        <section className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="dove">
          <h2 id="dove" className="text-4xl text-primary">Dove siamo</h2>
          <div className="mt-8 overflow-hidden rounded-xl border-8 border-wood shadow-card">
            <iframe
              title="Mappa Osteria La Boccia"
              src="https://www.google.com/maps?q=Via+Soncin+39,+35141+Padova&output=embed"
              className="h-96 w-full sepia-[.35]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={MAPS} target="_blank" rel="noopener" className="mt-6 inline-block rounded-md bg-wood px-6 py-3 font-semibold text-wood-foreground transition hover:brightness-125">Apri in Mappe</a>
        </section>
      </main>

      <footer className="bg-wood text-wood-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl">Osteria La Boccia</p>
            <p className="mt-2 text-sm opacity-70">La tradizione padovana nel cuore di Padova.</p>
          </div>
          <nav aria-label="Link rapidi" className="text-sm">
            <p className="text-brass mb-3 font-semibold">Link rapidi</p>
            <ul className="space-y-2 opacity-85">
              <li><a href="#menu" className="hover:underline">Menu</a></li>
              <li><a href="#orari" className="hover:underline">Orari</a></li>
              <li><a href={THEFORK} className="hover:underline">Prenota</a></li>
            </ul>
          </nav>
          <div className="text-sm opacity-85">
            <p className="text-brass mb-3 font-semibold">Orari</p>
            <p>Ven–Dom: 12–14:30 · 19–23</p>
            <p>Lun–Gio: 19–23</p>
          </div>
          <div className="text-sm opacity-85">
            <p className="text-brass mb-3 font-semibold">Contatti</p>
            <address className="not-italic">Via Soncin, 39, 35141 Padova (PD)</address>
            <a href={TEL} className="hover:underline">049 735 3604</a>
          </div>
        </div>
        <div className="border-t border-wood-foreground/15 px-6 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Osteria La Boccia · Tutti i diritti riservati · P.IVA da definire
        </div>
      </footer>
    </div>
  );
}
