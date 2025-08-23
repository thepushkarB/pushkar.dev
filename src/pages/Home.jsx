import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Code, Briefcase, User, Mail, Github, Linkedin, ExternalLink, ChevronRight, CircleUserRound } from 'lucide-react'

function Home() {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState('search');

    useEffect(() => {
        setIsLoaded(true);
    }, [])

  return (
    <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center mask-b-from-95% text-white">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="pt-3 px-3">
          <header className="rounded-full border-slate-800/50 backdrop-blur-lg bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div> */}
                  <div className="w-10 h-10 flex items-center justify-center">
                    {/* <CircleUserRound className="w-6 h-6 text-white" /> */}
                    {/* <Sparkles className="text-white" /> */}
                  </div>
                  <span className="text-xl font-bold text-slate-50 bg-clip-text cursor-pointer">
                    Pushkar Bankar
                  </span>
                </div>
                <nav className="hidden md:flex items-center space-x-8 ">
                  {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                    <button
                      key={item}
                      className="text-slate-200 hover:text-white transition-colors duration-200 hover:scale-105 cursor-pointer"
                      onClick={() => navigate(item.toLowerCase())}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </header>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {activeSection === 'search' && (
            <div className="text-center space-y-8">
              {/* Intro */}
              <div className="text-left space-y-4">
                <div className="space-y-1">
                  <h1 className="text-5xl md:text-5xl font-bold text-slate-800">
                    Hi, I'm Pushkar!
                  </h1>
                  <p className="text-lg md:text-3xl font-bold text-slate-800">
                    [Full-Stack Developer]
                  </p>
                </div>

                <div className=" bg-slate-800/30 backdrop-blur-md border border-slate-300/30 rounded-4xl p-4">
                  <p className="text-lg text-slate-50 text-shadow-lg/30 text-shadow-slate-700 mx-2.5">
                    A developer who converts coffee into code and ideas into applications.
                  </p>
                  <p className="text-lg text-slate-50 text-shadow-lg/30 text-shadow-slate-700 mx-2.5">
                    I design and build full-stack web apps with the MERN stack, transforming complex problems into simple, scalable solutions.
                  </p>
                </div>
                {/* <p className="text-sm md:text-2xl text-slate-700 text-shadow-lg/30 text-shadow-slate-50 mx-2.5">
                  A developer who converts coffee into code and ideas into applications. My toolkit is the MERN stack, and my current obsession is teaching it new tricks with AI.
                </p> */}
              </div>


              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                    // projects
                  { icon: Code, label: 'View Projects', action: () => navigate('/projects') },

                  // about
                  { icon: User, label: 'About Me', action: () => navigate('/about') },

                  // skills
                  { icon: Briefcase, label: 'Skills', action: () => navigate('/skills') },

                  // contact
                  { icon: Mail, label: 'Contact', action: () => navigate('/contact') }
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="flex items-center space-x-2 bg-slate-800/20 hover:bg-slate-800/40 backdrop-blur-md border border-slate-300/60 rounded-full px-4 py-3 transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home;
