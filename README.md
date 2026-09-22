# Dua & Ruqyah — Al Hisnul Muslim

A **Next.js 16** web application for reading Islamic supplications (Duas) from the book *Al Hisnul Muslim*. The app provides a rich reading experience with Arabic script, transliteration, English translation, references, and customizable reading settings.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 + CSS Custom Properties |
| Database | better-sqlite3 (file-based SQLite) |
| ORM | Drizzle ORM (type-safe queries, migrations, relations) |
| Icons | lucide-react |
| Fonts | Inter (UI), Amiri (Arabic, via next/font/google) |
| Deployment | Vercel |

---

## Features

- **Browse Duas**: Left sidebar with collapsible categories and sub-items
- **Search**: Real-time filtering of categories and dua items
- **Reading View**: Arabic text (RTL), transliteration, English translation, and references
- **Customization**:
  - Arabic font size slider (16–34px)
  - Translation font size slider
  - Arabic script selection: Uthmani, Naskh, Scheherazade
  - Toggle transliteration, references, section bar
  - Density modes: Comfortable / Compact
  - Accent themes: Classic Green, Teal, Amber
- **Responsive**: Slide-out sidebar on mobile, sticky panels on desktop
- **Offline-ready**: Local SQLite database with self-healing bootstrap

---

## Database Schema

Four SQLite tables managed by Drizzle ORM:

```
languages          — language switcher options
sidebar_sections   — collapsible sidebar groups
sidebar_items      — dua items inside sections (child items get indent arrows)
duas               — dua records (title, intro, arabic, translit, reference)
dua_blocks         — ordered content chunks of a dua (label/text)
```

Relations:
- `sidebar_sections` → has many `sidebar_items` (cascade delete)
- `duas` → has many `dua_blocks` (cascade delete)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Database Setup

```bash
npm run db:setup
```

This runs migrations, seeds the database, and checkpoints the DB file.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Drizzle Studio (DB browser at http://localhost:4983) |
| `npm run db:checkpoint` | Checkpoint SQLite WAL to main DB file |
| `npm run db:setup` | Run migrate + seed + checkpoint in sequence |

---

## Project Structure

```
app/
  layout.tsx        — root layout, Google Fonts (Inter, Amiri)
  page.tsx          — server component, fetches data and renders DuaApp
  globals.css       — Tailwind 4 + custom design tokens
  lib/data.ts       — shared types (Dua, DuaBlock, SidebarSection, Language)

components/
  DuaApp.tsx        — client root shell, state management
  Header.tsx        — top bar with logo, language dropdown, actions
  Sidebar.tsx       — searchable, collapsible category tree
  ContentArea.tsx   — breadcrumb, section title, dua list
  DuaCard.tsx       — individual dua display with action buttons
  SettingsPanel.tsx — font, view, and appearance settings drawers
  IconRail.tsx      — vertical icon strip
  SiteHeader.tsx    — alternate header variant
  SiteFooter.tsx    — footer component
  StatsBand.tsx     — stats band component
  Spotlight.tsx     — spotlight component
  Features.tsx      — features section
  Ornaments.tsx     — decorative ornaments
  NewsletterForm.tsx — newsletter signup form
  MobileNav.tsx     — mobile navigation
  PrayerStrip.tsx   — prayer time strip

lib/
  settings.ts       — Settings type, defaults, accent palette, script list
  useClickOutside.ts — reusable click-outside hook
  db/
    schema.ts       — Drizzle tables and relations
    index.ts        — Database singleton, self-healing bootstrap
    queries.ts      — cached server-side data functions
    seed.ts         — seed insertion logic
    seed-data.ts    — source data arrays

scripts/
  seed.ts           — npm run db:seed entry point
  checkpoint-db.ts  — DB checkpoint after seeding
  check-db.ts       — database check utility

public/
  img/              — images, icons, flags, tiles
```

---

## Data Flow

```
app/page.tsx (Server Component)
    ↓
Promise.all([
  getDuas(),           → cached server-side query
  getSidebarSections(), → cached server-side query
  getLanguages()       → cached server-side query
])
    ↓
Passes data as props to <DuaApp /> (Client Component)
    ↓
DuaApp renders:
  Header | IconRail | Sidebar | ContentArea | SettingsPanel
```

---

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `SQLITE_DB_PATH=/tmp/app.db` (optional — defaults to `/tmp/app.db` on Vercel)
4. Deploy

The app auto-initializes the database on first deploy:
- On Vercel, the bundled `data/app.db` is copied to `/tmp/app.db`
- If no tables exist, migrations and seed run automatically via `ensureDatabase()`

---

## Design Decisions

- **SQLite over Postgres**: Zero-config, file-based, portable — ideal for a digital book
- **Drizzle ORM**: Type-safe schema, relations, and migration tooling
- **Server Components**: Data fetched server-side; client components only for interactivity
- **React.cache()**: Deduplicates DB queries within a single request
- **connection() from next/server**: Defers synchronous better-sqlite3 to request time
- **Self-healing bootstrap**: DB initializes automatically on first deploy
- **CSS Variables for themes**: Runtime accent switching without re-rendering the whole app
