import Database from "better-sqlite3";

const db = new Database("./data/app.db", { readonly: true });
const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
  .all() as { name: string }[];
console.log(
  "tables:",
  tables.map((t) => t.name).join(", ") || "(none)",
);
for (const t of ["languages", "sidebar_sections", "sidebar_items", "duas", "dua_blocks"]) {
  try {
    const row = db.prepare(`SELECT count(*) AS c FROM ${t}`).get() as { c: number };
    console.log(`${t}: ${row.c}`);
  } catch (e) {
    console.log(`${t}: ERROR ${(e as Error).message}`);
  }
}
