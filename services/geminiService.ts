
import { GoogleGenAI, Type } from "@google/genai";
import type { Strategy } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const strategyPointSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A short, catchy title for the strategy point." },
        description: { type: Type.STRING, description: "A 1-2 sentence explanation of what this point is and why it's important." },
        action: { type: Type.STRING, description: "A concrete, actionable step the user should take." }
    },
    required: ["title", "description", "action"]
};

const strategySectionSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The title of the marketing section (e.g., 'Search Engine Marketing (SEM)')." },
        summary: { type: Type.STRING, description: "A 2-3 sentence summary of the overall strategy for this section." },
        points: {
            type: Type.ARRAY,
            description: "A list of 3-5 specific strategy points.",
            items: strategyPointSchema
        }
    },
    required: ["title", "summary", "points"]
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        sem: { ...strategySectionSchema, description: "Strategy for Search Engine Marketing (Paid Search)." },
        seo: { ...strategySectionSchema, description: "Strategy for Search Engine Optimization (Organic Search)." },
        smeo: { ...strategySectionSchema, description: "Strategy for Social Media & Engagement Optimization." }
    },
    required: ["sem", "seo", "smeo"]
};


export const generateStrategy = async (businessDescription: string): Promise<Strategy> => {
    const prompt = `
        Analyze the following business description and generate a comprehensive digital marketing strategy for it, focusing on maximizing Google Search Rank for Q4 2025.
        The strategy should be broken down into three main pillars: SEM (Search Engine Marketing), SEO (Search Engine Optimization), and SMEO (Social Media & Engagement Optimization).
        For each pillar, provide a brief summary and 3-5 specific, actionable points.
        Prioritize modern, effective techniques that align with Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) principles and Core Web Vitals.

        Business Description: "${businessDescription}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        if (!jsonText) {
            throw new Error("The API returned an empty response. This might be due to content safety filters. Please try rephrasing your business description.");
        }
        
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as Strategy;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (message.includes('safety')) {
                throw new Error("Request blocked for safety reasons. Please modify your business description.");
            }
            if (message.includes('api key')) {
                throw new Error("Invalid API Key. Please check your environment configuration.");
            }
        }
        // Generic error for schema issues, network problems, etc.
        throw new Error("Failed to generate marketing strategy from the AI. Please check your connection or API key.");
    }
};
