import React from 'react';
import { ContentItem } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { IconRevealButton } from './IconRevealButton';

export const Hero: React.FC<{ item: ContentItem; onMoreInfo: () => void; onGenerate: () => void; }> = ({ item, onMoreInfo, onGenerate }) => {
    const { t } = useTranslations();
    return (
        <div className="relative h-[80vh] min-h-[500px] max-h-[720px] text-white">
            <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B071A] via-[#0B071A]/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
                <div className="w-full md:w-2/3 lg:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-4 animate-reveal-word" style={{ animationDelay: '0.8s' }}>{item.title}</h1>
                    <p className="text-lg text-gray-300 mb-6 line-clamp-3 animate-reveal-word" style={{ animationDelay: '1s' }}>{item.description}</p>
                    <div className="flex space-x-4 animate-reveal-word" style={{ animationDelay: '1.2s' }}>
                        <IconRevealButton 
                            label={t('homePage.moreInfo')} 
                            onClick={onMoreInfo} 
                            variant="light"
                        >
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>
                        </IconRevealButton>
                         <IconRevealButton 
                            label={t('homePage.generateNow')} 
                            onClick={onGenerate}
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        </IconRevealButton>
                    </div>
                </div>
            </div>
        </div>
    );
};