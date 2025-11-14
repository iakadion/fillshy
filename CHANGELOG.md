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
-   **Complete Rebranding:** The app was rebranded to "fillshy," with a new logo, color scheme, and professional documentation (`README.md`).
-   **Floating Header:** Implemented a modern, floating header design.

### 🌐 Internationalization (i18n)

-   **Bilingual Support:** The application is now fully available in both English (en) and Portuguese (pt), with automatic browser language detection.

### 🛠️ Fixes & Improvements

-   **Robust GitHub Handling:** Fixed a critical "Not Found" error when committing to new/empty repositories by implementing default branch detection.
-   **Resilient Autonomous Mode:** Improved error handling to recover from network failures (`Failed to fetch`) and API rate limits, making the 24/7 generation more reliable.
-   **Improved Prompts:** Overhauled all AI prompts to generate significantly higher-quality and more creative content.
