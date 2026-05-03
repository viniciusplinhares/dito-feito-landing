import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import crest from "@/assets/crest-main.png";
import jerseyPurple from "@/assets/jersey-purple.png";
import jerseyBlue from "@/assets/jersey-blue.png";
import trophy from "@/assets/trophy.png";
import rivalCrest from "@/assets/crest-rival.png";
import celebration from "@/assets/celebration.jpg";
import heroBg from "@/assets/hero-bg.png";
import { useReveal } from "@/hooks/use-reveal";

export default function Landing() {
  useReveal();

  // Scroll-driven crest transform (Hero -> Vitrine)
  const heroRef = useRef<HTMLDivElement>(null);
  const vitrineRef = useRef<HTMLDivElement>(null);
  const jerseysRowRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLDivElement>(null);
  const rivalRef = useRef<HTMLDivElement>(null);

  const [crestStyle, setCrestStyle] = useState<React.CSSProperties>({});
  const [trophyOpacity, setTrophyOpacity] = useState(0);
  const [rivalRotate, setRivalRotate] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const jerseysRow = jerseysRowRef.current;
      if (hero && jerseysRow) {
        const jerseysRect = jerseysRow.getBoundingClientRect();
        const vh = window.innerHeight;

        const startTop = vh * 0.42;
        // Anchor: vertical center of the jerseys row (between the two shirts)
        const anchorCenter = jerseysRect.top + jerseysRect.height / 2;
        const targetY = anchorCenter - startTop;

        // Progress: reach max (p=1) exactly when jerseys row is centered in viewport
        const jerseysDocTop = anchorCenter + window.scrollY - jerseysRect.height / 2;
        const totalDistance = jerseysDocTop + jerseysRect.height / 2 - vh / 2;
        const p = Math.min(Math.max(window.scrollY / Math.max(totalDistance, 1), 0), 1);

        // CLAMP: once p reaches 1, freeze translateY at the locked position
        // (computed at the moment alignment is achieved, not live-tracking the scroll)
        const lockedTargetY = (jerseysDocTop + jerseysRect.height / 2) - (window.scrollY >= totalDistance ? window.scrollY : 0) - startTop + (window.scrollY >= totalDistance ? window.scrollY : 0);
        // Simpler: when p<1 interpolate; when p===1 use the absolute locked Y in document space → translateY = lockedDocY - scrollY - startTop
        const lockedDocY = jerseysDocTop + jerseysRect.height / 2; // doc-space Y of anchor
        const translateY = p < 1 ? targetY * p : (lockedDocY - window.scrollY - startTop);

        const startScale = 0.7;
        const endScale = 1;
        const scale = startScale + (endScale - startScale) * p;

        setCrestStyle({
          transform: `translate3d(-50%, ${translateY}px, 0) scale(${scale})`,
          opacity: 1,
        });
      }

      const t = trophyRef.current;
      if (t) {
        const r = t.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
        setTrophyOpacity(Math.min(visible * 1.2, 0.9));
      }

      const rv = rivalRef.current;
      if (rv) {
        const r = rv.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.7), 0), 1);
        setRivalRotate(p * 180);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Floating crest tied to scroll (between Hero and Vitrine) */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-[42vh] z-40 h-[min(40vw,260px)] w-[min(40vw,260px)] -translate-x-1/2 will-change-transform animate-pulse-gold"
        style={crestStyle}
      >
        <img src={crest} alt="" className="h-full w-full object-contain select-none" draggable={false} />
      </div>

      {/* ============== HERO ============== */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden text-primary-foreground"
      >
        {/* Background photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Dark overlay for legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.1 0.06 265 / 0.78) 0%, oklch(0.05 0.03 265 / 0.92) 70%, oklch(0.03 0.02 265 / 0.96) 100%)",
          }}
        />
        {/* Subtle dot texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-1/3 right-0 h-[120vh] w-[120vh] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-gold)" }}
        />

        <header className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-8">
          <div className="font-display text-xl tracking-[0.3em] text-gold">DF</div>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-widest text-primary-foreground/80">
            <a href="#vitrine" className="hover:text-gold transition-colors">Uniforme</a>
            <a href="#historia" className="hover:text-gold transition-colors">Glórias</a>
            <a href="#desafie" className="hover:text-gold transition-colors">Desafie-nos</a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <span className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-gold/90">
            Futebol Amador · Tradição
          </span>

          <h1 className="font-display text-[18vw] md:text-[11rem] leading-[0.85] tracking-tight">
            <span className="block">Dito</span>
            <span className="block text-gradient-gold italic">e Feito</span>
          </h1>

          <p className="mt-8 text-lg md:text-2xl font-light tracking-[0.4em] uppercase text-primary-foreground/85">
            Futebol e Resenha
          </p>

          {/* Asymmetric "Desde 2010" */}
          <div className="pointer-events-none absolute right-6 md:right-16 top-1/2 -translate-y-1/2 rotate-90 origin-right text-gold/80 text-xs md:text-sm uppercase tracking-[0.6em] font-medium">
            — Desde 2010
          </div>

          {/* Reserve space for the floating crest */}
          <div className="mt-10 h-[42vh] w-full" aria-hidden />
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-primary-foreground/70 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ============== VITRINE UNIFORME ============== */}
      <section
        id="vitrine"
        ref={vitrineRef}
        className="relative min-h-screen overflow-hidden bg-white py-32 px-6 md:px-12 text-primary-deep"
      >
        <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
          {/* Bloco 1: Títulos */}
          <div className="w-full">
            <span className="reveal text-xs font-semibold uppercase tracking-[0.5em] text-gold">
              Edição 2026
            </span>
            <h2 className="reveal mt-4 font-display text-5xl md:text-7xl text-primary-deep">
              Uniforme Dito e Feito
            </h2>
            <p className="reveal mt-3 text-sm uppercase tracking-[0.35em] text-primary-deep/60">
              Alta costura esportiva
            </p>
          </div>

          {/* Bloco 2: Camisas + Escudo */}
          <div className="mt-20 flex w-full items-center justify-center gap-12 md:gap-24">
            <div className="reveal group relative flex flex-col items-center">
              <div className="relative h-64 md:h-80 w-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 mx-auto h-full w-full rounded-full blur-3xl"
                  style={{ background: "oklch(0.7 0.22 305 / 0.25)" }}
                />
                <img
                  src={jerseyPurple}
                  alt="Camisa de goleiro roxa Edição 2026"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-auto object-contain animate-float drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 font-display text-2xl text-primary-deep tracking-wide">Goleiro · Roxo</p>
              <p className="text-sm text-primary-deep/60 uppercase tracking-[0.3em]">Manto #1</p>
            </div>

            {/* Spacer reservado para o escudo fixo */}
            <div className="h-64 md:h-80 w-32 md:w-48 shrink-0" aria-hidden />

            <div className="reveal group relative flex flex-col items-center">
              <div className="relative h-64 md:h-80 w-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 mx-auto h-full w-full rounded-full blur-3xl"
                  style={{ background: "oklch(0.55 0.2 264 / 0.25)" }}
                />
                <img
                  src={jerseyBlue}
                  alt="Camisa de linha azul Edição 2026"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-auto object-contain animate-float-rev drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 font-display text-2xl text-primary-deep tracking-wide">Linha · Azul</p>
              <p className="text-sm text-primary-deep/60 uppercase tracking-[0.3em]">Manto #10</p>
            </div>
          </div>

          {/* Bloco 3: Texto explicativo, isolado abaixo */}
          <p className="reveal mx-auto mt-20 max-w-2xl text-base md:text-lg text-primary-deep/75 leading-relaxed">
            Dois novos mantos com pegada <span className="text-gold font-semibold">retrô e vintage</span>,
            inspirados na estética dos <span className="text-gold font-semibold">anos 80 e 90</span>: tecido
            jacquard com grafismos sutis, gola V em ribana dourada e o escudo bordado em fio metálico. O roxo
            do goleiro homenageia os arqueiros lendários da década; o azul de linha resgata a alma do clube.
          </p>
        </div>
      </section>

      {/* ============== HISTÓRIA, GLÓRIAS E REDENÇÃO ============== */}
      <section
        id="historia"
        ref={trophyRef}
        className="relative bg-gradient-night text-primary-foreground overflow-hidden py-32 px-6 md:px-12"
      >
        {/* Trophy fade-in on scroll */}
        <img
          src={trophy}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[700px] transition-opacity duration-500"
          style={{ opacity: trophyOpacity, filter: "drop-shadow(0 30px 80px oklch(0.78 0.14 85 / 0.6))" }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="reveal text-xs font-semibold uppercase tracking-[0.5em] text-gold">
              Capítulo I — Glórias
            </span>
            <h2 className="reveal mt-4 font-display text-5xl md:text-7xl">
              História, <span className="text-gradient-gold italic">Glórias</span> e Redenção
            </h2>
          </div>

          {/* Bloco A — Olimpíadas */}
          <article className="reveal mt-28 grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-3">
              <div className="text-gold font-display text-7xl leading-none">01</div>
              <p className="mt-2 uppercase tracking-[0.3em] text-xs text-primary-foreground/70">Olimpíadas</p>
            </div>
            <div className="md:col-span-9 space-y-4">
              <h3 className="font-display text-3xl md:text-5xl">Hegemonia no Catarinense</h3>
              <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed">
                Tricampeões da Olimpíada do <em>Colégio Catarinense</em> em
                <span className="text-gold font-semibold"> 2018</span>,
                <span className="text-gold font-semibold"> 2022</span> e
                <span className="text-gold font-semibold"> 2023</span>. Em 2022, vivemos a noite épica:
                a final do futsal masculino — sob holofotes e gritaria — definiu o campeão geral das
                Olimpíadas. O escudo subiu, e o Dito e Feito entrou para a história.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["2018", "2022", "2023"].map((y) => (
                  <span
                    key={y}
                    className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold"
                  >
                    Campeões {y}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Bloco B — Redenção */}
          <article className="reveal mt-28 grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-9 md:order-1 order-2 space-y-4">
              <h3 className="font-display text-3xl md:text-5xl">A Redenção de 2026</h3>
              <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed">
                Após uma das piores atuações da história do clube no Campeonato Catarinense recente,
                a temporada de 2026 reescreve o roteiro. Uma campanha memorável:
                <span className="text-gold font-semibold"> 6 vitórias em 8 jogos</span>. Atitude,
                entrega e a certeza de que tropeçar faz parte — levantar é obrigação.
              </p>
              <div className="mt-4 flex items-center gap-6">
                <Stat value="6" label="Vitórias" />
                <Stat value="8" label="Jogos" />
                <Stat value="75%" label="Aproveit." />
              </div>
            </div>
            <div className="md:col-span-3 md:order-2 order-1">
              <div className="text-gold font-display text-7xl leading-none md:text-right">02</div>
              <p className="mt-2 uppercase tracking-[0.3em] text-xs text-primary-foreground/70 md:text-right">
                Redenção
              </p>
            </div>
          </article>

          {/* Bloco C — O Freguês */}
          <article ref={rivalRef} className="reveal mt-28 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="text-gold font-display text-7xl leading-none">03</div>
              <p className="mt-2 uppercase tracking-[0.3em] text-xs text-primary-foreground/70">O Freguês</p>
            </div>
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-display text-3xl md:text-5xl">Campeões da Temporada</h3>
              <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed">
                Primeiro título de 2026 conquistado em uma final eletrizante contra o nosso maior rival,
                o <span className="text-gold font-semibold">"Acordo"</span>. Resultado obtido, taça
                erguida — e mais um capítulo escrito na novela de uma freguesia que já é tradição.
              </p>
            </div>

            {/* O Deboche — escudo do rival rotacionando até de cabeça para baixo */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className="relative">
                <img
                  src={rivalCrest}
                  alt="Escudo do rival Acordo"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-40 md:w-48 transition-transform duration-300 ease-out"
                  style={{ transform: `rotate(${rivalRotate}deg)` }}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">De ponta-cabeça</p>
            </div>
          </article>

          {/* Foto da resenha */}
          <figure className="reveal mt-32">
            <div className="overflow-hidden rounded-2xl shadow-elevated ring-1 ring-gold/20">
              <img
                src={celebration}
                alt="Comemoração e resenha do time Dito e Feito após a vitória"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-[1500ms] hover:scale-105"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm uppercase tracking-[0.35em] text-primary-foreground/70">
              Pós-jogo · A resenha eterna
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============== DESAFIE NOSSO TIME ============== */}
      <ChallengeSection />

      <footer className="border-t border-border bg-background py-10 text-center text-sm text-muted-foreground">
        <p className="font-display tracking-[0.4em] text-primary-deep">DITO E FEITO · 2010 — 2026</p>
        <p className="mt-2">Futebol e resenha. O resto é detalhe.</p>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-gold leading-none">{value}</div>
      <div className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70 mt-1">{label}</div>
    </div>
  );
}

function ChallengeSection() {
  const [sent, setSent] = useState(false);
  return (
    <section id="desafie" className="relative bg-background py-32 px-6 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-gold">Contato</span>
          <h2 className="mt-4 font-display text-5xl md:text-7xl text-primary-deep">
            Desafie o nosso time
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Marque um amistoso contra o Dito e Feito. Preencha os dados e nossa diretoria entra em contato.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Field label="Nome do time adversário" name="team" required className="md:col-span-2" />
          <Field label="Data sugerida" name="date" type="date" required />
          <Field label="Local" name="venue" required />

          <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-2">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {sent ? "✓ Desafio recebido. Boa sorte." : "Resposta em até 48h"}
            </p>
            <button
              type="submit"
              className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
            >
              Enviar desafio
              <span className="h-px w-8 bg-gold transition-all group-hover:w-12" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}
