import { ChevronRight } from "lucide-react";
import { duas } from "@/lib/data";
import type { Settings } from "@/lib/settings";
import DuaCard from "./DuaCard";

interface Props {
  sectionTitle: string;
  settings: Settings;
}

export default function ContentArea({ sectionTitle, settings }: Props) {
  return (
    <main className="min-w-0 flex-1 bg-page">
      <nav
        aria-label="Breadcrumb"
        className="flex h-[46px] items-center gap-1.5 bg-band px-5 text-[13px] sm:px-8 xl:px-[68px]"
      >
        <img
          src="/img/house.png"
          alt=""
          aria-hidden
          width={16}
          height={16}
          className="mr-0.5 shrink-0"
        />
        <span className="font-semibold text-[var(--accent-ink)]">Home</span>
        <ChevronRight size={11} className="shrink-0 text-crumb" />
        <span className="text-crumb">…</span>
        <ChevronRight size={11} className="shrink-0 text-crumb" />
        <span className="font-semibold text-[var(--accent-ink)]">
          Dua&apos;s Importance
        </span>
        <ChevronRight size={11} className="shrink-0 text-crumb" />
        <span className="min-w-0 max-w-[190px] truncate text-crumb">
          {sectionTitle}
        </span>
      </nav>

      {settings.showSection && (
        <div className="flex h-[68px] items-center gap-3 bg-soft px-5 text-[16px] sm:px-8 xl:px-[68px]">
          <span className="shrink-0 font-semibold text-[var(--accent-ink)]">
            Section:
          </span>
          <span className="truncate font-semibold text-ink">
            {sectionTitle}
          </span>
        </div>
      )}

      <div className="px-5 pb-[53px] sm:px-8 xl:px-[68px]">
        {duas.map((dua, i) => (
          <DuaCard
            key={dua.id}
            dua={dua}
            number={i + 1}
            settings={settings}
            isLast={i === duas.length - 1}
          />
        ))}
      </div>
    </main>
  );
}
