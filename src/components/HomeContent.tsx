"use client";

import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";

export default function HomeContent() {
  const { t } = useI18n();
  const [case1ImgOk, setCase1ImgOk] = useState(true);
  const [case2ImgOk, setCase2ImgOk] = useState(true);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    if (lightbox) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);
  return (
    <main className="min-h-screen font-sans">
      {/* 1) HEAD / HERO */}
      <section id="head" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-start gap-6">
            {t("hero.badge") && (
              <span className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-600">
                {t("hero.badge")}
              </span>
            )}
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
          {t("services.sub") && (
            <p className="mb-8 text-neutral-600">{t("services.sub")}</p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 p-6 transition">
              <h3 className="mb-2 font-medium">{t("services.card1.title")}</h3>
              <p className="whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-300">{t("services.card1.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-6 transition">
              <h3 className="mb-2 font-medium">{t("services.card2.title")}</h3>
              <p className="whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-300">{t("services.card2.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-6 transition">
              <h3 className="mb-2 font-medium">{t("services.card3.title")}</h3>
              <p className="whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-300">{t("services.card3.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) CASE STUDY */}
      <section id="case-study" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-3xl font-semibold">{t("cases.heading")}</h2>
          <p className="mb-8 text-neutral-600">{t("cases.sub")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 transition">
              {t("cases.item1.img") !== "cases.item1.img" && case1ImgOk && (
                <div
                  className="relative mb-3 w-full overflow-hidden rounded-md bg-neutral-100 aspect-[16/9] cursor-zoom-in"
                  onClick={() => setLightbox({ src: t("cases.item1.img"), alt: t("cases.item1.imgAlt") })}
                >
                  <Image
                    src={t("cases.item1.img")}
                    alt={t("cases.item1.imgAlt")}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    onError={() => setCase1ImgOk(false)}
                  />
                </div>
              )}
              <h3 className="mb-1 font-medium">{t("cases.item1.title")}</h3>
              <p className="text-sm text-neutral-600">{t("cases.item1.body")}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6 transition">
              {t("cases.item2.img") !== "cases.item2.img" && case2ImgOk && (
                <div
                  className="relative mb-3 w-full overflow-hidden rounded-md bg-neutral-100 aspect-[16/9] cursor-zoom-in"
                  onClick={() => setLightbox({ src: t("cases.item2.img"), alt: t("cases.item2.imgAlt") })}
                >
                  <Image
                    src={t("cases.item2.img")}
                    alt={t("cases.item2.imgAlt")}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    onError={() => setCase2ImgOk(false)}
                  />
                </div>
              )}
              <h3 className="mb-1 font-medium">{t("cases.item2.title")}</h3>
              <p className="text-sm text-neutral-600">{t("cases.item2.body")}</p>
            </div>
            
          </div>
        </div>
      </section>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative h-[90vh] w-[90vw] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.alt || "case image"} fill className="object-contain" />
          </div>
        </div>
      )}

      {/* 4) CONTACT */}
      <section id="contact" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-semibold">{t("contact.heading")}</h2>
            <p className="mb-4 text-neutral-600">{t("contact.copy")}</p>
            <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <p><strong>{t("contact.emailLabel")}</strong> bfp@bfpinvest.com</p>
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


