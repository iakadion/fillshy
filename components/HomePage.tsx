import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { mockContent } from '../data/mockData';
import { Header } from './Header';
import { Hero } from './Hero';
import { ContentRow } from './ContentRow';
import { Footer } from './Footer';
import { ContentItem, Category } from '../types';
import { CATEGORIES } from '../constants';
import { FilterBar } from './FilterBar';
import { BottomBar } from './BottomBar';

export const HomePage: React.FC<{ 
    onEnterApp: () => void;
    onCardClick: (item: ContentItem) => void;
    onGenerateRandom: () => void;
    isConnected: boolean;
    onConnect: () => void;
}> = ({ onEnterApp, onCardClick, onGenerateRandom, isConnected, onConnect }) => {
    const { t } = useTranslations();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    
    const allContent = Object.values(mockContent).flat();
    const featuredItem = allContent[0];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGenerate = () => {
        if (isConnected) {
            onGenerateRandom();
        } else {
            onConnect();
        }
    };
    
    return (
        <div className="w-full min-h-screen bg-[#0B071A]">
            <Header onEnterApp={onEnterApp} isConnected={isConnected} onConnect={onConnect} isScrolled={isScrolled} />
            
            <main>
                {featuredItem && (
                    <Hero item={featuredItem} onMoreInfo={() => onCardClick(featuredItem)} onGenerate={handleGenerate} />
                )}

                <FilterBar selectedFilter={activeFilter} onFilterChange={setActiveFilter} />
                
                <div className="py-8">
                    {activeFilter === 'all' && (
                         <>
                            <ContentRow title={t('categories.movies')} items={mockContent['movies']} onCardClick={onCardClick} />
                            <ContentRow title={t('categories.stories')} items={mockContent['stories']} onCardClick={onCardClick} />
                            <ContentRow title={t('categories.music')} items={mockContent['music']} onCardClick={onCardClick} />
                            <ContentRow title={t('categories.websites')} items={mockContent['websites']} onCardClick={onCardClick} />
                        </>
                    )}
                    {activeFilter !== 'all' && CATEGORIES.filter(c => c.id === activeFilter).map(cat => (
                         <ContentRow key={cat.id} title={t(cat.name)} items={mockContent[cat.id]} onCardClick={onCardClick} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};