import Link from 'next/link';

export default function Home() {
  const styles = [
    {
      href: '/minimal',
      title: 'Minimalist Modern',
      description: 'Clean, simple, elegant design with ample white space',
      gradient: 'from-gray-100 to-white',
      textColor: 'text-gray-900',
    },
    {
      href: '/dark',
      title: 'Dark Interactive',
      description: 'Dynamic, engaging, immersive dark mode experience',
      gradient: 'from-gray-900 to-black',
      textColor: 'text-white',
    },
    {
      href: '/terminal',
      title: 'Retro Terminal',
      description: 'Nostalgic command-line aesthetic for developers',
      gradient: 'from-black to-gray-900',
      textColor: 'text-green-400',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Multiverse
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Explore three distinct design styles
          </p>
          <p className="text-gray-500">
            Each style represents a different approach to portfolio design
          </p>
        </div>

        {/* Style Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {styles.map((style, i) => (
            <Link
              key={i}
              href={style.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className={`h-64 bg-gradient-to-br ${style.gradient} p-8 flex flex-col justify-between`}>
                <div>
                  <h2 className={`text-2xl font-bold mb-3 ${style.textColor}`}>
                    {style.title}
                  </h2>
                  <p className={`${style.textColor} opacity-80`}>
                    {style.description}
                  </p>
                </div>
                <div className={`mt-4 ${style.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                  Explore → 
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Navigate using the menu above or click on any style card
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>✨ Minimalist</span>
            <span>•</span>
            <span>🌙 Dark Mode</span>
            <span>•</span>
            <span>💻 Terminal</span>
          </div>
        </div>
      </div>
    </main>
  );
}

