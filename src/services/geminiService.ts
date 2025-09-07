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

export interface ItineraryTable {
  planTable: Array<{
    day: string;
    date: string;
    time: string;
    activity: string;
    location: string;
    notes: string;
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

  async generateItinerary(prompt: string, language: string = 'en'): Promise<ItineraryTable | string> {
    try {
      const systemPrompt = this.getItinerarySystemPrompt(language);
      
      const chat = model.startChat({
        history: [
          {
            role: 'model',
            parts: [{ text: systemPrompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.8,
        },
      });

      const result = await chat.sendMessage(prompt);
      const responseText = result.response.text();

      // Try to parse JSON response
      try {
        const parsed = JSON.parse(responseText);
        if (parsed.planTable && Array.isArray(parsed.planTable)) {
          return parsed as ItineraryTable;
        }
      } catch {
        // If not valid JSON, return the text response
      }

      return responseText;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      
      const fallbackResponses: { [key: string]: string } = {
        'en': 'Sorry, I couldn\'t generate the itinerary right now. Please try again.',
        'hi': 'क्षमा करें, अभी यात्रा कार्यक्रम बनाने में समस्या है। कृपया पुनः प्रयास करें।',
        'bn': 'দুঃখিত, এই মুহূর্তে ভ্রমণসূচী তৈরি করতে পারছি না। আবার চেষ্টা করুন।',
        'sa': 'क्षम्यताम्, यात्राक्रमं निर्मातुं न शक्नोमि। পুনः প্রयত্নং কুর্বন্তু।',
        'ja': '申し訳ございませんが、旅程を作成できませんでした。もう一度お試しください。',
        'fr': 'Désolé, impossible de créer l\'itinéraire maintenant. Réessayez.',
        'de': 'Entschuldigung, kann die Reiseroute nicht erstellen. Versuchen Sie es erneut.',
        'es': 'Lo siento, no pude crear el itinerario. Inténtelo de nuevo.'
      };
      
      return fallbackResponses[language] || fallbackResponses['en'];
    }
  }

  private getItinerarySystemPrompt(language: string): string {
    const prompts: { [key: string]: string } = {
      'en': `You are an expert travel itinerary generator for India tourism. Create detailed, practical itineraries based on user requirements.

IMPORTANT: Always respond with a valid JSON object containing a "planTable" array.

Format:
{
  "planTable": [
    {
      "day": "Day 1",
      "date": "2024-01-15",
      "time": "09:00 AM",
      "activity": "Visit Red Fort",
      "location": "Delhi",
      "notes": "Entry fee: ₹30, Audio guide available"
    }
  ]
}

Guidelines:
• Create realistic time slots (30min-3hrs per activity)
• Include travel time between locations
• Add practical notes (costs, timings, tips)
• Consider meal breaks and rest periods
• Match the user's budget and preferences
• Keep activities short and crisp
• Include specific locations and landmarks`,
      
      'hi': `आप भारत पर्यटन के लिए एक विशेषज्ञ यात्रा कार्यक्रम जनरेटर हैं। उपयोगकर्ता की आवश्यकताओं के आधार पर विस्तृत, व्यावहारिक यात्रा कार्यक्रम बनाएं।

महत्वपूर्ण: हमेशा "planTable" array के साथ एक वैध JSON object के रूप में जवाब दें।

प्रारूप:
{
  "planTable": [
    {
      "day": "दिन 1",
      "date": "2024-01-15",
      "time": "09:00 AM",
      "activity": "लाल किला देखें",
      "location": "दिल्ली",
      "notes": "प्रवेश शुल्क: ₹30, ऑडियो गाइड उपलब्ध"
    }
  ]
}

दिशानिर्देश:
• वास्तविक समय स्लॉट बनाएं (30मिनट-3घंटे प्रति गतिविधि)
• स्थानों के बीच यात्रा समय शामिल करें
• व्यावहारिक नोट्स जोड़ें (लागत, समय, सुझाव)
• भोजन और आराम की अवधि पर विचार करें
• उपयोगकर्ता के बजट और प्राथमिकताओं से मेल खाएं`,
      
      'bn': `আপনি ভারত পর্যটনের জন্য একজন বিশেষজ্ঞ ভ্রমণ পরিকল্পনা জেনারেটর। ব্যবহারকারীর প্রয়োজনীয়তার ভিত্তিতে বিস্তারিত, ব্যবহারিক ভ্রমণসূচী তৈরি করুন।

গুরুত্বপূর্ণ: সর্বদা "planTable" অ্যারে সহ একটি বৈধ JSON অবজেক্ট দিয়ে উত্তর দিন।

বিন্যাস:
{
  "planTable": [
    {
      "day": "দিন ১",
      "date": "2024-01-15",
      "time": "09:00 AM",
      "activity": "লাল কেল্লা দেখুন",
      "location": "দিল্লি",
      "notes": "প্রবেশ ফি: ₹৩০, অডিও গাইড পাওয়া যায়"
    }
  ]
}

নির্দেশিকা:
• বাস্তবসম্মত সময় স্লট তৈরি করুন (৩০মিনিট-৩ঘন্টা প্রতি কার্যকলাপ)
• স্থানগুলির মধ্যে ভ্রমণের সময় অন্তর্ভুক্ত করুন
• ব্যবহারিক নোট যোগ করুন (খরচ, সময়, টিপস)
• খাবার বিরতি এবং বিশ্রামের সময় বিবেচনা করুন`
    };
    
    return prompts[language] || prompts['en'];
  }

  resetChat(): void {
    this.initializeChatbot();
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();