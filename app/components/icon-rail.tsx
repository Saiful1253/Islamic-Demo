"use client";

import { useState } from "react";
import {
  Flower2,
  LayoutGrid,
  Lightbulb,
  Bookmark,
  ImagePlus,
  BookOpen,
  Trophy,
  Menu,
} from "lucide-react";

const nav = [
  { id: "duas", Icon: Flower2, label: "Duas" },
  { id: "categories", Icon: LayoutGrid, label: "Categories" },
  { id: "tips", Icon: Lightbulb, label: "Tips" },
  { id: "saved", Icon: Bookmark, label: "Saved" },
  { id: "media", Icon: ImagePlus, label: "Media" },
  { id: "quran", Icon: BookOpen, label: "Quran" },
];

export default function IconRail() {
  const [active, setActive] = useState("duas");

  return (
    <aside className="flex w-[68px] shrink-0 flex-col items-center bg-rail pb-6">
      {/* Logo */}
      <div className="mt-[11px] flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-[19px] leading-none shadow-sm">
        <span aria-hidden>🤲</span>
        <span className="sr-only">Hisnul Muslim</span>
      </div>

      {/* Primary nav */}
      <nav className="mt-[237px] flex flex-col items-center gap-[42px]">
        {nav.map(({ id, Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(id)}
              className={
                isActive
                  ? "flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-tile text-brand transition-colors"
                  : "flex h-[38px] w-[38px] items-center justify-center rounded-[11px] text-brand/75 transition-colors hover:bg-tile/60 hover:text-brand"
              }
            >
              <Icon size={20} strokeWidth={1.9} />
            </button>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Bottom utilities */}
      <div className="flex flex-col items-center gap-[42px]">
        <button
          type="button"
          aria-label="Achievements"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] text-brand/75 transition-colors hover:bg-tile/60 hover:text-brand"
        >
          <Trophy size={20} strokeWidth={1.9} />
        </button>
        <button
          type="button"
          aria-label="Menu"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] text-brand/75 transition-colors hover:bg-tile/60 hover:text-brand"
        >
          <Menu size={20} strokeWidth={1.9} />
        </button>
      </div>
    </aside>
  );
}
