import { ArrowRight } from "lucide-react";
import { Rosette, RubElHizb } from "./Ornaments";

const microFacts = [
  "নির্ভুল সময়সূচি",
  "অডিও ও অনুবাদ",
  "নিঃশুল্ক সদস্যপদ",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate overflow-hidden bg-night pb-44 pt-12 md:pb-56 md:pt-20"
    >
      {/* ---------- background layers ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(720px 460px at 76% 30%, rgba(201,162,39,0.16), transparent 70%), radial-gradient(900px 620px at 12% 90%, rgba(15,61,51,0.85), transparent 65%), linear-gradient(180deg, #04120f 0%, #071a14 55%, #04120f 100%)",
          }}
        />
        <div
          className="lattice absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(680px 460px at 74% 34%, #000 10%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(680px 460px at 74% 34%, #000 10%, transparent 72%)",
          }}
        />
      </div>

      {/* ---------- rosette composition ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 right-[-34%] top-1/2 w-[430px] -translate-y-1/2 opacity-45 sm:right-[-26%] sm:w-[540px] lg:right-[-4%] lg:w-[520px] lg:opacity-100 xl:right-[1%] xl:w-[600px]"
      >
        <Rosette className="h-full w-full" />
      </div>

      {/* readability scrim (mobile) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 lg:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,18,15,0.94) 0%, rgba(4,18,15,0.82) 55%, rgba(4,18,15,0.55) 100%)",
        }}
      />

      {/* ---------- content ---------- */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p
            className="rise flex items-center gap-3 text-sm text-gold"
            style={{ animationDelay: "0.05s" }}
          >
            <RubElHizb className="h-4 w-4 shrink-0" />
            প্রতিদিনের ঈমান ও ইবাদতের ঘর
            <span
              aria-hidden="true"
              className="hidden h-px w-20 bg-gold/50 sm:block"
            />
          </p>

          <h1
            className="rise mt-6 font-display text-[2.6rem] leading-[1.28] text-cream sm:text-6xl lg:text-[4.6rem]"
            style={{ animationDelay: "0.15s" }}
          >
            যত গভীর রাত —<br />
            তত উজ্জ্বল{" "}
            <span className="text-gold-light">নূর</span>
          </h1>

          <div
            className="rise mt-8 inline-flex max-w-full items-center gap-4 border border-gold/40 bg-night-soft/75 px-5 py-3"
            style={{ animationDelay: "0.3s" }}
          >
            <span aria-hidden="true" className="text-gold">
              ✦
            </span>
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl leading-[2] text-gold-light sm:text-2xl md:text-3xl"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
          <p
            className="rise mt-2 text-xs text-cream-soft/90"
            style={{ animationDelay: "0.36s" }}
          >
            পবিত্র বিসমিল্লাহ দিয়ে শুরু করুন প্রতিটি কাজ
          </p>

          <p
            className="rise mt-7 max-w-xl text-base leading-relaxed text-cream-soft md:text-lg"
            style={{ animationDelay: "0.42s" }}
          >
            নামাজের সময় থেকে কুরআন তিলাওয়াত, দৈনিক দোয়া থেকে বিশ্বস্ত
            আলোচনা — সবকিছু এক ঘরে। নূরানী আপনার প্রতিদিনকে মর্যাদা দেয়,
            প্রতিটি ক্ষণকে অর্থবোধ দেয়।
          </p>

          <div
            className="rise mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.52s" }}
          >
            <a
              href="#namaz"
              className="group inline-flex items-center justify-center gap-2 bg-gold px-6 py-3.5 font-semibold text-night shadow-[5px_5px_0_0_#8f7a3d] transition-all hover:bg-gold-light active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0_0_#8f7a3d]"
            >
              আজকের নামাজের সময় দেখুন
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#quran"
              className="inline-flex items-center justify-center gap-2 border border-gold/60 px-6 py-3.5 font-medium text-gold-light transition-colors hover:border-gold hover:bg-gold/10"
            >
              কুরআন পড়া শুরু করুন
            </a>
          </div>

          <ul
            className="rise mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream-soft/90"
            style={{ animationDelay: "0.62s" }}
          >
            {microFacts.map((fact, i) => (
              <li key={fact} className="flex items-center gap-5">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-gold">
                    ✦
                  </span>
                ) : null}
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
