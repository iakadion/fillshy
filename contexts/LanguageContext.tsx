import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../locales/en';
import { pt } from '../locales/pt';

type Language = 'en' | 'pt';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, replacements?: {[key: string]: string}) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { en, pt };

const getTranslation = (lang: Language, key: string, replacements: {[key: string]: string} = {}): string => {
    const keys = key.split('.');
    let result: any = translations[lang];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
            return key; 
        }
    }
    
    // FIX: Ensure that the final resolved value is a string.
    // If an incomplete key is passed (e.g., 'sidebar' instead of 'sidebar.title'),
    // the result will be an object, which is not a valid React child.
    if (typeof result !== 'string') {
        console.warn(`Translation key "${key}" resolved to an object for language "${lang}". Returning key as fallback.`);
        return key;
    }
    
    // Now we know it's a string, so we can apply replacements.
    Object.keys(replacements).forEach(placeholder => {
        result = result.replace(`{${placeholder}}`, replacements[placeholder]);
    });

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
    
    const t = (key: string, replacements?: {[key: string]: string}): string => {
        return getTranslation(language, key, replacements);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};