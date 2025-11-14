import React from 'react';

export const ChangelogModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-[#1C1633] rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-purple-900/50 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="prose prose-invert prose-headings:font-heading prose-headings:text-pink-400 prose-a:text-purple-400 hover:prose-a:text-purple-300">
                    <h1>fillshy Changelog</h1>
                    <h2>Version 2.0.0 - The "Prestige" Update</h2>
                    <p>This is a major overhaul focused on UI/UX, branding, and overall user experience.</p>
                    <h3>✨ New Features</h3>
                    <ul>
                      <li><strong>Animated Intro Screen:</strong> A beautiful, animated splash screen now greets users on their first visit per session, featuring a dynamic gradient bubble background and an animated logo for a premium first impression.</li>
                      <li><strong>Changelog Modal:</strong> You're looking at it! A new changelog has been added to keep users informed about the latest updates. It's accessible from the sidebar footer.</li>
                    </ul>
                    <h3>💄 UI/UX Enhancements</h3>
                     <ul>
                      <li><strong>Premium Typography:</strong> Upgraded the font stack. Headings now use the sleek and modern "Sora" font, while body text remains the highly-readable "Inter".</li>
                      <li><strong>Enhanced Micro-animations:</strong> Added subtle, satisfying animations to buttons, sidebar items, and modals to make the interface feel more responsive and alive.</li>
                      <li><strong>Complete Rebranding:</strong> The app was rebranded to "fillshy," with a new logo, color scheme, and professional documentation (`README.md`).</li>
                    </ul>
                    <h3>🌐 Internationalization (i18n)</h3>
                    <ul>
                      <li><strong>Bilingual Support:</strong> The application is now fully available in both English (en) and Portuguese (pt), with automatic browser language detection.</li>
                    </ul>
                    <h3>🛠️ Fixes & Improvements</h3>
                     <ul>
                      <li><strong>Robust GitHub Handling:</strong> Fixed a critical "Not Found" error when committing to new/empty repositories by implementing default branch detection.</li>
                      <li><strong>Resilient Autonomous Mode:</strong> Improved error handling to recover from network failures (`Failed to fetch`) and API rate limits, making the 24/7 generation more reliable.</li>
                      <li><strong>Improved Prompts:</strong> Overhauled all AI prompts to generate significantly higher-quality and more creative content.</li>
                    </ul>
                </div>
                <button onClick={onClose} className="mt-6 w-full px-6 py-2.5 bg-purple-900/50 text-gray-300 font-medium rounded-md hover:bg-purple-900/80 transition-colors">Close</button>
            </div>
        </div>
    );
};
