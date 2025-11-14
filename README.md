# fillshy: Autonomous AI Content Generation System

fillshy is an advanced web application that leverages the Gemini API for 24/7 autonomous content generation. It provides a modern, fluid interface to generate diverse types of text-based content, organized by categories, and saves them directly to a user-configured GitHub repository.

This platform is designed to be a "set it and forget it" content pipeline, ideal for populating blogs, social media feeds, creative writing repositories, or any project that benefits from a continuous stream of fresh, AI-generated ideas.

---

## Core Features

-   **Diverse Content Categories:** Generate a wide variety of content, from movie scenes and startup pitches to song lyrics, ASCII art, and viral social media posts, each guided by highly creative and specific prompts.
-   **Direct GitHub Integration:** Securely connect to your GitHub account using a Personal Access Token. All generated content is formatted as Markdown and saved directly into the appropriate category folder in your chosen repository.
-   **24/7 Autonomous Mode:** Activate the "Modo Autônomo" to let the system run continuously. It will automatically pick random categories, generate new content, and save it to GitHub at randomized intervals.
-   **Intelligent API & Network Handling:** The autonomous mode is built to be resilient. It intelligently handles API rate limits by pausing and resuming, and it can recover from transient network errors, ensuring the generation process remains active for long periods.
-   **Modern & Responsive UI:** A clean, responsive interface built with TailwindCSS provides a seamless experience on both desktop and mobile devices, with real-time feedback on the generation status.
-   **Bilingual Support:** Full support for English (en) and Portuguese (pt), with automatic language detection.

## How It Works

1.  **Connect to GitHub:** The first step is to connect the application to your GitHub repository. You'll need to provide your username, the repository name, and a Personal Access Token with `repo` scope. This information is stored locally in your browser and is never sent anywhere else.
2.  **Select a Category:** Browse the sidebar to choose a content category. The application will fetch and display any content already saved in the corresponding folder of your repository.
3.  **Generate Content:**
    *   **Manual Mode:** With a category selected, you can click the "+" button to generate a single new piece of content on demand.
    *   **Autonomous Mode:** Toggle the "Autonomous Mode" switch in the sidebar. The system will take over, generating and saving content automatically until you turn it off. You can monitor its progress through the real-time status log.

## Setup & Configuration

To run this project, you need two essential credentials:

1.  **GitHub Personal Access Token (PAT):**
    *   Create a new token [here](https://github.com/settings/tokens/new).
    *   You **must** grant it the `repo` scope to allow the application to write files to your repository.
    *   Treat this token like a password; do not expose it publicly.

2.  **Gemini API Key:**
    *   Obtain an API key from Google AI Studio.
    *   This key is required for the application to communicate with the Gemini model for content generation.
    *   The application assumes this key is provided as an environment variable (`process.env.API_KEY`).

## Technology Stack

-   **Frontend:** React, TypeScript
-   **Styling:** TailwindCSS
-   **AI:** Google Gemini API (`@google/genai`)
-   **Version Control Integration:** GitHub REST API
