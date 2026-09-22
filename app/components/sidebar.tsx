"use client";

import { useMemo, useState } from "react";
import { Search, CornerDownRight } from "lucide-react";
import { categories, tree } from "../lib/data";

export default function Sidebar() {
  const [query, setQuery] = useState("");
  const [activeNode, setActiveNode] = useState("t2");

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.title.toLowerCase().includes(q));
  }, [query]);

  const visibleTree = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tree;
    return tree.filter((n) => n.label.toLowerCase().includes(q));
  }, [query]);

  const showFirstBlock = visibleCategories.some((c) => c.id === "c1");

  return (
    <aside className="hidden w-[351px] shrink-0 flex-col overflow-y-auto border-r border-line bg-surface lg:flex">
      {/* Search */}
      <div className="px-6 pt-[27px]">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Dua Categories"
            className="h-[38px] w-full rounded-full border border-line bg-field pl-[42px] pr-4 text-[14px] text-ink placeholder:text-muted outline-none transition focus:border-brand/40"
          />
        </div>
      </div>

      {/* Category + tree list */}
      <div className="px-6 pt-[30px]">
        {showFirstBlock && (
          <>
            <CategoryRow
              emoji={visibleCategories[0].emoji}
              title={visibleCategories[0].title}
              meta={visibleCategories[0].meta}
            />

            {/* Tree */}
            <ul className="relative ml-[50px] mt-[26px] border-l border-dashed border-[#cbdacf] pb-1">
              {visibleTree.map((node) => {
                const isActive = activeNode === node.id;
                if (node.level === 2) {
                  return (
                    <li key={node.id} className="relative pl-[32px]">
                      <CornerDownRight
                        size={14}
                        strokeWidth={2}
                        className="absolute left-0 top-[10px] text-brand"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveNode(node.id)}
                        className={
                          "block w-full py-[7px] pr-2 text-left text-[14px] leading-[21px] transition-colors " +
                          (isActive
                            ? "font-semibold text-brand"
                            : "text-ink hover:text-brand")
                        }
                      >
                        {node.label}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={node.id} className="relative pl-6">
                    <span className="absolute left-0 top-[19px] w-[14px] border-t border-dashed border-[#cbdacf]" />
                    <button
                      type="button"
                      onClick={() => setActiveNode(node.id)}
                      className={
                        "block w-full py-[7px] pr-2 text-left text-[14px] leading-[21px] transition-colors " +
                        (isActive
                          ? "font-semibold text-brand"
                          : "text-ink hover:text-brand")
                      }
                    >
                      {node.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Remaining categories */}
        <div className="mt-[26px] flex flex-col gap-[34px]">
          {visibleCategories.slice(1).map((c) => (
            <CategoryRow key={c.id} emoji={c.emoji} title={c.title} meta={c.meta} />
          ))}
        </div>

        {visibleCategories.length === 0 && visibleTree.length === 0 && (
          <p className="mt-8 text-[14px] text-muted">No results found.</p>
        )}
      </div>

      <div className="h-8" />
    </aside>
  );
}

function CategoryRow({
  emoji,
  title,
  meta,
}: {
  emoji: string;
  title: string;
  meta: string;
}) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-[22px] rounded-xl py-1 text-left transition-colors hover:bg-rail/70"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-tile text-[19px] leading-none">
        <span aria-hidden>{emoji}</span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-semibold text-ink">
          {title}
        </span>
        <span className="mt-[2px] block text-[13px] text-muted">{meta}</span>
      </span>
    </button>
  );
}
