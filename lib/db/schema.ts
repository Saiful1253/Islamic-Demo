import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** Language switcher options shown in the header. */
export const languages = sqliteTable("languages", {
  code: text("code").primaryKey(),
  label: text("label").notNull(),
  position: integer("position").notNull().default(0),
});

/** Collapsible groups in the left sidebar. */
export const sidebarSections = sqliteTable("sidebar_sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  meta: text("meta").notNull(),
  img: text("img").notNull(),
  open: integer("open", { mode: "boolean" }).notNull().default(false),
  position: integer("position").notNull().default(0),
});

/** Dua entries inside a sidebar group; `child` renders with an indent arrow. */
export const sidebarItems = sqliteTable("sidebar_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sectionId: integer("section_id")
    .notNull()
    .references(() => sidebarSections.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  child: integer("child", { mode: "boolean" }).notNull().default(false),
  position: integer("position").notNull().default(0),
});

export const duas = sqliteTable("duas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  intro: text("intro"),
  arabic: text("arabic").notNull(),
  translit: text("translit").notNull(),
  reference: text("reference").notNull(),
});

/** Ordered content chunks of a dua (label / text pairs). */
export const duaBlocks = sqliteTable("dua_blocks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  duaId: integer("dua_id")
    .notNull()
    .references(() => duas.id, { onDelete: "cascade" }),
  position: integer("position").notNull().default(0),
  kind: text("kind", { enum: ["label", "text"] }).notNull(),
  text: text("text").notNull(),
});

export const sidebarSectionsRelations = relations(sidebarSections, ({ many }) => ({
  items: many(sidebarItems),
}));

export const sidebarItemsRelations = relations(sidebarItems, ({ one }) => ({
  section: one(sidebarSections, {
    fields: [sidebarItems.sectionId],
    references: [sidebarSections.id],
  }),
}));

export const duasRelations = relations(duas, ({ many }) => ({
  blocks: many(duaBlocks),
}));

export const duaBlocksRelations = relations(duaBlocks, ({ one }) => ({
  dua: one(duas, { fields: [duaBlocks.duaId], references: [duas.id] }),
}));
