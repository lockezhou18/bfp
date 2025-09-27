"use client";

import ContactForm from "@/components/ContactForm";
import { useI18n } from "@/i18n/LanguageProvider";

export default function HomeContent() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen font-sans">
      {/* 1) HEAD / HERO */}
      <section id="head" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-600">
              {t("hero.badge")}
            </span>
            <div className="space-y-1">
              <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {t("hero.title")}
              </h1>
            </div>
            <p className="max-w-2xl text-neutral-600 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-800">
                {t("hero.cta.contact")}
              </a>
              <a href="#services" className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 text-neutral-800 hover:bg-neutral-100">
                {t("hero.cta.learn")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2) SERVICES */}
      <section id="services" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-3xl font-semibold">{t("services.heading")}</h2>
          <p className="mb-8 text-neutral-600">{t("services.sub")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-6 transition">
              <h3 className="mb-2 font-medium">{t("services.card1.title")}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t("services.card1.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-6 transition">
              <h3 className="mb-2 font-medium">{t("services.card2.title")}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t("services.card2.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-6 transition">
              <h3 className="mb-2 font-medium">{t("services.card3.title")}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t("services.card3.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) CASE STUDY */}
      <section id="case-study" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-3xl font-semibold">{t("cases.heading")}</h2>
          <p className="mb-8 text-neutral-600">{t("cases.sub")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 transition">
              <h3 className="mb-1 font-medium">{t("cases.item1.title")}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t("cases.item1.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6 transition">
              <h3 className="mb-1 font-medium">{t("cases.item2.title")}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t("cases.item2.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6 transition">
              <h3 className="mb-1 font-medium">{t("cases.item3.title")}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t("cases.item3.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) CONTACT */}
      <section id="contact" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-semibold">{t("contact.heading")}</h2>
            <p className="mb-4 text-neutral-600">{t("contact.copy")}</p>
            <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <p><strong>{t("contact.emailLabel")}</strong> hello@stairwayinvest.com</p>
              <p><strong>{t("contact.availability")}</strong> {t("contact.availability.value")}</p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}


