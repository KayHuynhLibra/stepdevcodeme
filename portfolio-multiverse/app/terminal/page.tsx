'use client';

import { useState } from 'react';

export default function TerminalPage() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      const cmd = command.trim();
      setHistory([...history, `$ ${cmd}`]);
      
      // Simple command responses
      if (cmd === 'help') {
        setHistory(prev => [...prev, 'Available commands: help, about, skills, projects, clear']);
      } else if (cmd === 'about') {
        setHistory(prev => [...prev, '> Full-stack developer passionate about clean code and innovative solutions']);
      } else if (cmd === 'skills') {
        setHistory(prev => [...prev, '> React, Next.js, TypeScript, Node.js, Python, MongoDB']);
      } else if (cmd === 'projects') {
        setHistory(prev => [...prev, '> Portfolio Multiverse, StepDevCode, Learning Platform']);
      } else if (cmd === 'clear') {
        setHistory([]);
      } else {
        setHistory(prev => [...prev, `> Command not found: ${cmd}. Type 'help' for available commands.`]);
      }
      setCommand('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Terminal Header */}
        <div className="bg-gray-900 border border-gray-700 rounded-t-lg p-3 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-sm">terminal@portfolio-multiverse</span>
        </div>

        {/* Terminal Body */}
        <div className="bg-gray-950 border-x border-b border-gray-700 rounded-b-lg p-6 min-h-[600px]">
          {/* Welcome Message */}
          <div className="mb-4">
            <pre className="text-green-400">
{`╔════════════════════════════════════════╗
║   RETRO TERMINAL PORTFOLIO              ║
║   Type 'help' for available commands     ║
╚════════════════════════════════════════╝`}
            </pre>
          </div>

          {/* Command History */}
          <div className="space-y-2 mb-4">
            {history.map((line, i) => (
              <div key={i} className={line.startsWith('$') ? 'text-cyan-400' : 'text-green-400'}>
                {line}
              </div>
            ))}
          </div>

          {/* Command Input */}
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
              autoFocus
              placeholder="Type a command..."
            />
            <span className="ml-2 animate-pulse text-green-400">█</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 border border-gray-700 rounded-lg p-6 bg-gray-900">
          <h2 className="text-2xl mb-4 text-green-400">About This Style</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            The retro terminal style brings nostalgia and a command-line aesthetic. 
            It's perfect for developers who love the terminal and want a unique portfolio experience.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-green-400 mb-2">Features:</h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• Interactive command interface</li>
                <li>• Retro terminal aesthetics</li>
                <li>• Nostalgic design</li>
                <li>• Developer-friendly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-green-400 mb-2">Try Commands:</h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• help - Show commands</li>
                <li>• about - About me</li>
                <li>• skills - My skills</li>
                <li>• projects - My projects</li>
                <li>• clear - Clear terminal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

