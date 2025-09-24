"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export default function ContactForm() {
  const { t } = useI18n();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">{t("contact.form.name")}</label>
        <input id="name" name="name" className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black" placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">{t("contact.form.email")}</label>
        <input id="email" name="email" type="email" className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black" placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">{t("contact.form.message")}</label>
        <textarea id="message" name="message" rows={4} className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black" placeholder="Tell us a bit about your goals" />
      </div>
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
          {t("contact.form.send")}
        </button>
        <a href="mailto:hello@stairwayinvest.com" className="text-sm underline underline-offset-4">{t("contact.form.alt")}</a>
      </div>
    </form>
  );
}


