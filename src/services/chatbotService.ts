import { geminiService, StructuredResponse } from './geminiService';
import { locationService, LocationPlace } from './locationService';

export interface ChatbotResponse {
  text?: string;
  structured?: StructuredResponse;
  places?: LocationPlace[];
  directionsUrl?: string;
}

export class ChatbotService {
  private locationKeywords = {
    'petrol': ['petrol', 'fuel', 'gas station', 'petrol pump', 'fuel station'],
    'atm': ['atm', 'cash', 'money', 'bank', 'withdraw'],
    'restaurant': ['restaurant', 'food', 'eat', 'dining', 'cafe', 'meal', 'hungry'],
    'hospital': ['hospital', 'doctor', 'medical', 'emergency', 'clinic', 'health'],
    'pharmacy': ['pharmacy', 'medicine', 'medical store', 'chemist', 'drugs'],
    'tourist': ['tourist', 'attraction', 'sightseeing', 'monument', 'museum', 'temple', 'fort']
  };

  private directionKeywords = ['direction', 'directions', 'route', 'how to reach', 'way to', 'navigate'];

  async sendMessage(message: string, language: string = 'en'): Promise<ChatbotResponse> {
    try {
      // Check if message is asking for nearby places
      const placeType = this.detectPlaceType(message);
      if (placeType) {
        return await this.handleLocationQuery(placeType, message, language);
      }

      // Check if message is asking for directions
      if (this.isDirectionQuery(message)) {
        return await this.handleDirectionQuery(message, language);
      }

      // Regular chat message - use geminiService
      const response = await geminiService.sendMessage(message, language);
      
      if (typeof response === 'string') {
        return { text: response };
      } else {
        return { structured: response };
      }
    } catch (error) {
      console.error('Error in chatbot service:', error);
      
      const fallbackResponses: { [key: string]: string } = {
        'en': 'I apologize, but I\'m having trouble processing your request right now. Please try again.',
        'hi': 'क्षमा करें, अभी आपके अनुरोध को संसाधित करने में समस्या हो रही है। कृपया पुनः प्रयास करें।',
        'bn': 'দুঃখিত, এই মুহূর্তে আপনার অনুরোধ প্রক্রিয়া করতে সমস্যা হচ্ছে। আবার চেষ্টা করুন।',
        'sa': 'क्षम्यताम्, अधुना भवतः निवेदनं संसाधयितुं कष्टं भवति।',
        'ja': '申し訳ございませんが、リクエストの処理に問題があります。もう一度お試しください。',
        'fr': 'Désolé, j\'ai des difficultés à traiter votre demande. Réessayez.',
        'de': 'Entschuldigung, Probleme bei der Verarbeitung Ihrer Anfrage. Versuchen Sie es erneut.',
        'es': 'Lo siento, tengo problemas para procesar su solicitud. Inténtelo de nuevo.'
      };
      
      return { text: fallbackResponses[language] || fallbackResponses['en'] };
    }
  }

  private detectPlaceType(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    for (const [type, keywords] of Object.entries(this.locationKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return type;
      }
    }
    
    return null;
  }

