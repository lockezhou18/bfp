"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur dark:bg-black/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="#head" className="text-sm font-semibold tracking-tight">
          {t("brand")}
        </a>
        <nav className="hidden gap-6 text-sm sm:flex">
          <a href="#services" className="hover:underline underline-offset-4">{t("nav.services")}</a>
          <a href="#case-study" className="hover:underline underline-offset-4">{t("nav.case")}</a>
          <a href="#contact" className="hover:underline underline-offset-4">{t("nav.contact")}</a>
          <button
            className="rounded-md border px-2 py-1 text-xs"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          >
            {t("nav.toggle")}
          </button>
        </nav>
        <button
          aria-label="Toggle menu"
          className="sm:hidden rounded-md border px-2 py-1 text-sm"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="sm:hidden border-t bg-white dark:bg-black">
          <nav className="mx-auto grid max-w-6xl gap-2 px-4 py-3 text-sm">
            <a href="#services" className="py-1">{t("nav.services")}</a>
            <a href="#case-study" className="py-1">{t("nav.case")}</a>
            <a href="#contact" className="py-1">{t("nav.contact")}</a>
            <button
              className="mt-1 w-fit rounded-md border px-2 py-1 text-xs"
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


