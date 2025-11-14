import type { ReactNode } from 'react';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  prompt: string; 
  icon: ReactNode;
}

export interface GithubConfig {
    username: string;
    repo: string;
    token: string;
    defaultBranch?: string;
}

export type AutonomousStatus = 'inactive' | 'running' | 'paused' | 'error';

export interface DetailsPageProps {
    item: ContentItem;
    category: Category;
    onBack: () => void;
    onGenerateSimilar: (category: Category) => void;
}