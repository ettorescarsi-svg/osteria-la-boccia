import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import type { CSSProperties } from "react";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { MenuTabs } from "@/components/site/menu-tabs";
import { QrCode } from "@/components/site/qr-code";

const THEFORK = "https://www.thefork.it/ristorante/enoteca-la-boccia-r818294";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Via+Soncin+39+35141+Padova";
const MAP_EMBED = "https://www.google.com/maps?q=Via+Soncin+39,+35141+Padova&output=embed";
const TEL = "tel:+390497353604";
const TEL_LABEL = "049 735 3604";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Osteria La Boccia — Cucina tipica padovana in Via Soncin" },
      {
        name: "description",
        content:
          "Osteria tipica nel centro di Padova: piatti della tradizione veneta, aperitivi e vino.  Prenota su TheFork.",
      },
      { property: "og:title", content: "Osteria La Boccia — Padova" },
      {
        property: "og:description",
        content: "La tradizione padovana nel cuore di Padova. Prenota un tavolo in Via Soncin, 39.",
      },
    ],
  }),
  component: Index,
});

/** Ordine di comparsa: ritardo scaglionato letto dalle animazioni CSS (.rise / .reveal). */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

function ExternalHint() {
  return <span className="sr-only"> (si apre in una nuova scheda)</span>;
}

