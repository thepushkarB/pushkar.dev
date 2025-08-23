// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// // import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';


// Perplexity aesthetic
import { useState, useEffect } from 'react'
import { Search, Sparkles, Code, Briefcase, User, Mail, Github, Linkedin, ExternalLink, ChevronRight, CircleUserRound } from 'lucide-react'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      setActiveSection('results')
    }, 1500)
  }

  const projects = [
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Built with React, TypeScript, and D3.js for real-time data visualization",
      tech: ["React", "TypeScript", "D3.js", "Node.js"],
      link: "#"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack application with payment integration and inventory management",
      tech: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
      link: "#"
    },
    {
      title: "Mobile App for Productivity",
      description: "Cross-platform mobile app built with React Native and Firebase",
      tech: ["React Native", "Firebase", "Redux", "AsyncStorage"],
      link: "#"
    }
  ]

  const skills = [
    "JavaScript/TypeScript", "React/Next.js", "Node.js", "Python", 
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Tailwind CSS"
  ]

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    // <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center mask-b-from-95% text-white">
    //   {/* Animated background particles */}
    //   {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
    //     {[...Array(50)].map((_, i) => (
    //       <div
    //         key={i}
    //         className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse"
    //         style={{
    //           left: `${Math.random() * 100}%`,
    //           top: `${Math.random() * 100}%`,
    //           animationDelay: `${Math.random() * 3}s`,
    //           animationDuration: `${2 + Math.random() * 3}s`
    //         }}
    //       />
    //     ))}
    //   </div> */}

    //   <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    //     {/* Header */}
    //     <div className="pt-3 px-3">
    //       <header className="rounded-full border-slate-800/50 backdrop-blur-lg bg-slate-900/20">
    //         <div className="max-w-7xl mx-auto px-6 py-3">
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center space-x-3">
    //               {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
    //                 <Sparkles className="w-6 h-6 text-white" />
    //               </div> */}
    //               <div className="w-10 h-10 flex items-center justify-center">
    //                 {/* <CircleUserRound className="w-6 h-6 text-white" /> */}
    //                 <Sparkles className="text-white" />
    //               </div>
    //               <span className="text-xl font-bold text-slate-50 bg-clip-text cursor-pointer">
    //                 Pushkar Bankar
    //               </span>
    //             </div>
    //             <nav className="hidden md:flex items-center space-x-8 ">
    //               {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
    //                 <button
    //                   key={item}
    //                   className="text-slate-200 hover:text-white transition-colors duration-200 hover:scale-105 cursor-pointer"
    //                   onClick={() => setActiveSection(item.toLowerCase())}
    //                 >
    //                   {item}
    //                 </button>
    //               ))}
    //             </nav>
    //           </div>
    //         </div>
    //       </header>
    //     </div>

    //     {/* Main Content */}
    //     <main className="max-w-4xl mx-auto px-6 py-12">
    //       {activeSection === 'search' && (
    //         <div className="text-center space-y-8">
    //           {/* Intro */}
    //           <div className="text-left space-y-4">
    //             <div className="space-y-1">
    //               <h1 className="text-5xl md:text-5xl font-bold text-slate-800">
    //                 Hi, I'm Pushkar!
    //               </h1>
    //               <p className="text-lg md:text-3xl font-bold text-slate-800">
    //                 [Full-Stack Developer]
    //               </p>
    //             </div>

    //             <div className=" bg-slate-800/30 backdrop-blur-md border border-slate-300/30 rounded-4xl p-4">
    //               <p className="text-lg text-slate-50 text-shadow-lg/30 text-shadow-slate-700 mx-2.5">
    //                 A developer who converts coffee into code and ideas into applications.
    //               </p>
    //               <p className="text-lg text-slate-50 text-shadow-lg/30 text-shadow-slate-700 mx-2.5">
    //                 I design and build full-stack web apps with the MERN stack, transforming complex problems into simple, scalable solutions.
    //               </p>
    //             </div>
    //             {/* <p className="text-sm md:text-2xl text-slate-700 text-shadow-lg/30 text-shadow-slate-50 mx-2.5">
    //               A developer who converts coffee into code and ideas into applications. My toolkit is the MERN stack, and my current obsession is teaching it new tricks with AI.
    //             </p> */}
    //           </div>

    //           {/* Search Interface */}
    //           {/* <div className="max-w-2xl mx-auto">
    //             <div className="relative group">
    //               <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
    //               <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-1">
    //                 <div className="flex items-center space-x-4 px-6 py-4">
    //                   <Search className="w-5 h-5 text-slate-400" />
    //                   <input
    //                     type="text"
    //                     placeholder="Ask me about my projects, skills, or experience..."
    //                     value={searchQuery}
    //                     onChange={(e) => setSearchQuery(e.target.value)}
    //                     onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
    //                     className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
    //                   />
    //                   <button
    //                     onClick={handleSearch}
    //                     disabled={!searchQuery.trim() || isSearching}
    //                     className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
    //                   >
    //                     {isSearching ? (
    //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //                     ) : (
    //                       'Search'
    //                     )}
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div> */}

    //           {/* Quick Actions */}
    //           <div className="flex flex-wrap justify-center gap-4 mt-8">
    //             {[
    //               { icon: Code, label: 'View Projects', action: () => setActiveSection('projects') },
    //               { icon: User, label: 'About Me', action: () => setActiveSection('about') },
    //               { icon: Briefcase, label: 'Skills', action: () => setActiveSection('skills') },
    //               { icon: Mail, label: 'Contact', action: () => setActiveSection('contact') }
    //             ].map(({ icon: Icon, label, action }) => (
    //               <button
    //                 key={label}
    //                 onClick={action}
    //                 className="flex items-center space-x-2 bg-slate-800/20 hover:bg-slate-800/40 backdrop-blur-md border border-slate-300/60 rounded-full px-4 py-3 transition-all duration-200 hover:scale-105 cursor-pointer"
    //               >
    //                 <Icon className="w-4 h-4" />
    //                 <span>{label}</span>
    //               </button>
    //             ))}
    //           </div>
    //         </div>
    //       )}


    //       {/* Projects */}
    //       {activeSection === 'projects' && (
    //         <div className="space-y-8">
    //           <div className="text-center space-y-4">
    //             <h2 className="text-4xl font-bold">Featured Projects</h2>
    //             <p className="text-slate-300 text-lg">Some of my recent work and contributions</p>
    //           </div>
    //           <div className="grid gap-6">
    //             {projects.map((project, index) => (
    //               <div
    //                 key={index}
    //                 className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:scale-[1.02]"
    //               >
    //                 <div className="flex items-start justify-between">
    //                   <div className="space-y-3 flex-1">
    //                     <h3 className="text-xl font-semibold group-hover:text-purple-300 transition-colors">
    //                       {project.title}
    //                     </h3>
    //                     <p className="text-slate-300">{project.description}</p>
    //                     <div className="flex flex-wrap gap-2">
    //                       {project.tech.map((tech) => (
    //                         <span
    //                           key={tech}
    //                           className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/30"
    //                         >
    //                           {tech}
    //                         </span>
    //                       ))}
    //                     </div>
    //                   </div>
    //                   <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors ml-4" />
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       )}

    //       {/* Skills */}
    //       {activeSection === 'skills' && (
    //         <div className="space-y-8">
    //           <div className="text-center space-y-4">
    //             <h2 className="text-4xl font-bold">Technical Skills</h2>
    //             <p className="text-slate-300 text-lg">Technologies I work with regularly</p>
    //           </div>
    //           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    //             {skills.map((skill, index) => (
    //               <div
    //                 key={skill}
    //                 className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-800/50 transition-all duration-200 hover:scale-105"
    //                 style={{
    //                   animationDelay: `${index * 100}ms`
    //                 }}
    //               >
    //                 <span className="font-medium">{skill}</span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       )}

    //       {/* About */}
    //       {activeSection === 'about' && (
    //         <div className="space-y-8 max-w-3xl mx-auto">
    //           <div className="text-center space-y-4">
    //             <h2 className="text-4xl font-bold">About Me</h2>
    //             <p className="text-slate-300 text-lg">Passionate developer with a love for creating digital experiences</p>
    //           </div>
    //           <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
    //             <div className="prose prose-invert max-w-none">
    //               <p className="text-lg leading-relaxed text-slate-200">
    //                 I'm a full-stack developer with 3+ years of experience building web applications. 
    //                 I specialize in React, Node.js, and modern web technologies. I'm passionate about 
    //                 writing clean, maintainable code and creating user experiences that delight.
    //               </p>
    //               <p className="text-lg leading-relaxed text-slate-200 mt-6">
    //                 When I'm not coding, you can find me exploring new technologies, contributing to 
    //                 open source projects, or sharing knowledge with the developer community.
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Contact */}
    //       {/* {activeSection === 'contact' && (
    //         <div className="space-y-8 max-w-2xl mx-auto">
    //           <div className="text-center text-slate-900 space-y-4">
    //             <h2 className="text-4xl font-bold">Get In Touch</h2>
    //             <p className="text-lg text-slate-700 text-shadow-lg/30 text-shadow-slate-50">Let's discuss your next project or opportunity</p>
    //           </div>
    //           <div className="grid gap-4">
    //             {[
    //               { icon: Mail, label: 'pushkarbankar.sit.comp@gmail.com', href: 'mailto:pushkarbankar.sit.comp@gmail.com' },
    //               { icon: Github, label: 'GitHub Profile', href: 'https://github.com/thepushkarb' },
    //               { icon: Linkedin, label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pushkar-bankar-22a3551b9/' }
    //             ].map(({ icon: Icon, label, href }) => (
    //               <a
    //                 key={label}
    //                 href={href}
    //                 className="flex items-center justify-between bg-slate-800/20 backdrop-blur-sm border border-slate-300/60 rounded-4xl p-6 hover:bg-slate-800/40 transition-all duration-200 hover:scale-105 group"
    //               >
    //                 <div className="flex items-center space-x-4">
    //                   <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center">
    //                     <Icon className="w-6 h-6 text-white" />
    //                   </div>
    //                   <span className="text-lg font-medium">{label}</span>
    //                 </div>
    //                 <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors" />
    //               </a>
    //             ))}
    //           </div>
    //         </div>
    //       )} */}
    //     </main>

    //     {/* Footer */}
    //     {/* <footer className="border-t border-slate-800/50 mt-20">
    //       <div className="max-w-7xl mx-auto px-6 py-8">
    //         <div className="text-center text-slate-400">
    //           <p>&copy; 2025 Your Name. Built with React, Vite, and Tailwind CSS.</p>
    //         </div>
    //       </div>
    //     </footer> */}
    //   </div>
    // </div>
  )
}

