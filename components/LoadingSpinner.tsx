import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const LoadingSpinner: React.FC = () => {
    const { t } = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
            <p className="text-lg font-semibold text-gray-300">{t('loading.text')}</p>
            <p className="text-sm text-gray-500">{t('loading.subtext')}</p>
        </div>
    );
};

export default LoadingSpinner;
