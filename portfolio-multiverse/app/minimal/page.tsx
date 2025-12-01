export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Maximum White Space */}
      <div className="max-w-3xl mx-auto px-8 py-32">
        <div className="text-center mb-32">
          <h1 className="text-7xl font-extralight text-gray-900 mb-8 tracking-tighter leading-none">
            Minimalist
            <br />
            <span className="font-light">Modern</span>
          </h1>
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg text-gray-500 font-light tracking-wide">
            Less is more. Every element serves a purpose.
          </p>
        </div>

        {/* Philosophy Section */}
        <div className="mb-32 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-extralight text-gray-900 tracking-tight">
              Philosophy
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg font-light max-w-2xl">
              Minimalism isn't about having less. It's about having exactly what you need. 
              This design philosophy embraces white space, clean typography, and purposeful 
              elements that create a calm, focused experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Simplicity', desc: 'Remove the unnecessary' },
              { title: 'Clarity', desc: 'Clear communication' },
              { title: 'Focus', desc: 'One thing at a time' },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="text-5xl font-extralight text-gray-900 mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-light text-gray-900">{item.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects - Ultra Clean */}
        <div className="border-t border-gray-100 pt-20">
          <h2 className="text-3xl font-extralight text-gray-900 mb-16 tracking-tight">
            Work
          </h2>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-light text-gray-900 mb-2">
                      Project {i}
                    </h3>
                    <p className="text-gray-500 font-light text-sm">
                      A minimal project showcase
                    </p>
                  </div>
                  <span className="text-gray-400 text-sm font-light group-hover:text-gray-900 transition-colors">
                    →
                  </span>
                </div>
                <div className="h-64 bg-gray-50 border border-gray-100"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Minimal */}
        <div className="mt-32 pt-16 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm font-light">
            Designed with intention
          </p>
        </div>
      </div>
    </div>
  );
}

