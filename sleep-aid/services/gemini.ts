import { GoogleGenAI, Modality, Type } from "@google/genai";
import { Message } from "../types";
import { decode, decodeAudioData } from "./audioUtils";

const apiKey = process.env.API_KEY;
// Initialize securely - assumes API_KEY is available in env
const ai = new GoogleGenAI({ apiKey: apiKey });

export const getCognitiveShuffleWords = async (): Promise<string[]> => {
  try {
    // Generate random, visualize-able nouns that are emotionally neutral
    const prompt = "Generate a JSON list of 20 random, visually distinct, emotionally neutral concrete nouns for a 'Cognitive Shuffle' sleep exercise (e.g., 'Toaster', 'Feather', 'Brick', 'Cloud'). Return only the JSON array of strings.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return ["Cloud", "Leaf", "Stone", "River"];
    return JSON.parse(text);
  } catch (e) {
    console.error(e);
    return ["Cotton", "Book", "Mountain", "Chair", "Raindrop"]; // Fallback
  }
};

export const playTextToSpeech = async (text: string): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text.slice(0, 1000) }] }], // Limit length for demo performance
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Deep, calming voice
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data returned");
    }

    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    const outputNode = outputAudioContext.createGain();
    
    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      outputAudioContext,
      24000,
      1,
    );
    
    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    outputNode.connect(outputAudioContext.destination);
    source.start();

  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
};

export const getChatResponse = async (history: Message[], message: string): Promise<string> => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: chatHistory,
      config: {
        systemInstruction: "You are Somnium, a calming and knowledgeable sleep coach. You use principles of CBT-I (Cognitive Behavioral Therapy for Insomnia) and mindfulness to help users relax, manage sleep anxiety, and improve sleep hygiene. Keep responses warm, soothing, and relatively concise. Avoid medical diagnosis.",
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
};