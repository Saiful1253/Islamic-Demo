"use client";

import { useState } from "react";
import { Download, Menu, X } from "lucide-react";

const links = [
  { label: "হোম", href: "#top" },
  { label: "নামাজের সময়", href: "#namaz" },
  { label: "কুরআন", href: "#quran" },
  { label: "দোয়া", href: "#dua" },
  { label: "আলোচনা", href: "#alochna" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        className="grid h-11 w-11 place-items-center border border-gold/50 text-gold transition-colors hover:bg-gold/15"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="drop absolute inset-x-0 top-full border-b-2 border-gold bg-night shadow-[0_24px_40px_-20px_rgba(0,0,0,0.8)]"
        >
          <nav
            aria-label="মোবাইল নেভিগেশন"
            className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-gold/15 py-3.5 text-[15px] text-cream-soft transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#jogajog"
              onClick={() => setOpen(false)}
              className="my-4 flex items-center justify-center gap-2 bg-gold px-5 py-3 font-semibold text-night shadow-[4px_4px_0_0_#8f7a3d] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#8f7a3d]"
            >
              <Download className="h-4 w-4" />
              অ্যাপ ডাউনলোড
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
