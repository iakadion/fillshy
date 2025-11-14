import React, { useEffect, useState } from 'react';

const Intro: React.FC<{ onIntroEnd: () => void }> = ({ onIntroEnd }) => {
    const [animationState, setAnimationState] = useState('entering');

    useEffect(() => {
        // Total animation duration:
        // enter (1.5s) + stay (2s) + exit (1s) = 4.5s
        const enterTimer = setTimeout(() => {
            setAnimationState('exiting');
        }, 3500); // 1.5s enter + 2s stay

        const exitTimer = setTimeout(() => {
            onIntroEnd();
        }, 4500); // 3.5s + 1s exit

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, [onIntroEnd]);

    return (
        <div className="fixed inset-0 bg-[#0B071A] z-50 flex items-center justify-center overflow-hidden">
            {/* Animated bubbles background */}
            <div className="absolute inset-0 filter blur-3xl">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500 rounded-full opacity-30 animate-bubble1"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full opacity-30 animate-bubble2"></div>
                <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-indigo-500 rounded-full opacity-20 animate-bubble3"></div>
            </div>

            <div className={`
                flex flex-col items-center justify-center
                transition-all duration-1000 ease-in-out
                ${animationState === 'entering' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `}>
                <div className="w-24 h-24 mb-4">
                    {/* Reusing the favicon SVG for the logo */}
                    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                        <rect width="64" height="64" rx="12" fill="url(#iconGradient)"/>
                        <path d="M24 18H42V24H30V30H40V36H30V46H24V18Z" fill="white"/>
                    </svg>
                </div>
                <h1 className="text-5xl font-bold font-heading tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                    fillshy
                </h1>
            </div>

            <style>
                {`
                @keyframes bubble1-move {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(100px, 50px) scale(1.2); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                @keyframes bubble2-move {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-80px, -60px) scale(0.8); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                 @keyframes bubble3-move {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(40px, -90px) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-bubble1 { animation: bubble1-move 12s ease-in-out infinite; }
                .animate-bubble2 { animation: bubble2-move 15s ease-in-out infinite; }
                .animate-bubble3 { animation: bubble3-move 10s ease-in-out infinite; }
                `}
            </style>
        </div>
    );
};

export default Intro;
