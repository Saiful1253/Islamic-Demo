import { Download } from "lucide-react";
import { LogoMark } from "./Ornaments";
import MobileNav from "./MobileNav";

const links = [
  { label: "হোম", href: "#top" },
  { label: "নামাজের সময়", href: "#namaz" },
  { label: "কুরআন", href: "#quran" },
  { label: "দোয়া", href: "#dua" },
  { label: "আলোচনা", href: "#alochna" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/45 bg-night">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <LogoMark className="h-9 w-9 text-gold" id="hdr" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl text-cream">নূরানী</span>
            <span className="mt-1 text-[11px] tracking-wide text-gold/85">
              ইসলামিক পোর্টাল
            </span>
          </span>
        </a>

        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden items-center gap-1 md:flex"
        >
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={i === 0 ? "page" : undefined}
              className={`group relative px-3 py-2 text-[15px] transition-colors ${
                i === 0
                  ? "text-gold"
                  : "text-cream-soft hover:text-cream"
              }`}
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#jogajog"
            className="hidden items-center gap-2 bg-gold px-5 py-2.5 text-sm font-semibold text-night shadow-[4px_4px_0_0_#8f7a3d] transition-all hover:bg-gold-light active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#8f7a3d] md:inline-flex"
          >
            <Download className="h-4 w-4" />
            অ্যাপ ডাউনলোড
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
