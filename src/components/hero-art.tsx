"use client";
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Pause, Play } from "lucide-react";
import { ui } from "@/content/site";
import type { Locale } from "@/lib/config";
const Scene = lazy(() => import("./scene"));
class Boundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function Fallback() {
  return (
    <svg
      className="structure-fallback"
      viewBox="0 0 600 570"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="plate" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#42b89b" stopOpacity=".25" />
          <stop offset="1" stopColor="#87ead7" stopOpacity=".03" />
        </linearGradient>
      </defs>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i} transform={`translate(0,${i * 39})`}>
          <path
            d="M80 200 300 85 520 200 300 315Z"
            fill="url(#plate)"
            stroke="#76cbb8"
            strokeOpacity={0.2 + i * 0.08}
          />
          <path
            d="M80 200v12l220 115 220-115v-12M300 315v12"
            fill="none"
            stroke="#76cbb8"
            strokeOpacity=".2"
          />
        </g>
      ))}
      <path
        d="M300 120V480M190 175v245M410 175v245M245 148v300M355 148v300"
        stroke="#66d9b3"
        strokeWidth="2"
        strokeDasharray="3 9"
      />
      {[
        [300, 120],
        [190, 175],
        [410, 175],
        [245, 148],
        [355, 148],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x - 9}
            y={y - 9}
            width="18"
            height="18"
            fill="#62d7ae"
            transform={`rotate(45 ${x} ${y})`}
          />
        </g>
      ))}
    </svg>
  );
}
export function HeroArt({ locale }: { locale: Locale }) {
  const [ready, setReady] = useState(false),
    [reduced, setReduced] = useState(true),
    [paused, setPaused] = useState(false),
    [visible, setVisible] = useState(true),
    [pageVisible, setPageVisible] = useState(true),
    [layer, setLayer] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef(0);
  const pointerTarget = useRef({ x: 0.5, y: 0.5 });

  // Optional spatial depth; no tracking, no persisted pointer data.
  // Static artwork remains available for touch and reduced motion.
  const resetDepth = () => {
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = 0;
    const element = root.current;
    if (!element) return;
    for (const name of ["--art-rx", "--art-ry", "--orbit-x", "--orbit-y", "--spotlight-x", "--spotlight-y"]) {
      element.style.removeProperty(name);
    }
  };
  const moveDepth = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointerTarget.current = {
      x: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)),
      y: Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)),
    };
    if (pointerFrame.current) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0;
      const element = root.current;
      if (!element) return;
      const { x, y } = pointerTarget.current;
      element.style.setProperty("--art-rx", ((0.5 - y) * 4).toFixed(2) + "deg");
      element.style.setProperty("--art-ry", ((x - 0.5) * 5).toFixed(2) + "deg");
      element.style.setProperty("--orbit-x", ((x - 0.5) * 12).toFixed(1) + "px");
      element.style.setProperty("--orbit-y", ((y - 0.5) * 10).toFixed(1) + "px");
      element.style.setProperty("--spotlight-x", (x * 100).toFixed(1) + "%");
      element.style.setProperty("--spotlight-y", (y * 100).toFixed(1) + "%");
    });
  };
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    const timer = setTimeout(() => setReady(true), 600);
    const ob = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (root.current) ob.observe(root.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", sync);
      if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
      clearTimeout(timer);
      ob.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div className="hero-art" ref={root} onPointerMove={moveDepth} onPointerLeave={resetDepth}>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="art-topline">
        <span className="status-dot" />
        <span className="art-label">{ui.structure[locale]}</span>
        <span className="art-coordinate" dir="ltr">
          TH / 01
        </span>
      </div>
      <div className="scene-wrap" aria-hidden="true">
        {ready && !reduced ? (
          <Boundary fallback={<Fallback />}>
            <Suspense fallback={<Fallback />}>
              <Scene
                paused={paused || !visible || !pageVisible}
                layer={layer}
              />
            </Suspense>
          </Boundary>
        ) : (
          <Fallback />
        )}
      </div>
      <div className="layer-controls" aria-label={ui.structure[locale]}>
        {ui.layer.map((label, i) => (
          <button
            key={i}
            onClick={() => setLayer(i)}
            aria-pressed={i === layer}
          >
            <span className="layer-line" />
            {label[locale]}
          </button>
        ))}
      </div>
      <div className="art-bottomline">
        <small>{ui.structureNote[locale]}</small>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          disabled={reduced}
          aria-label={paused ? ui.play[locale] : ui.pause[locale]}
        >
          {paused || reduced ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>
    </div>
  );
}
