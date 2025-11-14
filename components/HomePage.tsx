// Fix: Removed unused and invalid 'antd' from import.
import React from 'react';
import { useCategories } from '../constants';
import { useTranslations } from '../hooks/useTranslations';
import type { ContentItem, Category } from '../types';
import ContentCard from './ContentCard';
import { mockContent } from '../data/mockData';
import LanguageSwitcher from './LanguageSwitcher';
import RevealingText from './RevealingText';
import IconRevealButton from './IconRevealButton';

interface HomePageProps {
    onNavigateToApp: () => void;
    onContentSelect: (item: ContentItem, category: Category) => void;
}

// Icons
const StarIcon = ({ filled = true }: { filled?: boolean }) => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> </svg> );
const PlayIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const InfoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const AllIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> </svg> );
const FilmIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /> </svg> );
const MusicIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /> </svg> );
const StoryIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> </svg> );
const ClockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );


const HomePage: React.FC<HomePageProps> = ({ onNavigateToApp, onContentSelect }) => {
    const { t } = useTranslations();
    const CATEGORIES = useCategories();
    
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const allContent = mockContent;
    const heroContent = allContent['movies']?.[0] || null;

    const renderContentRow = (category: Category) => {
        const items = allContent[category.id];
        if (!items || items.length === 0) return null;

        const isPoster = category.id === 'movies' || category.id === 'stories';
        const cardContainerClasses = isPoster 
            ? 'w-40 md:w-48 h-60 md:h-72' 
            : 'w-64 md:w-72 h-36 md:h-40';

        return (
            <section key={category.id} className="mb-12">
                 <h2 className="text-2xl font-bold font-heading mb-4 text-white ml-4 sm:ml-6 lg:ml-8">
                     <RevealingText text={category.name} />
                 </h2>
                <div className="relative">
                     <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#0B071A] to-transparent z-10 pointer-events-none"></div>
                     <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#0B071A] to-transparent z-10 pointer-events-none"></div>
                    <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-hide px-4 sm:px-6 lg:px-8">
                        {items.map((item, index) => (
                           <div key={item.id} className={`flex-shrink-0 ${cardContainerClasses}`}>
                                <ContentCard item={item} index={index} variant={isPoster ? 'poster' : 'default'} onClick={() => onContentSelect(item, category)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="bg-[#0B071A] min-h-screen text-white pb-24">
             <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-sm transition-all duration-300 ${isScrolled ? 'bg-[#1A1433]/80 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'} rounded-2xl border`}>
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-2 group cursor-pointer">
                         <div className="w-9 h-9 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                                <rect width="64" height="64" rx="12" fill="url(#iconGradient)"/>
                                <path d="M24 18H42V24H30V30H40V36H30V46H24V18Z" fill="white"/>
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold font-heading tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500 animate-shimmer">
                            fillshy
                        </h1>
                    </div>
                    <LanguageSwitcher />
                </div>
            </header>
            <main>
                {/* Hero Section */}
                {heroContent ? (
                    <div className="relative h-[70vh] min-h-[500px] flex items-end p-4 sm:p-6 lg:p-8 text-white">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B071A] via-[#0B071A]/50 to-transparent z-10"></div>
                        <div className="absolute inset-0">
                           <img src={heroContent.imageUrl} alt={heroContent.title} className="w-full h-full object-cover opacity-20" />
                        </div>
                        <div className="relative z-20 max-w-2xl">
                             <div className="flex items-center gap-4 mb-2">
                                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">{t('homePage.featured')}</span>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon filled={false}/>
                                </div>
                            </div>
                            <RevealingText as="h1" text={heroContent.title} className="text-4xl md:text-5xl font-bold font-heading" />
                            <RevealingText text={heroContent.description} className="mt-4 text-md md:text-lg text-gray-300 max-h-32 overflow-hidden line-clamp-3" />
                             <div className="mt-6 flex flex-wrap gap-3">
                                <IconRevealButton
                                    onClick={onNavigateToApp}
                                    label={t('homePage.generateNow')}
                                    icon={<PlayIcon />}
                                    className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 shadow-lg"
                                />
                                <IconRevealButton
                                    onClick={() => onContentSelect(heroContent, CATEGORIES.find(c => c.id === 'movies')!)}
                                    label={t('homePage.moreInfo')}
                                    icon={<InfoIcon />}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center p-4 sm:p-6 lg:p-8 text-white text-center">
                         <div className="relative z-20 max-w-2xl">
                             <h1 className="text-4xl md:text-5xl font-bold font-heading">Welcome to fillshy</h1>
                             <p className="mt-4 text-md md:text-lg text-gray-300">
                                 A powerful AI content generation pipeline. Explore the showcase below or enter the app to start creating.
                             </p>
                         </div>
                    </div>
                )}

                {/* Filter Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-6 sticky top-[84px] z-20 bg-gradient-to-b from-[#0B071A] via-[#0B071A]/80 to-transparent -mt-1">
                     <div className="flex items-center overflow-x-auto space-x-3 pb-2 scrollbar-hide">
                        <button className="px-4 py-2 text-sm font-semibold text-white bg-white/20 rounded-full flex-shrink-0 flex items-center gap-2"><AllIcon/>{t('homePage.filters.all')}</button>
                        <button className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-full flex-shrink-0 flex items-center gap-2"><FilmIcon/>{t('homePage.filters.movies')}</button>
                        <button className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-full flex-shrink-0 flex items-center gap-2"><MusicIcon/>{t('homePage.filters.music')}</button>
                        <button className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-full flex-shrink-0 flex items-center gap-2"><StoryIcon/>{t('homePage.filters.stories')}</button>
                        <button className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-full flex-shrink-0 flex items-center gap-2"><ClockIcon/>{t('homePage.filters.recent')}</button>
                    </div>
                </div>
                
                {/* Content Rows */}
                <div className="py-2">
                    {CATEGORIES.map(category => renderContentRow(category))}
                </div>
            </main>
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                 @keyframes shimmer {
                    0% { background-position: -500% 0; }
                    100% { background-position: 500% 0; }
                }
                .animate-shimmer {
                    background-image: linear-gradient(
                        -60deg,
                        transparent 30%,
                        rgba(236, 72, 153, 0.4) 50%,
                        transparent 70%
                    );
                    background-size: 200% auto;
                    animation: shimmer 5s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default HomePage;