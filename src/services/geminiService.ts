import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('REACT_APP_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export class GeminiService {
  private chatHistory: ChatMessage[] = [];

  constructor() {
    // Initialize with system context about Journey 360
    this.chatHistory = [
      {
        role: 'model',
        parts: [{ text: `You are a helpful travel assistant for Journey 360, a comprehensive India tourism platform. You help users with:

- Tourist destinations across India
- Travel planning and itineraries
- Local culture and traditions
- Accommodation recommendations
- Transportation options
- Food and cuisine information
- Weather and best travel times
- Cultural experiences and festivals
- Safety tips for travelers
- Local guides and community connections

Always be friendly, informative, and focus on India tourism. Provide practical, actionable advice. If asked about topics outside of travel and tourism, politely redirect the conversation back to travel-related topics.` }]
      }
    ];
  }

  async sendMessage(message: string, language: string = 'en'): Promise<string> {
    try {
      // Add language context to the message if not English
      let contextualMessage = message;
      if (language !== 'en') {
        const languageNames: { [key: string]: string } = {
          'hi': 'Hindi',
          'bn': 'Bengali', 
          'sa': 'Sanskrit',
          'ja': 'Japanese',
          'fr': 'French',
          'de': 'German',
          'es': 'Spanish'
        };
        
        const languageName = languageNames[language] || 'the requested language';
        contextualMessage = `Please respond in ${languageName}. User message: ${message}`;
      }

      // Add user message to history
      this.chatHistory.push({
        role: 'user',
        parts: [{ text: contextualMessage }]
      });

      // Start a chat session with history
      const chat = model.startChat({
        history: this.chatHistory.slice(0, -1), // Exclude the current message
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      // Send message and get response
      const result = await chat.sendMessage(contextualMessage);
      const response = result.response;
      const responseText = response.text();

      // Add model response to history
      this.chatHistory.push({
        role: 'model',
        parts: [{ text: responseText }]
      });

      // Keep history manageable (last 20 messages)
      if (this.chatHistory.length > 20) {
        this.chatHistory = [
          this.chatHistory[0], // Keep system message
          ...this.chatHistory.slice(-19) // Keep last 19 messages
        ];
      }

      return responseText;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Fallback response based on language
      const fallbackResponses: { [key: string]: string } = {
        'en': 'I apologize, but I\'m having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about India tourism, travel destinations, or planning your trip.',
        'hi': 'मुझे खुशी है कि आपने पूछा, लेकिन अभी मुझे अपने ज्ञान आधार से जुड़ने में समस्या हो रही है। कृपया थोड़ी देर बाद पुनः प्रयास करें।',
        'bn': 'আমি দুঃখিত, কিন্তু এই মুহূর্তে আমার জ্ঞান ভাণ্ডারের সাথে সংযোগ করতে সমস্যা হচ্ছে। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।',
        'sa': 'क्षम्यताम्, अधुना मम ज्ञानकोशेन सह संयोगे कष्टं भवति। कृपया पुनः प्रयत्नं कुर्वन्तु।',
        'ja': '申し訳ございませんが、現在知識ベースへの接続に問題があります。しばらくしてからもう一度お試しください。',
        'fr': 'Je m\'excuse, mais j\'ai des difficultés à me connecter à ma base de connaissances en ce moment. Veuillez réessayer dans un moment.',
        'de': 'Entschuldigung, aber ich habe gerade Probleme, mich mit meiner Wissensdatenbank zu verbinden. Bitte versuchen Sie es in einem Moment erneut.',
        'es': 'Lo siento, pero tengo problemas para conectarme a mi base de conocimientos en este momento. Por favor, inténtelo de nuevo en un momento.'
      };
      
      return fallbackResponses[language] || fallbackResponses['en'];
    }
  }

  // Reset chat history
  resetChat(): void {
    this.chatHistory = [
      {
        role: 'model',
        parts: [{ text: `You are a helpful travel assistant for Journey 360, a comprehensive India tourism platform. You help users with:

- Tourist destinations across India
- Travel planning and itineraries
- Local culture and traditions
- Accommodation recommendations
- Transportation options
- Food and cuisine information
- Weather and best travel times
- Cultural experiences and festivals
- Safety tips for travelers
- Local guides and community connections

Always be friendly, informative, and focus on India tourism. Provide practical, actionable advice. If asked about topics outside of travel and tourism, politely redirect the conversation back to travel-related topics.` }]
      }
    ];
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();