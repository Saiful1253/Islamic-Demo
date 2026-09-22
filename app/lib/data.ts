export type DuaBlock =
  | { kind: "lead"; text: string }
  | { kind: "arabic"; text: string }
  | { kind: "translit"; text: string }
  | { kind: "label"; text: string }
  | { kind: "para"; text: string }
  | { kind: "quote"; text: string };

export type Dua = {
  id: string;
  number: number;
  title: string;
  /** the word rendered in dark regular weight inside the green bold title */
  highlight: string;
  blocks: DuaBlock[];
  reference: string;
};

export type Category = {
  id: string;
  title: string;
  meta: string;
  emoji: string;
};

export type TreeNode = {
  id: string;
  label: string;
  level: 1 | 2;
};

export const categories: Category[] = [
  { id: "c1", title: "Dua's Importance", meta: "7 Subcat | 50 Duas", emoji: "🤲" },
  { id: "c2", title: "Dua's Importance", meta: "7 Subcat | 50 Duas", emoji: "🕋" },
  { id: "c3", title: "Dua's Importance", meta: "7 Subcat | 50 Duas", emoji: "📿" },
  { id: "c4", title: "Dua's Importance", meta: "7 Subcat | 50 Duas", emoji: "🥁" },
  { id: "c5", title: "Dua's Importance", meta: "7 Subcat | 50 Duas", emoji: "✨" },
];

export const tree: TreeNode[] = [
  { id: "t1", label: "The servant is dependent on his Lord", level: 1 },
  { id: "t2", label: "The most important thing to ask Allah for", level: 1 },
  { id: "t3", label: "4. Allah's guidance #1", level: 2 },
  { id: "t4", label: "5. Allah's guidance #2", level: 2 },
  { id: "t5", label: "6. Allah's guidance #3", level: 2 },
  { id: "t6", label: "7. Allah's guidance #4", level: 2 },
  { id: "t7", label: "8. The servant is dependent on his Lord #1", level: 2 },
  { id: "t8", label: "Ask for paradise & protection from fire", level: 1 },
];

export const sectionTitle = "The servant is dependent on his Lord";

export const duas: Dua[] = [
  {
    id: "d1",
    number: 1,
    title: "The servant is dependent on his Lord",
    highlight: "dependent",
    reference: "Surah Al-Fatir 35:15",
    blocks: [
      { kind: "arabic", text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
      {
        kind: "translit",
        text: "Iyyaaka na'budu wa iyyaaka nasta'een",
      },
      { kind: "label", text: "Translation" },
      {
        kind: "para",
        text: "All human beings depend on Allah for their welfare and prevention of evil in various matters of their religion and world. Allah says (interpretation of the meaning): O mankind, you are those in need of Allah, while Allah is the Free of need, the Praiseworthy.",
      },
    ],
  },
  {
    id: "d2",
    number: 2,
    title: "The servant is dependent on his Lord",
    highlight: "dependent",
    reference: "Surah Al-Fatir 35:15",
    blocks: [
      {
        kind: "arabic",
        text: "لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ ٱللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِىَ لِمَا مَنَعْتَ وَلَا يَنفَعُ ذَا ٱلْجَدِّ مِنْكَ ٱلْجَدُّ",
      },
      {
        kind: "translit",
        text: "Laa ilaaha illallahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir. Allaahumma laa maani'a limaa a'taita wa laa mu'tia limaa mana'ta wa laa yanfa'u dhal-jaddi minka al-jaddu",
      },
      { kind: "label", text: "Translation" },
      {
        kind: "para",
        text: "There is none worthy of worship except Allah alone with no partner or associate. He is the Dominion and to Him be all praise, and He is able to do all things. O Allah, one can withhold what You have given and none can give what You have withheld, and no wealth or fortune can benefit anyone for from You comes all wealth and fortune.",
      },
      {
        kind: "para",
        text: 'Prophet (ﷺ) used to say after every compulsory prayer, The servant will ask his Lord for all of his religiously and worldly needs, because the treasure of all things is in the hands of Allah. Allah says (interpretation of the meaning): "And there is not a thing but that with Us are its depositories, and We do not send it down except according to a known measure." (Sura Al-Hijr 15:21) No one can withhold what Allah gives; And, no one can give what he resists.',
      },
    ],
  },
  {
    id: "d3",
    number: 3,
    title: "The servant is dependent on his Lord",
    highlight: "dependent",
    reference: "Surah Al-Fatir 35:15",
    blocks: [
      { kind: "lead", text: "Say the following statement 10 times –" },
      {
        kind: "arabic",
        text: "لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ٱلْمُلْكُ وَلَهُ ٱلْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ",
      },
      {
        kind: "translit",
        text: "Laa ilahaa illAllahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir",
      },
      { kind: "label", text: "Translation" },
      {
        kind: "para",
        text: "None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise, and He is Able to do all things.",
      },
      { kind: "quote", text: "The Prophet (ﷺ) said:" },
      {
        kind: "para",
        text: "The person who says the above statement 10 times It would be as if he had freed four of Ishmael's (As) children from slavery.",
      },
    ],
  },
];
