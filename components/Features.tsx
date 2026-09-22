import {
  BookOpen,
  Clock,
  Hand,
  MapPin,
  MessagesSquare,
  Scroll,
} from "lucide-react";

const features = [
  {
    id: "quran",
    num: "০১",
    Icon: BookOpen,
    title: "কুরআন তিলাওয়াত",
    body: "পূর্ণ কুরআন, পারা অনুযায়ী বার্তা, অডিও তিলাওয়াত ও বাংলা অনুবাদ — প্রতিদিন এক পারা।",
  },
  {
    id: "namaz-time",
    num: "০২",
    Icon: Clock,
    title: "নামাজের সময়",
    body: "ঢাকা ও আপনার এলাকার নির্ভুল সময়সূচি, আজানের অ্যালার্ট আর পরবর্তী নামাজের কাউন্টডাউন।",
  },
  {
    id: "dua",
    num: "০৩",
    Icon: Hand,
    title: "দৈনিক দোয়া",
    body: "সকাল-সন্ধ্যার সংকলিত দোয়া, শুদ্ধ উচ্চারণ ও সহজ অর্থবোধসহ — আত্মিক শান্তির দৈনন্দিন সঙ্গী।",
  },
  {
    id: "hades",
    num: "০৪",
    Icon: Scroll,
    title: "হাদীস ও সুন্নাহ",
    body: "বিশ্বস্ত সূত্র থেকে নির্বাচিত হাদীস, রোজা ও প্রতিদিনের আমলের সংক্ষিপ্ত নির্দেশনা।",
  },
  {
    id: "forum",
    num: "০৫",
    Icon: MessagesSquare,
    title: "আলোচনা ফোরাম",
    body: "বিনয়ী পরিবেশে প্রশ্নোত্তর, বিশেষজ্ঞদের মতামত ও সম্প্রদায়ের সুন্দর আলোচনা।",
  },
  {
    id: "mosque",
    num: "০৬",
    Icon: MapPin,
    title: "মসজিদ লোকেশন",
    body: "আশপাশের মসজিদ, জামাতের সময়সূচি ও কমিউনিটি সেবার সব তথ্য এক মানচিত্রে।",
  },
];

export default function Features() {
  return (
    <section id="khidmat" className="relative bg-parchment py-20 text-ink md:py-28">
      <div aria-hidden="true" className="weave absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-clay">সেবার স্তম্ভগুলো</p>
          <h2 className="mt-2 font-display text-3xl leading-snug text-ink md:text-[2.5rem]">
            কী থাকছে নূরানীতে
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft md:text-base">
            ইবাদত ও জ্ঞানের ছয়টি স্তম্ভ — প্রতিদিন, এক জায়গায়। প্রতিটি ঘরে
            গভীরতা, প্রতিটি লাইনে স্পষ্টতা।
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 gap-px border border-gold/45 bg-gold/30 md:grid-cols-3">
          {features.map(({ id, num, Icon, title, body }) => (
            <article
              key={id}
              id={id}
              className="group relative bg-parchment p-7 transition-colors duration-300 hover:bg-ivory md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 shrink-0 rotate-45 place-items-center border border-gold/70 text-pine transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20">
                  <Icon
                    className="h-6 w-6 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                  />
                </div>
                <span className="font-display text-sm text-gold-dim">
                  {num}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl text-ink">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                {body}
              </p>

              <span
                aria-hidden="true"
                className="mt-6 block h-px w-10 bg-gold/70 transition-all duration-300 group-hover:w-20 group-hover:bg-clay"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
