// Quick DB health check — run: node scripts/check-db.js
const Database = require("better-sqlite3");

try {
  const db = new Database("data/app.db", { readonly: true });
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    .all()
    .map((r) => r.name);
  console.log("tables:", tables.join(", ") || "(none)");

  for (const t of tables.filter((n) => !n.startsWith("sqlite_") && !n.startsWith("__"))) {
    try {
      const { c } = db.prepare(`SELECT count(*) AS c FROM "${t}"`).get();
      console.log(`  ${t}: ${c} rows`);
    } catch (e) {
      console.log(`  ${t}: ERROR ${e.message}`);
    }
  }
  db.close();
} catch (e) {
  console.log("ERROR:", e.message);
  process.exit(1);
}
