export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-light text-gray-900 mb-4 tracking-tight">
            Minimalist Modern
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Clean, simple, elegant design
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-gray-900">About</h2>
            <p className="text-gray-600 leading-relaxed">
              This minimalist approach focuses on essential elements, 
              clean typography, and ample white space. Every element 
              serves a purpose, creating a calm and focused experience.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-gray-900">Principles</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Less is more</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Purposeful design</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Clean typography</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Generous spacing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Projects Preview */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="h-32 bg-gray-100 rounded mb-4"></div>
                <h3 className="text-lg font-light text-gray-900 mb-2">
                  Project {i}
                </h3>
                <p className="text-sm text-gray-600">
                  A clean and minimal project showcase
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

