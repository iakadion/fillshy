import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const BackIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /> </svg> );
const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg> );


interface SearchPageProps {
    onBack: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onBack }) => {
    const { t } = useTranslations();
    
    return (
        <div className="fixed inset-0 bg-[#0B071A] z-50 animate-fade-in p-4 pt-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                     <h1 className="text-3xl font-bold font-heading text-white">
                        {t('searchPage.title')}
                     </h1>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                        aria-label={t('searchPage.back')}
                    >
                        <BackIcon />
                    </button>
                </header>

                <main>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="search"
                            placeholder={t('searchPage.placeholder')}
                            className="w-full bg-[#1A1433]/80 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    {/* Search results would be displayed here */}
                    <div className="mt-8 text-center text-gray-500">
                        <p>Search functionality is coming soon.</p>
                    </div>
                </main>
            </div>
             <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default SearchPage;