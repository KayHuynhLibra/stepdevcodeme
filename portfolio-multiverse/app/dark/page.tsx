'use client';

import { useState, useEffect } from 'react';

export default function DarkPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setGlowIntensity(0.5);
      setTimeout(() => setGlowIntensity(0.3), 200);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Glowing Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] bg-purple-500 rounded-full blur-[120px] transition-all duration-500 ease-out"
          style={{
            left: `${mousePosition.x / 8 - 300}px`,
            top: `${mousePosition.y / 8 - 300}px`,
            opacity: glowIntensity,
          }}
        ></div>
        <div
          className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] transition-all duration-700 ease-out"
          style={{
            right: typeof window !== 'undefined' ? `${(window.innerWidth - mousePosition.x) / 10 - 250}px` : '0px',
            bottom: typeof window !== 'undefined' ? `${(window.innerHeight - mousePosition.y) / 10 - 250}px` : '0px',
            opacity: glowIntensity * 0.8,
          }}
        ></div>
        <div
          className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[80px] transition-all duration-900 ease-out"
          style={{
            left: `${mousePosition.x / 12 - 200}px`,
            bottom: typeof window !== 'undefined' ? `${(window.innerHeight - mousePosition.y) / 12 - 200}px` : '0px',
            opacity: glowIntensity * 0.6,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section - Glowing Text */}
        <div className="text-center mb-32">
          <h1 className="text-8xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            DARK
            <br />
            <span className="text-6xl">INTERACTIVE</span>
          </h1>
          <p className="text-2xl text-gray-400 font-light">
            Immerse yourself in dynamic, engaging experiences
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Interactive Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[
            { 
              title: 'Interactive', 
              icon: '✨', 
              gradient: 'from-purple-600 via-pink-600 to-red-600',
              desc: 'Every interaction creates a visual response'
            },
            { 
              title: 'Dynamic', 
              icon: '⚡', 
              gradient: 'from-blue-600 via-cyan-600 to-teal-600',
              desc: 'Real-time animations follow your cursor'
            },
            { 
              title: 'Immersive', 
              icon: '🎨', 
              gradient: 'from-pink-600 via-purple-600 to-indigo-600',
              desc: 'Full-screen experiences that captivate'
            },
            { 
              title: 'Engaging', 
              icon: '🚀', 
              gradient: 'from-cyan-600 via-blue-600 to-purple-600',
              desc: 'Hover effects and transitions that delight'
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-10 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Skills - Glowing Badges */}
        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-10 mb-24">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB', 'Python', 'Docker', 'AWS'].map((skill, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-xl p-5 text-center font-bold text-lg hover:from-purple-500 hover:to-pink-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer border border-purple-500/30"
              >
                <span className="relative z-10">{skill}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-purple-900/50 to-pink-900/50 group-hover:from-purple-800/70 group-hover:to-pink-800/70 transition-all duration-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project {i}</h3>
                  <p className="text-gray-400 text-sm">
                    Interactive dark mode showcase
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

