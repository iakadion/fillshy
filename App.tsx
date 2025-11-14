import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ContentItem, Category, GithubConfig, AutonomousStatus } from './types';
import { useCategories } from './constants';
import { fetchContentItemsForCategory, saveContentItem, getRepoDetails } from './services/githubService';
import { generateContent, parseGeneratedText } from './services/geminiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentDisplay from './components/ContentDisplay';
import GithubConnectModal from './components/GithubConnectModal';
import ChangelogModal from './components/ChangelogModal';
import Intro from './components/Intro';
import HomePage from './components/HomePage';
import BottomBar from './components/BottomBar';
import DetailsPage from './components/DetailsPage';
import SearchPage from './components/SearchPage';
import { useTranslations } from './hooks/useTranslations';

const App: React.FC = () => {
    const { t } = useTranslations();
    const CATEGORIES = useCategories();

    const [appState, setAppState] = useState<'intro' | 'homepage' | 'app' | 'search'>(
        sessionStorage.getItem('introShown') ? 'homepage' : 'intro'
    );
    
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [contentCache, setContentCache] = useState<Record<string, ContentItem[]>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isGithubModalOpen, setGithubModalOpen] = useState<boolean>(false);
    const [isChangelogModalOpen, setChangelogModalOpen] = useState<boolean>(false);
    const [githubConfig, setGithubConfig] = useState<GithubConfig | null>(null);
    const [detailsItem, setDetailsItem] = useState<{item: ContentItem, category: Category} | null>(null);

    // GitHub Modal State
    const [isVerifyingGithub, setIsVerifyingGithub] = useState(false);
    const [githubModalError, setGithubModalError] = useState<string | null>(null);

    // Autonomous Mode State
    const [isAutonomous, setIsAutonomous] = useState<boolean>(false);
    const [autonomousStatus, setAutonomousStatus] = useState<AutonomousStatus>('inactive');
    const [autonomousLogs, setAutonomousLogs] = useState<string[]>([]);
    const autonomousTimerRef = useRef<number | null>(null);

    const handleIntroEnd = () => {
        setAppState('homepage');
        sessionStorage.setItem('introShown', 'true');
    };

    const handleNavigate = (view: 'homepage' | 'app' | 'search') => {
        setAppState(view);
    };
    
    useEffect(() => {
        const savedConfigRaw = localStorage.getItem('githubConfig');
        if (savedConfigRaw) {
            try {
                const savedConfig = JSON.parse(savedConfigRaw);
                if (savedConfig.token) {
                    if (!savedConfig.defaultBranch) {
                        getRepoDetails(savedConfig)
                            .then(({ defaultBranch }) => {
                                const fullConfig = { ...savedConfig, defaultBranch };
                                setGithubConfig(fullConfig);
                                localStorage.setItem('githubConfig', JSON.stringify(fullConfig));
                            })
                            .catch(err => {
                                console.error("Failed to validate GitHub config on startup:", err);
                                localStorage.removeItem('githubConfig');
                                setGithubConfig(null);
                            });
                    } else {
                        setGithubConfig(savedConfig);
                    }
                }
            } catch (e) {
                console.error("Failed to parse githubConfig from localStorage", e);
                localStorage.removeItem('githubConfig');
            }
        }
    }, []);

    useEffect(() => {
        if (!selectedCategory || !githubConfig) return;

        const fetchContent = async () => {
            if (contentCache[selectedCategory.id]) return;

            setIsLoading(true);
            setError(null);
            try {
                const items = await fetchContentItemsForCategory(githubConfig, selectedCategory.id);
                setContentCache(prevCache => ({ ...prevCache, [selectedCategory.id]: items }));
            } catch (err) {
                console.error(err);
                setError('Failed to fetch content. The folder might be empty or non-existent.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [selectedCategory, githubConfig, contentCache]);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setAutonomousLogs(prev => [...prev.slice(-10), `${timestamp}: ${message}`]);
    };

    useEffect(() => {
        const runAutonomousGeneration = async () => {
            if (!githubConfig) {
                addLog('Error: GitHub connection lost. Stopping.');
                setAutonomousStatus('error');
                setIsAutonomous(false);
                return;
            }

            const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
            addLog(`Generating for: ${randomCategory.name}...`);
            setAutonomousStatus('running');

            try {
                const rawContent = await generateContent(randomCategory.prompt);
                const { title, description } = parseGeneratedText(rawContent);
                
                const newItem = await saveContentItem(githubConfig, randomCategory.id, title, description);
                addLog(`Success! Saved "${title}" in ${randomCategory.name}.`);

                setContentCache(prev => ({
                    ...prev,
                    [randomCategory.id]: [newItem, ...(prev[randomCategory.id] || [])]
                }));

                const nextRunIn = Math.floor(Math.random() * 30000) + 30000;
                addLog(`Next generation in ${Math.round(nextRunIn / 1000)}s.`);
                autonomousTimerRef.current = window.setTimeout(runAutonomousGeneration, nextRunIn);

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Unknown error";
                console.error("Error in autonomous mode:", err);
                
                if (errorMessage.includes("API") || errorMessage.includes("429") || /rate limit/i.test(errorMessage)) {
                    addLog('API limit reached. Pausing for 60s.');
                    setAutonomousStatus('paused');
                    autonomousTimerRef.current = window.setTimeout(runAutonomousGeneration, 60000);
                } else if (err instanceof TypeError && errorMessage === 'Failed to fetch') {
                    addLog('Network failure. Retrying in 30s.');
                    setAutonomousStatus('paused');
                    autonomousTimerRef.current = window.setTimeout(runAutonomousGeneration, 30000);
                } else {
                    addLog(`Critical error: ${errorMessage}. Autonomous mode stopped.`);
                    setAutonomousStatus('error');
                    setIsAutonomous(false);
                }
            }
        };

        if (isAutonomous && githubConfig) {
            runAutonomousGeneration();
        } else {
            if (autonomousTimerRef.current) {
                clearTimeout(autonomousTimerRef.current);
                autonomousTimerRef.current = null;
            }
             if (autonomousStatus !== 'inactive' && autonomousStatus !== 'error') {
                setAutonomousStatus('inactive');
             }
        }
        
        return () => {
            if (autonomousTimerRef.current) {
                clearTimeout(autonomousTimerRef.current);
            }
        };
    }, [isAutonomous, githubConfig, CATEGORIES]);

    const handleConnectGithub = async (config: Omit<GithubConfig, 'defaultBranch'>) => {
        if (!config.token) {
            setGithubConfig(null);
            localStorage.removeItem('githubConfig');
            setIsAutonomous(false);
            setSelectedCategory(null);
            setContentCache({});
            setGithubModalOpen(false);
            return;
        }

        setIsVerifyingGithub(true);
        setGithubModalError(null);

        try {
            const { defaultBranch } = await getRepoDetails(config);
            const fullConfig: GithubConfig = { ...config, defaultBranch };
            setGithubConfig(fullConfig);
            localStorage.setItem('githubConfig', JSON.stringify(fullConfig));

            setSelectedCategory(null);
            setContentCache({});
            setGithubModalOpen(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "Failed to connect to GitHub.";
            setGithubModalError(errorMessage);
        } finally {
            setIsVerifyingGithub(false);
        }
    };

    const handleToggleAutonomous = () => {
        if (!githubConfig) {
            setError("Connect to GitHub to enable autonomous mode.");
            setGithubModalOpen(true);
            return;
        }
        setIsAutonomous(prev => !prev);
        if (!isAutonomous) {
            addLog("Autonomous mode started.");
            setAutonomousStatus('running');
        } else {
            addLog("Autonomous mode stopped by user.");
            setAutonomousStatus('inactive');
        }
    };
    
    const handleGenerateAndSave = async (categoryOverride?: Category) => {
        const categoryToUse = categoryOverride || selectedCategory;
        if (!categoryToUse || !githubConfig) return;

        setIsGenerating(true);
        setError(null);
        try {
            const rawContent = await generateContent(categoryToUse.prompt);
            const { title, description } = parseGeneratedText(rawContent);
            const newItem = await saveContentItem(githubConfig, categoryToUse.id, title, description);
            
            setContentCache(prev => ({
                ...prev,
                [categoryToUse.id]: [newItem, ...(prev[categoryToUse.id] || [])]
            }));

        } catch (err) {
            console.error(err);
setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleGenerateSimilar = (category: Category) => {
        setDetailsItem(null);
        setAppState('app');
        setSelectedCategory(category);
        handleGenerateAndSave(category);
    };

    const handleSelectCategory = useCallback((category: Category) => {
        setSelectedCategory(category);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, []);

    const handleContentSelect = (item: ContentItem, category: Category) => {
        setDetailsItem({ item, category });
    };
    
    const openGithubModal = () => {
        setGithubModalError(null);
        setGithubModalOpen(true);
    };

    if (appState === 'intro') {
        return <Intro onIntroEnd={handleIntroEnd} />;
    }

    if (detailsItem) {
        return <DetailsPage item={detailsItem.item} category={detailsItem.category} onBack={() => setDetailsItem(null)} onGenerateSimilar={handleGenerateSimilar} />;
    }

    if (appState === 'search') {
        return <SearchPage onBack={() => setAppState('homepage')} />;
    }

    return (
        <>
            {appState === 'homepage' && <HomePage onNavigateToApp={() => handleNavigate('app')} onContentSelect={handleContentSelect} />}

            {appState === 'app' && (
                <div className="flex h-screen bg-[#0B071A] font-sans relative">
                    <Sidebar 
                        categories={CATEGORIES}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
                        isOpen={isSidebarOpen}
                        setIsOpen={setSidebarOpen}
                        onOpenGithubModal={openGithubModal}
                        isGithubConnected={!!githubConfig?.token}
                        isAutonomous={isAutonomous}
                        onToggleAutonomous={handleToggleAutonomous}
                        autonomousStatus={autonomousStatus}
                        autonomousLogs={autonomousLogs}
                        onOpenChangelog={() => setChangelogModalOpen(true)}
                    />
                    <div className={`flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out md:pl-0 ${isSidebarOpen ? 'md:pl-24' : ''}`}>
                        <Header 
                            categoryName={selectedCategory?.name || t('header.selectCategory')}
                        />
                        <main className="flex-1 overflow-y-auto bg-[#1A1433]/50 p-4 sm:p-6 lg:p-8 pt-28 pb-24">
                           <ContentDisplay
                                category={selectedCategory}
                                content={selectedCategory ? contentCache[selectedCategory.id] || [] : []}
                                isLoading={isLoading}
                                error={error}
                                githubConfig={githubConfig}
                                onOpenGithubModal={openGithubModal}
                                onGenerate={() => handleGenerateAndSave()}
                                isGenerating={isGenerating}
                                isAutonomous={isAutonomous}
                                onContentSelect={(item) => handleContentSelect(item, selectedCategory!)}
                            />
                        </main>
                    </div>
                     <GithubConnectModal
                        isOpen={isGithubModalOpen}
                        onClose={() => setGithubModalOpen(false)}
                        onConnect={handleConnectGithub}
                        initialConfig={githubConfig}
                        isVerifying={isVerifyingGithub}
                        error={githubModalError}
                    />
                     <ChangelogModal 
                        isOpen={isChangelogModalOpen}
                        onClose={() => setChangelogModalOpen(false)}
                    />
                </div>
            )}
            
            <BottomBar 
                activeView={appState} 
                onNavigate={handleNavigate}
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </>
    );
};

export default App;