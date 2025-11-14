import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const Header: React.FC<{
    isConnected?: boolean;
    onConnect?: () => void;
    onEnterApp?: () => void;
    isScrolled?: boolean;
}> = ({ isConnected, onConnect, onEnterApp, isScrolled }) => {
    const { t } = useTranslations();

    return (
        <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? 'p-2' : 'p-4'}`}>
            <div className="mx-auto max-w-7xl">
                <div className={`flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 ${isScrolled ? 'bg-[#110C22]/80 backdrop-blur-sm border border-purple-900/50' : ''}`}>
                    <div 
                        className="flex items-center"
                    >
                        <div className="w-8 h-8 mr-2">
                             <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradientHeader" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8B5CF6" /><stop offset="100%" stop-color="#EC4899" /></linearGradient></defs><rect width="64" height="64" rx="12" fill="url(#iconGradientHeader)"/><path d="M24 18H42V24H30V30H40V36H30V46H24V18Z" fill="white"/></svg>
                        </div>
                    </div>
                
                    <div className="flex items-center space-x-2">
                         {onEnterApp && (
                             <div>
                                <button onClick={onEnterApp} title={t('homePage.enterAppButton')} className="flex items-center justify-center w-11 h-11 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform focus:outline-none ring-0 focus:ring-0">
                                     <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
                                </button>
                             </div>
                         )}
                         {!isConnected && onConnect && (
                            <div>
                                <button onClick={onConnect} title={t('sidebar.connectGithub')} className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2a2349] hover:bg-purple-800/50 transition-colors focus:outline-none ring-0 focus:ring-0">
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </button>
                            </div>
                         )}
                    </div>
                </div>
            </div>
        </header>
    );
};