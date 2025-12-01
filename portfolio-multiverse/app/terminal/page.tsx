'use client';

import { useState, useEffect } from 'react';

export default function TerminalPage() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      const cmd = command.trim().toLowerCase();
      setHistory(prev => [...prev, `$ ${command.trim()}`]);
      
      if (cmd === 'help') {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, 'Available commands:']);
        setHistory(prev => [...prev, '  help     - Show this help message']);
        setHistory(prev => [...prev, '  about    - Display information about me']);
        setHistory(prev => [...prev, '  skills   - List my technical skills']);
        setHistory(prev => [...prev, '  projects - Show my projects']);
        setHistory(prev => [...prev, '  clear    - Clear terminal']);
        setHistory(prev => [...prev, '  ls       - List directory contents']);
        setHistory(prev => [...prev, '  whoami   - Display username']);
        setHistory(prev => [...prev, '']);
      } else if (cmd === 'about') {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, '> Full-stack developer passionate about clean code']);
        setHistory(prev => [...prev, '> Building innovative solutions with modern technologies']);
        setHistory(prev => [...prev, '> Love for terminal, command-line, and retro aesthetics']);
        setHistory(prev => [...prev, '']);
      } else if (cmd === 'skills') {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, '> Frontend: React, Next.js, TypeScript, Tailwind CSS']);
        setHistory(prev => [...prev, '> Backend:  Node.js, Python, Express, MongoDB']);
        setHistory(prev => [...prev, '> DevOps:   Docker, AWS, CI/CD, Git']);
        setHistory(prev => [...prev, '> Tools:    VS Code, Terminal, Linux']);
        setHistory(prev => [...prev, '']);
      } else if (cmd === 'projects') {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, '> Portfolio Multiverse - Multi-style portfolio showcase']);
        setHistory(prev => [...prev, '> StepDevCode - Learning platform and roadmap']);
        setHistory(prev => [...prev, '> Various open-source contributions']);
        setHistory(prev => [...prev, '']);
      } else if (cmd === 'ls') {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, 'about.txt    projects/   skills.md']);
        setHistory(prev => [...prev, 'README.md    contact/    blog/']);
        setHistory(prev => [...prev, '']);
      } else if (cmd === 'whoami') {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, '> developer']);
        setHistory(prev => [...prev, '']);
      } else if (cmd === 'clear') {
        setHistory([]);
      } else {
        setHistory(prev => [...prev, '']);
        setHistory(prev => [...prev, `> Command not found: ${cmd}`]);
        setHistory(prev => [...prev, `> Type 'help' for available commands`]);
        setHistory(prev => [...prev, '']);
      }
      setCommand('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff00] font-mono antialiased">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px]"></div>
      
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Terminal Window */}
        <div className="bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.1)]">
          {/* Terminal Header */}
          <div className="bg-[#0d0d0d] border-b border-[#00ff00]/20 rounded-t-lg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            </div>
            <span className="text-[#00ff00]/60 text-xs font-mono">terminal@portfolio-multiverse</span>
            <div className="w-16"></div>
          </div>

          {/* Terminal Body */}
          <div className="bg-[#0a0a0a] border-x border-b border-[#00ff00]/20 rounded-b-lg p-6 min-h-[70vh]">
            {/* ASCII Art Header */}
            <div className="mb-6 text-[#00ff00] text-xs leading-tight">
              <pre className="font-mono">
{`╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     ██████╗  ██████╗ ██████╗ ████████╗              ║
║     ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝              ║
║     ██████╔╝██║   ██║██████╔╝   ██║                  ║
║     ██╔═══╝ ██║   ██║██╔══██╗   ██║                  ║
║     ██║     ╚██████╔╝██║  ██║   ██║                  ║
║     ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝                  ║
║                                                       ║
║     RETRO TERMINAL PORTFOLIO v1.0                    ║
║     Type 'help' for available commands               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝`}
              </pre>
            </div>

            {/* Command History */}
            <div className="space-y-1 mb-4 font-mono text-sm">
              {history.map((line, i) => (
                <div 
                  key={i} 
                  className={
                    line.startsWith('$') 
                      ? 'text-[#00ffff]' 
                      : line.startsWith('>') || line.startsWith('Available') || line.startsWith('  ')
                      ? 'text-[#00ff00]'
                      : 'text-[#00ff00]/80'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Command Input Line */}
            <div className="flex items-center font-mono text-sm">
              <span className="text-[#00ff00] mr-2">developer@portfolio:~$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent text-[#00ff00] outline-none caret-[#00ff00] font-mono"
                autoFocus
                spellCheck={false}
              />
              <span className={`ml-2 text-[#00ff00] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                █
              </span>
            </div>
          </div>
        </div>

        {/* Terminal Info Panel */}
        <div className="mt-6 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#00ff00] mb-3 font-bold text-sm">COMMANDS</h3>
              <ul className="text-[#00ff00]/70 space-y-1 text-xs font-mono">
                <li>$ help     - Show commands</li>
                <li>$ about    - About me</li>
                <li>$ skills   - Technical skills</li>
                <li>$ projects - My projects</li>
                <li>$ ls       - List files</li>
                <li>$ whoami   - Username</li>
                <li>$ clear    - Clear screen</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00ff00] mb-3 font-bold text-sm">FEATURES</h3>
              <ul className="text-[#00ff00]/70 space-y-1 text-xs font-mono">
                <li>• Retro terminal aesthetics</li>
                <li>• Interactive command interface</li>
                <li>• ASCII art header</li>
                <li>• Scanline effect</li>
                <li>• CRT monitor glow</li>
                <li>• Authentic terminal feel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

