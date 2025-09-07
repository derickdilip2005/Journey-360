import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyDlvKL0E_hKzuoePiHgpvtI5HLCh8mBrMo';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

if (!API_KEY) {
  throw new Error('REACT_APP_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: number;
  lat: number;
  lon: number;
}

export interface LocationResponse {
  places: NearbyPlace[];
  message: string;
}

export class EnhancedChatbotService {
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
- Location-based recommendations
- Nearby places and attractions

Always be friendly, informative, and focus on India tourism. Provide practical, actionable advice. If asked about topics outside of travel and tourism, politely redirect the conversation back to travel-related topics.` }]
      }
    ];
  }

  // Utility function for API calls with retry logic
  private async fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return response;
        throw new Error(`HTTP ${response.status}`);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    throw new Error('Max retries exceeded');
  }

  // Calculate distance between two coordinates
  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Fetch nearby places using Overpass API
  private async fetchNearbyPlaces(
    lat: number, 
    lon: number, 
    radius: number = 5000, 
    placeType: string = 'tourism',
    foodPreference?: string
  ): Promise<NearbyPlace[]> {
    try {
      let query = '';
      
      switch (placeType) {
        case 'tourist_spots':
          query = `
            [out:json][timeout:25];
            (
              node["tourism"~"^(attraction|museum|monument|viewpoint|gallery|zoo|theme_park)$"](around:${radius},${lat},${lon});
              way["tourism"~"^(attraction|museum|monument|viewpoint|gallery|zoo|theme_park)$"](around:${radius},${lat},${lon});
              relation["tourism"~"^(attraction|museum|monument|viewpoint|gallery|zoo|theme_park)$"](around:${radius},${lat},${lon});
            );
            out center meta;
          `;
          break;
        case 'hotels':
          query = `
            [out:json][timeout:25];
            (
              node["tourism"~"^(hotel|guest_house|hostel|motel)$"](around:${radius},${lat},${lon});
              way["tourism"~"^(hotel|guest_house|hostel|motel)$"](around:${radius},${lat},${lon});
            );
            out center meta;
          `;
          break;
        case 'restaurants':
          const cuisineFilter = foodPreference === 'vegetarian' ? '["diet:vegetarian"="yes"]' : '';
          query = `
            [out:json][timeout:25];
            (
              node["amenity"="restaurant"]${cuisineFilter}(around:${radius},${lat},${lon});
              node["amenity"="cafe"]${cuisineFilter}(around:${radius},${lat},${lon});
              node["amenity"="fast_food"]${cuisineFilter}(around:${radius},${lat},${lon});
            );
            out center meta;
          `;
          break;
        case 'transport':
          query = `
            [out:json][timeout:25];
            (
              node["amenity"~"^(bus_station|taxi)$"](around:${radius},${lat},${lon});
              node["railway"="station"](around:${radius},${lat},${lon});
              node["aeroway"="aerodrome"](around:${radius},${lat},${lon});
            );
            out center meta;
          `;
          break;
        case 'medical':
          query = `
            [out:json][timeout:25];
            (
              node["amenity"~"^(hospital|clinic|pharmacy|doctors)$"](around:${radius},${lat},${lon});
            );
            out center meta;
          `;
          break;
        default:
          query = `
            [out:json][timeout:25];
            (
              node["tourism"](around:${radius},${lat},${lon});
              node["amenity"~"^(restaurant|cafe|hospital)$"](around:${radius},${lat},${lon});
            );
            out center meta;
          `;
      }

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }

      const data = await response.json();
      const places: NearbyPlace[] = [];

      data.elements.forEach((element: any) => {
        const elementLat = element.lat || element.center?.lat;
        const elementLon = element.lon || element.center?.lon;
        
        if (elementLat && elementLon && element.tags?.name) {
          const distance = this.getDistance(lat, lon, elementLat, elementLon);
          places.push({
            name: element.tags.name,
            type: element.tags.tourism || element.tags.amenity || 'place',
            distance: Math.round(distance * 100) / 100,
            lat: elementLat,
            lon: elementLon
          });
        }
      });

      // Sort by distance and limit to 10 results
      return places.sort((a, b) => a.distance - b.distance).slice(0, 10);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      return [];
    }
  }

  // Handle location-based requests
  async handleLocationRequest(message: string, lat: number, lon: number): Promise<LocationResponse> {
    try {
      let placeType = 'tourism';
      let foodPreference: string | undefined;
      
      // Determine what type of places to search for
      if (message.toLowerCase().includes('tourist') || message.toLowerCase().includes('attraction')) {
        placeType = 'tourist_spots';
      } else if (message.toLowerCase().includes('hotel') || message.toLowerCase().includes('accommodation')) {
        placeType = 'hotels';
      } else if (message.toLowerCase().includes('restaurant') || message.toLowerCase().includes('food') || message.toLowerCase().includes('eat')) {
        placeType = 'restaurants';
        if (message.toLowerCase().includes('vegetarian') || message.toLowerCase().includes('veg')) {
          foodPreference = 'vegetarian';
        }
      } else if (message.toLowerCase().includes('transport') || message.toLowerCase().includes('bus') || message.toLowerCase().includes('train')) {
        placeType = 'transport';
      } else if (message.toLowerCase().includes('hospital') || message.toLowerCase().includes('medical') || message.toLowerCase().includes('pharmacy')) {
        placeType = 'medical';
      }

      const places = await this.fetchNearbyPlaces(lat, lon, 5000, placeType, foodPreference);
      
      let responseMessage = '';
      if (places.length > 0) {
        responseMessage = `I found ${places.length} ${placeType.replace('_', ' ')} near your location:\n\n`;
        places.forEach((place, index) => {
          responseMessage += `${index + 1}. **${place.name}** (${place.type})\n   Distance: ${place.distance} km\n\n`;
        });
      } else {
        responseMessage = `I couldn't find any ${placeType.replace('_', ' ')} near your current location. You might want to try expanding your search radius or looking for different types of places.`;
      }

      return {
        places,
        message: responseMessage
      };
    } catch (error) {
      console.error('Error handling location request:', error);
      return {
        places: [],
        message: 'I\'m having trouble finding nearby places right now. Please try again later.'
      };
    }
  }

  // Enhanced send message with location support
  async sendMessage(message: string, language: string = 'en', location?: { lat: number, lon: number }): Promise<string> {
    try {
      // Check if this is a location-based query
      const locationKeywords = ['nearby', 'near me', 'close to me', 'around here', 'in my area'];
      const isLocationQuery = locationKeywords.some(keyword => message.toLowerCase().includes(keyword));
      
      if (isLocationQuery && location) {
        const locationResponse = await this.handleLocationRequest(message, location.lat, location.lon);
        return locationResponse.message;
      }

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
          'es': 'Spanish',
          'ta': 'Tamil',
          'gu': 'Gujarati',
          'kn': 'Kannada',
          'mr': 'Marathi'
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
          maxOutputTokens: 1000,
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
        'es': 'Lo siento, pero tengo problemas para conectarme a mi base de conocimientos en este momento. Por favor, inténtelo de nuevo en un momento.',
        'ta': 'மன்னிக்கவும், தற்போது எனது அறிவுத் தளத்துடன் இணைப்பதில் சிக்கல் உள்ளது। தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.',
        'gu': 'માફ કરશો, પરંતુ હાલમાં મને મારા જ્ઞાન આધાર સાથે જોડાવામાં મુશ્કેલી આવી રહી છે. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
        'kn': 'ಕ್ಷಮಿಸಿ, ಆದರೆ ಇದೀಗ ನನ್ನ ಜ್ಞಾನ ಬೇಸ್‌ಗೆ ಸಂಪರ್ಕಿಸುವಲ್ಲಿ ತೊಂದರೆ ಇದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        'mr': 'माफ करा, पण सध्या मला माझ्या ज्ञान आधाराशी जोडण्यात अडचण येत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.'
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
- Location-based recommendations
- Nearby places and attractions

Always be friendly, informative, and focus on India tourism. Provide practical, actionable advice. If asked about topics outside of travel and tourism, politely redirect the conversation back to travel-related topics.` }]
      }
    ];
  }

  // Get user's current location
  async getCurrentLocation(): Promise<{ lat: number, lon: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser.');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }
}

// Export a singleton instance
export const enhancedChatbotService = new EnhancedChatbotService();