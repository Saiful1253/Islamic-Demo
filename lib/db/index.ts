import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const isVercel = process.env.VERCEL === "1";

const dataDir = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "app.db");
const bundledDbPath = path.join(process.cwd(), "data", "app.db");

fs.mkdirSync(dataDir, { recursive: true });

if (isVercel && fs.existsSync(bundledDbPath) && !fs.existsSync(dbPath)) {
  fs.copyFileSync(bundledDbPath, dbPath);
}

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

export type Db = typeof db;
