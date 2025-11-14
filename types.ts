// FIX: Import React to provide the 'React' namespace for type definitions like React.FC.
import type * as React from 'react';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  prompt: string; 
  icon: React.FC<{className?: string}>;
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
