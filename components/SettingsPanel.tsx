"use client";

import { useCallback, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  ACCENTS,
  FONT_MAX,
  FONT_MIN,
  SCRIPTS,
  type AccentKey,
  type ScriptKey,
  type Settings,
} from "@/lib/settings";
import { useClickOutside } from "@/lib/useClickOutside";

interface Props {
  open: boolean;
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
}

/** Section chip glyph exported from Figma (4× the design size). */
interface ChipGlyph {
  src: string;
  w: number;
  h: number;
}

interface SectionHeaderProps {
  icon: ChipGlyph;
  title: string;
  open: boolean;
  green?: boolean;
  /** Space above the header (defaults to 32px). */
  gap?: string;
  onToggle: () => void;
}

function SectionHeader({
  icon,
  title,
  open,
  green = false,
  gap = "mt-8",
  onToggle,
}: SectionHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`${gap} flex w-full items-center gap-4 text-left first:mt-0`}
    >
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-active">
        <img src={icon.src} alt="" aria-hidden width={icon.w} height={icon.h} />
      </span>
      <span
        className={`flex-1 text-[13.5px] font-bold ${
          green ? "text-[var(--accent-ink)]" : "text-ink"
        }`}
      >
        {title}
      </span>
      {open ? (
        <ChevronUp size={14} className="text-muted" aria-hidden />
      ) : (
        <ChevronDown size={14} className="text-muted" aria-hidden />
      )}
    </button>
  );
}

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - FONT_MIN) / (FONT_MAX - FONT_MIN)) * 100;
  return (
    <div className="mt-[26px] first:mt-0">
      <div className="mb-[15px] text-[13.5px] font-bold text-ink">{label}</div>
      <div className="flex h-5 items-center gap-3">
        <input
          type="range"
          min={FONT_MIN}
          max={FONT_MAX}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
          className="range-slider min-w-0 flex-1"
          aria-label={label}
        />
        <span className="w-6 text-right text-[13.5px] font-bold text-[var(--accent-ink)]">
          {value}
        </span>
      </div>
    </div>
  );
}

function ScriptSelect({
  value,
  onChange,
}: {
  value: ScriptKey;
  onChange: (v: ScriptKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(open, close);
  const current = SCRIPTS.find((s) => s.key === value) ?? SCRIPTS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-[42px] w-full items-center justify-between rounded-[12px] bg-soft pl-[17px] pr-6 text-[14.5px] text-ink transition hover:brightness-[0.98]"
      >
        <span>{current.label}</span>
        <img
          src="/img/select-caret.png"
          alt=""
          aria-hidden
          width={6}
          height={11}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-[10px] border border-line bg-white py-1 shadow-lg"
        >
          {SCRIPTS.map((s) => (
            <li key={s.key}>
              <button
                type="button"
                role="option"
                aria-selected={s.key === value}
                onClick={() => {
                  onChange(s.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-1.5 text-left text-[13px] transition hover:bg-[var(--accent-soft)] ${
                  s.key === value
                    ? "font-bold text-[var(--accent-ink)]"
                    : "text-ink"
                }`}
              >
                <span>{s.label}</span>
                {s.key === value && <Check size={13} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-[12.5px] text-ink">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-[18px] w-8 shrink-0 rounded-full transition ${
          checked ? "bg-[var(--accent)]" : "bg-[#d8ded8]"
        }`}
      >
        <span
          className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow transition-all ${
            checked ? "left-[16px]" : "left-[2px]"
          }`}
        />
      </button>
    </label>
  );
}

export default function SettingsPanel({ open, settings, onChange }: Props) {
  return (
    <aside
      aria-label="Reading settings"
      className={`fixed bottom-0 right-0 top-16 z-40 w-[300px] max-w-[85vw] overflow-y-auto border-l border-band bg-page shadow-xl transition-transform duration-200 thin-scroll xl:sticky xl:top-16 xl:z-auto xl:h-[calc(100vh-4rem)] xl:max-h-[882px] xl:w-full xl:max-w-none xl:overflow-visible xl:shadow-none ${
        open ? "translate-x-0" : "translate-x-full"
      } xl:translate-x-0`}
    >
      <div className="px-12 pb-8 pt-6">
        <SectionHeader
          icon={{ src: "/img/chip-font.png", w: 21, h: 21 }}
          title="Font Settings"
          open={settings.fontOpen}
          green
          onToggle={() => onChange({ fontOpen: !settings.fontOpen })}
        />
        {settings.fontOpen && (
          <div className="mt-5">
            <SliderRow
              label="Arabic Font Size"
              value={settings.arabicSize}
              onChange={(v) => onChange({ arabicSize: v })}
            />
            <SliderRow
              label="Translation Font Size"
              value={settings.translationSize}
              onChange={(v) => onChange({ translationSize: v })}
            />
            <div className="mt-[26px]">
              <div className="mb-3 text-[13.5px] font-bold text-ink">
                Arabic Script &amp; Font Face
              </div>
              <ScriptSelect
                value={settings.script}
                onChange={(v) => onChange({ script: v })}
              />
            </div>
          </div>
        )}

        <SectionHeader
          icon={{ src: "/img/chip-view.png", w: 19, h: 20 }}
          title="View Settings"
          open={settings.viewOpen}
          gap="mt-[36px]"
          onToggle={() => onChange({ viewOpen: !settings.viewOpen })}
        />
        {settings.viewOpen && (
          <div className="mt-4 space-y-3.5">
            <Toggle
              label="Show transliteration"
              checked={settings.showTranslit}
              onChange={(v) => onChange({ showTranslit: v })}
            />
            <Toggle
              label="Show reference"
              checked={settings.showReference}
              onChange={(v) => onChange({ showReference: v })}
            />
            <Toggle
              label="Show section bar"
              checked={settings.showSection}
              onChange={(v) => onChange({ showSection: v })}
            />
          </div>
        )}

        <SectionHeader
          icon={{ src: "/img/chip-appearance.png", w: 19, h: 20 }}
          title="Appearance Settings"
          open={settings.appearanceOpen}
          onToggle={() => onChange({ appearanceOpen: !settings.appearanceOpen })}
        />
        {settings.appearanceOpen && (
          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-2 text-[12.5px] font-bold text-ink">
                Density
              </div>
              <div className="flex gap-1 rounded-lg bg-field p-1">
                <button
                  type="button"
                  onClick={() => onChange({ dense: false })}
                  className={`flex-1 rounded-md px-2 py-1 text-[11.5px] font-semibold transition ${
                    !settings.dense
                      ? "bg-white text-[var(--accent-ink)] shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ dense: true })}
                  className={`flex-1 rounded-md px-2 py-1 text-[11.5px] font-semibold transition ${
                    settings.dense
                      ? "bg-white text-[var(--accent-ink)] shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Compact
                </button>
              </div>
            </div>
            <div>
              <div className="mb-2 text-[12.5px] font-bold text-ink">
                Accent color
              </div>
              <div className="flex gap-2.5">
                {(Object.keys(ACCENTS) as AccentKey[]).map((key) => {
                  const a = ACCENTS[key];
                  const isActive = settings.accent === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      title={a.label}
                      aria-label={a.label}
                      aria-pressed={isActive}
                      onClick={() => onChange({ accent: key })}
                      className={`h-6 w-6 rounded-full border-2 transition ${
                        isActive
                          ? "scale-110 border-[var(--accent-ink)]"
                          : "border-white hover:scale-105"
                      }`}
                      style={{
                        background: a.accent,
                        boxShadow: isActive ? undefined : "0 0 0 1px #e0e5df",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
