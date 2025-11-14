import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    categoryName: string;
}

const Header: React.FC<HeaderProps> = ({ categoryName }) => {
    return (
        <header className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-20">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 bg-[#0B071A]/70 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10">
                <div className="flex items-center">
                    <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500 truncate">
                        {categoryName}
                    </h1>
                </div>
                <LanguageSwitcher />
            </div>
        </header>
    );
};

export default Header;