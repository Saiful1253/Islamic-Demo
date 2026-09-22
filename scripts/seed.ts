/**
 * Populates (or re-populates) the SQLite database with the seed data.
 * Run with: npm run db:seed
 *
 * The actual logic lives in `lib/db/seed.ts` so the app can also
 * bootstrap an empty database automatically at runtime.
 */
import { db } from "../lib/db";
import {
  duaBlocks,
  duas,
  languages,
  sidebarItems,
  sidebarSections,
} from "../lib/db/schema";
import { seedDatabase } from "../lib/db/seed";

seedDatabase(db);

const counts = {
  languages: db.select().from(languages).all().length,
  sidebarSections: db.select().from(sidebarSections).all().length,
  sidebarItems: db.select().from(sidebarItems).all().length,
  duas: db.select().from(duas).all().length,
  duaBlocks: db.select().from(duaBlocks).all().length,
};

console.log("Seed complete:", counts);
