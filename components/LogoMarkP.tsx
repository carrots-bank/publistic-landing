"use client";

/**
 * Квадратная иконка с градиентной рамкой (как сейчас в шапке),
 * а внутри — буква P + самолёт в точке стыковки ровно как в интро.
 *
 * Если нужно подпиксельно сдвинуть самолёт, правь PLANE_DX / PLANE_DY.
 */
export default function LogoMarkP({
  size = 35,              // высота/ширина иконки в px
  darkBg = "#0B0E13",     // фон внутри рамки (как на сайте)
}: { size?: number; darkBg?: string }) {
  // === Твой исходный масштаб интро ===
  const VIEWBOX = { w: 349, h: 419 };

  // === Контуры из интро (1:1) ===
  const P_PATH =
    "M1 418H69V64H208C223.038 66.8925 230.651 69.8189 243 77C254.604 84.846 259.771 90.1609 267 101C274.592 112.227 277.301 119.822 279 136C279.484 141.467 279.512 144.533 279 150L277 159C270.878 181.32 264.094 191.224 247 205L228 279C241.904 277.412 251.346 274.479 270 267C279.465 261.933 284.722 258.659 294 252C311.063 238.032 319.28 228.742 331 209C341.326 189.284 345.04 176.798 348 152C348.348 143.142 348.396 138.124 348 129C346.437 110.408 343.917 100.597 337 84C326.911 63.6388 319.265 53.1078 302 36C274.712 14.5809 257.289 6.04852 220 1H1V418Z";

  const PLANE_PATH =
    "M149 43.5L76.5 113C72.3564 117.123 71.4895 120.851 72 129.5M72 129.5V163C68.563 168.224 66.2761 168.364 62 163L46 116C44.8859 113.453 43.7303 112.401 41 111L3.50001 96.5C-0.17439 90.057 0.647661 87.3942 3.50001 83.5C6.06162 81.5515 7.59334 80.5639 10.5 79L167 1.50002C171.818 1.10229 175.698 1.73859 180 3.50002C184.607 5.35451 185.248 7.58625 186.5 11.5C187.506 19.5454 186.454 25.9733 182 40.5L146.5 167C144.003 171.47 142.176 173.39 136.5 173.5C132.071 173.5 129.23 172.087 123.5 167L78 128.5C73.507 123.675 72.1541 123.736 72 129.5Z";

  // === Точка стыковки из интро ===
  const DOCK = { x: 145, y: 270, angle: -1 };

  /**
   * В иконке мы помещаем «сцену интро» внутрь квадрата 420×420.
   * P_PATH имеет размер 349×419. Центрируем его по X: (420-349)/2 = 35.5
   * По Y оставляем 0 (высота 419 хорошо садится в 420).
   */
  const SCENE_TX = 35.5; // центрирование буквы P по X в иконке
  const SCENE_TY = 0;

  /**
   * Смещение самолёта внутри группы, чтобы «штырёк» совпал точно визуально.
   * Эти значения можно подправить на 1–3 px при желании.
   */
  const PLANE_DX = -90;
  const PLANE_DY = -110;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Publistic logo mark"
    >
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4DA3FF" />
          <stop offset="50%" stopColor="#7B5CFF" />
          <stop offset="100%" stopColor="#21D0C3" />
        </linearGradient>
        <linearGradient id="lm-plane" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4DA3FF" />
          <stop offset="55%" stopColor="#7B5CFF" />
          <stop offset="100%" stopColor="#21D0C3" />
        </linearGradient>
        <clipPath id="lm-clip">
          {/* Группа со смещением, чтобы clip был точно по букве */}
          <g transform={`translate(${SCENE_TX} ${SCENE_TY})`}>
            <path d={P_PATH} />
          </g>
        </clipPath>
        <filter id="lm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#4DA3FF" floodOpacity="0.35" />
        </filter>
      </defs>


      {/* Буква P: чисто белая заливка + белая кромка */}
      <g transform={`translate(${SCENE_TX} ${SCENE_TY})`}>
        <clipPath id="lm-fill-clip">
          <path d={P_PATH} />
        </clipPath>
        <g clipPath="url(#lm-fill-clip)">
          <rect x="0" y="0" width={VIEWBOX.w} height={VIEWBOX.h} fill="#fff" />
        </g>
        <path d={P_PATH} fill="none" stroke="#fff" strokeWidth="8" />
      </g>

      {/* Самолёт в точке стыковки и под нужным углом */}
      <g
        transform={`translate(${SCENE_TX + DOCK.x + PLANE_DX} ${SCENE_TY + DOCK.y + PLANE_DY}) rotate(${DOCK.angle})`}
        filter="url(#lm-glow)"
      >
        <path
          d={PLANE_PATH}
          fill="none"
          stroke="url(#lm-plane)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
