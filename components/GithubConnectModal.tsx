import React, { useState, useEffect } from 'react';
import { GithubConfig } from '../types';
import { useTranslations } from '../hooks/useTranslations';

export const GithubConnectModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConnect: (config: GithubConfig) => Promise<void>;
    onDisconnect: () => void;
    initialConfig?: GithubConfig | null;
}> = ({ isOpen, onClose, onConnect, onDisconnect, initialConfig }) => {
    const { t } = useTranslations();
    const [username, setUsername] = useState(initialConfig?.username || '');
    const [repo, setRepo] = useState(initialConfig?.repo || '');
    const [token, setToken] = useState(initialConfig?.token || '');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setUsername(initialConfig?.username || '');
        setRepo(initialConfig?.repo || '');
        setToken(initialConfig?.token || '');
    }, [initialConfig]);

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsVerifying(true);
        setError(null);
        try {
            await onConnect({ username, repo, token });
            onClose();
        } catch (e) {
            setError(e.message || t('githubModal.errorTitle'));
        } finally {
            setIsVerifying(false);
        }
    };
    
    const handleDisconnect = () => {
        onDisconnect();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1C1633] rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto border border-purple-900/50">
                <h2 className="text-2xl font-bold font-heading mb-2 text-pink-400">{t('githubModal.title')}</h2>
                <p className="text-gray-400 mb-6 text-sm">{t('githubModal.description')}</p>
                
                {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm"><p>{error}</p></div>}
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">{t('githubModal.usernameLabel')}</label>
                        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={t('githubModal.usernamePlaceholder')} className="w-full bg-[#0B071A] border border-purple-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="repo">{t('githubModal.repoLabel')}</label>
                        <input id="repo" type="text" value={repo} onChange={e => setRepo(e.target.value)} placeholder={t('githubModal.repoPlaceholder')} className="w-full bg-[#0B071A] border border-purple-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="token">{t('githubModal.tokenLabel')}</label>
                        <input id="token" type="password" value={token} onChange={e => setToken(e.target.value)} className="w-full bg-[#0B071A] border border-purple-800 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition" />
                        <p className="text-xs text-gray-500 mt-1">
                            {t('githubModal.tokenDescription')} <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">{t('githubModal.tokenDescriptionLink')}</a> {t('githubModal.tokenDescription2')} {t('githubModal.tokenWarning')}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
                    <button onClick={handleSave} disabled={isVerifying || !username || !repo || !token} className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-md shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105">
                        {isVerifying ? t('githubModal.verifying') : t('githubModal.save')}
                    </button>
                    <button onClick={onClose} className="w-full sm:w-auto px-6 py-2.5 bg-purple-900/50 text-gray-300 font-medium rounded-md hover:bg-purple-900/80 transition-colors">
                        {t('githubModal.cancel')}
                    </button>
                    {initialConfig && (
                        <button onClick={handleDisconnect} className="w-full sm:w-auto sm:mr-auto px-4 py-2.5 text-red-400 text-sm font-medium rounded-md hover:bg-red-900/30 transition-colors">
                            {t('githubModal.disconnect')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
