export type DuaBlock =
  | { kind: "label"; text: string }
  | { kind: "text"; text: string };

export interface Dua {
  id: number;
  title: string;
  intro?: string;
  arabic: string;
  translit: string;
  blocks: DuaBlock[];
  reference: string;
}

export interface SidebarItem {
  label: string;
  child: boolean;
}

export interface SidebarSection {
  id: number;
  title: string;
  meta: string;
  /** Illustration exported from Figma (44×44 rounded tile). */
  img: string;
  open: boolean;
  items: SidebarItem[];
}

export interface Language {
  code: string;
  label: string;
}

export const SECTION_DEFAULT = "The servant is dependent on his Lord";

// Content (duas, sidebar sections, languages) now lives in SQLite.
// Read it through the server-side helpers in `lib/db/queries.ts`;
// re-seed the database with `npm run db:seed`.
