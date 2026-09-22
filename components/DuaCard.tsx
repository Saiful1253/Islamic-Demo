"use client";

import { useState, type ReactNode } from "react";
import type { Dua } from "@/lib/data";
import { scriptClass, translationPx, type Settings } from "@/lib/settings";

interface Props {
  dua: Dua;
  number: number;
  settings: Settings;
  isLast: boolean;
}

function IconBtn({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition hover:bg-[var(--accent-soft)] ${
        active ? "text-[var(--accent-ink)]" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default function DuaCard({ dua, number, settings, isLast }: Props) {
  const [tipped, setTipped] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  const bodyPx = translationPx(settings.translationSize);
  const bodyLine = Math.round(bodyPx * 1.78);

  return (
    <article
      className={
        settings.dense
          ? "pb-1 pt-6"
          : isLast
            ? "pb-2 pt-[30px]"
            : "pt-[30px]"
      }
    >
      <div className="flex items-center gap-4">
        <img
          src="/img/rosette.png"
          alt=""
          aria-hidden
          width={29}
          height={29}
          className="mt-px shrink-0"
        />
        <h2 className="text-[16px] font-bold leading-snug text-[var(--accent-ink)]">
          {number}. {dua.title}
        </h2>
      </div>

      {dua.intro && (
        <p className="mt-5 text-[16px] leading-7 text-ink">{dua.intro}</p>
      )}

      <p
        dir="rtl"
        lang="ar"
        className={`mt-[30px] text-right text-ink ${scriptClass(settings.script)}`}
        style={{
          fontSize: settings.arabicSize,
          lineHeight: `${Math.round(settings.arabicSize * 1.93)}px`,
        }}
      >
        {dua.arabic}
      </p>

      {settings.showTranslit && (
        <p className="mt-[27px] text-[16.5px] italic leading-7 text-muted">
          {dua.translit}
        </p>
      )}

      <div className="mt-6">
        {dua.blocks.map((block, i) =>
          block.kind === "label" ? (
            <p
              key={i}
              className={`text-[17px] font-bold leading-6 text-ink ${
                i > 0 ? "mt-7" : ""
              }`}
            >
              {block.text}
            </p>
          ) : (
            <p
              key={i}
              className={`text-ink ${
                i > 0 && dua.blocks[i - 1].kind === "text" ? "mt-5" : "mt-3"
              }`}
              style={{ fontSize: bodyPx, lineHeight: `${bodyLine}px` }}
            >
              {block.text}
            </p>
          ),
        )}
      </div>

      <div className="mt-[46px] flex items-end justify-between gap-6">
        {settings.showReference && (
          <div className="min-w-0">
            <div className="text-[14px] leading-5 text-faint">Reference</div>
            <div className="mt-1 text-[16px] font-semibold leading-6 text-ink">
              {dua.reference}
            </div>
          </div>
        )}
        <div className="flex shrink-0 items-center gap-4 pb-1">
          <IconBtn
            label={tipped ? "Unpin" : "Insight"}
            active={tipped}
            onClick={() => setTipped((v) => !v)}
          >
            <img src="/img/act1.png" alt="" aria-hidden width={16} height={20} />
          </IconBtn>
          <IconBtn
            label={saved ? "Remove bookmark" : "Bookmark"}
            active={saved}
            onClick={() => setSaved((v) => !v)}
          >
            <img src="/img/act2.png" alt="" aria-hidden width={17} height={20} />
          </IconBtn>
          <IconBtn
            label={playing ? "Pause" : "Play"}
            active={playing}
            onClick={() => setPlaying((v) => !v)}
          >
            <img src="/img/act3.png" alt="" aria-hidden width={16} height={17} />
          </IconBtn>
          <IconBtn label="Schedule" onClick={() => undefined}>
            <img src="/img/act4.png" alt="" aria-hidden width={18} height={20} />
          </IconBtn>
          <IconBtn label="More options" onClick={() => undefined}>
            <img src="/img/act5.png" alt="" aria-hidden width={5} height={16} />
          </IconBtn>
        </div>
      </div>

      {!isLast && (
        <div className="-mx-4 mt-[29px] border-t border-linesoft" aria-hidden />
      )}
    </article>
  );
}
