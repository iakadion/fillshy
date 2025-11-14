import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Category, AutonomousStatus } from '../types';
import { CATEGORIES } from '../constants';

export const Sidebar: React.FC<{
    selectedCategory: Category | null;
    onSelectCategory: (category: Category) => void;
    isConnected: boolean;
    onConnect: () => void;
    autonomousStatus: AutonomousStatus;
    onToggleAutonomous: () => void;
    lastAction: string;
    onShowChangelog: () => void;
}> = ({ selectedCategory, onSelectCategory, isConnected, onConnect, autonomousStatus, onToggleAutonomous, lastAction, onShowChangelog }) => {
    
    const { t } = useTranslations();
    
    const statusInfo = {
        inactive: { text: t('sidebar.statusInactive'), color: 'bg-gray-500' },
        running: { text: t('sidebar.statusRunning'), color: 'bg-green-500 animate-pulse' },
        paused: { text: t('sidebar.statusPaused'), color: 'bg-yellow-500' },
        error: { text: t('sidebar.statusError'), color: 'bg-red-500' },
    };

    return (
        <aside className="bg-[#110C22] w-full p-4 flex flex-col h-full text-[#E0DDF0] border border-purple-900/50 rounded-2xl">
            <div className="flex items-center mb-8">
                 <div className="w-10 h-10 mr-3">
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradientSidebar" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8B5CF6" /><stop offset="100%" stop-color="#EC4899" /></linearGradient></defs><rect width="64" height="64" rx="12" fill="url(#iconGradientSidebar)"/><rect x="22" y="18" width="6" height="28" fill="white" rx="3"/><rect x="36" y="18" width="6" height="28" fill="white" rx="3"/></svg>
                 </div>
                <span className="text-2xl font-bold font-heading">{t('sidebar.title')}</span>
            </div>

            <button onClick={onConnect} className="w-full text-left px-4 py-2.5 rounded-lg mb-4 bg-[#2a2349] hover:bg-purple-800/50 transition-colors text-sm font-semibold">
                {isConnected ? t('sidebar.connected') : t('sidebar.connectGithub')}
            </button>

            <nav className="flex-grow overflow-y-auto">
                <ul>
                    {CATEGORIES.map(cat => (
                        <li key={cat.id}>
                            <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory(cat); }}
                               className={`flex items-center px-4 py-2.5 rounded-lg my-1 transition-all duration-200 text-sm font-medium ${selectedCategory?.id === cat.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'hover:bg-[#2a2349]'}`}>
                                <cat.icon className="w-5 h-5 mr-3" />
                                {t(cat.name)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto flex-shrink-0">
                <div className="bg-[#0B071A] rounded-lg p-3 space-y-3 border border-purple-900/50">
                    <div className="flex items-center justify-between">
                        <label htmlFor="autonomous-toggle" className="text-sm font-semibold">{t('sidebar.autonomousMode')}</label>
                        <button
                            id="autonomous-toggle"
                            onClick={onToggleAutonomous}
                            disabled={!isConnected}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors disabled:opacity-50 ${autonomousStatus === 'running' || autonomousStatus === 'paused' ? 'bg-pink-600' : 'bg-gray-600'}`}
                        >
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${autonomousStatus === 'running' || autonomousStatus === 'paused' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <div className="text-xs text-gray-400">
                        <p className="flex justify-between"><span>{t('sidebar.status')}:</span> <span className="font-semibold flex items-center"><span className={`w-2 h-2 rounded-full mr-1.5 ${statusInfo[autonomousStatus].color}`}></span>{statusInfo[autonomousStatus].text}</span></p>
                        <p className="flex justify-between mt-1"><span>{t('sidebar.lastAction')}:</span></p>
                        <p className="font-mono text-[11px] text-gray-500 truncate mt-1">{lastAction || t('sidebar.waiting')}</p>
                    </div>
                </div>

                <footer className="text-center text-xs text-gray-600 mt-4">
                     <button onClick={onShowChangelog} className="hover:text-pink-400 transition-colors">{t('sidebar.changelog')}</button>
                    <p className="mt-1">{t('sidebar.credit')}</p>
                </footer>
            </div>
        </aside>
    );
};