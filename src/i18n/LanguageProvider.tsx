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

    "hero.badge": "Customer obsession",
    "hero.title": "AI-Powered Real Estate Opportunities",
    "hero.subtitle": "Simple, stable, fast platform for smart decision and process",
    "hero.cta.contact": "Contact us",
    "hero.cta.learn": "Learn more",

    "services.heading": "Our Services",
    "services.sub": "AI Agentic workflows for smart deal sourcing and evaluation",
    "services.card1.title": "Deal Sourcing",
    "services.card1.body": "Spot undervalued opportunities (e.g., zoning permits, demographic shifts)",
    "services.card2.title": "Deal Evaluation",
    "services.card2.body": "Assess potential returns with AI (e.g., macro trends, policy shifts, local demographics).",
    "services.card3.title": "8% Fixed Savings Account (Upcoming)",
    "services.card3.body": "Fixed 8% APY, no fees, no lock-up. Interest accrues daily at midnight based on your current balance.",


    "cases.heading": "Case Studies",
    "cases.sub": "Selected examples of performance and strategy.",
    "cases.item1.title": "Townhouse — Seattle",
    "cases.item1.body": "New build 2021. Purchase $860k. Positive cash flow and ~52% appreciation increase over 4 years.",
    "cases.item1.img": "/cases/item1.jpg",
    "cases.item1.imgAlt": "Townhouse — Seattle interior",
    "cases.item2.title": "Townhouse — Bay Area",
    "cases.item2.body": "obtained 2023. Purchase $835k. ~5% cap rate and ~43% IRR.",
    "cases.item2.img": "/cases/item2.jpg",
    "cases.item2.imgAlt": "Townhouse — Bay Area interior",

    "contact.heading": "Contact Us",
    "contact.copy": "Questions or ready to get started? We typically respond within 1–2 business days.",
    "contact.emailLabel": "Email:",
    "contact.availability": "Availability:",
    "contact.availability.value": "Mon–Fri, 9am–6pm PT",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send",
    "contact.form.alt": "Or email bfp-core@bfpinvest.com",
  },
  zh: {
    "brand": "奕宸投资",
    "nav.services": "奕宸服务",
    "nav.case": "投资案例",
    "nav.contact": "联系我们",
    "nav.toggle": "EN",

    "hero.badge": "客户至上",
    "hero.title": "AI 驱动的房地产机会",
    "hero.subtitle": "为智能决策与流程打造的简单、稳定、快速平台",
    "hero.cta.contact": "联系我们",
    "hero.cta.learn": "了解更多",

    "services.heading": "我们的服务",
    "services.sub": "用于智能寻源与评估的 AI 代理工作流",
    "services.card1.title": "项目寻源",
    "services.card1.body": "发掘被低估的机会（如规划许可、人口结构变化）",
    "services.card2.title": "项目评估",
    "services.card2.body": "结合 AI 评估潜在回报（如宏观趋势、政策变化、当地人口数据）",
    "services.card3.title": "8% 固定收益账户（即将推出）",
    "services.card3.body": "年利率 8%，无费用，无锁定。按每天午夜根据当前余额计息并记入账户。",

    "cases.heading": "投资案例",
    "cases.sub": "部分历史项目与策略示例。",
    "cases.item1.title": "联排别墅 — 西雅图",
    "cases.item1.body": "2021 年新建，购入价 $86 万，4 年约 52% 升值并保持正现金流。",
    "cases.item1.img": "/cases/item1.jpg",
    "cases.item1.imgAlt": "联排别墅 — 西雅图 室内",
    "cases.item2.title": "联排别墅 — 湾区",
    "cases.item2.body": "2023 年购入，价格 $83.5 万，约 5% cap rate，约 43% IRR。",
    "cases.item2.img": "/cases/item2.jpg",
    "cases.item2.imgAlt": "联排别墅 — 湾区 室内",
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
    "contact.form.alt": "或发送邮件至 bfp-core@bfpinvest.com",
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


