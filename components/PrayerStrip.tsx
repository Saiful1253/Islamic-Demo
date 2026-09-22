"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";

type Slot = {
  key: string;
  bn: string;
  ar: string;
  /** minutes after midnight, Dhaka sample timetable */
  minutes: number;
  prayer: boolean;
};

const SCHEDULE: Slot[] = [
  { key: "fajr", bn: "ফজর", ar: "الفجر", minutes: 4 * 60 + 40, prayer: true },
  {
    key: "sunrise",
    bn: "সূর্যোদয়",
    ar: "الشروق",
    minutes: 5 * 60 + 56,
    prayer: false,
  },
  { key: "zuhr", bn: "জুহর", ar: "الظهر", minutes: 12 * 60 + 8, prayer: true },
  { key: "asr", bn: "আসর", ar: "العصر", minutes: 15 * 60 + 30, prayer: true },
  {
    key: "maghrib",
    bn: "মাগরিব",
    ar: "المغرب",
    minutes: 18 * 60 + 15,
    prayer: true,
  },
  { key: "isha", bn: "ইশা", ar: "العشاء", minutes: 19 * 60 + 27, prayer: true },
];

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bn = (value: string | number) =>
  String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

const formatTime = (minutes: number) => {
  const h24 = Math.floor(minutes / 60) % 24;
  const min = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return {
    time: `${bn(h12)}:${bn(String(min).padStart(2, "0"))}`,
    period: h24 < 12 ? "পূর্বাহ্ণ" : "অপরাহ্ণ",
  };
};

function findNext(now: Date) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const prayers = SCHEDULE.filter((s) => s.prayer);
  for (const slot of prayers) {
    if (slot.minutes > nowMinutes) {
      return { key: slot.key, slot, tomorrow: false };
    }
  }
  return { key: prayers[0].key, slot: prayers[0], tomorrow: true };
}

function countdownTo(now: Date, slot: Slot, tomorrow: boolean) {
  const target = new Date(now);
  target.setHours(0, 0, 0, 0);
  target.setMinutes(slot.minutes);
  if (tomorrow) target.setDate(target.getDate() + 1);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const total = Math.floor(diff / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => bn(String(n).padStart(2, "0"));
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function PrayerStrip() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = now ? findNext(now) : null;
  const dateLabel = now
    ? new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : null;

  return (
    <section
      id="namaz"
      className="relative z-20 -mt-28 border-t-[3px] border-gold bg-ivory text-ink md:-mt-36"
    >
      <div aria-hidden="true" className="h-px w-full bg-gold/45" />

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 md:pb-20 md:pt-14">
        {/* heading row */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-clay">
              আজকের সময়সূচি
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">
              নামাজের সময় — ঢাকা
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 border border-gold/50 bg-parchment px-3 py-2 text-ink-soft">
              <MapPin className="h-4 w-4 text-clay" />
              ঢাকা, বাংলাদেশ
            </span>
            <span className="inline-flex items-center gap-2 border border-gold/50 bg-parchment px-3 py-2 text-ink-soft">
              <CalendarDays className="h-4 w-4 text-clay" />
              <span suppressHydrationWarning>
                {dateLabel ?? "আজকের তারিখ"}
              </span>
            </span>
          </div>
        </div>

        {/* timetable cards */}
        <ul className="mt-9 grid grid-cols-2 gap-px border border-gold/35 bg-gold/30 sm:grid-cols-3 lg:grid-cols-6">
          {SCHEDULE.map((slot, index) => {
            const { time, period } = formatTime(slot.minutes);
            const isNext = next?.key === slot.key;
            const isSunrise = !slot.prayer;
            const delay = now ? "0s" : "0.4s";

            if (isNext) {
              return (
                <li
                  key={slot.key}
                  className="flex flex-col items-center gap-1 bg-night px-3 pb-6 pt-6 text-center text-cream lg:-mt-5"
                >
                  <span className="mb-1 inline-flex items-center gap-1.5 bg-gold px-2.5 py-1 text-[11px] font-bold text-night">
                    <span
                      aria-hidden="true"
                      className="tick inline-block h-1.5 w-1.5 rounded-full bg-night"
                    />
                    পরবর্তী
                  </span>
                  <span
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-lg text-gold-light"
                  >
                    {slot.ar}
                  </span>
                  <span className="text-sm font-medium text-cream-soft">
                    {slot.bn}
                  </span>
                  <span className="mt-1 font-display text-[1.65rem] leading-none text-gold-light">
                    {time}
                  </span>
                  <span className="text-[11px] text-cream-soft/85">
                    {period}
                  </span>
                  <span className="mt-3 w-full border-t border-gold/40 pt-2.5">
                    <span className="block font-display text-lg leading-none text-gold tabular-nums">
                      {next
                        ? countdownTo(now!, next.slot, next.tomorrow)
                        : "–:–:–"}
                    </span>
                    <span className="mt-1 block text-[10px] tracking-wide text-cream-soft/85">
                      বাকি রয়েছে
                    </span>
                  </span>
                </li>
              );
            }

            return (
              <li
                key={slot.key}
                className={`flex flex-col items-center gap-1 px-3 pb-6 pt-6 text-center transition-colors ${
                  isSunrise
                    ? "bg-parchment-deep/75 hover:bg-parchment-deep"
                    : "bg-parchment hover:bg-parchment-deep/60"
                }`}
                style={{ animationDelay: delay }}
              >
                <span
                  dir="rtl"
                  lang="ar"
                  className={`font-arabic text-lg ${
                    isSunrise ? "text-ink-soft/75" : "text-gold-dim"
                  }`}
                >
                  {slot.ar}
                </span>
                <span className="text-sm font-medium text-ink-soft">
                  {slot.bn}
                </span>
                <span className="mt-1 font-display text-[1.65rem] leading-none text-ink">
                  {time}
                </span>
                <span className="text-[11px] text-ink-soft/85">{period}</span>
                {isSunrise ? (
                  <span className="mt-2 text-[10px] text-ink-soft/75">
                    নামাজ নয়
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-6 bg-gold/60"
                  />
                )}
                <span className="sr-only">{`স্লট ${bn(index + 1)}`}</span>
              </li>
            );
          })}
        </ul>

        {/* footnote row */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-soft">
            সময় স্থানীয় সূর্যঘড়ি অনুযায়ী নির্ধারিত — জামাতের আগে মসজিদের
            ঘোষণা নিশ্চিত করুন।
          </p>
          <a
            href="#namaz"
            className="shrink-0 text-sm font-semibold text-pine underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-clay"
          >
            পুরো মাসের সময়সূচি দেখুন →
          </a>
        </div>
      </div>
    </section>
  );
}
