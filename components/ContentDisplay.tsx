import React from 'react';
import type { ContentItem, Category, GithubConfig } from '../types';
import ContentCard from './ContentCard';
import LoadingSpinner from './LoadingSpinner';
import { useTranslations } from '../hooks/useTranslations';

interface ContentDisplayProps {
    category: Category | null;
    content: ContentItem[];
    isLoading: boolean;
    error: string | null;
    githubConfig: GithubConfig | null;
    onOpenGithubModal: () => void;
    onGenerate: () => Promise<void>;
    isGenerating: boolean;
    isAutonomous: boolean;
    onContentSelect: (item: ContentItem) => void;
}

const WelcomeMessage: React.FC<{ onOpenGithubModal: () => void, githubConnected: boolean }> = ({ onOpenGithubModal, githubConnected }) => {
    const { t } = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-200 sm:text-4xl">
                    {githubConnected ? t('contentDisplay.welcomeTitleConnected') : t('contentDisplay.welcomeTitle')}
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                    {githubConnected 
                        ? t('contentDisplay.welcomeTextConnected')
                        : t('contentDisplay.welcomeText')
                    }
                </p>
                {!githubConnected && (
                    <button 
                        onClick={onOpenGithubModal}
                        className="mt-8 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg transition-colors shadow-lg"
                    >
                        {t('contentDisplay.connectRepo')}
                    </button>
                )}
            </div>
        </div>
    );
};

const GenerateButton: React.FC<{ onGenerate: () => void, isGenerating: boolean, isAutonomous: boolean }> = ({ onGenerate, isGenerating, isAutonomous }) => {
    const { t } = useTranslations();

    if (isAutonomous) {
        return (
            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
                <div className="flex items-center gap-2 bg-[#1A1433]/80 backdrop-blur-sm p-3 rounded-full text-white shadow-lg border border-white/10">
                    <div className="w-8 h-8 border-4 border-t-transparent border-violet-400 rounded-full animate-spin"></div>
                    <span className="text-sm font-medium pr-2">{t('contentDisplay.autonomousActive')}</span>
                </div>
            </div>
        );
    }

    return (
     <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
        <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            aria-label={t('contentDisplay.generateNewLabel')}
        >
            {isGenerating ? (
                <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            )}
        </button>
    </div>
    );
};


const ContentDisplay: React.FC<ContentDisplayProps> = ({ category, content, isLoading, error, githubConfig, onOpenGithubModal, onGenerate, isGenerating, isAutonomous, onContentSelect }) => {
    const { t } = useTranslations();
    
    if (!category) {
        return <WelcomeMessage onOpenGithubModal={onOpenGithubModal} githubConnected={!!githubConfig} />;
    }
    
    if (isLoading && content.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center bg-red-900/50 border border-red-700 p-6 rounded-lg max-w-lg">
                    <h3 className="text-lg font-semibold text-red-300">{t('contentDisplay.errorTitle')}</h3>
                    <p className="text-red-400 mt-2 break-words">{error}</p>
                </div>
            </div>
        );
    }
    
    if (content.length === 0 && !isLoading) {
         return (
            <>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                        <h3 className="text-xl font-semibold">{t('contentDisplay.noContentTitle')}</h3>
                        <p className="mt-2">{t('contentDisplay.noContentText').replace('{categoryName}', category.name)}</p>
                    </div>
                </div>
                {githubConfig && <GenerateButton onGenerate={onGenerate} isGenerating={isGenerating} isAutonomous={isAutonomous} />}
            </>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 pb-24">
                {content.map((item, index) => (
                    <ContentCard 
                        key={item.id} 
                        item={item} 
                        isAscii={category?.id === 'ascii'} 
                        index={index}
                        onClick={() => onContentSelect(item)}
                    />
                ))}
            </div>
            {githubConfig && <GenerateButton onGenerate={onGenerate} isGenerating={isGenerating} isAutonomous={isAutonomous} />}
        </>
    );
};

export default ContentDisplay;