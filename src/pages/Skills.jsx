
// todo: cool =, jus gotta simplfy a lil
// import React, { useState, useEffect } from 'react';
// import { Code, Database, Wrench, Globe, Server, Cpu } from 'lucide-react';

// export default function Skills() {
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [hoveredSkill, setHoveredSkill] = useState(null);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//         setIsLoaded(true);
        
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => window.removeEventListener('mousemove', handleMouseMove);
//     }, []);

//     const skillsData = [
//         {
//             category: "Programming Languages",
//             icon: Code,
//             color: "from-blue-500 to-cyan-500",
//             skills: ["Java", "JavaScript", "TypeScript", "Python", "HTML", "CSS"]
//         },
//         {
//             category: "Frameworks & Libraries",
//             icon: Globe,
//             color: "from-green-500 to-emerald-500",
//             skills: ["React", "Next.js", "Node.js", "Express.js", "TailwindCSS", "Bootstrap"]
//         },
//         {
//             category: "Databases",
//             icon: Database,
//             color: "from-purple-500 to-violet-500",
//             skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase"]
//         },
//         {
//             category: "Developer Tools",
//             icon: Wrench,
//             color: "from-orange-500 to-red-500",
//             skills: ["Visual Studio Code", "Git", "GitHub", "Postman", "Netlify", "Vercel", "Docker", "AWS"]
//         },
//         {
//             category: "AI & APIs",
//             icon: Cpu,
//             color: "from-pink-500 to-rose-500",
//             skills: ["OpenAI API", "Google Gemini", "HuggingFace", "REST APIs", "GraphQL", "Prompt Engineering"]
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center bg-fixed relative overflow-hidden">
//             {/* Dynamic background effects */}
//             <div className="absolute inset-0 bg-black/20"></div>
            
//             {/* Floating particles */}
//             {[...Array(20)].map((_, i) => (
//                 <div
//                     key={i}
//                     className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
//                     style={{
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         animationDelay: `${Math.random() * 3}s`,
//                         animationDuration: `${2 + Math.random() * 3}s`
//                     }}
//                 />
//             ))}

//             {/* Mouse follower effect */}
//             <div
//                 className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
//                 style={{
//                     left: mousePosition.x - 192,
//                     top: mousePosition.y - 192,
//                     zIndex: 1
//                 }}
//             />

//             <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
//                 <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
//                     {/* Header */}
//                     <div className="text-center mb-16">
//                         <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 drop-shadow-2xl">
//                             Technical Skills
//                         </h1>
//                         <p className="text-xl md:text-2xl text-slate-700 font-semibold drop-shadow-xl max-w-3xl mx-auto">
//                             Technologies I work with regularly
//                         </p>
//                         <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
//                     </div>

//                     {/* Skills Categories */}
//                     <div className="space-y-20">
//                         {skillsData.map((category, categoryIndex) => {
//                             const Icon = category.icon;
//                             return (
//                                 <div
//                                     key={category.category}
//                                     className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
//                                     style={{ transitionDelay: `${categoryIndex * 200}ms` }}
//                                 >
//                                     {/* Category Header */}
//                                     <div className="text-center mb-8">
//                                         <div className="flex items-center justify-center space-x-4 mb-4">
//                                             <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
//                                                 <Icon className="w-6 h-6 text-white" />
//                                             </div>
//                                             <h2 className="text-3xl md:text-4xl font-bold text-slate-800 drop-shadow-lg">
//                                                 {category.category}
//                                             </h2>
//                                         </div>
//                                         <div className={`w-16 h-0.5 bg-gradient-to-r ${category.color} mx-auto rounded-full`}></div>
//                                     </div>

//                                     {/* Skills Grid - PERFECTLY CENTERED */}
//                                     <div className="flex justify-center">
//                                         <div 
//                                             className="grid gap-4 md:gap-6"
//                                             style={{
//                                                 gridTemplateColumns: `repeat(${Math.min(category.skills.length, 5)}, minmax(0, 1fr))`,
//                                                 maxWidth: `${Math.min(category.skills.length, 5) * 200}px`,
//                                                 width: '100%'
//                                             }}
//                                         >
//                                             {category.skills.map((skill, skillIndex) => (
//                                                 <div
//                                                     key={skill}
//                                                     className="group relative cursor-pointer"
//                                                     onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
//                                                     onMouseLeave={() => setHoveredSkill(null)}
//                                                     style={{
//                                                         transitionDelay: `${skillIndex * 100}ms`
//                                                     }}
//                                                 >
//                                                     {/* Glow effect */}
//                                                     <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                                                    
//                                                     {/* Skill card */}
//                                                     <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-1 shadow-xl">
//                                                         <div className="space-y-2">
//                                                             {/* Skill icon placeholder */}
//                                                             <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${category.color} rounded-lg mx-auto flex items-center justify-center mb-3`}>
//                                                                 <span className="text-white font-bold text-sm md:text-base">
//                                                                     {skill.charAt(0)}
//                                                                 </span>
//                                                             </div>
                                                            
//                                                             {/* Skill name */}
//                                                             <h3 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-slate-900 transition-colors drop-shadow">
//                                                                 {skill}
//                                                             </h3>
                                                            
