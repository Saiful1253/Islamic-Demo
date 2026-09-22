"use client";

import { useCallback, useState } from "react";
import { ChevronDown, Menu, Settings as SettingsIcon } from "lucide-react";
import type { Language } from "@/lib/data";
import { useClickOutside } from "@/lib/useClickOutside";

interface Props {
  languages: Language[];
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  onSupport: () => void;
}

export default function Header({
  languages,
  onToggleSidebar,
  onOpenSettings,
  onSupport,
}: Props) {
  const [menu, setMenu] = useState<"lang" | null>(null);
  const [lang, setLang] = useState(languages[0]);

  const closeMenu = useCallback(() => setMenu(null), []);
  const langRef = useClickOutside<HTMLDivElement>(menu === "lang", closeMenu);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b border-line bg-page">
      {/* Logo cell — aligns with the icon rail column below */}
      <div className="flex h-full w-[68px] shrink-0 items-center justify-center bg-soft">
        <img
          src="/img/logo.png"
          alt="Al Hisnul Muslim"
          width={44}
          height={44}
          className="relative top-[3px] h-11 w-11"
        />
      </div>

      <div className="ml-6 min-w-0">
        <div className="truncate text-[17px] font-bold leading-tight tracking-[0.01em] text-ink">
          Dua &amp; Ruqyah
        </div>
        <div className="mt-px truncate text-[12px] leading-tight text-muted">
          Al Hisnul Muslim
        </div>
      </div>

      <div className="relative top-[1.5px] ml-auto flex items-center gap-4 pr-10">
        <button
          type="button"
          aria-label="Search"
          className="hidden h-[38px] w-[38px] items-center justify-center rounded-full bg-pill transition hover:brightness-95 md:flex"
        >
          <img src="/img/hdr-search.png" alt="" aria-hidden width={16} height={16} />
        </button>

        <button
          type="button"
          aria-label="My collection"
          className="hidden h-[38px] w-[38px] items-center justify-center rounded-full bg-pill transition hover:brightness-95 md:flex"
        >
          <img
            src="/img/hdr-bookmark.png"
            alt=""
            aria-hidden
            width={16}
            height={16}
          />
        </button>

        <div ref={langRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setMenu((m) => (m === "lang" ? null : "lang"))}
            aria-haspopup="menu"
            aria-expanded={menu === "lang"}
            className="flex h-[38px] items-center gap-2.5 rounded-full bg-pill pl-[11px] pr-3 text-[13px] font-semibold text-ink transition hover:brightness-95"
          >
            {/* Flag raster exported straight from the Figma file */}
            <img
              src="/img/flag-us.png"
              alt=""
              aria-hidden
              width={23}
              height={16}
              className="h-4 w-[23px] shrink-0 rounded-[3px] object-cover ring-1 ring-page"
            />
            <span>{lang.code}</span>
            <ChevronDown size={11} strokeWidth={1.6} className="text-muted" />
          </button>
          {menu === "lang" && (
            <ul className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg">
              {languages.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setLang(l);
                      setMenu(null);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-1.5 text-left text-[12.5px] transition hover:bg-[var(--accent-soft)] ${
                      lang.code === l.code
                        ? "font-bold text-[var(--accent-ink)]"
                        : "text-ink"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] text-muted">{l.code}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={onSupport}
          className="hidden h-[38px] items-center gap-3 rounded-full bg-[var(--accent)] pl-[15px] pr-5 text-[13px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98] sm:flex"
        >
          Support Us
          <img
            src="/img/support-plane.png"
            alt=""
            aria-hidden
            width={15}
            height={16}
          />
        </button>

        {/* Small-screen controls */}
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open font settings"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-pill transition hover:brightness-95 xl:hidden"
        >
          <SettingsIcon size={15} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open navigation menu"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-pill transition hover:brightness-95 lg:hidden"
        >
          <Menu size={16} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
