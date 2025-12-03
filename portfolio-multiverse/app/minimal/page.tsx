 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Lang = "en" | "vi";

const COPY: Record<Lang, any> = {
  en: {
    badge: "The Dev Multiverse · The Professional",
    titleLine1: "Hi, I'm",
    titleName: "Nam",
    titleRole: "Full‑stack Developer",
    intro:
      "I build fast, reliable web experiences with a focus on performance, clarity, and long‑term maintainability.",
    ctaProjectsLabel: "Projects · The Creative",
    ctaProjectsTitle: "Explore my projects",
    ctaProjectsDesc:
      "Dark, interactive space to explore UI/UX, motion, and front‑end engineering.",
    ctaAboutLabel: "About · The Coder Core",
    ctaAboutTitle: "See my story & stack",
    ctaAboutDesc:
      "Retro terminal view into my background, skills, and technical journey.",
    philosophyTitle: "Philosophy",
    philosophyText:
      "Minimalism isn't about having less. It's about having exactly what you need. I prefer clear structure, simple interfaces, and code that is easy to reason about months later.",
    principles: [
      {
        title: "Simplicity",
        desc: "Remove the unnecessary.",
      },
      {
        title: "Clarity",
        desc: "Communicate intent clearly.",
      },
      {
        title: "Focus",
        desc: "One goal per screen.",
      },
    ],
    quickFacts: [
      {
        label: "Focus",
        value: "Full‑stack Web",
        desc: "From design system to deployment pipeline.",
      },
      {
        label: "Strengths",
        value: "Performance & DX",
        desc: "Clean architecture, fast load, good developer experience.",
      },
      {
        label: "Stack",
        value: "TS · React · Node",
        desc: "Next.js, Tailwind, REST/JSON, SQL/NoSQL.",
      },
    ],
    footer:
      "Designed like a clean first impression — fast, focused, professional.",
  },
  vi: {
    badge: "The Dev Multiverse · The Professional",
    titleLine1: "Xin chào, tôi là",
    titleName: "Nam",
    titleRole: "Full‑stack Developer",
    intro:
      "Tôi xây dựng các trải nghiệm web nhanh, ổn định với trọng tâm là hiệu năng, sự rõ ràng và khả năng bảo trì lâu dài.",
    ctaProjectsLabel: "Dự án · The Creative",
    ctaProjectsTitle: "Xem các dự án",
    ctaProjectsDesc:
      "Không gian dark/interactive để thể hiện UI/UX, motion và front‑end.",
    ctaAboutLabel: "Giới thiệu · The Coder Core",
    ctaAboutTitle: "Xem câu chuyện & stack",
    ctaAboutDesc:
      "Giao diện terminal retro cho hành trình kỹ thuật và kỹ năng cốt lõi.",
    philosophyTitle: "Triết lý",
    philosophyText:
      "Tối giản không phải là bớt đi mọi thứ, mà là giữ lại đúng những gì cần thiết. Tôi ưu tiên cấu trúc rõ ràng, giao diện đơn giản và code dễ đọc lại sau nhiều tháng.",
    principles: [
      {
        title: "Đơn giản",
        desc: "Loại bỏ những gì không cần thiết.",
      },
      {
        title: "Rõ ràng",
        desc: "Truyền tải ý định một cách minh bạch.",
      },
      {
        title: "Tập trung",
        desc: "Mỗi màn hình chỉ nên phục vụ một mục tiêu chính.",
      },
    ],
    quickFacts: [
      {
        label: "Trọng tâm",
        value: "Full‑stack Web",
        desc: "Từ design system đến deployment pipeline.",
      },
      {
        label: "Thế mạnh",
        value: "Performance & DX",
        desc: "Kiến trúc sạch, tải nhanh, trải nghiệm dev tốt.",
      },
      {
        label: "Stack",
        value: "TS · React · Node",
        desc: "Next.js, Tailwind, REST/JSON, SQL/NoSQL.",
      },
    ],
    footer:
      "Thiết kế như ấn tượng đầu tiên: nhanh, tập trung, chuyên nghiệp.",
  },
};

export default function MinimalPage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("pm_lang");
    if (stored === "vi" || stored === "en") {
      setLang(stored);
    }
  }, []);

  const t = COPY[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero – The Professional */}
      <div className="max-w-3xl mx-auto px-8 py-32">
        <div className="text-center mb-32">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">
            {t.badge}
          </p>
          <h1 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter leading-none">
            {t.titleLine1}{" "}
            <span className="font-light underline underline-offset-4 decoration-gray-300">
              {t.titleName}
            </span>
            .
            <br />
            {t.titleRole}
          </h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            {t.intro}
          </p>
        </div>

        {/* Primary CTAs – dẫn sang 2 vũ trụ còn lại */}
        <div className="grid md:grid-cols-2 gap-6 mb-28">
          <Link
            href="/dark"
            className="group border border-gray-900 rounded-xl px-6 py-8 text-left hover:bg-gray-900 hover:text-white transition-colors"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 group-hover:text-gray-300 mb-4">
              {t.ctaProjectsLabel}
            </p>
            <h2 className="text-2xl font-light mb-2">{t.ctaProjectsTitle}</h2>
            <p className="text-sm text-gray-500 group-hover:text-gray-200 leading-relaxed">
              {t.ctaProjectsDesc}
            </p>
          </Link>

          <Link
            href="/terminal"
            className="group border border-gray-200 rounded-xl px-6 py-8 text-left hover:border-gray-900 transition-colors"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">
              {t.ctaAboutLabel}
            </p>
            <h2 className="text-2xl font-light mb-2">{t.ctaAboutTitle}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.ctaAboutDesc}
            </p>
          </Link>
        </div>

        {/* Philosophy – Minimalist mindset */}
        <div className="mb-24 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-extralight text-gray-900 tracking-tight">
              {t.philosophyTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg font-light max-w-2xl">
              {t.philosophyText}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {t.principles.map(
              (item: { title: string; desc: string }, i: number) => (
                <div key={item.title} className="space-y-4">
                  <div className="text-5xl font-extralight text-gray-900 mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-light text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick facts – 3 cột rất tối giản */}
        <div className="grid md:grid-cols-3 gap-10 border-t border-gray-100 pt-16">
          {t.quickFacts.map(
            (item: { label: string; value: string; desc: string }) => (
              <div key={item.label} className="space-y-3">
                <p className="text-xs tracking-[0.25em] uppercase text-gray-400">
                  {item.label}
                </p>
                <p className="text-base font-medium text-gray-900">
                  {item.value}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          )}
        </div>

        {/* Footer minimal */}
        <div className="mt-24 pt-10 border-t border-gray-100 text-center text-xs text-gray-400 tracking-[0.2em] uppercase">
          {t.footer}
        </div>
      </div>
    </div>
  );
}

