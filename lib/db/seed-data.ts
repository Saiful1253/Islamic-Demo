import type { Dua, Language, SidebarSection } from "../data";

/**
 * Source data used to populate the SQLite database.
 * After seeding, the database is the single source of truth —
 * this file only exists for seeding (`npm run db:seed` and the
 * automatic first-run bootstrap in `lib/db/index.ts`).
 */

export const seedLanguages: Language[] = [
  { code: "En", label: "English" },
  { code: "Ar", label: "العربية" },
  { code: "Ur", label: "اردو" },
  { code: "Tr", label: "Türkçe" },
  { code: "Id", label: "Bahasa" },
];

export const seedSidebarSections: SidebarSection[] = [
  {
    id: 1,
    title: "Dua's Importance",
    meta: "7 Subcat | 50 Duas",
    img: "/img/tile1.png",
    open: true,
    items: [
      { label: "The servant is dependent on his Lord", child: false },
      { label: "The most important thing to ask Allah for", child: false },
      { label: "4. Allah's guidance #1", child: true },
      { label: "5. Allah's guidance #2", child: true },
      { label: "6. Allah's guidance #3", child: true },
      { label: "7. Allah's guidance #4", child: true },
      { label: "8. The servant is dependent on his Lord #1", child: true },
      { label: "Ask for paradise & protection from fire", child: false },
    ],
  },
  {
    id: 2,
    title: "Dua's Importance",
    meta: "7 Subcat | 50 Duas",
    img: "/img/tile2.png",
    open: false,
    items: [],
  },
  {
    id: 3,
    title: "Dua's Importance",
    meta: "7 Subcat | 50 Duas",
    img: "/img/tile3.png",
    open: false,
    items: [],
  },
  {
    id: 4,
    title: "Dua's Importance",
    meta: "7 Subcat | 50 Duas",
    img: "/img/tile4.png",
    open: false,
    items: [],
  },
  {
    id: 5,
    title: "Dua's Importance",
    meta: "7 Subcat | 50 Duas",
    img: "/img/tile5.png",
    open: false,
    items: [],
  },
];

export const seedDuas: Dua[] = [
  {
    id: 1,
    title: "The servant is dependent on his Lord #1",
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translit: "iyyaaka na'budu wa iyyaaka nasta'een",
    blocks: [
      { kind: "label", text: "Translation" },
      {
        kind: "text",
        text: "All human beings depend on Allah for their welfare and prevention of evil in various matters of their religion and world. Allah says (interpretation of the meaning): O mankind, you are those in need of Allah, while Allah is the Free of need, the Praiseworthy.",
      },
    ],
    reference: "Surah Al-Fatir 35:15",
  },
  {
    id: 2,
    title: "The servant is dependent on his Lord #1",
    arabic:
      "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ۖ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ۚ اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
    translit:
      "Laa ilaaha illallahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir. Allaahumma laa maani'a limaa a'taita wa laa mu'tia limaa mana'ta wa laa yanfa'u dhal-jaddi minkal-jaddu",
    blocks: [
      { kind: "label", text: "Translation" },
      {
        kind: "text",
        text: "There is none worthy of worship except Allah alone with no partner or associate. He is the Dominion and to Him be all praise, and He is able to do all things. O Allah, one can withhold what You have given and none can give what You have withheld, and no wealth or fortune can benefit anyone for from You comes all wealth and fortune.",
      },
      {
        kind: "text",
        text: 'Prophet (ﷺ) used to say after every compulsory prayer, The servant will ask his Lord for all of his religiously and worldly needs, because the treasure of all things is in the hands of Allah. Allah says (interpretation of the meaning): "And there is not a thing but that with Us are its depositories, and We do not send it down except according to a known measure." (Sura Al-Hijr 15:21) No one can withhold what Allah gives; And, no one can give what he resists.',
      },
    ],
    reference: "Surah Al-Fatir 35:15",
  },
  {
    id: 3,
    title: "The servant is dependent on his Lord #1",
    intro: "Say the following statement 10 times →",
    arabic:
      "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translit:
      "Laa ilahaa illAllahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir",
    blocks: [
      { kind: "label", text: "Translation" },
      {
        kind: "text",
        text: "None has the right to be worshipped but Allah alone with no partner, His is the dominion and His is the praise, and He is Able to do all things.",
      },
      { kind: "label", text: "The Prophet (ﷺ) said:" },
      {
        kind: "text",
        text: "The person who says the above statement 10 times it would be as if he had freed four of Isma'eel's (As) children from slavery.",
      },
    ],
    reference: "Surah Al-Fatir 35:15",
  },
];
