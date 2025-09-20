import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface DirectionsMapProps {
  destination: {
    lat: number;
    lng: number;
    name: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDuQKRddXVyEs3lzMj4wSFmZz_B1Vt7qwA';

const MapComponent: React.FC<{
  destination: { lat: number; lng: number; name: string };
  userLocation: { lat: number; lng: number } | null;
  onGetUserLocation: () => void;
}> = ({ destination, userLocation, onGetUserLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    // Use user location if available, otherwise center on destination
    const center = userLocation || destination;

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      zoom: userLocation ? 13 : 15,
      center: center,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    mapInstanceRef.current = map;

    // Add destination marker
    new google.maps.Marker({
      position: destination,
      map: map,
      title: destination.name,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      }
    });

    // Initialize directions service and renderer only if we have user location
    if (userLocation) {
      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        draggable: false,
        panel: document.getElementById('directions-panel') as HTMLElement,
      });

      directionsRendererRef.current.setMap(map);

      // Calculate and display route
      calculateRoute();
    }
  }, [userLocation, destination]);

  const calculateRoute = useCallback(() => {
    if (!directionsServiceRef.current || !directionsRendererRef.current || !userLocation) {
      return;
    }

    const request: google.maps.DirectionsRequest = {
      origin: userLocation,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRendererRef.current?.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }, [userLocation, destination]);

  useEffect(() => {
    if (window.google) {
      initializeMap();
    }
  }, [initializeMap]);

  return (
    <div className="flex h-full">
      <div ref={mapRef} className="flex-1 h-full" />
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {userLocation ? 'Directions' : 'Destination'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {userLocation 
                ? `From your location to ${destination.name}`
                : `Location: ${destination.name}`
              }
            </p>
          </div>
          <div id="directions-panel" className="p-4">
            {!userLocation && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Enable location access to get turn-by-turn directions</p>
                <button
                   onClick={onGetUserLocation}
                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                 >
                  Get My Location
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

const DirectionsMap: React.FC<DirectionsMapProps> = ({ destination, isOpen, onClose }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getUserLocation = useCallback(() => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
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
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }, []);

  useEffect(() => {
    if (isOpen && !userLocation && !locationError) {
      getUserLocation();
    }
  }, [isOpen, userLocation, locationError, getUserLocation]);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold">Error loading Google Maps</p>
              <p className="mt-2">Please check your internet connection and try again.</p>
            </div>
          </div>
        );
      case Status.SUCCESS:
        return (
          <MapComponent 
            destination={destination} 
            userLocation={userLocation}
            onGetUserLocation={getUserLocation}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Directions to {destination.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} />
        </div>
      </div>
    </div>
  );
};

export default DirectionsMap;