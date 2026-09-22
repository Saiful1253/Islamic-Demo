import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

/**
 * SQLite connection (server-only).
 *
 * `better-sqlite3` is a synchronous native driver; Next.js already treats it
 * as an external server package, so it never reaches the client bundle.
 * Override the file location with `SQLITE_DB_PATH` if needed.
 */
const dbPath =
  process.env.SQLITE_DB_PATH ?? path.join(process.cwd(), "data", "app.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

export type Db = typeof db;
