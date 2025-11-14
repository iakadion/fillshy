import React from 'react';
import type { Category, AutonomousStatus } from '../types';
import { useTranslations } from '../hooks/useTranslations';

// Icons
const GithubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg> );
const AutonomousIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2.25 2.25 0 003.813-1.618a2.25 2.25 0 00-3.813-1.618m-10.456 3.236a2.25 2.25 0 013.813-1.618a2.25 2.25 0 01-3.813-1.618m0 3.236l.33.165a2.25 2.25 0 002.823.442m-3.153-2.247l.33.165a2.25 2.25 0 012.823.442m0 0l.33-.165a2.25 2.25 0 002.823-.442m0 0l.33.165a2.25 2.25 0 012.823-.442m-9.345 2.247a2.25 2.25 0 002.823-.442m-3.153-2.247a2.25 2.25 0 012.823-.442m-6.198 4.494L2.25 12m0 0l1.5-1.5M2.25 12l1.5 1.5m16.5-3l1.5-1.5m-1.5 1.5l1.5 1.5" /> </svg> );
const ChangelogIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> </svg> );


interface SidebarProps {
    categories: Category[]; selectedCategory: Category | null; onSelectCategory: (category: Category) => void; isOpen: boolean; setIsOpen: (isOpen: boolean) => void; onOpenGithubModal: () => void; isGithubConnected: boolean; isAutonomous: boolean; onToggleAutonomous: () => void; autonomousStatus: AutonomousStatus; autonomousLogs: string[]; onOpenChangelog: () => void;
}

const NavButton: React.FC<{ tooltip: string; onClick?: () => void; isActive?: boolean; children: React.ReactNode; statusColor?: string; }> = ({ tooltip, onClick, isActive, children, statusColor }) => (
    <div className="relative group flex justify-center">
        <button
            onClick={onClick}
            className={`h-12 w-12 flex items-center justify-center rounded-xl transition-all duration-300 relative ${isActive ? 'bg-violet-500/30 text-white' : 'text-gray-400 bg-black/20 hover:bg-white/10 hover:text-white'}`}
        >
            {children}
            {statusColor && <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 border-[#1A1433] ${statusColor}`}></div>}
        </button>
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0B071A] text-white text-sm font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none delay-300 z-50">
            {tooltip}
        </div>
    </div>
);

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory, isOpen, setIsOpen, onOpenGithubModal, isGithubConnected, isAutonomous, onToggleAutonomous, autonomousStatus, onOpenChangelog }) => {
    const { t } = useTranslations();

    const statusMap: Record<AutonomousStatus, { text: string; color: string }> = {
        inactive: { text: t('sidebar.statusInactive'), color: 'bg-gray-500' },
        running: { text: t('sidebar.statusRunning'), color: 'bg-green-500 animate-pulse' },
        paused: { text: t('sidebar.statusPaused'), color: 'bg-yellow-500' },
        error: { text: t('sidebar.statusError'), color: 'bg-red-500' },
    };

    const sidebarContent = (
        <div className="flex flex-col items-center w-full h-full gap-2 overflow-y-auto scrollbar-hide">
            {/* Categories */}
                {categories.map((category) => (
                    <NavButton
                        key={category.id}
                        tooltip={category.name}
                        onClick={() => onSelectCategory(category)}
                        isActive={selectedCategory?.id === category.id}
                    >
                        {React.cloneElement(category.icon as React.ReactElement, { className: 'w-6 h-6' })}
                    </NavButton>
                ))}
            
            <hr className="w-8 border-t border-white/10 my-2" />

            {/* Controls */}
            <div className="flex flex-col gap-2 items-center">
                <NavButton
                    tooltip={isGithubConnected ? t('sidebar.connected') : t('sidebar.connectGithub')}
                    onClick={onOpenGithubModal}
                    statusColor={isGithubConnected ? 'bg-green-500' : 'bg-gray-500'}
                >
                    <GithubIcon />
                </NavButton>
                {isGithubConnected && (
                     <NavButton
                        tooltip={`${t('sidebar.autonomousMode')}: ${statusMap[autonomousStatus].text}`}
                        onClick={onToggleAutonomous}
                        isActive={isAutonomous}
                        statusColor={statusMap[autonomousStatus].color}
                    >
                        <AutonomousIcon />
                    </NavButton>
                )}
                 <NavButton
                    tooltip={t('sidebar.changelog')}
                    onClick={onOpenChangelog}
                >
                    <ChangelogIcon />
                </NavButton>
            </div>
        </div>
    );
    
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-30 md:hidden" />}
            
            {/* Sidebar container */}
            <aside className={`
                fixed z-40
                transition-transform duration-300 ease-in-out
                
                // Mobile styles (fly-out)
                top-0 left-0 h-full w-64 bg-[#0B071A] border-r border-[#312B58]/50
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                
                // Desktop styles (always visible, floating pill)
                md:translate-x-0 md:w-16 md:h-auto
                md:top-1/2 md:-translate-y-1/2 md:left-4
                md:bg-[#1A1433]/80 md:backdrop-blur-xl md:border md:border-white/10 md:rounded-full
                md:p-2 
            `}>
                {sidebarContent}
            </aside>
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
};

export default Sidebar;
