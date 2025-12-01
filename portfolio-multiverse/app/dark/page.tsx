'use client';

import { useState, useEffect } from 'react';

export default function DarkPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl transition-all duration-500"
          style={{
            right: `${mousePosition.x / 15}px`,
            bottom: `${mousePosition.y / 15}px`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Dark Interactive
          </h1>
          <p className="text-xl text-gray-300">
            Dynamic, engaging, immersive experience
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {[
            { title: 'Interactive', icon: '✨', color: 'from-purple-500 to-pink-500' },
            { title: 'Dynamic', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
            { title: 'Immersive', icon: '🎨', color: 'from-pink-500 to-red-500' },
            { title: 'Engaging', icon: '🚀', color: 'from-cyan-500 to-blue-500' },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-purple-500 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity`}></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">
                  Experience the power of dark mode design with interactive elements
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB'].map((skill, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-center font-semibold hover:scale-110 transition-transform cursor-pointer"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

