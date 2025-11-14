import React from 'react';
import { CATEGORIES } from '../constants';
import { useTranslations } from '../hooks/useTranslations';

interface FilterBarProps {
    onFilterChange: (categoryId: string) => void;
    selectedFilter: string;
}

// Quick Icon for "All"
const AllIcon: React.FC<{className?: string}> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg>;

// FIX: Add the 'icon' property to the 'all' filter object to create a consistent data structure.
const filters = [{id: 'all', name: 'homePage.filters.all', icon: AllIcon}, ...CATEGORIES];

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, selectedFilter }) => {
    const { t } = useTranslations();
    
    return (
        <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-4">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {filters.map(filter => {
                    // FIX: Simplified icon retrieval as all elements in `filters` now have a consistent shape with an `icon` property.
                    const Icon = filter.icon;
                    const isSelected = selectedFilter === filter.id;
                    return (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            title={t(filter.name)}
                            className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-2xl transition-all duration-200 focus:outline-none ring-0 focus:ring-0 ${isSelected ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110 shadow-lg' : 'bg-[#1C1633] text-gray-400 hover:bg-[#2a2349] hover:text-white'}`}
                        >
                           {Icon && <Icon className="w-6 h-6" />}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};