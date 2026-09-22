/**
 * Flushes the SQLite WAL log back into the main database file and removes
 * the `-wal` / `-shm` sidecar files.
 *
 * Runs as the last step of `npm run db:setup` (postbuild). Without it the
 * sidecar files linger next to data/app.db, end up in the Vercel upload
 * manifest, and can vanish mid-deploy -> `ENOENT ... app.db-shm`.
 *
 * The app re-enables WAL mode itself on open (lib/db/index.ts), so switching
 * back to DELETE journaling here is safe.
 */
import fs from "node:fs";
import Database from "better-sqlite3";

const dbPath = process.env.SQLITE_DB_PATH ?? "./data/app.db";

if (!fs.existsSync(dbPath)) {
  console.log(`Checkpoint skipped: ${dbPath} does not exist`);
  process.exit(0);
}

const db = new Database(dbPath);

// Another process (e.g. Drizzle Studio) may hold the database open. On the
// Vercel build machine nothing else touches the DB, so this always succeeds
// there; locally we just warn and keep the sidecars for the next run.
function tryPragma(pragma: string) {
  try {
    db.pragma(pragma);
    return true;
  } catch (error) {
    console.warn(`Checkpoint: "${pragma}" skipped - ${(error as Error).message}`);
    return false;
  }
}

const flushed = tryPragma("wal_checkpoint(TRUNCATE)");
const switchedToDelete = flushed && tryPragma("journal_mode = DELETE");
db.close();

// Only remove the sidecars when SQLite finished in DELETE mode (it normally
// removes them itself). When another process still holds the database open
// the sidecars stay so that connection does not break.
if (switchedToDelete) {
  for (const suffix of ["-wal", "-shm"]) {
    try {
      fs.rmSync(`${dbPath}${suffix}`, { force: true });
    } catch {
      console.warn(`Checkpoint: could not remove ${dbPath}${suffix}`);
    }
  }
}

console.log(`Checkpointed ${dbPath}`);