export default App


// CLI aesthetic
// function App() {
//   return (
//     <div className="min-h-screen bg-black text-pink-500 font-mono flex flex-col items-center py-10 px-6">
//       {/* Glitch Image */}
//       <img
//         src="/glitch-girl.png" // replace with your image path
//         alt="Glitch Girl"
//         className="w-40 mb-6"
//       />

//       {/* Header */}
//       <h1 className="text-3xl font-bold">♡ alexine</h1>

//       {/* Bio */}
//       <div className="mt-4 text-center space-y-2">
//         <p>Alexine Le Port</p>
//         <p>
//           Here's my only fixed address <br />
//           I'm a traveler, bioinformatics MSc student &amp; I run a small clothing
//           business
//         </p>
//         <p>&gt; currently at CGSI summerschool in LA</p>
//       </div>

//       {/* Playlist Link */}
//       <div className="mt-6">
//         <a
//           href="#"
//           className="underline flex items-center gap-2 hover:text-pink-300"
//         >
//           ☣ listen to my sick playlists ☣
//         </a>
//       </div>

//       {/* Interests */}
//       <div className="mt-6 max-w-xl text-center">
//         <p>
//           interest : bio/ml, computer arch, theology, philosophy, music, arts,
//           poetry, opera, theater, horror, books, hiking, experiencing and pushing
//           the boundaries of my understanding
//         </p>
//       </div>

//       {/* Hates */}
//       <div className="mt-6 max-w-xl text-center">
//         <p>
//           pure hate : journalism, ideology,{" "}
//           <a href="#" className="underline">
//             this kind of bad faith
//           </a>
//           , authority, advertising, 2-factor authentication and Windows
//         </p>
//       </div>

//       {/* Links */}
//       <div className="mt-10 text-left space-y-3">
//         <p>↓ will update soon</p>

//         <ul className="list-disc list-inside">
//           <li>
//             take a look at
//             <ul className="list-circle list-inside ml-4">
//               <li>
//                 <a href="#" className="underline">
//                   my mid articles... &gt;
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="underline">
//                   my recommendations... &gt;
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             my links
//             <ul className="list-circle list-inside ml-4">
//               <li>
//                 <a href="#" className="underline">
//                   insta
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="underline">
//                   date me
//                 </a>
//               </li>
//               <li>
//                 <a href="mailto:alexine@email.com" className="underline">
//                   email me ♡
//                 </a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>

//       {/* Footer Skull */}
//       <div className="mt-10">
//         <img
//           src="/skull.png" // add your skull image here
//           alt="Skull"
//           className="w-16 opacity-80"
//         />
//       </div>
//     </div>
//   );
// }

// export default App;