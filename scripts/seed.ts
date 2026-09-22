/**
 * Populates (or re-populates) the SQLite database with the seed data.
 * Run with: npm run db:seed
 */
import { db } from "../lib/db";
import {
  duaBlocks,
  duas,
  languages,
  sidebarItems,
  sidebarSections,
} from "../lib/db/schema";
import { seedDuas, seedLanguages, seedSidebarSections } from "./seed-data";

function seed() {
  // Wipe existing rows so the seed is idempotent.
  db.delete(duaBlocks).run();
  db.delete(duas).run();
  db.delete(sidebarItems).run();
  db.delete(sidebarSections).run();
  db.delete(languages).run();

  seedLanguages.forEach((lang, i) => {
    db.insert(languages)
      .values({ code: lang.code, label: lang.label, position: i })
      .run();
  });

  seedSidebarSections.forEach((sec, i) => {
    const inserted = db
      .insert(sidebarSections)
      .values({
        title: sec.title,
        meta: sec.meta,
        img: sec.img,
        open: sec.open,
        position: i,
      })
      .returning({ id: sidebarSections.id })
      .get();
    const sectionId = inserted!.id;

    if (sec.items.length > 0) {
      db.insert(sidebarItems)
        .values(
          sec.items.map((item, j) => ({
            sectionId,
            label: item.label,
            child: item.child,
            position: j,
          })),
        )
        .run();
    }
  });

  // Keep the explicit ids from the seed data so they stay stable.
  for (const dua of seedDuas) {
    db.insert(duas)
      .values({
        id: dua.id,
        title: dua.title,
        intro: dua.intro ?? null,
        arabic: dua.arabic,
        translit: dua.translit,
        reference: dua.reference,
      })
      .run();

    db.insert(duaBlocks)
      .values(
        dua.blocks.map((block, j) => ({
          duaId: dua.id,
          position: j,
          kind: block.kind,
          text: block.text,
        })),
      )
      .run();
  }

  const counts = {
    languages: db.select().from(languages).all().length,
    sidebarSections: db.select().from(sidebarSections).all().length,
    sidebarItems: db.select().from(sidebarItems).all().length,
    duas: db.select().from(duas).all().length,
    duaBlocks: db.select().from(duaBlocks).all().length,
  };

  console.log("Seed complete:", counts);
}

seed();
