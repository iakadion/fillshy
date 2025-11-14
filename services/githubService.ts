import { GithubConfig } from '../types';

export const githubService = {
    API_URL: 'https://api.github.com',

    verifyConnection: async (config: GithubConfig): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
            const response = await fetch(`${githubService.API_URL}/repos/${config.username}/${config.repo}`, {
                headers: { 'Authorization': `token ${config.token}` }
            });
            if (!response.ok) {
                throw new Error(`Failed to verify repository. Status: ${response.status}`);
            }
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    getContents: async (config: GithubConfig, path: string = ''): Promise<any[]> => {
        try {
            const response = await fetch(`${githubService.API_URL}/repos/${config.username}/${config.repo}/contents/${path}`, {
                headers: { 'Authorization': `token ${config.token}` }
            });
            if (response.status === 404) return []; // Folder doesn't exist yet, return empty
            if (!response.ok) throw new Error(`Failed to get contents. Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching contents:", error);
            return [];
        }
    },

    getSha: async (config: GithubConfig, path: string): Promise<string | null> => {
        try {
            const response = await fetch(`${githubService.API_URL}/repos/${config.username}/${config.repo}/contents/${path}`, {
                headers: { 'Authorization': `token ${config.token}` }
            });
            if (!response.ok) return null;
            const data = await response.json();
            return data.sha;
        } catch (error) {
            return null;
        }
    },

    saveContent: async (config: GithubConfig, categoryId: string, title: string, content: string): Promise<{ success: boolean; error?: string }> => {
        const safeTitle = title.replace(/[^a-z0-9\-]/gi, '_').toLowerCase();
        const filePath = `${categoryId}/${safeTitle}.md`;
        
        try {
            const sha = await githubService.getSha(config, filePath);
            const body = {
                message: `feat: ✨ Add new content "${title}"`,
                content: btoa(unescape(encodeURIComponent(content))),
                sha: sha,
                branch: config.defaultBranch,
            };

            const response = await fetch(`${githubService.API_URL}/repos/${config.username}/${config.repo}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${config.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`GitHub API Error: ${errorData.message}`);
            }
            return { success: true };
        } catch (error) {
            console.error("Error saving content to GitHub:", error);
            return { success: false, error: error.message };
        }
    }
};
