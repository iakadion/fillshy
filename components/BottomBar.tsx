import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';

// Icons
const HomeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const CategoriesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);
const LibraryIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const NotificationsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);
const SidebarToggleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const ChevronUpIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);

interface BottomBarProps {
    activeView: 'homepage' | 'app' | 'search';
    onNavigate: (view: 'homepage' | 'app' | 'search') => void;
    isSidebarOpen?: boolean;
    setSidebarOpen?: (isOpen: boolean) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ activeView, onNavigate, isSidebarOpen, setSidebarOpen }) => {
    const { t } = useTranslations();
    const [isExpanded, setIsExpanded] = useState(false);

    const mainNavItems = [
        { id: 'homepage', label: t('bottomBar.explore'), icon: HomeIcon, action: () => onNavigate('homepage') },
        { id: 'search', label: t('bottomBar.search'), icon: SearchIcon, action: () => onNavigate('search') },
        { id: 'app', label: t('bottomBar.generate'), icon: CategoriesIcon, action: () => onNavigate('app') },
        { id: 'library', label: t('bottomBar.library'), icon: LibraryIcon, action: () => { /* No action yet */ } },
    ];
    
    const secondaryNavItems = [
         { id: 'settings', label: t('bottomBar.settings'), icon: SettingsIcon, action: () => { /* No action */ } },
         { id: 'notifications', label: t('bottomBar.notifications'), icon: NotificationsIcon, action: () => { /* No action */ } },
         { 
             id: 'sidebar', 
             label: t('bottomBar.toggleSidebar'), 
             icon: SidebarToggleIcon, 
             action: () => setSidebarOpen?.(!isSidebarOpen),
             condition: activeView === 'app',
             className: 'md:hidden' // Hide on desktop
         },
    ];

    return (
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-sm">
            {/* Expanded Panel */}
            <div className={`transition-all duration-300 ease-in-out transform ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                 <div className="mb-2 bg-[#1A1433]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 flex justify-around items-center">
                    {secondaryNavItems.map(item => (item.condition === undefined || item.condition) && (
                         <button
                            key={item.id}
                            onClick={item.action}
                            className={`flex flex-col items-center justify-center w-20 h-full text-gray-300 hover:text-white transition-colors duration-200 py-1 group ${item.className || ''}`}
                            title={item.label}
                        >
                            <item.icon className="transition-transform duration-200 group-hover:scale-110" />
                            <span className="mt-1 text-xs font-medium">{item.label}</span>
                        </button>
                    ))}
                 </div>
            </div>
            
            <div className="relative h-16 bg-[#1A1433]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-around">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2a2252] h-5 w-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    aria-label="Expand menu"
                >
                    <ChevronUpIcon className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {mainNavItems.map(item => {
                    const isActive = activeView === item.id || (item.id === 'app' && activeView === 'app');
                    return (
                        <button
                            key={item.id}
                            onClick={item.action}
                            className={`flex flex-col items-center justify-center w-20 h-full transition-all duration-300 focus:outline-none group transform hover:-translate-y-1 active:scale-95 ${
                                isActive ? 'text-violet-400' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <item.icon className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="mt-1 text-xs font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </footer>
    );
};

export default BottomBar;