function Index() {
  return (
    <div>
      <a
        href="#contenuto"
        className="sr-only z-50 rounded-full bg-cream px-5 py-3 font-semibold text-ink focus:not-sr-only focus:absolute focus:left-3 focus:top-3"
      >
        Vai al contenuto
      </a>

      {/* HERO */}
      <div id="top" className="relative grid min-h-[100svh] lg:grid-cols-[5fr_6fr]">
        <header className="hero-header surface-dark">
          <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
            <a href="#top" className="font-serif text-xl font-semibold no-underline">
              La Boccia
            </a>
            <nav
              aria-label="Principale"
              className="hidden items-center gap-7 md:flex lg:hidden xl:flex"
            >
              <a href="#menu" className="no-underline hover:underline">
                Menu
              </a>
              <a href="#osteria" className="no-underline hover:underline">
                L'osteria
              </a>
              <a href="#dove" className="no-underline hover:underline">
                Dove
              </a>
            </nav>
            <a
              href={THEFORK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Prenota
              <ExternalHint />
            </a>
          </div>
        </header>

        {/* Le stesse foto, descritte per esteso, tornano nella sezione "L'osteria": qui sono decorative */}
        <div
          className="relative order-1 h-[58svh] overflow-hidden bg-wine lg:order-2 lg:h-auto"
          aria-hidden="true"
        >
          <div className="hero-slide">
            <img src={hero3} alt="" width={960} height={960} fetchPriority="high" />
          </div>
          <div className="hero-slide">
            <img src={hero1} alt="" width={1000} height={1333} />
          </div>
          <div className="hero-slide">
            <img src={hero2} alt="" width={1000} height={1142} />
          </div>
          <div className="hero-scrim" />
        </div>

        <div className="surface-dark order-2 flex flex-col justify-end bg-wine px-5 pb-12 pt-14 sm:px-8 lg:order-1 lg:px-12 lg:pb-16 lg:pt-36">
          <h1
            className="rise text-[length:clamp(3.25rem,6.8vw,5.75rem)] leading-[0.95] tracking-[-0.025em]"
            style={step(0)}
          >
            Osteria La Boccia
          </h1>
          <p
            className="rise mt-6 max-w-[36ch] text-xl text-cream/90 sm:text-[1.35rem]"
            style={step(1)}
          >
            Bigoli all'anatra, baccalà con la polenta e un'ombra di vino: la cucina padovana di una
            volta, in una vera osteria del centro.
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={step(2)}>
            <a href={THEFORK} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Prenota un Tavolo
              <ExternalHint />
            </a>
            <a href="#menu" className="btn btn-on-wine">
              Consulta il Menu
            </a>
          </div>
          <p className="rise mt-9 max-w-[44ch] text-base text-cream/75" style={step(3)}>
            Via Soncin, 39, Padova. Aperti ogni sera dalle 19:00, il fine settimana anche a pranzo.
          </p>
        </div>
      </div>

      <main id="contenuto" tabIndex={-1} className="outline-none">
        {/* MENU */}
        <section id="menu" aria-labelledby="menu-title" className="py-24 lg:py-36">
          <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-12">
                <h2
                  id="menu-title"
                  className="reveal text-[length:clamp(2.75rem,5vw,4rem)]"
                  style={step(0)}
                >
                  Il menu
                </h2>
                <p className="reveal mt-5 max-w-[36ch] text-lg" style={step(1)}>
                  Piatti della tradizione padovana e veneta, con ingredienti del territorio. Il
                  fondo bordeaux segna i piatti della casa; Veg indica un piatto vegano o
                  vegetariano.
                </p>
                <p className="reveal mt-4 max-w-[36ch] text-ink-soft" style={step(2)}>
                  Hai allergie o intolleranze? Dillo a chi ti serve al tavolo.
                </p>
              </div>
            </div>
            <div className="reveal min-w-0 lg:col-span-8" style={step(1)}>
              <MenuTabs />
            </div>
          </div>
        </section>

        {/* L'OSTERIA */}
        <section id="osteria" aria-labelledby="osteria-title" className="bg-sand py-24 lg:py-36">
          <div className="frame grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                id="osteria-title"
                className="reveal text-[length:clamp(2.5rem,4.6vw,3.75rem)]"
                style={step(0)}
              >
                Un'osteria vera, nel cuore di Padova
              </h2>
              <p className="reveal mt-6 max-w-[44ch] text-lg" style={step(1)}>
                La cucina è quella veneta di una volta: bigoli al torchio, baccalà con la polenta,
                un tiramisù come quello della nonna.
              </p>
              <dl className="mt-10 space-y-7">
                <div className="reveal" style={step(2)}>
                  <dt className="font-serif text-2xl font-semibold">Aperitivo e happy hour</dt>
                  <dd className="mt-1.5 max-w-[44ch] text-ink-soft">
                    Spritz, ombre di vino e cicchetti al banco, come nelle vere osterie venete.
                  </dd>
                </div>
                <div className="reveal" style={step(3)}>
                  <dt className="font-serif text-2xl font-semibold">Sala privata</dt>
                  <dd className="mt-1.5 max-w-[44ch] text-ink-soft">
                    Per cene di famiglia, compleanni e serate tra amici.
                  </dd>
                </div>
                <div className="reveal" style={step(4)}>
                  <dt className="font-serif text-2xl font-semibold">Vegani e vegetariani</dt>
                  <dd className="mt-1.5 max-w-[44ch] text-ink-soft">
                    Piatti della tradizione ripensati con l'orto.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:col-span-7">
              <figure className="tile reveal col-span-6 aspect-[5/4] sm:col-span-4 sm:aspect-square">
                <img
                  src={hero3}
                  alt="Tavolini nel cortile dell'osteria, con fiori nelle bottiglie, mattoni a vista e ciottoli"
                  width={960}
                  height={960}
                  loading="lazy"
                />
              </figure>
              <figure
                className="tile reveal col-span-3 aspect-[3/4] sm:col-span-2 sm:mt-16 sm:aspect-[2/3]"
                style={step(1)}
              >
                <img
                  src={hero1}
                  alt="Bigoli con ragù in un piatto bianco"
                  width={1000}
                  height={1333}
                  loading="lazy"
                  style={{ objectPosition: "50% 62%" }}
                />
              </figure>
              <figure
                className="tile reveal col-span-3 aspect-[4/5] sm:col-span-6 sm:aspect-[16/9]"
                style={step(1)}
              >
                <img
                  src={hero2}
                  alt="Salumi e formaggi veneti serviti su un tagliere di legno"
                  width={1000}
                  height={1142}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* ORARI E PRENOTAZIONI */}
        <section
          id="orari"
          aria-labelledby="orari-title"
          className="surface-dark bg-wine py-24 lg:py-36"
        >
          <div className="frame">
            <h2
              id="orari-title"
              className="reveal text-[length:clamp(2.5rem,5vw,4rem)]"
              style={step(0)}
            >
              Orari e prenotazioni
            </h2>
            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <dl className="space-y-10">
                <div className="reveal" style={step(1)}>
                  <dt className="text-lg text-cream/80">Lunedì – Giovedì</dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold sm:text-4xl">
                    19:00 – 23:00
                  </dd>
                </div>
                <div className="reveal" style={step(2)}>
                  <dt className="text-lg text-cream/80">Venerdì, sabato e domenica</dt>
                  <dd className="mt-1 font-serif text-3xl font-semibold sm:text-4xl">
                    12:00 – 14:30
                    <br />
                    19:00 – 23:00
                  </dd>
                </div>
              </dl>

              <div
                className="reveal rounded-lg bg-cream p-8 text-ink sm:p-10"
                style={{ ...step(2), "--focus": "var(--clay-deep)" } as CSSProperties}
              >
                <h3 className="text-3xl">Riserva il tuo tavolo</h3>
                <p className="mt-3 max-w-[40ch] text-lg">
                  Prenota online in pochi secondi, oppure chiamaci per l'ultimo minuto.
                </p>
                <a
                  href={THEFORK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-8 w-full sm:w-auto"
                >
                  Prenota su TheFork
                  <ExternalHint />
                </a>
                <a
                  href={TEL}
                  className="mt-7 flex items-center gap-3 font-serif text-3xl font-semibold no-underline"
                  aria-label={`Chiama l'osteria al ${TEL_LABEL}`}
                >
                  <Phone size={26} strokeWidth={2} aria-hidden="true" />
                  {TEL_LABEL}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DOVE SIAMO */}
        <section id="dove" aria-labelledby="dove-title" className="py-24 lg:py-36">
          <div className="frame grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="tile reveal h-[22rem] lg:col-span-7 lg:h-[30rem]">
              <iframe
                title="Mappa con la posizione dell'Osteria La Boccia in Via Soncin 39, Padova"
                src={MAP_EMBED}
                className="map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <h2
                id="dove-title"
                className="reveal text-[length:clamp(2.5rem,5vw,4rem)]"
                style={step(1)}
              >
                Dove siamo
              </h2>
              <address className="reveal mt-6 text-xl not-italic" style={step(2)}>
                Via Soncin, 39
                <br />
                35141 Padova (PD)
              </address>
              <p className="reveal mt-3 max-w-[36ch] text-ink-soft" style={step(2)}>
                Nel centro di Padova. Apri le indicazioni dal telefono e arrivi a piedi o in auto.
              </p>
              <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row" style={step(3)}>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Indicazioni stradali
                  <ExternalHint />
                </a>
                <a href={TEL} className="btn btn-on-light">
                  <Phone size={18} strokeWidth={2} aria-hidden="true" />
                  Chiama
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="surface-dark bg-wood pb-32 pt-20 md:pb-14">
        <div className="frame">
          <p className="font-serif text-[length:clamp(2.5rem,8vw,6rem)] font-semibold leading-none tracking-[-0.02em]">
            Osteria La Boccia
          </p>
          <p className="mt-5 max-w-[40ch] text-lg text-cream/80">
            La tradizione padovana nel cuore di Padova.
          </p>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <nav aria-label="Link rapidi">
              <h2 className="font-serif text-xl font-semibold">Link rapidi</h2>
              <ul className="mt-4 space-y-2 text-cream/85">
                <li>
                  <a href="#menu" className="hover:underline">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#osteria" className="hover:underline">
                    L'osteria
                  </a>
                </li>
                <li>
                  <a href="#orari" className="hover:underline">
                    Orari
                  </a>
                </li>
                <li>
                  <a href="#dove" className="hover:underline">
                    Dove siamo
                  </a>
                </li>
                <li>
                  <a
                    href={THEFORK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Prenota
                    <ExternalHint />
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="font-serif text-xl font-semibold">Orari</h2>
              <dl className="mt-4 space-y-3 text-cream/85">
                <div>
                  <dt>Lunedì – Giovedì</dt>
                  <dd>19:00 – 23:00</dd>
                </div>
                <div>
                  <dt>Venerdì – Domenica</dt>
                  <dd>12:00 – 14:30 · 19:00 – 23:00</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold">Contatti</h2>
              <address className="mt-4 text-cream/85 not-italic">
                Via Soncin, 39
                <br />
                35141 Padova (PD)
              </address>
              <a
                href={TEL}
                className="mt-3 inline-block font-serif text-2xl font-semibold no-underline hover:underline"
                aria-label={`Chiama l'osteria al ${TEL_LABEL}`}
              >
                {TEL_LABEL}
              </a>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold">Il menu sul telefono</h2>
              <QrCode className="mt-4 aspect-square w-36 rounded-lg bg-cream" />
              <p className="mt-3 max-w-[28ch] text-cream/85">
                Inquadra il codice con la fotocamera per aprire il menu.
              </p>
              <a href="#menu" className="mt-2 inline-block font-semibold underline">
                Apri il menu qui
              </a>
            </div>
          </div>

          <p className="mt-16 text-sm text-cream/70">
            © {new Date().getFullYear()} Osteria La Boccia · Tutti i diritti riservati · P.IVA da
            definire
          </p>
        </div>
      </footer>

      {/* Barra rapida per chi arriva da telefono */}
      <div className="surface-dark fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-ink p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <a href={TEL} className="btn btn-on-wine flex-1">
          <Phone size={18} strokeWidth={2} aria-hidden="true" />
          Chiama
        </a>
        <a
          href={THEFORK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary flex-1"
        >
          Prenota
          <ExternalHint />
        </a>
      </div>
    </div>
  );
}
