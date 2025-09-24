"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "zh";

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "locale";

const MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    "brand": "Stairway Invest",
    "nav.services": "Services",
    "nav.case": "Case Studies",
    "nav.contact": "Contact",
    "nav.toggle": "中文",

    "hero.badge": "Fixed 8% interest, daily accrual",
    "hero.title": "Invest in Real Estate at Scale",
    "hero.subtitle": "Simple, stable, low-risk real estate backed yield. No fees, no lock-up; interest accrues daily.",
    "hero.cta.contact": "Contact us",
    "hero.cta.learn": "Learn more",

    "services.heading": "Our Services",
    "services.sub": "8% fixed account, real estate backed.",
    "services.card1.title": "8% Fixed Savings Account",
    "services.card1.body": "Fixed 8% APY, no fees, no lock-up. Interest accrues daily at midnight based on your current balance.",
    "services.card2.title": "Investment Focus",
    "services.card2.body": "Income-producing US residential rentals and select multifamily developments with prudent leverage.",
    "services.card3.title": "Who It’s For",
    "services.card3.body": "Savers seeking stable yield. Withdraw anytime or sweep monthly interest to your personal account.",

    "cases.heading": "Case Studies",
    "cases.sub": "Selected examples of performance and strategy.",
    "cases.item1.title": "Townhouse — Bay Area",
    "cases.item1.body": "New build 2021. Purchase $1.45M. Positive cash flow and ~30% appreciation over 3 years.",
    "cases.item2.title": "Townhouse — Bay Area",
    "cases.item2.body": "Purchased 2017 at $845k and exited 2022 at $1.29M. Strong IRR via appreciation.",
    "cases.item3.title": "Condo — Toronto",
    "cases.item3.body": "Downtown positive-cash-flow rental with low vacancy. Long-term value growth.",

    "contact.heading": "Contact Us",
    "contact.copy": "Questions or ready to get started? We typically respond within 1–2 business days.",
    "contact.emailLabel": "Email:",
    "contact.availability": "Availability:",
    "contact.availability.value": "Mon–Fri, 9am–6pm PT",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send",
    "contact.form.alt": "Or email hello@stairwayinvest.com",
  },
  zh: {
    "brand": "奕宸投资",
    "nav.services": "奕宸服务",
    "nav.case": "投资案例",
    "nav.contact": "联系我们",
    "nav.toggle": "EN",

    "hero.badge": "8% 固定利息，每日计息",
    "hero.title": "规模化投资美国房地产",
    "hero.subtitle": "简单、稳定、低风险的房地产收益。无费用、无锁定期，按日计息。",
    "hero.cta.contact": "联系我们",
    "hero.cta.learn": "了解更多",

    "services.heading": "我们的服务",
    "services.sub": "8% 固定利息储蓄账户，房地产作为底层资产。",
    "services.card1.title": "8% 固定利息储蓄账户",
    "services.card1.body": "年利率 8%，无费用，无锁定。按每天午夜根据当前余额计息并记入账户。",
    "services.card2.title": "投资方向",
    "services.card2.body": "美国现金流住宅及精选多户公寓开发，稳健杠杆。",
    "services.card3.title": "适合人群",
    "services.card3.body": "寻求稳定收益的储蓄者。可随时取出，或每月提取利息至个人账户。",

    "cases.heading": "投资案例",
    "cases.sub": "部分历史项目与策略示例。",
    "cases.item1.title": "联排别墅 — 湾区",
    "cases.item1.body": "2021 年新建，购入价 $145 万，三年约 30% 升值并保持正现金流。",
    "cases.item2.title": "联排别墅 — 湾区",
    "cases.item2.body": "2017 年 $84.5 万购入，2022 年 $129 万出售，IRR 表现优异。",
    "cases.item3.title": "公寓 — 多伦多",
    "cases.item3.body": "多伦多市中心正现金流房产，低空置率，长期价值增长。",

    "contact.heading": "联系我们",
    "contact.copy": "有问题或准备开始？我们通常在 1–2 个工作日内回复。",
    "contact.emailLabel": "邮箱：",
    "contact.availability": "服务时间：",
    "contact.availability.value": "周一至周五 9:00–18:00（太平洋时间）",
    "contact.form.name": "姓名",
    "contact.form.email": "邮箱",
    "contact.form.message": "留言",
    "contact.form.send": "发送",
    "contact.form.alt": "或发送邮件至 hello@stairwayinvest.com",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Locale | null;
    if (saved === "en" || saved === "zh") {
      setLocaleState(saved);
      return;
    }
    const navLang = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "en";
    setLocaleState(navLang.startsWith("zh") ? "zh" : "en");
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, next);
  };

  const t = useMemo(() => {
    return (key: string) => MESSAGES[locale]?.[key] ?? key;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}


