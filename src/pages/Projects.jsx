// import React from 'react';
// import { useState, useEffect } from 'react';
// import { ExternalLink } from "lucide-react";
// import { useNavigate } from "react-router-dom";


// function Projects() {

//     const navigate = useNavigate();
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//         setIsLoaded(true);
//     }, []);


//     const projects = [
//         {
//           title: "Ticket Tamer",
//           description: "An AI-powered customer support ticketing system built with a modern full-stack architecture. The backend uses Node.js, Express, and MongoDB, with Inngest for reliable, event-driven background jobs. The frontend is a responsive React application built with Vite.",
//           tech: ["React.js", "Express.js" , "Node.js", "MongoDB", "JWT", "Google Gemini", "Inngest", "Mailtrap", "Notistack"],
//           link: "https://github.com/thepushkarB/ticket-tamer"
//         },
//         {
//           title: "Lit Lib",
//           description: "Lit-Lib is a simple, full-stack book store web application that lets users securely manage a collection of books. Features include user authentication, CRUD operations, and a clean, responsive interface for easy browsing and management.",
//           tech: ["React.js", "Tailwind CSS", "Express.js" , "Node.js", "MongoDB", "JWT", "Notistack"],
//           link: "https://github.com/thepushkarB/lit-lib"
//         },
//         {
//           title: "Freaky Pixel Machine",
//           description: "A React-based web application that generates AI images using text prompts. Users can input a description, and the app will create multiple image variations. This app leverages the Text-to-Image model hosted on HuggingFace Spaces.",
//           tech: ["React.js", "Tailwind CSS", "HuggingFace Spaces", "Netlify"],
//           link: "https://github.com/thepushkarB/freaky-pixel-machine"
//         },
//         {
//           title: "Forbidden Bulk",
//           description: "A cutting-edge web application designed to navigate your fitness journey with clean interface & lets you summon your gains effortlessly",
//           tech: ["React.js", "Tailwind CSS", "Netlify"],
//           link: "https://github.com/thepushkarB/freaky-pixel-machine"
//         }
//     ]


//   return (
//     <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center mask-b-from-95% text-white flex justify-center items-center">
//         <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

//             <div className="space-y-8 max-w-2xl mx-auto mt-20">
//               <div className="text-center space-y-4">
//                 <h2 className=" text-slate-900 text-4xl font-bold">Featured Projects</h2>
//                 <p className="text-lg text-slate-700 text-shadow-lg/30 text-shadow-slate-50">Some of my recent work and contributions</p>
//               </div>
//               <div className="grid gap-6 cursor-pointer">
//                 {projects.map((project, index) => (
//                   <div
//                     key={index}
//                     className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:scale-[1.02]"
//                     onClick={() => window.open(project.link, '_blank')}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="space-y-3 flex-1">
//                         <h3 className="text-xl font-semibold group-hover:text-emerald-300 transition-colors">
//                           {project.title}
//                         </h3>
//                         <p className="text-slate-300">{project.description}</p>
//                         <div className="flex flex-wrap gap-2">
//                           {project.tech.map((tech) => (
//                             <span
//                               key={tech}
//                               className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg text-sm border border-emerald-500/30"
//                             >
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                       <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors ml-4" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Projects;



import React from 'react';
import { useState, useEffect } from 'react';
import { ExternalLink } from "lucide-react";

