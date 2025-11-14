import React, { useState, useEffect } from 'react';

const BlurryBlob: React.FC<{ className: string }> = ({ className }) => (
    <div className={`absolute rounded-full filter blur-3xl opacity-40 animate-blob ${className}`} />
);

export const Intro: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 200),
            setTimeout(() => setStep(2), 3500),
            setTimeout(() => onFinished(), 4500)
        ];
        return () => timers.forEach(clearTimeout);
    }, [onFinished]);

    return (
        <div className={`fixed inset-0 bg-[#0B071A] z-50 transition-opacity duration-1000 ${step === 2 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative w-full h-full overflow-hidden">
                <BlurryBlob className="bg-purple-600 top-[-10%] left-[-10%] w-96 h-96" />
                <BlurryBlob className="bg-pink-600 top-[-10%] right-[5%] w-72 h-72" style={{animationDelay: '2s'}} />
                <BlurryBlob className="bg-purple-400 bottom-[5%] left-[20%] w-80 h-80" style={{animationDelay: '4s'}} />
                 <BlurryBlob className="bg-indigo-500 bottom-[-10%] right-[5%] w-96 h-96" style={{animationDelay: '2s'}} />
            </div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div className={`transition-opacity duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                     <div className="flex items-center justify-center">
                        <div className="w-16 h-16 mr-4">
                             <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs><linearGradient id="iconGradientIntro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8B5CF6" /><stop offset="100%" stop-color="#EC4899" /></linearGradient></defs>
                                <rect width="64" height="64" rx="12" fill="url(#iconGradientIntro)"/>
                                <rect x="22" y="18" width="6" height="28" fill="white" rx="3" className="opacity-0 animate-logo-bar-1" style={{ animationDelay: '0.4s' }}/>
                                <rect x="36" y="18" width="6" height="28" fill="white" rx="3" className="opacity-0 animate-logo-bar-2" style={{ animationDelay: '0.6s' }}/>
                            </svg>
                        </div>
                        <h1 className="text-6xl font-black font-heading text-white tracking-widest flex">
                           {'fillshy'.split('').map((char, index) => (
                                <span key={index} className="opacity-0 animate-letter-reveal" style={{ animationDelay: `${1 + index * 0.1}s` }}>
                                    {char}
                                </span>
                            ))}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};