"use client";

import { useState } from "react";
import { CornerDownRight, Search } from "lucide-react";
import { sidebarSections } from "@/lib/data";

interface Props {
  open: boolean;
  activeLabel: string;
  onSelect: (label: string) => void;
}

export default function Sidebar({ open, activeLabel, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const ql = query.trim().toLowerCase();

  let visibleItems = 0;

  return (
    <aside
      aria-label="Dua categories"
      className={`fixed bottom-0 left-0 top-16 z-40 w-[320px] max-w-[85vw] overflow-y-auto border-r border-line bg-page shadow-xl transition-transform duration-200 thin-scroll lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:max-h-[883px] lg:w-[353px] lg:max-w-none lg:translate-x-0 lg:overflow-y-auto lg:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Search */}
      <div className="px-6 pt-[30px]">
        <div className="relative">
          <Search
            size={15}
            strokeWidth={2.2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Dua Categories"
            aria-label="Search by Dua Categories"
            className="h-9 w-full rounded-full bg-field pl-11 pr-4 text-[15px] text-ink outline-none transition placeholder:text-muted focus:ring-2 focus:ring-[var(--accent-soft)]"
          />
        </div>
      </div>

      {/* Category groups + tree */}
      <div className="px-[34px] pt-[27px]">
        {sidebarSections.map((sec) => {
          const items = ql
            ? sec.items.filter((i) => i.label.toLowerCase().includes(ql))
            : sec.items;
          const headerMatches =
            !ql ||
            sec.title.toLowerCase().includes(ql) ||
            sec.meta.toLowerCase().includes(ql);
          const showTree = sec.open && items.length > 0;

          if (ql && !headerMatches && items.length === 0) return null;

          visibleItems += items.length;

          return (
            <div key={sec.id} className="mt-[32px] first:mt-0">
              <div className="flex items-center gap-3.5">
                <img
                  src={sec.img}
                  alt=""
                  aria-hidden
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-[14px]"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[16px] font-semibold leading-tight text-ink">
                    {sec.title}
                  </span>
                  <span className="mt-1 block truncate text-[13px] leading-tight text-muted">
                    {sec.meta}
                  </span>
                </span>
              </div>

              {showTree && (
                <ul className="relative ml-4 mt-[26px] border-l border-dashed border-dash">
                  {items.map((item, idx) => {
                    const isActive = activeLabel === item.label;
                    return (
                      <li
                        key={`${item.label}-${idx}`}
                        className={
                          item.child ? "relative pl-14" : "relative pl-[21px]"
                        }
                      >
                        {item.child ? (
                          <CornerDownRight
                            size={15}
                            strokeWidth={1.9}
                            aria-hidden
                            className="absolute left-[22px] top-[9px] text-iconsoft"
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="absolute left-0 top-[15px] w-[13px] border-t border-dashed border-dash"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => onSelect(item.label)}
                          className={`block w-full py-2 pr-2 text-left text-[15px] leading-6 transition ${
                            isActive
                              ? "font-bold text-[var(--accent-ink)]"
                              : "text-ink hover:text-[var(--accent-ink)]"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {ql && visibleItems === 0 && (
          <p className="mt-6 text-center text-[13px] text-muted">
            No categories found
          </p>
        )}
      </div>
    </aside>
  );
}
