import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface ChangelogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const changelogContent = `
# fillshy Changelog

## Version 2.0.0 - The "Prestige" Update

This is a major overhaul focused on UI/UX, branding, and overall user experience.

### ✨ New Features

-   **Animated Intro Screen:** A beautiful, animated splash screen now greets users on their first visit per session, featuring a dynamic gradient bubble background and an animated logo for a premium first impression.
-   **Changelog Modal:** You're looking at it! A new changelog has been added to keep users informed about the latest updates. It's accessible from the sidebar footer.
-   **Default Repository Mode:** Added a "Use Default Repository" option for a frictionless start, allowing users to test the app without connecting their own GitHub account immediately. The credentials for this are obfuscated in the code.

### 💄 UI/UX Enhancements

-   **Premium Typography:** Upgraded the font stack. Headings now use the sleek and modern "Sora" font, while body text remains the highly-readable "Inter".
-   **Enhanced Micro-animations:** Added subtle, satisfying animations to buttons, sidebar items, and modals to make the interface feel more responsive and alive.
-   **Complete Rebranding:** The app was rebranded to "fillshy," with a new logo, color scheme, and professional documentation (\`README.md\`).
-   **Floating Header:** Implemented a modern, floating header design.

### 🌐 Internationalization (i18n)

-   **Bilingual Support:** The application is now fully available in both English (en) and Portuguese (pt), with automatic browser language detection.

### 🛠️ Fixes & Improvements

-   **Robust GitHub Handling:** Fixed a critical "Not Found" error when committing to new/empty repositories by implementing default branch detection.
-   **Resilient Autonomous Mode:** Improved error handling to recover from network failures (\`Failed to fetch\`) and API rate limits, making the 24/7 generation more reliable.
-   **Improved Prompts:** Overhauled all AI prompts to generate significantly higher-quality and more creative content.
`;


const renderChangelog = (markdown: string) => {
    const html = markdown
        .trim()
        .split('\n')
        .map(line => {
            line = line.replace(/`([^`]+)`/g, '<code class="bg-[#0B071A] text-pink-400 text-sm rounded px-1.5 py-1">$1</code>');
            if (line.startsWith('# ')) {
                return `<h2 class="text-3xl font-bold mb-4 text-white font-heading">${line.substring(2)}</h2>`;
            }
            if (line.startsWith('## ')) {
                return `<h3 class="text-xl font-bold mt-6 mb-2 text-violet-300 font-heading">${line.substring(3)}</h3>`;
            }
            if (line.startsWith('### ')) {
                return `<h4 class="text-lg font-semibold mt-4 mb-1 text-gray-200">${line.substring(4)}</h4>`;
            }
            if (line.startsWith('- ')) {
                return `<li class="ml-6 list-disc text-[#c0bdd8]">${line.substring(2)}</li>`;
            }
            if (line.trim() === '') {
                return '<br />';
            }
            return `<p class="text-[#c0bdd8] leading-relaxed">${line}</p>`;
        })
        .join('');
    return { __html: html };
};


const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { t } = useTranslations();

    return (
        <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-[#1A1433] border border-[#312B58] rounded-xl shadow-2xl w-full max-w-2xl p-6 flex flex-col max-h-[80vh]" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex-shrink-0">
                    <h2 className="text-2xl font-bold text-white mb-4 font-heading">{t('sidebar.changelog')}</h2>
                </div>
                <div className="flex-1 overflow-y-auto pr-4 -mr-4" dangerouslySetInnerHTML={renderChangelog(changelogContent)} />
                <div className="flex justify-end pt-4 flex-shrink-0 border-t border-[#312B58]/50 mt-4">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium text-[#E0DDF0] bg-[#312B58]/50 hover:bg-[#312B58] rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangelogModal;
