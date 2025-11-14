import React, { useState, useEffect } from 'react';
import type { GithubConfig } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface GithubConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (config: Omit<GithubConfig, 'defaultBranch'>) => void;
    initialConfig: GithubConfig | null;
    isVerifying: boolean;
    error: string | null;
}

const GithubConnectModal: React.FC<GithubConnectModalProps> = ({ isOpen, onClose, onConnect, initialConfig, isVerifying, error }) => {
    const { t } = useTranslations();
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        if (initialConfig) {
            setUsername(initialConfig.username);
            setRepo(initialConfig.repo);
            setToken(initialConfig.token);
        } else {
            setUsername('');
            setRepo('');
            setToken('');
        }
    }, [initialConfig, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && repo && token) {
            onConnect({ username, repo, token });
        }
    };

    const handleDisconnect = () => {
        onConnect({ username: '', repo: '', token: '' });
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[#1A1433] border border-[#312B58] rounded-xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white mb-4">{t('githubModal.title')}</h2>
                
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm rounded-md p-3 mb-4" role="alert">
                        <p className="font-semibold">{t('githubModal.errorTitle')}</p>
                        <p>{error}</p>
                    </div>
                )}

                <p className="text-[#908CAA] mb-6 text-sm">
                    {t('githubModal.description')}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-[#E0DDF0]">{t('githubModal.usernameLabel')}</label>
                        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full bg-[#0B071A] border border-[#312B58] rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500" placeholder={t('githubModal.usernamePlaceholder')} required />
                    </div>
                    <div>
                        <label htmlFor="repo" className="block text-sm font-medium text-[#E0DDF0]">{t('githubModal.repoLabel')}</label>
                        <input type="text" id="repo" value={repo} onChange={e => setRepo(e.target.value)} className="mt-1 block w-full bg-[#0B071A] border border-[#312B58] rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500" placeholder={t('githubModal.repoPlaceholder')} required />
                    </div>
                    <div>
                        <label htmlFor="token" className="block text-sm font-medium text-[#E0DDF0]">{t('githubModal.tokenLabel')}</label>
                        <input type="password" id="token" value={token} onChange={e => setToken(e.target.value)} className="mt-1 block w-full bg-[#0B071A] border border-[#312B58] rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500" placeholder="ghp_xxxxxxxx" required />
                         <p className="mt-2 text-xs text-gray-500">
                           {t('githubModal.tokenDescription')} <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">{t('githubModal.tokenDescriptionLink')}</a> {t('githubModal.tokenDescription2')}
                           <span className="font-bold text-yellow-500 block">{t('githubModal.tokenWarning')}</span>
                        </p>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                         <button type="button" onClick={handleDisconnect} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#312B58] rounded-md transition-colors disabled:opacity-50" disabled={isVerifying}>
                            {t('githubModal.disconnect')}
                        </button>
                        <div className="flex gap-4">
                             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[#E0DDF0] bg-[#312B58]/50 hover:bg-[#312B58] rounded-md transition-colors disabled:opacity-50" disabled={isVerifying}>
                                {t('githubModal.cancel')}
                            </button>
                            <button 
                                type="submit" 
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-md transition-colors shadow-md flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-wait"
                                disabled={isVerifying}
                            >
                                {isVerifying ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('githubModal.verifying')}
                                    </>
                                ) : t('githubModal.save')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GithubConnectModal;