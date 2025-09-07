export interface LocationPlace {
  name: string;
  lat: number;
  lon: number;
  distance?: number;
  type: string;
  address?: string;
  rating?: number;
  openNow?: boolean;
}

export interface UserLocation {
  lat: number;
  lon: number;
  accuracy?: number;
}

export class LocationService {
  private userLocation: UserLocation | null = null;

  // Get user's current location
  async getCurrentLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: UserLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          this.userLocation = location;
          resolve(location);
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Calculate distance between two points using Haversine formula
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Generate Google Maps directions URL
  getDirectionsUrl(destination: { lat: number; lon: number }, origin?: { lat: number; lon: number }): string {
    const dest = `${destination.lat},${destination.lon}`;
    
    if (origin) {
      const orig = `${origin.lat},${origin.lon}`;
      return `https://www.google.com/maps/dir/${orig}/${dest}`;
    }
    
    // Use current location as origin if available
    if (this.userLocation) {
      const orig = `${this.userLocation.lat},${this.userLocation.lon}`;
      return `https://www.google.com/maps/dir/${orig}/${dest}`;
    }
    
    // Fallback to destination only
    return `https://www.google.com/maps/search/${dest}`;
  }

  // Mock nearby places data (in a real app, this would use Google Places API)
  async findNearbyPlaces(type: string, userLat?: number, userLon?: number): Promise<LocationPlace[]> {
    const lat = userLat || this.userLocation?.lat || 28.6139; // Default to Delhi
    const lon = userLon || this.userLocation?.lon || 77.2090;

    // Mock data for different place types
    const mockPlaces: { [key: string]: LocationPlace[] } = {
      'petrol': [
        { name: 'Indian Oil Petrol Pump', lat: lat + 0.01, lon: lon + 0.01, type: 'petrol', address: 'Main Road', rating: 4.2, openNow: true },
        { name: 'Bharat Petroleum', lat: lat - 0.015, lon: lon + 0.02, type: 'petrol', address: 'Highway Junction', rating: 4.0, openNow: true },
        { name: 'HP Petrol Station', lat: lat + 0.02, lon: lon - 0.01, type: 'petrol', address: 'City Center', rating: 4.3, openNow: false }
      ],
      'atm': [
        { name: 'SBI ATM', lat: lat + 0.005, lon: lon + 0.008, type: 'atm', address: 'Market Square', rating: 4.1, openNow: true },
        { name: 'HDFC Bank ATM', lat: lat - 0.01, lon: lon + 0.015, type: 'atm', address: 'Shopping Complex', rating: 4.4, openNow: true },
        { name: 'ICICI ATM', lat: lat + 0.018, lon: lon - 0.005, type: 'atm', address: 'Bus Stand', rating: 3.9, openNow: true }
      ],
      'restaurant': [
        { name: 'Spice Garden Restaurant', lat: lat + 0.012, lon: lon + 0.007, type: 'restaurant', address: 'Food Street', rating: 4.5, openNow: true },
        { name: 'Royal Dine', lat: lat - 0.008, lon: lon + 0.012, type: 'restaurant', address: 'Heritage Hotel', rating: 4.6, openNow: true },
        { name: 'Street Food Corner', lat: lat + 0.006, lon: lon - 0.009, type: 'restaurant', address: 'Local Market', rating: 4.2, openNow: false }
      ],
      'hospital': [
        { name: 'City General Hospital', lat: lat + 0.02, lon: lon + 0.015, type: 'hospital', address: 'Medical District', rating: 4.3, openNow: true },
        { name: 'Apollo Clinic', lat: lat - 0.012, lon: lon + 0.008, type: 'hospital', address: 'Health Center', rating: 4.7, openNow: true },
        { name: 'Emergency Care Center', lat: lat + 0.008, lon: lon - 0.018, type: 'hospital', address: 'Main Hospital Road', rating: 4.1, openNow: true }
      ],
      'pharmacy': [
        { name: 'MedPlus Pharmacy', lat: lat + 0.007, lon: lon + 0.011, type: 'pharmacy', address: 'Medical Square', rating: 4.2, openNow: true },
        { name: 'Apollo Pharmacy', lat: lat - 0.009, lon: lon + 0.006, type: 'pharmacy', address: 'Health Plaza', rating: 4.5, openNow: false },
        { name: '24x7 Medical Store', lat: lat + 0.014, lon: lon - 0.007, type: 'pharmacy', address: 'Emergency Lane', rating: 4.0, openNow: true }
      ],
      'tourist': [
        { name: 'Heritage Monument', lat: lat + 0.025, lon: lon + 0.02, type: 'tourist', address: 'Historical District', rating: 4.8, openNow: true },
        { name: 'Local Museum', lat: lat - 0.018, lon: lon + 0.025, type: 'tourist', address: 'Culture Street', rating: 4.4, openNow: true },
        { name: 'Scenic Viewpoint', lat: lat + 0.03, lon: lon - 0.015, type: 'tourist', address: 'Hill Top', rating: 4.6, openNow: true }
      ]
    };

    const places = mockPlaces[type.toLowerCase()] || [];
    
    // Calculate distances and sort by proximity
    return places.map(place => ({
      ...place,
      distance: this.calculateDistance(lat, lon, place.lat, place.lon)
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  // Format places for chatbot response
  formatPlacesResponse(places: LocationPlace[], type: string): any {
    const typeNames: { [key: string]: string } = {
      'petrol': 'Petrol Pumps',
      'atm': 'ATMs',
      'restaurant': 'Restaurants',
      'hospital': 'Hospitals',
      'pharmacy': 'Pharmacies',
      'tourist': 'Tourist Attractions'
    };

    return {
      title: `Nearby ${typeNames[type] || 'Places'}`,
      items: places.slice(0, 5).map(place => ({
        text: `**${place.name}** - ${place.distance?.toFixed(1)}km away${place.rating ? ` • ⭐ ${place.rating}` : ''}${place.openNow !== undefined ? (place.openNow ? ' • 🟢 Open' : ' • 🔴 Closed') : ''}`,
        name: place.name,
        lat: place.lat,
        lon: place.lon
      }))
    };
  }

  // Get cached user location
  getUserLocation(): UserLocation | null {
    return this.userLocation;
  }

  // Set user location manually
  setUserLocation(location: UserLocation): void {
    this.userLocation = location;
  }
}

// Export singleton instance
export const locationService = new LocationService();