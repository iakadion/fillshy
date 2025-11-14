import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    return (
        <div ref={wrapperRef} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl hover:bg-[#2a2349] transition-colors" title={t('header.toggleLanguage')}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#1C1633] border border-purple-900/50 rounded-lg shadow-xl py-1 z-50">
                    <button onClick={() => { setLanguage('en'); setIsOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-pink-400' : 'hover:bg-[#2a2349]'}`}>English</button>
                    <button onClick={() => { setLanguage('pt'); setIsOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'pt' ? 'text-pink-400' : 'hover:bg-[#2a2349]'}`}>Português</button>
                </div>
            )}
        </div>
    );
};