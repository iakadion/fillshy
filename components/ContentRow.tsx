import React, { useRef } from 'react';
import { ContentItem } from '../types';
import { ContentCard } from './ContentCard';

export const ContentRow: React.FC<{ title: string; items: ContentItem[]; onCardClick: (item: ContentItem) => void; }> = ({ title, items, onCardClick }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!items || items.length === 0) return null;

    return (
        <div className="my-8 w-full">
            <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 px-4 md:px-8 lg:px-12">{title}</h2>
            <div className="relative">
                <div ref={scrollRef} className="flex overflow-x-auto space-x-4 pl-4 md:pl-8 lg:pl-12 py-2 scrollbar-hide">
                    {items.map(item => (
                        <div key={item.id} className="flex-shrink-0 w-64 md:w-72">
                            <ContentCard item={item} onClick={() => onCardClick(item)} />
                        </div>
                    ))}
                     <div className="flex-shrink-0 w-4 md:w-8 lg:w-12"></div>
                </div>
            </div>
        </div>
    );
};