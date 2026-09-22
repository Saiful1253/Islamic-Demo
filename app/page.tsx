import DuaApp from "@/components/DuaApp";
import { getDuas, getLanguages, getSidebarSections } from "@/lib/db/queries";

export default async function Home() {
  // Server-side SQLite reads (see lib/db/queries.ts)
  const [duas, sidebarSections, languages] = await Promise.all([
    getDuas(),
    getSidebarSections(),
    getLanguages(),
  ]);

  return (
    <DuaApp duas={duas} sidebarSections={sidebarSections} languages={languages} />
  );
}
