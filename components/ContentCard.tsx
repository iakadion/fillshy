import React from 'react';
import type { ContentItem } from '../types';
import RevealingText from './RevealingText';

interface ContentCardProps {
    item: ContentItem;
    index: number;
    variant?: 'default' | 'poster';
    onClick: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, index, variant = 'default', onClick }) => {
    const animationDelay = `${index * 50}ms`;
    const isPoster = variant === 'poster';

    const containerClasses = `
        w-full h-full
        flex flex-col rounded-xl shadow-lg overflow-hidden 
        transition-all duration-300 hover:shadow-violet-500/20 hover:-translate-y-1 transform cursor-pointer group
        animate-fade-in-up bg-cover bg-center relative
        ${!isPoster ? 'bg-[#1A1433]' : ''}
    `;

    return (
        <button 
            onClick={() => onClick(item)}
            className={containerClasses}
            style={{ animationDelay, backgroundImage: `url(${item.imageUrl})` }}
            aria-label={`View details for ${item.title}`}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
            <div className={`p-4 flex-1 flex flex-col justify-end relative z-10 w-full`}>
                <RevealingText as="h3" text={item.title} className={`font-bold truncate text-white text-left ${isPoster ? 'text-md' : 'text-lg'}`} />
                {!isPoster && (
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2 text-left">{item.description}</p>
                )}
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </button>
    );
};

export default ContentCard;