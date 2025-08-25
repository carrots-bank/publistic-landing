"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function IntroAnimation() {
  const [finished, setFinished] = useState(false);

  /** ===== Настройки под твой новый SVG ===== */
  // viewBox из твоего SVG
  const VIEWBOX = { w: 349, h: 419 };

  // Новый контур буквы P (вставлен твоим path d=…)
  const P_PATH = `M1 418H69V64H208C223.038 66.8925 230.651 69.8189 243 77C254.604 84.846 259.771 90.1609 267 101C274.592 112.227 277.301 119.822 279 136C279.484 141.467 279.512 144.533 279 150L277 159C270.878 181.32 264.094 191.224 247 205L228 279C241.904 277.412 251.346 274.479 270 267C279.465 261.933 284.722 258.659 294 252C311.063 238.032 319.28 228.742 331 209C341.326 189.284 345.04 176.798 348 152C348.348 143.142 348.396 138.124 348 129C346.437 110.408 343.917 100.597 337 84C326.911 63.6388 319.265 53.1078 302 36C274.712 14.5809 257.289 6.04852 220 1H1V418Z`;

  // Контур самолёта (как раньше)
  const PLANE_PATH = `M149 43.5L76.5 113C72.3564 117.123 71.4895 120.851 72 129.5M72 129.5V163C68.563 168.224 66.2761 168.364 62 163L46 116C44.8859 113.453 43.7303 112.401 41 111L3.50001 96.5C-0.17439 90.057 0.647661 87.3942 3.50001 83.5C6.06162 81.5515 7.59334 80.5639 10.5 79L167 1.50002C171.818 1.10229 175.698 1.73859 180 3.50002C184.607 5.35451 185.248 7.58625 186.5 11.5C187.506 19.5454 186.454 25.9733 182 40.5L146.5 167C144.003 171.47 142.176 173.39 136.5 173.5C132.071 173.5 129.23 172.087 123.5 167L78 128.5C73.507 123.675 72.1541 123.736 72 129.5Z`;

  // Точка стыковки (по твоей линии). Подкрути на пару пикселей, если нужно:
  const DOCK = { x: 70, y: 150, angle: -5 };

  // Масштаб интро (уменьшено)
  const SIZE_CLASS = "w-[32vw] max-w-[440px]";

  // Время и плавность (синхронизация «налива» и полёта)
  const DURATION = 1.8;
  const EASE: any = [0.22, 0.75, 0.28, 1];

  /** ===== Полёт по прямой ===== */
  const start = { x: -VIEWBOX.w * 0.28, y: VIEWBOX.h * 0.82 };
  const FLIGHT_PATH_D = `M ${start.x} ${start.y} L ${DOCK.x} ${DOCK.y}`;

  const progress = useMotionValue(0);
  const pathRef = useRef<SVGPathElement | null>(null);
  const getPoint = (v: number) => {
    const path = pathRef.current;
    if (!path) return { x: 0, y: 0, angle: 0 };
    const L = path.getTotalLength();
    const l = Math.max(0, Math.min(L, L * v));
    const p = path.getPointAtLength(l);
    return { x: p.x, y: p.y, angle: DOCK.angle };
  };
  const x = useTransform(progress, (v) => getPoint(v).x);
  const y = useTransform(progress, (v) => getPoint(v).y);
  const rotate = useTransform(progress, (v) => getPoint(v).angle);

  /** ===== Заливка буквы снизу-вверх (чисто белая) =====
   *  Делаем clipPath по форме буквы и двигаем белый прямоугольник снизу-вверх.
   *  Так край ВСЕГДА остаётся белым — без полутонов.
   */
  const fillY = useMotionValue(VIEWBOX.h); // старт снизу
  const fillH = useTransform(fillY, (vy) => VIEWBOX.h - vy);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const a1 = animate(progress, 1, { duration: DURATION, ease: EASE });
    const a2 = animate(fillY, 0, { duration: DURATION, ease: EASE });

    const t = setTimeout(() => {
      setFinished(true);
      document.body.style.overflow = orig;
    }, (DURATION + 0.3) * 1000);

    return () => {
      a1.stop();
      a2.stop();
      clearTimeout(t);
      document.body.style.overflow = orig;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      animate={finished ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.45 }}
      style={{ pointerEvents: finished ? "none" : "auto" }}
    >
      <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} className={SIZE_CLASS}>
        <defs>
          {/* Градиент для самолёта */}
          <linearGradient id="pp" x1="0" x2="1">
            <stop offset="0%" stopColor="#4DA3FF" />
            <stop offset="50%" stopColor="#7B5CFF" />
            <stop offset="100%" stopColor="#21D0C3" />
          </linearGradient>
          <filter id="glow" width="200%" height="200%" x="-50%" y="-50%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#4DA3FF" floodOpacity="0.35" />
          </filter>

          {/* clipPath по букве (чтобы заливка была только внутри) */}
          <clipPath id="pClip">
            <path d={P_PATH} />
          </clipPath>
        </defs>

        {/* Заливка буквы «как бочка»: чистый #fff внутри контура */}
        <g clipPath="url(#pClip)">
          <motion.rect
            x={0}
            style={{ y: fillY, height: fillH }}
            width={VIEWBOX.w}
            fill="#fff"
          />
        </g>

        {/* Чёткая белая кромка поверх — чтобы край всегда оставался белым */}
        <path d={P_PATH} fill="none" stroke="#fff" strokeWidth={2} />

        {/* Невидимый прямой путь полёта */}
        <path ref={pathRef} d={FLIGHT_PATH_D} fill="none" stroke="none" />

        {/* Самолёт — по прямой к точке DOCK */}
        <motion.g style={{ x, y, rotate }} filter="url(#glow)">
          <path
            d={PLANE_PATH}
            fill="none"
            stroke="url(#pp)"
            strokeWidth={9}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
