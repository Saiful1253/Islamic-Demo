"use client";

import { useState } from "react";

interface RailItem {
  key: string;
  /** Glyph exported from Figma (transparent PNG, 4× the design size). */
  src: string;
  w: number;
  h: number;
  label: string;
}

/* Sizes are the Figma design sizes (exported at 4× device pixel ratio). */
const TOP_ITEMS: RailItem[] = [
  { key: "duas", src: "/img/rail1.png", w: 23, h: 23, label: "Dua & Ruqyah" },
  { key: "categories", src: "/img/rail2.png", w: 23, h: 23, label: "Categories" },
  { key: "places", src: "/img/rail3.png", w: 19, h: 23, label: "Qibla & places" },
  { key: "saved", src: "/img/rail4.png", w: 20, h: 23, label: "Saved" },
  { key: "profile", src: "/img/rail5.png", w: 23, h: 23, label: "Profile" },
  { key: "read", src: "/img/rail6.png", w: 23, h: 22, label: "Reading" },
];

const BOTTOM_ITEMS: RailItem[] = [
  { key: "achievements", src: "/img/rail7.png", w: 23, h: 23, label: "Achievements" },
  { key: "menu", src: "/img/rail8.png", w: 21, h: 13, label: "Menu" },
];

export default function IconRail({
  onToggleMenu,
}: {
  onToggleMenu: () => void;
}) {
  const [active, setActive] = useState("duas");

  const buttonClass = (isActive: boolean) =>
    `flex h-10 w-10 items-center justify-center rounded-xl transition ${
      isActive ? "bg-active" : "hover:bg-white/70"
    }`;

  const renderItem = ({ key, src, w, h, label }: RailItem) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        type="button"
        title={label}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        onClick={() => {
          setActive(key);
          if (key === "menu") onToggleMenu();
        }}
        className={buttonClass(isActive)}
      >
        <img src={src} alt="" aria-hidden width={w} height={h} />
      </button>
    );
  };

  return (
    <nav
      aria-label="Quick navigation"
      className="sticky top-16 hidden h-[calc(100vh-4rem)] max-h-[887px] w-[68px] shrink-0 flex-col items-center bg-soft lg:flex"
    >
      <div className="flex flex-col items-center gap-6 pt-[232px]">
        {TOP_ITEMS.map(renderItem)}
      </div>
      <div className="mt-auto flex flex-col items-center gap-6 pb-5">
        {BOTTOM_ITEMS.map(renderItem)}
      </div>
    </nav>
  );
}
