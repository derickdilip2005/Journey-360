import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  destinationName: string;
  destinationCoords: { lat: number; lng: number };
  onClose: () => void;
}

interface RoutePoint {
  lat: number;
  lng: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ destinationName, destinationCoords, onClose }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom icons
  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const destinationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Create a simple straight line route (in a real app, you'd use a routing service)
          const route = createSimpleRoute(userCoords, destinationCoords);
          setRoutePoints(route);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your current location. Please enable location services.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [destinationCoords]);

  // Create a simple route (straight line with some intermediate points)
  const createSimpleRoute = (start: RoutePoint, end: RoutePoint): RoutePoint[] => {
    const points: RoutePoint[] = [];
    const steps = 10; // Number of intermediate points
    
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      const lat = start.lat + (end.lat - start.lat) * ratio;
      const lng = start.lng + (end.lng - start.lng) * ratio;
      points.push({ lat, lng });
    }
    
    return points;
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (point1: RoutePoint, point2: RoutePoint): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLng = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Getting your location...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Location Error</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userLocation) {
    return null;
  }

  // Calculate map bounds to fit both markers
  const bounds: [[number, number], [number, number]] = [
    [Math.min(userLocation.lat, destinationCoords.lat) - 0.01, Math.min(userLocation.lng, destinationCoords.lng) - 0.01],
    [Math.max(userLocation.lat, destinationCoords.lat) + 0.01, Math.max(userLocation.lng, destinationCoords.lng) + 0.01]
  ];

  const distance = calculateDistance(userLocation, destinationCoords);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Directions to {destinationName}</h2>
            <p className="text-sm text-gray-600">Distance: {distance.toFixed(1)} km (approximate)</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            bounds={bounds}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User location marker */}
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <strong>Your Location</strong>
                  <br />
                  <small>{userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</small>
                </div>
              </Popup>
            </Marker>
            
            {/* Destination marker */}
            <Marker position={[destinationCoords.lat, destinationCoords.lng]} icon={destinationIcon}>
              <Popup>
                <div className="text-center">
                  <strong>{destinationName}</strong>
                  <br />
                  <small>{destinationCoords.lat.toFixed(4)}, {destinationCoords.lng.toFixed(4)}</small>
                </div>
              </Popup>
            </Marker>
            
            {/* Route line */}
            {routePoints.length > 0 && (
              <Polyline
                positions={routePoints.map(point => [point.lat, point.lng])}
                color="#3b82f6"
                weight={4}
                opacity={0.7}
              />
            )}
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>• Blue marker: Your current location</p>
              <p>• Red marker: {destinationName}</p>
              <p>• Blue line: Approximate route</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destinationCoords.lat},${destinationCoords.lng}`, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Open in Google Maps
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;