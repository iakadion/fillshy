import React from 'react';
import { ContentItem, Category } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { LoadingSpinner } from './LoadingSpinner';
import { ContentCard } from './ContentCard';
import { mockContent } from '../data/mockData';

export const ContentDisplay: React.FC<{
    isLoading: boolean;
    error: string | null;
    isConnected: boolean;
    onConnect: () => void;
    onGenerate: (category: Category) => void;
    onCardClick: (item: ContentItem) => void;
    selectedCategory: Category | null;
}> = ({ isLoading, error, isConnected, onConnect, onGenerate, onCardClick, selectedCategory }) => {
    const { t } = useTranslations();

    if (isLoading) return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;

    if (error) {
        return <div className="text-center p-8 text-red-400">
            <h2 className="text-2xl font-bold font-heading mb-2">{t('contentDisplay.errorTitle')}</h2>
            <p>{error}</p>
        </div>;
    }

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h2 className="text-3xl font-bold font-heading mb-4">{t('contentDisplay.welcomeTitle')}</h2>
                <p className="max-w-md mb-8 text-gray-400">{t('contentDisplay.welcomeText')}</p>
                <button onClick={onConnect} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                    {t('contentDisplay.connectRepo')}
                </button>
            </div>
        );
    }

    if (!selectedCategory) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h2 className="text-3xl font-bold font-heading mb-4">{t('contentDisplay.welcomeTitleConnected')}</h2>
                <p className="max-w-md text-gray-400">{t('contentDisplay.welcomeTextConnected')}</p>
            </div>
        );
    }

    const items = mockContent[selectedCategory.id] || [];

    return (
       <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
                 <h1 className="text-3xl md:text-4xl font-bold font-heading">{t(selectedCategory.name)}</h1>
                 <button 
                    onClick={() => onGenerate(selectedCategory)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    {t('contentDisplay.generateNewLabel')}
                 </button>
            </div>
            
            {items.length === 0 ? (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold mb-2">{t('contentDisplay.noContentTitle')}</h3>
                    <p className="text-gray-400 mb-6">{t('contentDisplay.noContentText', { categoryName: t(selectedCategory.name) })}</p>
                    <button 
                        onClick={() => onGenerate(selectedCategory)}
                        className="px-5 py-2.5 bg-[#2a2349] hover:bg-purple-800/50 transition-colors text-sm font-semibold rounded-lg"
                    >
                        {t('contentDisplay.generateNewLabel')}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {items.map(item => (
                        <ContentCard key={item.id} item={item} onClick={() => onCardClick(item)} />
                    ))}
                </div>
            )}
       </div>
    );
};