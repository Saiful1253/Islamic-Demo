import { Download, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookMark,
  InstagramMark,
  LogoMark,
  RubElHizb,
  XMark,
  YoutubeMark,
} from "./Ornaments";

const quickLinks = [
  "নামাজের সময়",
  "কুরআন তিলাওয়াত",
  "দৈনিক দোয়া",
  "হাদীস ও সুন্নাহ",
  "আলোচনা ফোরাম",
  "মসজিদ লোকেশন",
];

const quickHrefs = ["#namaz", "#quran", "#dua", "#hades", "#forum", "#mosque"];

const contact = [
  { Icon: MapPin, text: "১২/A, মিরপুর ১০, ঢাকা ১২১৬" },
  { Icon: Phone, text: "+৮৮০ ১৭১১-০০০ ০০০" },
  { Icon: Mail, text: "salam@noorani.example" },
];

const socials = [
  { label: "ফেসবুক", Mark: FacebookMark },
  { label: "ইউটিউব", Mark: YoutubeMark },
  { label: "ইনস্টাগ্রাম", Mark: InstagramMark },
  { label: "এক্স", Mark: XMark },
];

export default function SiteFooter() {
  return (
    <footer className="relative bg-night">
      <div className="gold-rule" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.7fr_1fr_1fr] lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
        {/* about */}
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9 text-gold" id="ftr" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl text-cream">নূরানী</span>
              <span className="mt-1 text-[11px] text-gold/85">
                ইসলামিক পোর্টাল
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-soft">
            বাংলা ভাষার পাঠকদের জন্য আধুনিক ইসলামিক পোর্টাল — নির্ভুল সময়,
            বিশ্বস্ত উৎস ও বিনয়ী আলোচনার সমন্বয়ে গড়া।
          </p>
          <p
            dir="rtl"
            lang="ar"
            className="mt-6 font-arabic text-xl text-gold-light"
          >
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
          <p className="mt-1 text-xs text-cream-soft/85">
            “হে রব, আমার জ্ঞান বৃদ্ধি করো” — সূরা ত্ব-হা · ২০:১১৪
          </p>
        </div>

        {/* quick links */}
        <nav aria-label="দ্রুত লিংক">
          <h3 className="font-display text-base text-gold-light">
            দ্রুত লিংক
            <span
              aria-hidden="true"
              className="mt-2 block h-px w-8 bg-gold/60"
            />
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((label, i) => (
              <li key={label}>
                <a
                  href={quickHrefs[i]}
                  className="text-sm text-cream-soft transition-colors hover:text-gold"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* contact */}
        <div>
          <h3 className="font-display text-base text-gold-light">
            যোগাযোগ
            <span
              aria-hidden="true"
              className="mt-2 block h-px w-8 bg-gold/60"
            />
          </h3>
          <ul className="mt-5 space-y-3.5">
            {contact.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-2.5 text-sm">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-cream-soft">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* socials — lg and up (spans full on md) */}
        <div className="md:col-span-3 lg:col-span-1">
          <h3 className="font-display text-base text-gold-light">
            সঙ্গে থাকুন
            <span
              aria-hidden="true"
              className="mt-2 block h-px w-8 bg-gold/60"
            />
          </h3>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, Mark }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                className="grid h-10 w-10 rotate-45 place-items-center border border-gold/55 text-gold transition-colors hover:bg-gold/15"
              >
                <Mark className="h-4 w-4 -rotate-45" />
              </a>
            ))}
          </div>
          <a
            href="#jogajog"
            className="mt-6 inline-flex items-center gap-2 border border-gold/55 px-4 py-2.5 text-sm text-gold-light transition-colors hover:bg-gold/10"
          >
            <Download className="h-4 w-4" />
            অ্যাপ ডাউনলোড
          </a>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-gold/25">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-7 sm:px-8">
          <RubElHizb className="h-4 w-4 text-gold/80" />
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-sm text-gold-dim"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-center text-xs leading-relaxed text-cream-soft/85">
            আল্লাহর রহমতে নির্মিত · © ২০২৬ নূরানী ইসলামিক পোর্টাল · সর্বস্বত্ব
            সংরক্ষিত
          </p>
          <div className="flex items-center gap-5 text-xs text-cream-soft/80">
            <a href="#top" className="transition-colors hover:text-gold">
              গোপনীয়তা নীতি
            </a>
            <span aria-hidden="true" className="text-gold/60">
              ✦
            </span>
            <a href="#top" className="transition-colors hover:text-gold">
              শর্তাবলি
            </a>
            <span aria-hidden="true" className="text-gold/60">
              ✦
            </span>
            <a href="#jogajog" className="transition-colors hover:text-gold">
              যোগাযোগ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
