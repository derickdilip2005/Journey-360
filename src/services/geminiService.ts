import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyCXmJr0noEYODH3fw2Vl_cGSvVHA8PIZNw";

const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface LocationPlace {
  name: string;
  lat: number;
  lon: number;
  distance?: number;
  type: string;
}

export interface StructuredResponse {
  title: string;
  items: Array<{
    text: string;
    name?: string;
    lat?: number;
    lon?: number;
  }>;
}

export class GeminiService {
  private chatHistory: ChatMessage[] = [];

  constructor() {
    this.initializeChatbot();
  }

  private initializeChatbot(): void {
    this.chatHistory = [
      {
        role: 'model',
        parts: [{ text: `You are Journey 360's AI Travel Assistant - a friendly, knowledgeable, and efficient tourism chatbot for India.

Your core responsibilities:
• Provide concise, well-structured travel information
• Assist with tourist destinations, accommodations, and transportation
• Offer cultural insights and local recommendations
• Help with safety tips and travel planning
• Keep responses short, crisp, and actionable

Response Format Rules:
• Use bullet points for lists
• Keep paragraphs under 2 sentences
• Provide specific, practical advice
• Include relevant details like timings, costs, distances
• Always stay focused on India tourism

For location-based queries, respond with structured JSON containing:
{
  "title": "Nearby [Place Type]",
  "items": [
    {
      "text": "**Place Name** - Distance, brief description",
      "name": "Place Name",
      "lat": latitude,
      "lon": longitude
    }
  ]
}

Be helpful, accurate, and concise in all responses.` }]
      }
    ];
  }

  async sendMessage(message: string, language: string = 'en'): Promise<string | StructuredResponse> {
    try {
      let contextualMessage = message;
      if (language !== 'en') {
        const languageNames: { [key: string]: string } = {
          'hi': 'Hindi (हिन्दी)',
          'bn': 'Bengali (বাংলা)', 
          'sa': 'Sanskrit (संस्कृतम्)',
          'ja': 'Japanese (日本語)',
          'fr': 'French (Français)',
          'de': 'German (Deutsch)',
          'es': 'Spanish (Español)'
        };
        
        const languageName = languageNames[language] || 'the requested language';
        contextualMessage = `Please respond in ${languageName}. Keep responses concise and well-structured. User message: ${message}`;
      }

      this.chatHistory.push({
        role: 'user',
        parts: [{ text: contextualMessage }]
      });

      const chat = model.startChat({
        history: this.chatHistory.slice(0, -1),
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(contextualMessage);
      const responseText = result.response.text();

      this.chatHistory.push({
        role: 'model',
        parts: [{ text: responseText }]
      });

      // Keep history manageable
      if (this.chatHistory.length > 20) {
        this.chatHistory = [
          this.chatHistory[0],
          ...this.chatHistory.slice(-19)
        ];
      }

      // Try to parse as JSON for structured responses
      try {
        const parsed = JSON.parse(responseText);
        if (parsed.title && parsed.items) {
          return parsed as StructuredResponse;
        }
      } catch {
        // Not JSON, return as string
      }

      return responseText;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      const fallbackResponses: { [key: string]: string } = {
        'en': 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        'hi': 'मुझे खुशी है कि आपने पूछा, लेकिन अभी मुझे कनेक्शन में समस्या हो रही है। कृपया पुनः प्रयास करें।',
        'bn': 'আমি দুঃখিত, এই মুহূর্তে সংযোগে সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        'sa': 'क्षम्यताम्, अধुना संযोगे कष्टं भवति। পুনः প্রयত্নং কুর্বন্তু।',
        'ja': '申し訳ございませんが、接続に問題があります。もう一度お試しください。',
        'fr': 'Désolé, j\'ai des problèmes de connexion. Veuillez réessayer.',
        'de': 'Entschuldigung, Verbindungsprobleme. Bitte versuchen Sie es erneut.',
        'es': 'Lo siento, problemas de conexión. Por favor, inténtelo de nuevo.'
      };
      
      return fallbackResponses[language] || fallbackResponses['en'];
    }
  }



  resetChat(): void {
    this.initializeChatbot();
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();