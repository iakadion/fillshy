import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from './hooks/useTranslations';
import { GithubConfig, Category, ContentItem, AutonomousStatus } from './types';
import { githubService } from './services/githubService';
import { geminiService } from './services/geminiService';
import { CATEGORIES } from './constants';
import { Sidebar } from './components/Sidebar';
import { ContentDisplay } from './components/ContentDisplay';
import { GithubConnectModal } from './components/GithubConnectModal';
import { ChangelogModal } from './components/ChangelogModal';
import { Intro } from './components/Intro';
import { DetailsPage } from './components/DetailsPage';
import { BottomBar } from './components/BottomBar';
import { HomePage } from './components/HomePage';

export const App: React.FC = () => {
    const { t } = useTranslations();
    const [view, setView] = useState<'intro' | 'home' | 'app'>('intro');
    const [githubConfig, setGithubConfig] = useState<GithubConfig | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
    
    const [error, setError] = useState<string | null>(null);

    const [autonomousStatus, setAutonomousStatus] = useState<AutonomousStatus>('inactive');
    const [lastAction, setLastAction] = useState('');
    const autonomousIntervalRef = useRef<number | null>(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [isChangelogOpen, setIsChangelogOpen] = useState(false);
    
    const [detailsItem, setDetailsItem] = useState<ContentItem | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // --- Initialization ---
    useEffect(() => {
        const storedConfig = localStorage.getItem('githubConfig');
        if (storedConfig) {
            const config = JSON.parse(storedConfig);
            setGithubConfig(config);
            verifyAndConnect(config);
        } else {
            setIsConnecting(false);
        }
    }, []);

    // --- GitHub Connection Logic ---
    const verifyAndConnect = useCallback(async (config: GithubConfig) => {
        setIsConnecting(true);
        const result = await githubService.verifyConnection(config);
        if (result.success && result.data) {
            const fullConfig = { ...config, defaultBranch: result.data.default_branch };
            setGithubConfig(fullConfig);
            localStorage.setItem('githubConfig', JSON.stringify(fullConfig));
            setIsConnected(true);
        } else {
            setIsConnected(false);
            setError("Failed to verify GitHub connection.");
        }
        setIsConnecting(false);
    }, []);

    const handleConnect = async (config: GithubConfig) => {
        await verifyAndConnect(config);
    };

    const handleDisconnect = () => {
        localStorage.removeItem('githubConfig');
        setGithubConfig(null);
        setIsConnected(false);
        if (autonomousStatus !== 'inactive') handleToggleAutonomous();
    };

    // --- Content Generation (No fetching, just generation) ---
    const handleGenerateContent = async (category: Category) => {
        if (!category || !githubConfig) {
            if (!githubConfig) setIsGithubModalOpen(true);
            return;
        }

        setIsGenerating(true);
        setLastAction(`Generating for ${t(category.name)}...`);
        try {
            const { title, content } = await geminiService.generateContent(category.prompt);
            const result = await githubService.saveContent(githubConfig, category.id, title, content);
            if (result.success) {
                setLastAction(`Saved: ${title}`);
            } else {
                 setLastAction(`Error saving: ${result.error}`);
                 setError(result.error || "Failed to save content.");
                 if (autonomousStatus === 'running') setAutonomousStatus('error');
            }
        } catch (e) {
            setLastAction(`Error: ${e.message}`);
            setError(e.message);
            if (autonomousStatus === 'running') setAutonomousStatus('error');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleGenerateRandom = () => {
        if (!isConnected) {
            setIsGithubModalOpen(true);
            return;
        }
        const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        handleGenerateContent(randomCategory);
    };

    // --- Autonomous Mode Logic ---
    const runAutonomousTask = useCallback(async () => {
        const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        await handleGenerateContent(randomCategory);
    }, [githubConfig, isConnected]);

    const handleToggleAutonomous = () => {
        if (autonomousStatus === 'running' || autonomousStatus === 'paused') {
            setAutonomousStatus('inactive');
            setLastAction('Autonomous mode stopped.');
            if (autonomousIntervalRef.current) {
                clearInterval(autonomousIntervalRef.current);
                autonomousIntervalRef.current = null;
            }
        } else {
            setAutonomousStatus('running');
            setLastAction('Starting autonomous mode...');
            runAutonomousTask(); // Run immediately
            const intervalId = setInterval(() => {
                runAutonomousTask();
            }, 90000); // Average of 1.5 min
            autonomousIntervalRef.current = intervalId as any;
        }
    };

    // --- View/UI Logic ---
    const handleIntroFinish = () => {
        setView('home');
    };
    
    const handleEnterApp = () => {
        setView('app');
    };

    const handleCardClick = (item: ContentItem) => {
        setDetailsItem(item);
    };

    const handleBackFromDetails = () => {
        setDetailsItem(null);
    }
    
    // --- Render Logic ---
    if (view === 'intro') {
        return <Intro onFinished={handleIntroFinish} />;
    }
    
    if (detailsItem) {
        const category = CATEGORIES.find(c => c.id === detailsItem.category) || CATEGORIES[0];
        return <DetailsPage 
                    item={detailsItem} 
                    category={category} 
                    onBack={handleBackFromDetails}
                    onGenerateSimilar={handleGenerateContent}
                />;
    }
    
    if (view === 'home') {
        return <>
            <HomePage 
                onEnterApp={handleEnterApp} 
                onCardClick={handleCardClick} 
                onGenerateRandom={handleGenerateRandom}
                isConnected={isConnected}
                onConnect={() => setIsGithubModalOpen(true)}
            />
            <BottomBar onGenerate={handleGenerateRandom} />
        </>;
    }

    // App View
    return (
        <div className="flex h-screen bg-[#0B071A] p-0 md:p-2 md:gap-2">
            <div className="hidden md:flex md:w-64">
                 <Sidebar
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    isConnected={isConnected}
                    onConnect={() => setIsGithubModalOpen(true)}
                    autonomousStatus={autonomousStatus}
                    onToggleAutonomous={handleToggleAutonomous}
                    lastAction={lastAction}
                    onShowChangelog={() => setIsChangelogOpen(true)}
                />
            </div>
           
            <main className="flex-1 flex flex-col overflow-hidden">
                 <div className="flex-1 overflow-y-auto">
                    <ContentDisplay
                        isLoading={isConnecting}
                        error={error}
                        isConnected={isConnected}
                        onConnect={() => setIsGithubModalOpen(true)}
                        onGenerate={handleGenerateContent}
                        onCardClick={handleCardClick}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </main>
            
            <BottomBar onGenerate={handleGenerateRandom} />

            <GithubConnectModal
                isOpen={isGithubModalOpen}
                onClose={() => setIsGithubModalOpen(false)}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                initialConfig={githubConfig}
            />
            <ChangelogModal isOpen={isChangelogOpen} onClose={() => setIsChangelogOpen(false)} />
        </div>
    );
};