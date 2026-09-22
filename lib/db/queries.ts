import { cache } from "react";
import { connection } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "./index";
import {
  duaBlocks,
  duas,
  languages,
  sidebarItems,
  sidebarSections,
} from "./schema";
import type { Dua, Language, SidebarSection } from "@/lib/data";

/**
 * Server-side data access. Each function:
 *  - calls `connection()` so the synchronous better-sqlite3 driver runs at
 *    request time instead of being baked into the prerendered static shell
 *  - is wrapped in `React.cache` so multiple components in one request
 *    share a single query
 */

export const getLanguages = cache(async (): Promise<Language[]> => {
  await connection();
  return db
    .select({ code: languages.code, label: languages.label })
    .from(languages)
    .orderBy(asc(languages.position));
});

export const getSidebarSections = cache(async (): Promise<SidebarSection[]> => {
  await connection();
  const rows = await db.query.sidebarSections.findMany({
    orderBy: [asc(sidebarSections.position)],
    with: { items: { orderBy: [asc(sidebarItems.position)] } },
  });

  return rows.map((section) => ({
    id: section.id,
    title: section.title,
    meta: section.meta,
    img: section.img,
    open: section.open,
    items: section.items.map((item) => ({
      label: item.label,
      child: item.child,
    })),
  }));
});

export const getDuas = cache(async (): Promise<Dua[]> => {
  await connection();
  const rows = await db.query.duas.findMany({
    orderBy: [asc(duas.id)],
    with: { blocks: { orderBy: [asc(duaBlocks.position)] } },
  });

  return rows.map((dua) => ({
    id: dua.id,
    title: dua.title,
    intro: dua.intro ?? undefined,
    arabic: dua.arabic,
    translit: dua.translit,
    reference: dua.reference,
    blocks: dua.blocks.map((block) => ({
      kind: block.kind,
      text: block.text,
    })),
  }));
});
