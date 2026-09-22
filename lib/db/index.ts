import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import { seedDatabase } from "./seed";

const isVercel = process.env.VERCEL === "1";

const dataDir = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const dbPath =
  process.env.SQLITE_DB_PATH ?? path.join(dataDir, "app.db");
const bundledDbPath = path.join(process.cwd(), "data", "app.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

// On Vercel the seeded database from the build may already exist — copy it
// into the writable /tmp directory so reads work even on a cold start.
if (isVercel && !process.env.SQLITE_DB_PATH && fs.existsSync(bundledDbPath)) {
  fs.copyFileSync(bundledDbPath, dbPath);
}

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

/**
 * Self-healing bootstrap: if the database file exists but has no tables
 * (fresh machine, Vercel cold start without a bundled DB, deleted file…),
 * run the Drizzle migrations and seed automatically so the app never fails
 * with "no such table".
 */
function ensureDatabase() {
  const existing = sqlite
    .prepare(
      "SELECT COUNT(*) AS c FROM sqlite_master WHERE type = 'table' AND name = 'duas'",
    )
    .get() as { c: number };

  if (existing.c > 0) return;

  migrate(db, { migrationsFolder: path.join(process.cwd(), "lib/db/migrations") });
  seedDatabase(db);
  console.log("[db] initialized empty database (migrate + seed)");
}

ensureDatabase();

export type Db = typeof db;
