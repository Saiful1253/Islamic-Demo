import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const isVercel = process.env.VERCEL === "1";

const dataDir = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const dbPath =
  process.env.SQLITE_DB_PATH ??
  (isVercel ? path.join(dataDir, "app.db") : path.join(dataDir, "app.db"));
const bundledDbPath = path.join(process.cwd(), "data", "app.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

if (isVercel && !process.env.SQLITE_DB_PATH && fs.existsSync(bundledDbPath)) {
  fs.copyFileSync(bundledDbPath, dbPath);
}

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

export type Db = typeof db;
