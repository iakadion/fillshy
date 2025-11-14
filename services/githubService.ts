import type { GithubConfig, ContentItem } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Converts a string UTF-8 to Base64 safely in the browser.
 * @param str The string to encode.
 * @returns The Base64 encoded string.
 */
function toBase64(str: string) {
    const uint8Array = new TextEncoder().encode(str);
    const binaryString = String.fromCharCode(...uint8Array);
    return btoa(binaryString);
}

/**
 * Generates a dynamic placeholder image URL.
 * @param title The content title to use as a seed.
 * @returns A URL from Unsplash.
 */
const getDynamicImageUrl = (title: string): string => {
    const query = encodeURIComponent(title.split(' ').slice(0, 3).join(','));
    return `https://source.unsplash.com/800x600/?${query}`;
};

/**
 * Fetches repository details, specifically the default branch.
 * Essential for committing to new/empty repositories.
 * @param config - The GitHub credentials and repo info.
 * @returns A promise that resolves with the default branch name.
 */
export const getRepoDetails = async (config: Omit<GithubConfig, 'defaultBranch'>): Promise<{ defaultBranch: string }> => {
    const { username, repo, token } = config;
    const url = `${GITHUB_API_BASE}/repos/${username}/${repo}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Repository not found: ${username}/${repo}. Check username and repository name.`);
        }
        if (response.status === 401) {
             throw new Error(`Invalid GitHub token or missing permissions to access the repository.`);
        }
        
        let errorMessage = 'Could not fetch repository details.';
        try {
            const errorData = await response.json();
            console.error("Error fetching repository details:", errorData);
            errorMessage = errorData.message || errorMessage;
             if (response.status === 403 && errorMessage.includes('rate limit')) {
                errorMessage = `API rate limit exceeded. Please wait and try again later.`;
            }
        } catch (e) {
            console.error("Could not parse GitHub error response:", response.statusText);
            errorMessage = response.statusText;
        }

        throw new Error(`GitHub API Error: ${errorMessage}`);
    }

    const data = await response.json();
    if (!data.default_branch) {
        throw new Error("Could not determine the default branch. The repository might be empty and requires an initial commit.");
    }
    return { defaultBranch: data.default_branch };
};


/**
 * Saves a new content item to the GitHub repository.
 * @param config - The GitHub credentials and repo info.
 * @param categoryId - The folder where the file will be saved.
 * @param title - The content title.
 * @param description - The content body.
 * @returns A promise that resolves to the newly created ContentItem.
 */
export const saveContentItem = async (
    config: GithubConfig,
    categoryId: string,
    title: string,
    description: string
): Promise<ContentItem> => {
    const { username, repo, token, defaultBranch } = config;
    
    const markdownContent = `# ${title}\n\n${description}`;
    const encodedContent = toBase64(markdownContent);
    
    // Create a shorter, readable timestamp for the filename
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const filename = `${year}${month}${day}-${hours}${minutes}${seconds}.md`;

    const path = `${categoryId}/${filename}`;

    const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${path}`;

    const bodyObject: { message: string; content: string; branch?: string } = {
        message: `[BOT] Adds content for ${categoryId}: ${title}`,
        content: encodedContent,
    };

    if (defaultBranch) {
        bodyObject.branch = defaultBranch;
    }

    const body = JSON.stringify(bodyObject);

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
        body,
    });

    if (!response.ok) {
        let errorMessage = 'Could not save the file.';
        try {
            const errorData = await response.json();
            console.error("GitHub API error on save:", errorData);
            errorMessage = errorData.message || errorMessage;
             if (response.status === 403 && errorMessage.includes('rate limit')) {
                errorMessage = `API rate limit exceeded. Please wait and try again later.`;
            }
        } catch (e) {
            errorMessage = response.statusText;
        }
        throw new Error(`GitHub API Error: ${errorMessage}`);
    }

    const data = await response.json();

    return {
        id: data.content.sha,
        title,
        description,
        imageUrl: getDynamicImageUrl(title),
    };
};

/**
 * Parses markdown content to extract title, description, and an optional image URL.
 * Assumes the first line with '#' is the title.
 * Looks for the first markdown image syntax `![alt](url)`.
 * @param content - The raw file content.
 * @returns An object with title, description, and imageUrl.
 */
const parseMarkdownContent = (content: string): { title: string; description: string; imageUrl: string } => {
    const lines = content.split('\n');
    let title = 'Untitled';
    let description = content;
    let imageUrl = '';

    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const imageMatch = content.match(imageRegex);
    if (imageMatch && imageMatch[1]) {
        imageUrl = imageMatch[1];
    }

    const titleIndex = lines.findIndex(line => line.startsWith('# '));
    if (titleIndex !== -1) {
        title = lines[titleIndex].substring(2).trim();
        description = lines.slice(titleIndex + 1).join('\n').trim();
    }
    
    if (!imageUrl) {
        imageUrl = getDynamicImageUrl(title);
    }
    
    return { title, description, imageUrl };
}

/**
 * Fetches and parses all content items for a given category (folder) from GitHub.
 * @param config - The GitHub credentials and repo info.
 * @param categoryId - The category ID, which corresponds to the folder name.
 * @param limit - Optional number of items to return.
 * @returns A promise that resolves to an array of ContentItems.
 */
export const fetchContentItemsForCategory = async (
    config: GithubConfig,
    categoryId: string,
    limit?: number
): Promise<ContentItem[]> => {
    const { username, repo, token } = config;
    const url = `${GITHUB_API_BASE}/repos/${username}/${repo}/contents/${categoryId}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (response.status === 404) {
        // Folder doesn't exist, which is normal for a new category. Return an empty array.
        return [];
    }

    if (!response.ok) {
        let errorMessage = 'Could not fetch files for the category.';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
             if (response.status === 403 && errorMessage.includes('rate limit')) {
                errorMessage = `API rate limit exceeded. Please wait and try again later.`;
            }
        } catch(e) {
            errorMessage = response.statusText;
        }
        throw new Error(`GitHub API Error: ${errorMessage}`);
    }

    const files = (await response.json()).filter((item: any) => item.type === 'file' && item.name.endsWith('.md'));

    const contentItemsPromises = files.map(async (file: any) => {
        // The Authorization header is not needed for the download_url and can cause CORS errors.
        const fileResponse = await fetch(file.download_url);
        
        if (!fileResponse.ok) {
            console.error(`Failed to download file: ${file.name}`);
            return null;
        }
        const rawContent = await fileResponse.text();
        const { title, description, imageUrl } = parseMarkdownContent(rawContent);

        return {
            id: file.sha,
            title,
            description,
            imageUrl,
        };
    });
    
    const resolvedContentItems = await Promise.all(contentItemsPromises);

    // Filter out any nulls, sort from newest to oldest based on filename (timestamp), and apply limit
    const sortedItems = resolvedContentItems
        .filter((item): item is ContentItem => item !== null)
        .reverse();
    
    return limit ? sortedItems.slice(0, limit) : sortedItems;
};
