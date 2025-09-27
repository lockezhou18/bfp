"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { useState } from "react";

export default function ContactForm() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      setLoading(true);
      setStatus(null);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed");
      setStatus("sent");
      form.reset();
    } catch (e) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">{t("contact.form.name")}</label>
        <input id="name" name="name" className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">{t("contact.form.email")}</label>
        <input id="email" name="email" type="email" className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">{t("contact.form.message")}</label>
        <textarea id="message" name="message" rows={4} className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="Tell us a bit about your goals" />
      </div>
      <div className="flex items-center gap-3">
        <button disabled={loading} className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-800 disabled:opacity-60">
          {loading ? "Sending..." : t("contact.form.send")}
        </button>
        <a href="mailto:bfp@bfpinvest.com" className="text-sm text-neutral-700 underline underline-offset-4">{t("contact.form.alt")}</a>
      </div>
      {status === "sent" && (
        <p className="text-sm text-green-700">Thanks! We&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">There was an issue sending your message. Please email bfp@bfpinvest.com.</p>
      )}
    </form>
  );
}


