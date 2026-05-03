import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-B2MMvqUt.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode);
const crest = "/assets/crest-main-A_Veb9ZH.png";
const jerseyPurple = "/assets/jersey-purple-DQeREgBa.png";
const jerseyBlue = "/assets/jersey-blue-lF3MPsL9.png";
const trophy = "/assets/trophy-C7GlT6wK.png";
const rivalCrest = "/assets/crest-rival-BfYccAfd.png";
const celebration = "/assets/celebration-C8Kz32Y2.jpg";
const heroBg = "/assets/hero-bg-BhtLbLYT.png";
function useReveal() {
  reactExports.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function Landing() {
  useReveal();
  const heroRef = reactExports.useRef(null);
  const vitrineRef = reactExports.useRef(null);
  const jerseysRowRef = reactExports.useRef(null);
  const trophyRef = reactExports.useRef(null);
  const rivalRef = reactExports.useRef(null);
  const [crestStyle, setCrestStyle] = reactExports.useState({});
  const [trophyOpacity, setTrophyOpacity] = reactExports.useState(0);
  const [rivalRotate, setRivalRotate] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const jerseysRow = jerseysRowRef.current;
      if (hero && jerseysRow) {
        const jerseysRect = jerseysRow.getBoundingClientRect();
        const vh = window.innerHeight;
        const startTop = vh * 0.42;
        const endDocY = jerseysRect.top + window.scrollY + jerseysRect.height / 2 - 160;
        const maxScroll = endDocY - vh / 2;
        const p = Math.min(Math.max(window.scrollY / Math.max(maxScroll, 1), 0), 1);
        const currentDocY = startTop + (endDocY - startTop) * p;
        const translateY = currentDocY - window.scrollY - startTop;
        const startScale = 0.7;
        const endScale = 1;
        const scale = startScale + (endScale - startScale) * p;
        setCrestStyle({
          transform: `translate3d(calc(-50% + 135px), ${translateY}px, 0) scale(${scale})`,
          opacity: 1
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none fixed left-1/2 top-[42vh] z-40 h-[min(40vw,260px)] w-[min(40vw,260px)] -translate-x-1/2 will-change-transform animate-pulse-gold",
        style: crestStyle,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: crest, alt: "", className: "h-full w-full object-contain select-none", draggable: false })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative min-h-screen w-full overflow-hidden text-primary-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute inset-0 bg-cover bg-center",
              style: { backgroundImage: `url(${heroBg})` }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute inset-0",
              style: {
                background: "radial-gradient(ellipse at center, oklch(0.1 0.06 265 / 0.78) 0%, oklch(0.05 0.03 265 / 0.92) 70%, oklch(0.03 0.02 265 / 0.96) 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute inset-0 opacity-[0.05]",
              style: {
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "28px 28px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute -top-1/3 right-0 h-[120vh] w-[120vh] rounded-full opacity-20 blur-3xl",
              style: { background: "var(--gradient-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-20 flex items-center justify-between px-6 md:px-12 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl tracking-[0.3em] text-gold", children: "DF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-widest text-primary-foreground/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#vitrine", className: "hover:text-gold transition-colors", children: "Uniforme" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#historia", className: "hover:text-gold transition-colors", children: "Glórias" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#desafie", className: "hover:text-gold transition-colors", children: "Desafie-nos" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl flex-col items-center justify-center px-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-gold/90", children: "Futebol Amador · Tradição" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[18vw] md:text-[11rem] leading-[0.85] tracking-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: "Dito" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-gradient-gold italic", children: "e Feito" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-lg md:text-2xl font-light tracking-[0.4em] uppercase text-primary-foreground/85", children: "Futebol e Resenha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-6 md:right-16 top-1/2 -translate-y-1/2 rotate-90 origin-right text-gold/80 text-xs md:text-sm uppercase tracking-[0.6em] font-medium", children: "— Desde 2010" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 h-[42vh] w-full", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-primary-foreground/70 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-6 w-6" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "vitrine",
        ref: vitrineRef,
        className: "relative min-h-screen overflow-hidden bg-white py-32 px-6 md:px-12 text-primary-deep",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex max-w-6xl flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "reveal text-xs font-semibold uppercase tracking-[0.5em] text-gold", children: "Edição 2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "reveal mt-4 font-display text-5xl md:text-7xl text-primary-deep", children: "Uniforme Dito e Feito" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal mt-3 text-sm uppercase tracking-[0.35em] text-primary-deep/60", children: "Alta costura esportiva" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: jerseysRowRef, className: "mt-20 flex w-full items-center justify-center gap-12 md:gap-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal group relative flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-64 md:h-80 w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "absolute inset-0 -z-10 mx-auto h-full w-full rounded-full blur-3xl",
                    style: { background: "oklch(0.7 0.22 305 / 0.25)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: jerseyPurple,
                    alt: "Camisa de goleiro roxa Edição 2026",
                    width: 1024,
                    height: 1024,
                    loading: "lazy",
                    className: "h-full w-auto object-contain animate-float drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-2xl text-primary-deep tracking-wide", children: "Goleiro · Roxo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-deep/60 uppercase tracking-[0.3em]", children: "Manto #1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 md:h-80 w-32 md:w-48 shrink-0", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal group relative flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-64 md:h-80 w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "absolute inset-0 -z-10 mx-auto h-full w-full rounded-full blur-3xl",
                    style: { background: "oklch(0.55 0.2 264 / 0.25)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: jerseyBlue,
                    alt: "Camisa de linha azul Edição 2026",
                    width: 1024,
                    height: 1024,
                    loading: "lazy",
                    className: "h-full w-auto object-contain animate-float-rev drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-2xl text-primary-deep tracking-wide", children: "Linha · Azul" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-deep/60 uppercase tracking-[0.3em]", children: "Manto #10" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "reveal mx-auto mt-20 max-w-2xl text-base md:text-lg text-primary-deep/75 leading-relaxed", children: [
            "Dois novos mantos com pegada ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: "retrô e vintage" }),
            ", inspirados na estética dos ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: "anos 80 e 90" }),
            ": tecido jacquard com grafismos sutis, gola V em ribana dourada e o escudo bordado em fio metálico. O roxo do goleiro homenageia os arqueiros lendários da década; o azul de linha resgata a alma do clube."
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "historia",
        ref: trophyRef,
        className: "relative bg-gradient-night text-primary-foreground overflow-hidden py-32 px-6 md:px-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: trophy,
              alt: "",
              "aria-hidden": true,
              className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] max-w-[1200px] scale-125 transition-opacity duration-500",
              style: { opacity: trophyOpacity, filter: "drop-shadow(0 30px 80px oklch(0.78 0.14 85 / 0.6))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "reveal text-xs font-semibold uppercase tracking-[0.5em] text-gold", children: "Capítulo I — Glórias" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "reveal mt-4 font-display text-5xl md:text-7xl", children: [
                "História, ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold italic", children: "Glórias" }),
                " e Redenção"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "reveal mt-28 grid md:grid-cols-12 gap-8 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold font-display text-7xl leading-none", children: "01" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 uppercase tracking-[0.3em] text-xs text-primary-foreground/70", children: "Olimpíadas" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-9 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-5xl", children: "Hegemonia no Catarinense" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base md:text-lg text-primary-foreground/85 leading-relaxed", children: [
                  "Tricampeões da Olimpíada do ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Colégio Catarinense" }),
                  " em",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: " 2018" }),
                  ",",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: " 2022" }),
                  " e",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: " 2023" }),
                  ". Em 2022, vivemos a noite épica: a final do futsal masculino — sob holofotes e gritaria — definiu o campeão geral das Olimpíadas. O escudo subiu, e o Dito e Feito entrou para a história."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 pt-2", children: ["2018", "2022", "2023"].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold",
                    children: [
                      "Campeões ",
                      y
                    ]
                  },
                  y
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "reveal mt-28 grid md:grid-cols-12 gap-8 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-9 md:order-1 order-2 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-5xl", children: "A Redenção de 2026" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base md:text-lg text-primary-foreground/85 leading-relaxed", children: [
                  "Após uma das piores atuações da história do clube no Campeonato Catarinense recente, a temporada de 2026 reescreve o roteiro. Uma campanha memorável:",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: " 6 vitórias em 8 jogos" }),
                  ". Atitude, entrega e a certeza de que tropeçar faz parte — levantar é obrigação."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "6", label: "Vitórias" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "8", label: "Jogos" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "75%", label: "Aproveit." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 md:order-2 order-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold font-display text-7xl leading-none md:text-right", children: "02" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 uppercase tracking-[0.3em] text-xs text-primary-foreground/70 md:text-right", children: "Redenção" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { ref: rivalRef, className: "reveal mt-28 grid md:grid-cols-12 gap-8 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold font-display text-7xl leading-none", children: "03" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 uppercase tracking-[0.3em] text-xs text-primary-foreground/70", children: "O Freguês" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-5xl", children: "Campeões da Temporada" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base md:text-lg text-primary-foreground/85 leading-relaxed", children: [
                  "Primeiro título de 2026 conquistado em uma final eletrizante contra o nosso maior rival, o ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-semibold", children: '"Acordo"' }),
                  ". Resultado obtido, taça erguida — e mais um capítulo escrito na novela de uma freguesia que já é tradição."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: rivalCrest,
                    alt: "Escudo do rival Acordo",
                    width: 1024,
                    height: 1024,
                    loading: "lazy",
                    className: "w-40 md:w-48 transition-transform duration-300 ease-out",
                    style: { transform: `rotate(${rivalRotate}deg)` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs uppercase tracking-[0.3em] text-gold", children: "De ponta-cabeça" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "reveal mt-32", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl shadow-elevated ring-1 ring-gold/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: celebration,
                  alt: "Comemoração e resenha do time Dito e Feito após a vitória",
                  width: 1920,
                  height: 1080,
                  loading: "lazy",
                  className: "w-full h-auto object-cover transition-transform duration-[1500ms] hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-4 text-center text-sm uppercase tracking-[0.35em] text-primary-foreground/70", children: "Pós-jogo · A resenha eterna" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChallengeSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border bg-background py-10 text-center text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display tracking-[0.4em] text-primary-deep", children: "DITO E FEITO · 2010 — 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Futebol e resenha. O resto é detalhe." })
    ] })
  ] });
}
function Stat({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl text-gold leading-none", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary-foreground/70 mt-1", children: label })
  ] });
}
function ChallengeSection() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "desafie", className: "relative bg-background py-32 px-6 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.5em] text-gold", children: "Contato" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-5xl md:text-7xl text-primary-deep", children: "Desafie o nosso time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Marque um amistoso contra o Dito e Feito. Preencha os dados e nossa diretoria entra em contato." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const team = formData.get("team");
          const date = formData.get("date");
          const venue = formData.get("venue");
          const [year, month, day] = String(date).split("-");
          const dataFormatada = `${day}/${month}/${year}`;
          const mensagem = `⚽ Fala, diretoria do Dito e Feito! Aqui é do time *${team}*. Queremos desafiar vocês para um jogo!

📅 Data sugerida: ${dataFormatada}
📍 Local: ${venue}

Bora marcar esse jogo e a resenha?`;
          const numeroZap = "5548991100214";
          const linkZap = `https://wa.me/${numeroZap}?text=${encodeURIComponent(mensagem)}`;
          window.open(linkZap, "_blank");
          setSent(true);
        },
        className: "mt-14 grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome do time adversário", name: "team", required: true, className: "md:col-span-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data sugerida", name: "date", type: "date", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Local", name: "venue", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: sent ? "✓ Desafio recebido. Boa sorte." : "Resposta em até 48h" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                className: "group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5",
                children: [
                  "Enviar desafio",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold transition-all group-hover:w-12" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
function Field({
  label,
  name,
  type = "text",
  required,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `block ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        name,
        type,
        required,
        className: "w-full border-0 border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors focus:border-gold"
      }
    )
  ] });
}
const SplitComponent = Landing;
export {
  SplitComponent as component
};