  private isDirectionQuery(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return this.directionKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  private async handleLocationQuery(placeType: string, message: string, language: string): Promise<ChatbotResponse> {
    try {
      // Try to get user location
      let userLocation;
      try {
        userLocation = await locationService.getCurrentLocation();
      } catch (error) {
        // Use cached location or default
        userLocation = locationService.getUserLocation();
      }

      // Find nearby places
      const places = await locationService.findNearbyPlaces(
        placeType, 
        userLocation?.lat, 
        userLocation?.lon
      );

      if (places.length === 0) {
        const noResultsResponses: { [key: string]: string } = {
          'en': `Sorry, I couldn't find any ${placeType}s nearby. Please try a different location or search term.`,
          'hi': `क्षमा करें, मुझे आस-पास कोई ${placeType} नहीं मिला। कृपया अलग स्थान या खोज शब्द आज़माएं।`,
          'bn': `দুঃখিত, আশেপাশে কোনো ${placeType} খুঁজে পাইনি। অন্য স্থান বা অনুসন্ধান শব্দ চেষ্টা করুন।`,
          'sa': `क्षम्यताम्, समीपे कोऽपि ${placeType} न प्राप्तः।`,
          'ja': `申し訳ございませんが、近くに${placeType}が見つかりませんでした。`,
          'fr': `Désolé, aucun ${placeType} trouvé à proximité.`,
          'de': `Entschuldigung, keine ${placeType} in der Nähe gefunden.`,
          'es': `Lo siento, no encontré ${placeType}s cercanos.`
        };
        
        return { text: noResultsResponses[language] || noResultsResponses['en'] };
      }

      // Format response
      const structured = locationService.formatPlacesResponse(places, placeType);
      
      return {
        structured,
        places
      };
    } catch (error) {
      console.error('Error handling location query:', error);
      
      const errorResponses: { [key: string]: string } = {
        'en': 'I\'m having trouble accessing location services. Please check your location permissions and try again.',
        'hi': 'मुझे स्थान सेवाओं तक पहुंचने में समस्या हो रही है। कृपया अपनी स्थान अनुमतियां जांचें और पुनः प्रयास करें।',
        'bn': 'অবস্থান সেবা অ্যাক্সেস করতে সমস্যা হচ্ছে। আপনার অবস্থান অনুমতি পরীক্ষা করুন।',
        'sa': 'स्थानसेवासु प्रवेशे कष्टं भवति।',
        'ja': '位置情報サービスへのアクセスに問題があります。',
        'fr': 'Problème d\'accès aux services de localisation.',
        'de': 'Problem beim Zugriff auf Standortdienste.',
        'es': 'Problema accediendo a servicios de ubicación.'
      };
      
      return { text: errorResponses[language] || errorResponses['en'] };
    }
  }

  private async handleDirectionQuery(message: string, language: string): Promise<ChatbotResponse> {
    try {
      // For now, provide a general directions response
      // In a real implementation, you would parse the destination from the message
      const directionsResponses: { [key: string]: string } = {
        'en': 'To get directions, please specify your destination. I can help you find routes to nearby places like restaurants, ATMs, petrol pumps, and tourist attractions.',
        'hi': 'दिशा-निर्देश प्राप्त करने के लिए, कृपया अपना गंतव्य निर्दिष्ट करें। मैं आपको रेस्तरां, एटीएम, पेट्रोल पंप और पर्यटन स्थलों के रूट खोजने में मदद कर सकता हूं।',
        'bn': 'দিকনির্দেশনা পেতে, অনুগ্রহ করে আপনার গন্তব্য নির্দিষ্ট করুন। আমি রেস্তোরাঁ, এটিএম, পেট্রোল পাম্প এবং পর্যটন স্থানের রুট খুঁজতে সাহায্য করতে পারি।',
        'sa': 'दिशानिर्देशार्थं कृपया गन्तव्यं निर्दिशत।',
        'ja': '道順を取得するには、目的地を指定してください。',
        'fr': 'Pour obtenir des directions, veuillez spécifier votre destination.',
        'de': 'Für Wegbeschreibungen geben Sie bitte Ihr Ziel an.',
        'es': 'Para obtener direcciones, especifique su destino.'
      };
      
      return { text: directionsResponses[language] || directionsResponses['en'] };
    } catch (error) {
      console.error('Error handling direction query:', error);
      return { text: 'Sorry, I couldn\'t process your directions request.' };
    }
  }

  // Get directions URL for a specific place
  getDirectionsUrl(place: LocationPlace): string {
    return locationService.getDirectionsUrl({ lat: place.lat, lon: place.lon });
  }

  // Reset chat history
  resetChat(): void {
    geminiService.resetChat();
  }

  // Get user location
  async getUserLocation() {
    try {
      return await locationService.getCurrentLocation();
    } catch (error) {
      return locationService.getUserLocation();
    }
  }
}

// Export singleton instance
export const chatbotService = new ChatbotService();