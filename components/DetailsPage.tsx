import React, { useState } from 'react';
import type { DetailsPageProps } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import RevealingText from './RevealingText';
import MarkdownRenderer from './MarkdownRenderer';

// Icons
const BackIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /> </svg> );
const MagicIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> </svg> );
const HeartIcon = ({ filled }: { filled: boolean }) => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}> <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /> </svg> );
const CopyIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /> </svg> );
const ShareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /> </svg> );
const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /> </svg> );

// ActionButton Sub-component
const ActionButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    confirmLabel?: string;
    confirmIcon?: React.ReactNode;
    isConfirming?: boolean;
    onClick: () => void;
}> = ({ label, icon, confirmLabel, confirmIcon, isConfirming, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative flex items-center justify-center h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 ease-in-out pl-4 pr-4 hover:pl-4 hover:pr-5"
        >
            <div className="text-white transition-transform duration-300 group-hover:scale-110">
                {isConfirming ? confirmIcon : icon}
            </div>
            <div className="overflow-hidden transition-all duration-300 ease-in-out h-full flex items-center w-0 group-hover:w-auto group-hover:ml-2">
                 <span className="text-white text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                    {isConfirming ? confirmLabel : label}
                 </span>
            </div>
        </button>
    );
};


const DetailsPage: React.FC<DetailsPageProps> = ({ item, category, onBack, onGenerateSimilar }) => {
    const { t } = useTranslations();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (isCopied) return;
        const contentToCopy = `${item.title}\n\n${item.description}`;
        navigator.clipboard.writeText(contentToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.title,
                    text: item.description,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that don't support navigator.share
            handleCopy();
            // A toast notification would be better than an alert
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0B071A] z-50 animate-fade-in">
            <div className="absolute inset-0">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B071A] via-[#0B071A]/80 to-transparent"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
                <header className="p-4 flex-shrink-0">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                        aria-label={t('detailsPage.back')}
                    >
                        <BackIcon />
                        <span>{t('detailsPage.back')}</span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-end">
                    <div className="max-w-4xl">
                        <RevealingText as="h1" text={item.title} className="text-4xl md:text-6xl font-bold font-heading text-white" />
                        <div className="mt-4 text-md text-gray-300">
                             <MarkdownRenderer markdown={item.description} />
                        </div>
                        
                        <div className="mt-8 flex flex-wrap gap-3">
                             <ActionButton 
                                icon={<MagicIcon />}
                                label={t('detailsPage.generateSimilar')}
                                onClick={() => onGenerateSimilar(category)}
                            />
                             <ActionButton 
                                icon={<HeartIcon filled={isFavorited} />}
                                label={t('detailsPage.addToFavorites')}
                                onClick={() => setIsFavorited(!isFavorited)}
                            />
                             <ActionButton 
                                icon={<CopyIcon />}
                                label={t('detailsPage.copy')}
                                confirmLabel={t('detailsPage.copied')}
                                confirmIcon={<CheckIcon />}
                                isConfirming={isCopied}
                                onClick={handleCopy}
                            />
                             <ActionButton 
                                icon={<ShareIcon />}
                                label={t('detailsPage.share')}
                                onClick={handleShare}
                            />
                        </div>
                    </div>
                </main>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default DetailsPage;