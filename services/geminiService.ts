import { GoogleGenAI } from "@google/genai";

export const geminiService = {
    generateContent: async (prompt: string): Promise<{ title: string; content: string }> => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const rawText = response.text;
            const titleMatch = rawText.match(/Título: (.*)/);
            const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
            const content = rawText.replace(/Título: .*\n\n?/, '').trim();
            
            return { title, content };
        } catch (error) {
            console.error("Error generating content with Gemini:", error);
            if (error.message.includes('API key not valid')) {
                throw new Error("Invalid Gemini API Key. Please check your key in the environment variables.");
            }
            throw new Error("Failed to generate content.");
        }
    }
};
