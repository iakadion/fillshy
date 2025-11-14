import React from 'react';

interface IconRevealButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
}

const IconRevealButton: React.FC<IconRevealButtonProps> = ({ label, icon, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`group relative flex items-center justify-center h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 ease-in-out px-4 hover:pr-5 ${className}`}
        >
            <div className="text-white transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>
            <div className="overflow-hidden transition-all duration-300 ease-in-out h-full flex items-center w-0 group-hover:w-auto group-hover:ml-2">
                 <span className="text-white font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 text-base">
                    {label}
                 </span>
            </div>
        </button>
    );
};

export default IconRevealButton;