function Projects() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsLoaded(true);
        
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const projects = [
        {
            title: "Ticket Tamer",
            description: "An AI-powered customer support ticketing system built with a modern full-stack architecture. The backend uses Node.js, Express, and MongoDB, with Inngest for reliable, event-driven background jobs. The frontend is a responsive React application built with Vite.",
            tech: ["React.js", "Express.js", "Node.js", "MongoDB", "JWT", "Google Gemini", "Inngest", "Mailtrap", "Notistack"],
            link: "https://github.com/thepushkarB/ticket-tamer"
        },
        {
            title: "Lit Lib",
            description: "Lit-Lib is a simple, full-stack book store web application that lets users securely manage a collection of books. Features include user authentication, CRUD operations, and a clean, responsive interface for easy browsing and management.",
            tech: ["React.js", "Tailwind CSS", "Express.js", "Node.js", "MongoDB", "JWT", "Notistack"],
            link: "https://github.com/thepushkarB/lit-lib"
        },
        {
            title: "Freaky Pixel Machine",
            description: "A React-based web application that generates AI images using text prompts. Users can input a description, and the app will create multiple image variations. This app leverages the Text-to-Image model hosted on HuggingFace Spaces.",
            tech: ["React.js", "Tailwind CSS", "HuggingFace Spaces", "Netlify"],
            // link: "https://github.com/thepushkarB/freaky-pixel-machine"
            link: "https://freakypixel.netlify.app/"
        },
        {
            title: "Forbidden Bulk",
            description: "A cutting-edge web application designed to navigate your fitness journey with clean interface & lets you summon your gains effortlessly.",
            tech: ["React.js", "Tailwind CSS", "Netlify"],
            // link: "https://github.com/thepushkarB/forbiddenBulk"
            link: "https://forbiddenbulk.netlify.app/"
        },
        {
            title: "Task Rage",
            description: "No-nonsense, minimalist CRUD todo list built with ReactJS and Vite. Designed for maximum productivity, it helps you manage tasks efficiently without distractions. Add, edit, and delete tasks seamlessly—because getting things done shouldn't be complicated.",
            tech: ["React.js", "Vite", "Tailwind CSS", "Netlify"],
            // link: "https://github.com/thepushkarB/TaskRage"
            link: "https://taskrage.netlify.app/"
        },
    ];

    // Calculate opacity for header based on scroll position
    const headerOpacity = Math.max(0, 1 - scrollY / 300);
    const headerBlur = Math.min(10, scrollY / 30);

    return (
        <div className="relative">
            {/* Fixed Background */}
            <div 
                className="fixed inset-0 bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center bg-fixed"
                style={{ zIndex: -1 }}
            />
            
            {/* Fixed overlay for better text readability */}
            <div 
                className="fixed inset-0 bg-black/10"
                style={{ zIndex: -1 }}
            />

            {/* Header Section - Fixed at top with fade effect */}
            <div 
                className="sticky top-0 z-20 h-screen flex items-center justify-center"
                style={{
                    opacity: headerOpacity,
                    filter: `blur(${headerBlur}px)`,
                    pointerEvents: headerOpacity < 0.1 ? 'none' : 'auto'
                }}
            >
                <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-center space-y-4 px-6">
                        <h2 className="text-slate-900 text-4xl md:text-6xl font-bold drop-shadow-2xl">
                            Featured Projects
                        </h2>
                        <p className="text-lg md:text-2xl text-slate-300 text-shadow-lg/30 text-shadow-slate-900 font-semibold drop-shadow-xl max-w-2xl">
                            Some of my recent work and contributions
                        </p>
                        <div className="mt-8 animate-bounce flex justify-center items-center space-x-2"> 
                            <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-slate-200 rounded-full mt-2 animate-pulse"></div>
                            </div>
                            <span className="text-slate-300 text-shadow-lg/30 text-shadow-slate-900 font-semibold drop-shadow-xl">scroll down</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Section - Scrollable content */}
            <div className="relative z-10 min-h-screen">
                {/* Spacer to push projects down */}
                <div className="h-20"></div>
                
                <div className="max-w-4xl mx-auto px-6 pb-20">
                    <div className="space-y-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={`group cursor-pointer transition-all duration-700 ${
                                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                                style={{ 
                                    transitionDelay: `${index * 150}ms`,
                                    animationDelay: `${index * 150}ms`
                                }}
                                onClick={() => window.open(project.link, '_blank')}
                            >
                                {/* Project card with enhanced effects */}
                                <div className="relative">
                                    {/* Glow effect on hover */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Main card */}
                                    <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-8 hover:bg-slate-900/60 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/40 shadow-2xl">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-4 flex-1">

                                                <div className="flex items-center space-x-4">
                                                    {/* Project Number */}
                                                    {/* <span className="text-4xl font-bold text-emerald-400/30 group-hover:text-emerald-400/50 transition-colors">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span> */}

                                                    {/* Project Title */}
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                
                                                {/* Project Description */}
                                                <p className="text-slate-200 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                                                    {project.description}
                                                </p>
                                                
                                                {/* Tech stack */}
                                                <div className="flex flex-wrap gap-3 pt-2">
                                                    {project.tech.map((tech, techIndex) => (
                                                        <span
                                                            key={tech}
                                                            className="bg-emerald-500/10 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-105"
                                                            style={{ 
                                                                transitionDelay: `${techIndex * 50}ms` 
                                                            }}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* External link icon */}
                                            {/* <div className="ml-6 flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:from-emerald-500/40 group-hover:to-blue-500/40 transition-all duration-300 group-hover:scale-110">
                                                    <ExternalLink className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* End section */}
                    <div className="text-center mt-20 py-12">
                        <div className="inline-flex items-center space-x-4 bg-slate-900/40 backdrop-blur-xl border border-slate-600/30 rounded-full px-8 py-4">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-slate-300 font-medium">More projects coming soon...</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;