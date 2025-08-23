// import React, { useState, useEffect } from 'react';
// import { Send, Github, Linkedin, ChevronRight } from 'lucide-react';

// export default function Contact() {

//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//         setIsLoaded(true);
//     }, []);
    
//   return (
//         <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center mask-b-from-95% text-white flex flex-col justify-center items-center">
//             <div className={` relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

//                 {/* heading text */}
//                 <div className=" space-y-8 max-w-2xl mx-auto">
//                     <div className="text-center text-slate-900 space-y-4 ">
//                         <h2 className="text-4xl font-bold">Get In Touch</h2>
//                         <p className="text-lg text-slate-700 text-shadow-lg/30 text-shadow-slate-50">Let's discuss your next project or opportunity</p>
//                     </div>

//                     {/* contact links */}
//                     <div className="grid gap-4">
//                         {[
//                             { icon: Send, label: 'pushkarbankar.sit.comp@gmail.com', href: 'mailto:pushkarbankar.sit.comp@gmail.com' },
//                             { icon: Github, label: 'GitHub Profile', href: 'https://github.com/thepushkarb' },
//                             { icon: Linkedin, label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pushkar-bankar-22a3551b9/' }
//                         ].map(({ icon: Icon, label, href }) => (
//                             <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-slate-800/20 backdrop-blur-sm border border-slate-300/60 rounded-4xl p-6 hover:bg-slate-800/40 transition-all duration-200 hover:scale-105 group">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center">
//                                         <Icon className="w-6 h-6 text-white" />
//                                     </div>
//                                     <span className="text-lg font-medium">{label}</span>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors" />
//                             </a>
//                         ))}

//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }



import React, { useState, useEffect } from 'react';
import { Send, Github, Linkedin, ChevronRight } from 'lucide-react';

export default function Contact() {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    return (
        <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center mask-b-from-95% text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                
                {/* heading text */}
                <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto w-full">
                    <div className="text-center text-slate-900 space-y-3 sm:space-y-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Get In Touch</h2>
                        <p className="text-lg md:text-2xl text-slate-700 text-shadow-lg/30 text-shadow-slate-200 font-semibold drop-shadow-xl max-w-2xl">
                            Let's discuss your next project or opportunity
                        </p>
                    </div>
                    
                    {/* contact links */}
                    <div className="grid gap-3 sm:gap-4 w-full">
                        {[
                            { icon: Send, label: 'pushkarbankar.sit.comp@gmail.com', href: 'mailto:pushkarbankar.sit.comp@gmail.com' },
                            { icon: Github, label: 'GitHub Profile', href: 'https://github.com/thepushkarb' },
                            { icon: Linkedin, label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pushkar-bankar-22a3551b9/' }
                        ].map(({ icon: Icon, label, href }) => (
                            <a 
                                key={label} 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-between bg-slate-800/20 backdrop-blur-sm border border-slate-300/60 rounded-2xl sm:rounded-4xl p-4 sm:p-6 hover:bg-slate-800/40 transition-all duration-200 hover:scale-105 group w-full"
                            >
                                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <span className="text-sm sm:text-lg font-medium truncate sm:text-clip">
                                        {label}
                                    </span>
                                </div>
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-purple-300 transition-colors flex-shrink-0 ml-2" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}