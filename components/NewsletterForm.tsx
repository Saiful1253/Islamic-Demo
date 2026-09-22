"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";

type Status = "idle" | "loading" | "error" | "success";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const loading = status === "loading";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus("error");
      setMessage("অনুগ্রহ করে একটি ইমেইল ঠিকানা লিখুন।");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus("error");
      setMessage("ঠিকানাটি ঠিক মনে হচ্ছে না — আবার একটু দেখে লিখুন।");
      return;
    }

    setStatus("loading");
    setMessage("");
    window.setTimeout(() => {
      setStatus("success");
      setMessage("ধন্যবাদ! আগামী বার্তা আপনার ইনবক্সে পৌঁছে যাবে।");
    }, 850);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          আপনার ইমেইল ঠিকানা
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="আপনার ইমেইল ঠিকানা"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          disabled={loading || status === "success"}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-note"
          className="min-h-12 flex-1 border border-gold/60 bg-ivory px-4 py-3.5 text-ink placeholder:text-ink-soft/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:bg-parchment-deep/60 disabled:text-ink-soft"
        />
        <button
          type="submit"
          disabled={loading || status === "success"}
          className="min-h-12 shrink-0 bg-pine px-7 py-3.5 font-semibold text-cream shadow-[4px_4px_0_0_#8f7a3d] transition-all hover:bg-night active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#8f7a3d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "যুক্ত হচ্ছে…" : status === "success" ? "যুক্ত হয়েছেন" : "যুক্ত হোন"}
        </button>
      </div>

      <p
        id="newsletter-note"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`mt-3 flex items-start justify-start gap-1.5 text-left text-sm ${
          status === "error"
            ? "text-clay"
            : status === "success"
              ? "text-pine"
              : "text-ink-soft/85"
        }`}
      >
        {status === "success" ? (
          <>
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
          </>
        ) : status === "error" ? (
          <span>⚠ {message}</span>
        ) : (
          <span>
            সপ্তাহে দুটি বার্তা। যেকোনো সময় আনসবস্ক্রাইব করুন — ঠিকানা কখনও
            শেয়ার করা হয় না।
          </span>
        )}
      </p>
    </form>
  );
}
