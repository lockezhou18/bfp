"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <a href="#head" className="text-[15px] font-semibold tracking-tight text-neutral-900">
          {t("brand")}
        </a>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <a href="#services" className="text-neutral-600 hover:text-neutral-900">{t("nav.services")}</a>
          <a href="#case-study" className="text-neutral-600 hover:text-neutral-900">{t("nav.case")}</a>
          <a href="#contact" className="text-neutral-600 hover:text-neutral-900">{t("nav.contact")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-100"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          >
            {t("nav.toggle")}
          </button>
          <button
            aria-label="Toggle menu"
            className="sm:hidden rounded-md border border-neutral-300 px-2 py-1 text-sm text-neutral-700"
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div className="sm:hidden border-t border-neutral-200 bg-white">
          <nav className="mx-auto grid max-w-6xl gap-2 px-4 py-3 text-sm">
            <a href="#services" className="py-1 text-neutral-700">{t("nav.services")}</a>
            <a href="#case-study" className="py-1 text-neutral-700">{t("nav.case")}</a>
            <a href="#contact" className="py-1 text-neutral-700">{t("nav.contact")}</a>
            <button
              className="mt-1 w-fit rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-700"
              onClick={() => setLocale(locale === "en" ? "zh" : "en")}
            >
              {t("nav.toggle")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}


