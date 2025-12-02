import Link from "next/link";

export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero – The Professional */}
      <div className="max-w-3xl mx-auto px-8 py-32">
        <div className="text-center mb-32">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">
            The Dev Multiverse · The Professional
          </p>
          <h1 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter leading-none">
            Hi, I'm{" "}
            <span className="font-light underline underline-offset-4 decoration-gray-300">
              Nam
            </span>
            .
            <br />
            Full‑stack Developer
          </h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            I build fast, reliable web experiences with a focus on performance,
            clarity, and long‑term maintainability.
          </p>
        </div>

        {/* Primary CTAs – dẫn sang 2 vũ trụ còn lại */}
        <div className="grid md:grid-cols-2 gap-6 mb-28">
          <Link
            href="/dark"
            className="group border border-gray-900 rounded-xl px-6 py-8 text-left hover:bg-gray-900 hover:text-white transition-colors"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 group-hover:text-gray-300 mb-4">
              Projects · The Creative
            </p>
            <h2 className="text-2xl font-light mb-2">Explore my projects</h2>
            <p className="text-sm text-gray-500 group-hover:text-gray-200 leading-relaxed">
              Dark, interactive space to explore UI/UX, motion, and front‑end
              engineering.
            </p>
          </Link>

          <Link
            href="/terminal"
            className="group border border-gray-200 rounded-xl px-6 py-8 text-left hover:border-gray-900 transition-colors"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">
              About · The Coder Core
            </p>
            <h2 className="text-2xl font-light mb-2">See my story & stack</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Retro terminal view into my background, skills, and technical
              journey.
            </p>
          </Link>
        </div>

        {/* Philosophy – Minimalist mindset */}
        <div className="mb-24 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-extralight text-gray-900 tracking-tight">
              Philosophy
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg font-light max-w-2xl">
              Minimalism isn't about having less. It's about having exactly what
              you need. I prefer clear structure, simple interfaces, and code
              that is easy to reason about months later.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Simplicity", desc: "Remove the unnecessary" },
              { title: "Clarity", desc: "Communicate intent clearly" },
              { title: "Focus", desc: "One goal per screen" },
            ].map((item, i) => (
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
            ))}
          </div>
        </div>

        {/* Quick facts – 3 cột rất tối giản */}
        <div className="grid md:grid-cols-3 gap-10 border-t border-gray-100 pt-16">
          {[
            {
              label: "Focus",
              value: "Full‑stack Web",
              desc: "From design system to deployment pipeline.",
            },
            {
              label: "Strengths",
              value: "Performance & DX",
              desc: "Clean architecture, fast load, good dev experience.",
            },
            {
              label: "Stack",
              value: "TS · React · Node",
              desc: "Next.js, Tailwind, REST/JSON, SQL/NoSQL.",
            },
          ].map((item) => (
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
          ))}
        </div>

        {/* Footer minimal */}
        <div className="mt-24 pt-10 border-t border-gray-100 text-center text-xs text-gray-400 tracking-[0.2em] uppercase">
          Designed like a clean first impression — fast, focused, professional.
        </div>
      </div>
    </div>
  );
}

