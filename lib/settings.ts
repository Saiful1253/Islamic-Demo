export type ScriptKey = "uthmani" | "naskh" | "scheherazade";
export type AccentKey = "green" | "teal" | "amber";

export interface Settings {
  arabicSize: number;
  translationSize: number;
  script: ScriptKey;
  fontOpen: boolean;
  viewOpen: boolean;
  appearanceOpen: boolean;
  showTranslit: boolean;
  showReference: boolean;
  showSection: boolean;
  dense: boolean;
  accent: AccentKey;
}

export const FONT_MIN = 16;
export const FONT_MAX = 34;

export const defaultSettings: Settings = {
  arabicSize: 28,
  translationSize: 28,
  script: "uthmani",
  fontOpen: true,
  viewOpen: false,
  appearanceOpen: false,
  showTranslit: true,
  showReference: true,
  showSection: true,
  dense: false,
  accent: "green",
};

export const SCRIPTS: { key: ScriptKey; label: string; className: string }[] = [
  { key: "uthmani", label: "Uthma", className: "arabic-uthmani" },
  { key: "naskh", label: "Naskh", className: "arabic-naskh" },
  {
    key: "scheherazade",
    label: "Scheherazade",
    className: "arabic-scheherazade",
  },
];

export const ACCENTS: Record<
  AccentKey,
  { label: string; accent: string; soft: string; ink: string }
> = {
  green: {
    label: "Classic green",
    accent: "#417360",
    soft: "#eef6eb",
    ink: "#417360",
  },
  teal: {
    label: "Teal",
    accent: "#2c6b70",
    soft: "#e6f1f1",
    ink: "#24585d",
  },
  amber: {
    label: "Amber",
    accent: "#8a6414",
    soft: "#f7efdd",
    ink: "#6c4e0d",
  },
};

export function scriptClass(key: ScriptKey): string {
  return SCRIPTS.find((s) => s.key === key)?.className ?? "arabic-uthmani";
}

/**
 * The translation slider shares the design's display scale
 * (the design shows 28 → about 18px of rendered body text).
 */
export function translationPx(size: number): number {
  return Math.round(size * 0.64 * 10) / 10;
}
