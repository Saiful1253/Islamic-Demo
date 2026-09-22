/* Shared hand-drawn ornaments: logo, rosette, dividers, corner flourishes,
   article cover art and simple geometric social marks.
   SVG is used here for icons / simple schematics only, per the design brief. */

type DecorativeProps = { className?: string };

/* --- helpers ------------------------------------------------------- */

const polar = (cx: number, cy: number, r: number, angleDeg: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
};

const starPolygon = (cx: number, cy: number, outer: number, inner: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const p = polar(cx, cy, r, -90 + i * 36);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(" ");

/* --- brand mark ---------------------------------------------------- */

export function LogoMark({
  className = "h-9 w-9",
  id = "logo",
}: {
  className?: string;
  id?: string;
}) {
  const octagon = Array.from({ length: 8 }, (_, i) => {
    const p = polar(20, 20, 18, 22.5 + i * 45);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <mask id={`${id}-crescent`}>
          <rect width="40" height="40" fill="black" />
          <circle cx="18" cy="21" r="10.5" fill="white" />
          <circle cx="24.5" cy="15.5" r="9.4" fill="black" />
        </mask>
      </defs>
      <polygon
        points={octagon}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeOpacity="0.85"
      />
      <polygon
        points={octagon}
        transform="rotate(22.5 20 20) scale(0.72) translate(11.1 11.1)"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
      <rect
        x="0"
        y="0"
        width="40"
        height="40"
        fill="currentColor"
        mask={`url(#${id}-crescent)`}
      />
      <polygon
        points={starPolygon(27.6, 13.4, 4.3, 1.85)}
        fill="currentColor"
      />
    </svg>
  );
}

/* --- rub el hizb (۞) ---------------------------------------------- */

export function RubElHizb({ className = "h-5 w-5" }: DecorativeProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="6" y="6" width="16" height="16" />
      <rect x="6" y="6" width="16" height="16" transform="rotate(45 14 14)" />
      <circle cx="14" cy="14" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* --- ornamental hairline divider ----------------------------------- */

export function Divider({ className = "" }: DecorativeProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/55 to-gold/55" />
      <RubElHizb className="h-5 w-5 shrink-0 text-gold" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/55 to-gold/55" />
    </div>
  );
}

/* --- corner flourish (rotate for the 3 other corners) --------------- */

export function Corner({ className = "" }: DecorativeProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M6 46V18C6 11.4 11.4 6 18 6H46" />
      <path d="M15 46V27C15 23.7 17.7 21 21 21H46" strokeOpacity="0.5" />
      <circle cx="6" cy="46" r="2.1" fill="currentColor" stroke="none" />
      <path d="M40 11l3 3-3 3" strokeOpacity="0.6" />
    </svg>
  );
}

/* --- hero rosette: 16-point night geometry with glowing crescent ---- */

export function Rosette({ className = "" }: DecorativeProps) {
  const ticks = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <svg
      viewBox="-200 -200 400 400"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="ro-gold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#e0be5a" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
        <mask id="ro-crescent">
          <rect x="-200" y="-200" width="400" height="400" fill="black" />
          <circle cx="-16" cy="4" r="58" fill="white" />
          <circle cx="10" cy="-14" r="52" fill="black" />
        </mask>
      </defs>

      {/* outer rings */}
      <circle r="188" stroke="#c9a227" strokeOpacity="0.22" />
      <circle
        r="181"
        stroke="#c9a227"
        strokeOpacity="0.55"
        strokeDasharray="1.5 11"
        className="spin-slow"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* tick marks */}
      <g stroke="#c9a227" strokeOpacity="0.4">
        {ticks.map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="-152"
            x2="0"
            y2="-170"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>

      {/* eight-point star lattice */}
      <g stroke="#c9a227" strokeOpacity="0.3">
        <rect x="-99" y="-99" width="198" height="198" />
        <rect x="-99" y="-99" width="198" height="198" transform="rotate(45)" />
      </g>

      <circle r="150" stroke="#c9a227" strokeOpacity="0.4" />
      <circle
        r="150"
        stroke="#e0be5a"
        strokeOpacity="0.5"
        strokeDasharray="2 26"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        className="spin-slow"
        transform="rotate(8)"
      />
      <circle r="118" stroke="#c9a227" strokeOpacity="0.35" />

      {/* petals */}
      <g>
        {petals.map((deg) => {
          const p = polar(0, 0, 118, deg);
          return (
            <circle
              key={deg}
              cx={p.x}
              cy={p.y}
              r="9"
              fill="#071a14"
              stroke="#c9a227"
              strokeOpacity="0.5"
            />
          );
        })}
      </g>

      <circle r="92" stroke="#c9a227" strokeOpacity="0.5" />
      <circle r="86" stroke="#c9a227" strokeOpacity="0.2" />

      {/* glowing crescent + star */}
      <circle r="74" fill="#c9a227" fillOpacity="0.08" className="breathe" />
      <rect
        x="-80"
        y="-80"
        width="160"
        height="160"
        fill="url(#ro-gold)"
        mask="url(#ro-crescent)"
        style={{ filter: "drop-shadow(0 0 26px rgba(224,190,90,0.55))" }}
      />
      <polygon
        points={starPolygon(74, -70, 13, 5.6)}
        fill="#e0be5a"
        style={{ filter: "drop-shadow(0 0 14px rgba(224,190,90,0.8))" }}
      />
    </svg>
  );
}

