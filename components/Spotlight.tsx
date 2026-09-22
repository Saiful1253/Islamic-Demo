import { ArrowUpRight } from "lucide-react";
import { Corner, CoverArt } from "./Ornaments";

const articles = [
  {
    variant: 1 as const,
    chip: "সিরিজ ০১",
    title: "রমজানের প্রস্তুতি: ৩০ দিনের সহজ পরিকল্পনা",
    meta: "আলোচনা সিরিজ",
    read: "৮ মিনিট পাঠ",
  },
  {
    variant: 2 as const,
    chip: "আমলিকতা",
    title: "নামাজের প্রথম রাকাত: খেয়াল ধরার কৌশল",
    meta: "নামাজ ও আদব-কায়দা",
    read: "৫ মিনিট পাঠ",
  },
  {
    variant: 3 as const,
    chip: "দৈনন্দিন",
    title: "সন্ধ্যার পরিবারিক দোয়া: ছোট অভ্যাস, বড় বরকত",
    meta: "পরিবার ও সন্তান",
    read: "৬ মিনিট পাঠ",
  },
];

export default function Spotlight() {
  return (
    <section
      id="alochna"
      className="grain relative overflow-hidden bg-night py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="lattice absolute inset-0 opacity-30"
        style={{
          maskImage:
            "radial-gradient(700px 400px at 50% 8%, #000 5%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(700px 400px at 50% 8%, #000 5%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---------- ayah spotlight, ornate frame ---------- */}
        <div className="reveal mx-auto max-w-4xl border border-gold/55 p-1.5">
          <div className="relative border border-gold/30 bg-night-soft/80 px-6 py-12 text-center md:px-16 md:py-16">
            <Corner className="absolute left-2 top-2 h-8 w-8 text-gold/80" />
            <Corner className="absolute right-2 top-2 h-8 w-8 rotate-90 text-gold/80" />
            <Corner className="absolute bottom-2 right-2 h-8 w-8 rotate-180 text-gold/80" />
            <Corner className="absolute bottom-2 left-2 h-8 w-8 -rotate-90 text-gold/80" />

            <p className="text-xs font-semibold text-gold">আজকের আয়াত</p>

            <p
              dir="rtl"
              lang="ar"
              className="mx-auto mt-7 max-w-2xl font-arabic text-[1.8rem] leading-[2.2] text-gold-light sm:text-[2.2rem] md:text-[2.7rem]"
            >
              أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
            </p>

            <span
              aria-hidden="true"
              className="gold-rule mx-auto mt-7 block w-40"
            />

            <p className="mx-auto mt-7 max-w-2xl text-base leading-loose text-cream md:text-lg">
              “জেনে রাখো, আল্লাহর স্মরণেই প্রশান্তি পায় হৃদয়সমূহ।”
            </p>

            <p className="mt-6 inline-block border border-gold/45 px-3.5 py-1.5 font-display text-xs text-gold">
              সূরা রাদ · ১৩:২৮
            </p>
          </div>
        </div>

        {/* ---------- recent writing ---------- */}
        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-gold">নতুন লেখা</p>
            <h2 className="mt-2 font-display text-2xl text-cream md:text-3xl">
              সাম্প্রতিক আলোচনা ও সিরিজ
            </h2>
          </div>
          <a
            href="#alochna"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-gold-light transition-colors hover:text-gold"
          >
            সব লেখা দেখুন
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.title}
              href="#alochna"
              className="group flex flex-col border border-gold/40 bg-parchment text-ink transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_-18px_rgba(4,18,15,0.75)]"
            >
              <div className="relative h-40 overflow-hidden border-b border-gold/35">
                <CoverArt
                  variant={article.variant}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 border border-gold/50 bg-night/85 px-2.5 py-1 text-[11px] font-medium text-gold-light">
                  {article.chip}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg leading-snug transition-colors group-hover:text-clay">
                  {article.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-6 text-xs text-ink-soft">
                  <span>{article.meta}</span>
                  <span className="inline-flex items-center gap-1.5">
                    {article.read}
                    <ArrowUpRight className="h-3.5 w-3.5 text-clay transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
