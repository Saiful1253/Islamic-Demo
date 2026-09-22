import { RubElHizb } from "./Ornaments";

const stats = [
  { value: "২৫ লাখ+", label: "মাসিক পাঠক" },
  { value: "১,২০০+", label: "অন্তর্ভুক্ত মসজিদ" },
  { value: "৮,৫০০+", label: "সংকলিত দোয়া" },
  { value: "৪২ হাজার", label: "সক্রিয় সদস্য" },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-gold/45 bg-pine">
      <div aria-hidden="true" className="lattice absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <RubElHizb className="h-5 w-5 text-gold" />
          <p className="text-sm text-cream-soft">
            ভরসার সঙ্গে বেড়ে চলছে নূরানী
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-y-10 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-2 md:border-l md:border-gold/30 md:first:border-l-0"
            >
              <dt className="font-display text-3xl leading-none text-gold md:text-[2.75rem]">
                {stat.value}
              </dt>
              <dd className="mt-3 text-sm text-cream-soft">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
