import React from 'react';
import { useSearchParams } from 'react-router-dom';
import StreetViewVR from '../../components/vr/StreetViewVR';

const VRViewerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Get parameters from URL
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const locationName = searchParams.get('name') || 'Unknown Location';
  
  // Use the environment variable for API key
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDuQKRddXVyEs3lzMj4wSFmZz_B1Vt7qwA';

  // Validate coordinates
  if (!lat || !lng || lat === 0 || lng === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Invalid Location</h2>
          <p className="text-gray-300 mb-4">
            Unable to load VR experience. Invalid coordinates provided.
          </p>
          <button
            onClick={() => window.close()}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <StreetViewVR
        location={{ lat, lng }}
        locationName={locationName}
        apiKey={apiKey}
      />
    </div>
  );
};

export default VRViewerPage;