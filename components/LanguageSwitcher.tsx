import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const GlobeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.043l.828.828M4.043 7.707l.828.828M7.707 15.957l.828-.828M4.043 12.293l.828-.828" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.957 7.707l-.828.828M12.293 4.043l-.828.828M15.957 12.293l-.828-.828M12.293 15.957l-.828-.828" />
    </svg>
);

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (lang: 'en' | 'pt') => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                aria-label={t('header.toggleLanguage')}
            >
                <GlobeIcon className={`transition-transform duration-300 ${isOpen ? 'rotate-12' : ''}`} />
            </button>
            {isOpen && (
                <div 
                    className="absolute top-full right-0 mt-2 w-28 bg-[#2a2252]/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl p-2 z-50
                               animate-fade-in-down"
                >
                    <button 
                        onClick={() => handleLanguageChange('en')}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-violet-500/50 text-white' : 'text-gray-200 hover:bg-white/10'}`}
                    >
                        English
                    </button>
                    <button 
                        onClick={() => handleLanguageChange('pt')}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors mt-1 ${language === 'pt' ? 'bg-violet-500/50 text-white' : 'text-gray-200 hover:bg-white/10'}`}
                    >
                        Português
                    </button>
                </div>
            )}
            {/* Minimal keyframes needed for the dropdown animation */}
            <style>{`
                @keyframes fade-in-down { 
                    from { opacity: 0; transform: translateY(-10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-down { 
                    animation: fade-in-down 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LanguageSwitcher;