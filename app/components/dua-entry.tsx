"use client";

import { useState } from "react";
import {
  Flower2,
  Lightbulb,
  Bookmark,
  SquarePlay,
  CalendarDays,
  EllipsisVertical,
} from "lucide-react";
import type { Dua } from "../lib/data";

export default function DuaEntry({ dua }: { dua: Dua }) {
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <article className="py-[34px] first:pt-[30px]">
      {/* Title */}
      <h3 className="flex items-start gap-[14px] text-[16px] font-bold leading-[24px] text-brand">
        <Flower2
          size={19}
          strokeWidth={1.9}
          className="mt-[3px] shrink-0 text-brand"
        />
        <span>
          {dua.number}. {renderTitle(dua.title, dua.highlight)} #{1}
        </span>
      </h3>

      <div className="mt-[26px] space-y-[18px]">
        {dua.blocks.map((block, i) => {
          switch (block.kind) {
            case "lead":
              return (
                <p key={i} className="text-[16px] leading-[28px] text-ink">
                  {block.text}
                </p>
              );
            case "arabic":
              return (
                <p
                  key={i}
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-right text-[30px] leading-[64px] text-ink"
                >
                  {block.text}
                </p>
              );
            case "translit":
              return (
                <p key={i} className="text-[16px] italic leading-[28px] text-muted">
                  {block.text}
                </p>
              );
            case "label":
              return (
                <p key={i} className="pt-[6px] text-[16px] font-bold text-ink">
                  {block.text}
                </p>
              );
            case "quote":
              return (
                <p key={i} className="text-[16px] font-bold leading-[28px] text-ink">
                  {block.text}
                </p>
              );
            default:
              return (
                <p key={i} className="text-[16px] leading-[28px] text-ink">
                  {block.text}
                </p>
              );
          }
        })}
      </div>

      {/* Reference + actions */}
      <div className="mt-[30px] flex items-end justify-between gap-6">
        <div>
          <p className="text-[13px] leading-[18px] text-muted">Reference</p>
          <p className="mt-[3px] text-[15px] font-semibold leading-[20px] text-ink">
            {dua.reference}
          </p>
        </div>

        <div className="flex items-center gap-[30px] pb-[2px] text-icon">
          <IconBtn label="Show tip">
            <Lightbulb size={19} strokeWidth={1.8} />
          </IconBtn>
          <button
            type="button"
            aria-label="Save dua"
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            className={
              "transition-colors hover:text-brand " +
              (saved ? "text-brand" : "")
            }
          >
            <Bookmark
              size={19}
              strokeWidth={1.8}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            onClick={() => setPlaying((v) => !v)}
            className="transition-colors hover:text-brand"
          >
            <SquarePlay size={19} strokeWidth={1.8} />
          </button>
          <IconBtn label="Add to plan">
            <CalendarDays size={19} strokeWidth={1.8} />
          </IconBtn>
          <IconBtn label="More options">
            <EllipsisVertical size={19} strokeWidth={1.8} />
          </IconBtn>
        </div>
      </div>
    </article>
  );
}

function IconBtn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="transition-colors hover:text-brand"
    >
      {children}
    </button>
  );
}

/** Renders the title with the highlighted word in dark regular weight. */
function renderTitle(title: string, highlight: string) {
  const idx = title.indexOf(highlight);
  if (idx === -1 || !highlight) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="font-medium text-ink">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}
