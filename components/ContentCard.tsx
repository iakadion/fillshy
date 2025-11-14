import React, { useState } from 'react';
import { ContentItem } from '../types';
import { useTranslations } from '../hooks/useTranslations';

export const ContentCard: React.FC<{ item: ContentItem, onClick: () => void }> = ({ item, onClick }) => {
    const { t } = useTranslations();
    const [copied, setCopied] = useState(false);
    
    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.description);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(navigator.share) {
            navigator.share({
                title: item.title,
                text: item.description,
            });
        }
    };
    
    return (
        <div onClick={onClick} className="bg-[#1C1633] rounded-lg overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
            {item.imageUrl && (
                <div className="relative h-40 w-full overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.imageUrl} alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1633] to-transparent"></div>
                </div>
            )}
            <div className="p-4">
                <h3 className="text-lg font-bold font-heading text-pink-400 mb-2 truncate">{item.title}</h3>
                <p className="text-[#A7A4C1] text-sm line-clamp-2">{item.description}</p>
                 <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleCopy} title={copied ? t('contentCard.copiedLabel') : t('contentCard.copyLabel')} className="p-2 rounded-full bg-[#2a2349] hover:bg-pink-500 text-white transition-colors">
                        {copied ? <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        : <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2-2H4a2 2 0 01-2-2v-4z" /></svg>
                        }
                    </button>
                    {navigator.share && (
                         <button onClick={handleShare} title={t('contentCard.shareLabel')} className="p-2 rounded-full bg-[#2a2349] hover:bg-pink-500 text-white transition-colors">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};