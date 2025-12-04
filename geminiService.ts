import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client. 
// Note: API_KEY is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a list of suggested quotes/messages based on the user's inputs.
 * Uses JSON schema to ensure structured output.
 */
export const generateSuggestions = async (
  occasion: string,
  recipient: string,
  tone: string
): Promise<string[]> => {
  if (!process.env.API_KEY) throw new Error("API Key not found");

  const prompt = `Generate 5 distinct greeting card messages for a ${occasion} card for ${recipient}. The tone should be ${tone}. Keep them concise (under 30 words).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const parsed = JSON.parse(jsonText);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw error;
  }
};

/**
 * Generates a single personalized message.
 */
export const generateMessage = async (
  occasion: string,
  recipient: string,
  tone: string
): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API Key not found");

  const prompt = `Write a single, perfect greeting card message for a ${occasion} card for ${recipient}. The tone should be ${tone}. Just return the message text, nothing else.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};

/**
 * Generates a background image using Imagen 3 (via Gemini API).
 */
export const generateImage = async (
  occasion: string,
  tone: string
): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API Key not found");

  // Construct a prompt optimized for background images (plenty of negative space, artistic)
  const prompt = `A beautiful, artistic background image for a ${occasion} greeting card. Tone: ${tone}. High quality, abstract or scenic, soft lighting, suitable for overlaying text. No text in the image.`;

  try {
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "3:4", // Portrait for cards
        outputMimeType: "image/jpeg",
      },
    });

    const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
    if (!base64Image) {
      throw new Error("No image generated");
    }

    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};