//                                                             {/* Animated progress bar */}
//                                                             <div className="w-full bg-white/20 rounded-full h-1.5 mt-3">
//                                                                 <div 
//                                                                     className={`bg-gradient-to-r ${category.color} h-1.5 rounded-full transition-all duration-1000 ease-out ${
//                                                                         hoveredSkill === `${categoryIndex}-${skillIndex}` ? 'w-full' : 'w-0'
//                                                                     }`}
//                                                                     style={{ transitionDelay: `${skillIndex * 50}ms` }}
//                                                                 ></div>
//                                                             </div>
//                                                         </div>

//                                                         {/* Floating number indicator */}
//                                                         {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
//                                                             <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-bounce">
//                                                                 {skillIndex + 1}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Fun stats section */}
//                     <div className="mt-24 text-center">
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//                             {[
//                                 { number: "3+", label: "Years Experience" },
//                                 { number: "15+", label: "Technologies" },
//                                 { number: "25+", label: "Projects Built" },
//                                 { number: "∞", label: "Learning Journey" }
//                             ].map((stat, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl"
//                                     style={{ transitionDelay: `${index * 100}ms` }}
//                                 >
//                                     <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 drop-shadow-lg">
//                                         {stat.number}
//                                     </div>
//                                     <div className="text-slate-700 font-medium drop-shadow">
//                                         {stat.label}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// align w/ current theme: 
import React from 'react';
import { useState, useEffect } from 'react';

function Skills() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState(null);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const skills = {
        'Programming Languages': ["Java", "JavaScript", "HTML", "CSS"],
        'Frameworks & Libraries': ["React", "Vite-React", "Node.js", "Express.js", "TailwindCSS"],
        'Databases': ["MongoDB"],
        'Developer Tools': ["Visual Studio Code", "Windsurf", "Git", "GitHub", "HuggingFace", "Postman", "Netlify", "Prompt Engineering", "Gemini CLI", "OpenAI Codex", "Inngest", "Mailtrap", "Notistack", "JWT"]
    }

    // Define colors for each category
    const categoryColors = {
        'Programming Languages': 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
        'Frameworks & Libraries': 'from-green-500/20 to-emerald-500/20 border-green-400/30',
        'Databases': 'from-purple-500/20 to-violet-500/20 border-purple-400/30',
        'Developer Tools': 'from-orange-500/20 to-red-500/20 border-orange-400/30'
    }

    const categoryTextColors = {
        'Programming Languages': 'text-blue-300',
        'Frameworks & Libraries': 'text-green-300',
        'Databases': 'text-purple-300',
        'Developer Tools': 'text-orange-300'
    }

    const categoryHoverTextColors = {
        'Programming Languages': 'group-hover:text-blue-300',
        'Frameworks & Libraries': 'group-hover:text-green-300',
        'Databases': 'group-hover:text-purple-300',
        'Developer Tools': 'group-hover:text-orange-300'
    }

    return (
        <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center bg-fixed text-slate-900 flex justify-center items-center py-12 relative overflow-hidden">

            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-slate-900/10"></div>
            
            <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} container mx-auto px-4 max-w-7xl`}>
                <div className="space-y-16">
                    
                    {/* Header Section */}
                    <div className="text-center space-y-6">
                        <h2 className="text-slate-900 text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl">
                            Technical Skills
                        </h2>
                        <p className="text-slate-700 md:text-2xl lg:text-3xl text-shadow-lg/30 text-shadow-slate-100 font-semibold drop-shadow-xl max-w-3xl mx-auto">
                            Technologies I work with regularly
                        </p>
                        
                        {/* Animated underline */}
                        {/* <div className="flex justify-center">
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        </div> */}
                    </div>

                    {/* Skills Categories */}
                    {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                        <div 
                            key={category} 
                            className={`space-y-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ 
                                transitionDelay: `${categoryIndex * 200}ms`
                            }}
                        >
                            {/* Category Title */}
                            <div className="text-center space-y-4">
                                <h3 className={`text-slate-100 text-2xl md:text-3xl lg:text-4xl font-bold text-shadow-lg/30 text-shadow-slate-900 drop-shadow-xl ${categoryTextColors[category]}`}>
                                    {category}
                                </h3>
                                <div className="flex justify-center">
                                    <div className={`w-16 h-0.5 bg-gradient-to-r ${categoryColors[category].split(' ')[0]} ${categoryColors[category].split(' ')[1]} rounded-full`}></div>
                                </div>
                            </div>
                            
                            {/* Skills Grid - Centered using flexbox */}
                            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                                {skillList.map((skill, index) => (
                                    <div
                                        key={skill}
                                        className={`group relative cursor-pointer transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                        style={{ 
                                            transitionDelay: `${(categoryIndex * 200) + (index * 100)}ms`
                                        }}
                                        onMouseEnter={() => setHoveredSkill(`${category}-${skill}`)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        {/* Glow effect */}
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColors[category]} rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                                        
                                        {/* Skill badge */}
                                        <div className={`relative bg-slate-900/30 backdrop-blur-xl border ${categoryColors[category]} rounded-full px-6 py-3 text-center hover:bg-slate-900/60 transition-all duration-200 hover:scale-110 hover:shadow-2xl group-hover:-translate-y-1`}>
                                            <span className={`font-medium text-white text-shadow-lg/40 text-shadow-slate-900 text-sm md:text-base lg:text-lg ${categoryHoverTextColors[category]} transition-colors duration-300`}>
                                                {skill}
                                            </span>
                                            
                                            {/* Shine effect */}
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Bottom decorative element */}
                    <div className="flex justify-center pt-12">
                        <div className="flex space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce opacity-60"
                                    style={{
                                        animationDelay: `${i * 0.2}s`,
                                        animationDuration: '1.5s'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default Skills;