/* --- article cover art (3 distinct generated patterns) -------------- */

type CoverVariant = 1 | 2 | 3;

export function CoverArt({
  variant,
  className = "",
}: {
  variant: CoverVariant;
  className?: string;
}) {
  if (variant === 1) {
    return (
      <svg
        viewBox="0 0 400 160"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cv1bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#04120f" />
            <stop offset="1" stopColor="#0f3d33" />
          </linearGradient>
          <pattern
            id="cv1lat"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="11"
              y="11"
              width="22"
              height="22"
              fill="none"
              stroke="#c9a227"
              strokeOpacity="0.4"
            />
            <rect
              x="11"
              y="11"
              width="22"
              height="22"
              fill="none"
              stroke="#c9a227"
              strokeOpacity="0.4"
              transform="rotate(45 22 22)"
            />
          </pattern>
          <mask id="cv1crescent">
            <rect width="400" height="160" fill="black" />
            <circle cx="318" cy="74" r="40" fill="white" />
            <circle cx="334" cy="56" r="34" fill="black" />
          </mask>
        </defs>
        <rect width="400" height="160" fill="url(#cv1bg)" />
        <rect width="400" height="160" fill="url(#cv1lat)" />
        <circle
          cx="318"
          cy="74"
          r="40"
          fill="#e0be5a"
          fillOpacity="0.9"
          mask="url(#cv1crescent)"
        />
        <polygon
          points={starPolygon(268, 44, 9, 3.9)}
          fill="#e0be5a"
          fillOpacity="0.85"
        />
        <polygon
          points={starPolygon(352, 118, 6, 2.6)}
          fill="#e0be5a"
          fillOpacity="0.6"
        />
      </svg>
    );
  }

  if (variant === 2) {
    const arch = "M130 148 L130 92 Q130 44 200 30 Q270 44 270 92 L270 148";
    return (
      <svg
        viewBox="0 0 400 160"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cv2bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8f3f1e" />
            <stop offset="1" stopColor="#5c2712" />
          </linearGradient>
        </defs>
        <rect width="400" height="160" fill="url(#cv2bg)" />
        <g fill="none" stroke="#e0be5a" strokeOpacity="0.75" strokeWidth="1.6">
          <path d={arch} />
          <g transform="translate(200 148) scale(0.74) translate(-200 -148)">
            <path d={arch} strokeOpacity="0.6" />
          </g>
          <g transform="translate(200 148) scale(0.5) translate(-200 -148)">
            <path d={arch} strokeOpacity="0.45" />
          </g>
        </g>
        <rect
          x="0"
          y="148"
          width="400"
          height="12"
          fill="#04120f"
          fillOpacity="0.35"
        />
        <line
          x1="0"
          y1="148"
          x2="400"
          y2="148"
          stroke="#e0be5a"
          strokeOpacity="0.5"
        />
        <g fill="#e0be5a" fillOpacity="0.85">
          <circle cx="52" cy="46" r="3" />
          <circle cx="348" cy="46" r="3" />
          <polygon points={starPolygon(74, 110, 7, 3)} />
          <polygon points={starPolygon(326, 110, 7, 3)} />
        </g>
      </svg>
    );
  }

  const circles: React.ReactElement[] = [];
  for (let x = -10; x <= 410; x += 46) {
    circles.push(
      <circle key={`a${x}`} cx={x} cy={58} r="30" />,
      <circle key={`b${x}`} cx={x + 23} cy={96} r="30" />
    );
  }
  return (
    <svg
      viewBox="0 0 400 160"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cv3bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b2e26" />
          <stop offset="1" stopColor="#071a14" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#cv3bg)" />
      <g
        fill="none"
        stroke="#c9a227"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        transform="translate(0 -8)"
      >
        {circles}
      </g>
      <g transform="translate(200 76)">
        <rect
          x="-26"
          y="-26"
          width="52"
          height="52"
          fill="#04120f"
          fillOpacity="0.88"
          stroke="#e0be5a"
          strokeOpacity="0.9"
        />
        <rect
          x="-26"
          y="-26"
          width="52"
          height="52"
          fill="none"
          stroke="#e0be5a"
          strokeOpacity="0.9"
          transform="rotate(45)"
        />
        <circle r="7" fill="#e0be5a" />
      </g>
    </svg>
  );
}

/* --- simple geometric social marks --------------------------------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function FacebookMark({ className = "h-4 w-4" }: DecorativeProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M14 8h2.2V5.2H14c-2 0-3.4 1.4-3.4 3.4V11H8.4v2.8h2.2V21h2.9v-7.2h2.3l.4-2.8h-2.7V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function YoutubeMark({ className = "h-4 w-4" }: DecorativeProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3" y="6.5" width="18" height="11" rx="3.4" />
      <path d="M10.6 9.8v4.4L14.6 12z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramMark({ className = "h-4 w-4" }: DecorativeProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4.6" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XMark({ className = "h-4 w-4" }: DecorativeProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}
