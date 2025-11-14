import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../locales/en';
import { pt } from '../locales/pt';

type Language = 'en' | 'pt';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { en, pt };

// Helper to get nested keys like 'sidebar.title'
const getTranslation = (lang: Language, key: string): string => {
    const keys = key.split('.');
    let result: any = translations[lang];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
            return key; // Return key as fallback
        }
    }
    return result;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['en', 'pt'].includes(savedLang)) {
            setLanguageState(savedLang);
        } else {
            const browserLang = navigator.language.split('-')[0] as Language;
            setLanguageState(['en', 'pt'].includes(browserLang) ? browserLang : 'en');
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };
    
    const t = (key: string): string => {
        return getTranslation(language, key);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
