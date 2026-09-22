import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

const dbPath = process.env.SQLITE_DB_PATH ?? "./data/app.db";

// On a fresh clone (e.g. a Vercel build) the `data/` directory does not
// exist yet — better-sqlite3 refuses to open a file whose parent directory
// is missing, so create it up front.
fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });

export default defineConfig({
  dialect: "sqlite",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: dbPath,
  },
});
