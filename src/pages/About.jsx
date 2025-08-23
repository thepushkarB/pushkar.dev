import React from 'react';
import { useState, useEffect } from 'react';

function About() {

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);

  return (
    <div className="min-h-screen bg-[url(/landscape_upscale.jpg)] bg-no-repeat bg-cover bg-center mask-b-from-95% text-slate-900 flex justify-center items-center">
            <div className={` relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold">About Me</h2>
                        <p className="text-lg md:text-2xl text-slate-700 text-shadow-lg/30 text-shadow-slate-200 font-semibold drop-shadow-xl max-w-2xl">
                            Passionate dev w/ love for creating digital experiences
                        </p>
                    </div>
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-400/50 rounded-2xl shadow-xl shadow-lime-300/10 p-8">
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-slate-200">
                                Passionate about tech and endlessly curious, I love turning ideas into code.
                            </p>
                            <p className="text-lg leading-relaxed text-slate-200 mt-6">
                                I’m a full-stack developer working mostly with the MERN stack, Java, and modern web-tech but really, I just enjoy building things that work (and hopefully don’t break). 
                            </p>
                            <p className="text-lg leading-relaxed text-slate-200 mt-6">
                                When I’m not coding, I’m usually tinkering with new tech, cooking up side projects, or geeking out with the dev community.
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
    </div>
    
  )
}

export default About;
