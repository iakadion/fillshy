import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY está disponível no ambiente de execução.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gera conteúdo usando a API Gemini com base em um determinado prompt.
 * @param prompt O prompt para enviar ao modelo.
 * @returns Uma promessa que resolve para o texto gerado.
 */
export const generateContent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Erro ao gerar conteúdo com a API Gemini:", error);
        throw new Error("Falha ao se comunicar com a IA. Verifique sua chave de API ou tente novamente mais tarde.");
    }
};

/**
 * Analisa a resposta de texto bruto da IA em um objeto estruturado.
 * Espera o formato: "Título: [Título]\n\n[Descrição]"
 * @param text O texto bruto da IA.
 * @returns Um objeto com título e descrição.
 */
export const parseGeneratedText = (text: string): { title: string; description: string } => {
    const lines = text.split('\n');
    let title = 'Conteúdo Gerado';
    let description = text.trim();

    const titleLineIndex = lines.findIndex(line => line.toLowerCase().startsWith('título:'));

    if (titleLineIndex !== -1) {
        title = lines[titleLineIndex].substring('título:'.length).trim();
        // A descrição começa após a linha do título e uma possível linha em branco.
        const descriptionStartIndex = lines[titleLineIndex + 1] === '' ? titleLineIndex + 2 : titleLineIndex + 1;
        description = lines.slice(descriptionStartIndex).join('\n').trim();
    }

    if (!title) {
        title = "Título Gerado Automaticamente";
    }

    return { title, description };
};