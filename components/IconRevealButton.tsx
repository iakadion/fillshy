import React from 'react';

export const IconRevealButton: React.FC<{
    label: string;
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'default' | 'light';
}> = ({ label, onClick, children, variant = 'default' }) => {
    
    const variantClasses = {
        default: 'bg-black/30 backdrop-blur-sm text-white hover:bg-black/50',
        light: 'bg-white text-gray-800 hover:bg-gray-200',
    };

    return (
        <button
            onClick={onClick}
            className={`group flex items-center h-14 w-14 hover:w-40 rounded-2xl transition-all duration-300 ease-in-out overflow-hidden outline-none focus:outline-none ring-0 focus:ring-0 ${variantClasses[variant]}`}
        >
            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14">
                {children}
            </div>
            <span className="whitespace-nowrap text-base font-bold pr-5">
                {label}
            </span>
        </button>
    );
};