import React, { useState } from 'react';
import { DetailsPageProps, ContentItem } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { MarkdownRenderer } from './MarkdownRenderer';

const fetchFullContent = async (item: ContentItem) => {
    // In a real scenario, this would use githubService to get the file content
    return Promise.resolve(`# ${item.title}\n\n${item.description}\n\nThis is the full mock content of the file. In a real application, this text would be fetched from the corresponding Markdown file in your GitHub repository. It could contain much more detail, code snippets, full stories, or complete scripts.\n\n## Key Features\n- Feature One\n- Feature Two\n- Feature Three`);
}

const ActionButton: React.FC<{ label: string; onClick: (e?: React.MouseEvent) => void; children: React.ReactNode; isToggled?: boolean; }> = ({ label, onClick, children, isToggled }) => (
    <button
        onClick={onClick}
        className={`group flex items-center h-12 w-12 hover:w-36 rounded-xl transition-all duration-300 ease-in-out overflow-hidden outline-none focus:outline-none ring-0 focus:ring-0 border ${isToggled ? 'bg-pink-600 border-pink-500' : 'bg-[#1C1633] border-purple-800 hover:bg-purple-900/50 hover:border-purple-700'}`}
    >
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
            {children}
        </div>
        <span className="whitespace-nowrap text-sm font-semibold pr-4">
            {label}
        </span>
    </button>
);


export const DetailsPage: React.FC<DetailsPageProps> = ({ item, category, onBack, onGenerateSimilar }) => {
    const { t } = useTranslations();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        fetchFullContent(item).then(fullContent => {
            setContent(fullContent);
            setIsLoading(false);
        });
    }, [item]);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

     const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(navigator.share) {
            navigator.share({
                title: item.title,
                text: content,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0B071A] z-40 overflow-y-auto animate-fade-in pb-28">
            <div className="absolute top-8 left-8 z-20">
                 <button title={t('detailsPage.back')} onClick={onBack} className="p-3 rounded-full bg-[#110C22]/80 backdrop-blur-sm text-white hover:bg-purple-900/50 hover:scale-110 transition-all duration-200 focus:outline-none ring-0 focus:ring-0">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
            </div>
            <div className="relative h-96">
                 <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B071A] to-transparent"></div>
            </div>
            <div className="max-w-4xl mx-auto p-8 -mt-24 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black font-heading mb-2">{item.title}</h1>
                <p className="text-lg text-gray-400 mb-8">{t(category.name)}</p>
                
                <div className="prose prose-invert lg:prose-xl prose-headings:font-heading prose-headings:text-pink-400">
                    {isLoading ? <p>{t('loading.text')}</p> : <MarkdownRenderer content={content} />}
                </div>
            </div>

            {/* Floating Horizontal Action Toolbar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center justify-center gap-3 bg-[#110C22]/80 backdrop-blur-sm border border-purple-900/50 rounded-2xl p-2 shadow-2xl">
                    <ActionButton label={t('detailsPage.generateSimilar')} onClick={() => onGenerateSimilar(category)}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" opacity=".3"/><path d="M11 7h2v5h-2zm0 7h2v-2h-2zm-2-5h2v2H9zM9 7h2v2H9zm4 7h2v2h-2zm0-4h2v2h-2zM12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"/></svg>
                    </ActionButton>
                    <ActionButton label={copied ? t('detailsPage.copied') : t('detailsPage.copy')} onClick={handleCopy} isToggled={copied}>
                        {copied ?
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            :
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        }
                    </ActionButton>
                    <ActionButton label={t('detailsPage.share')} onClick={handleShare}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                    </ActionButton>
                    <ActionButton label={t('detailsPage.addToFavorites')} onClick={() => {}}>
                         <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};