import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface StreetViewVRProps {
  location: {
    lat: number;
    lng: number;
  };
  locationName: string;
  apiKey: string;
}

const StreetViewVR: React.FC<StreetViewVRProps> = ({ location, locationName, apiKey }) => {
  const streetViewRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [panorama, setPanorama] = useState<google.maps.StreetViewPanorama | null>(null);

  useEffect(() => {
    const initializeStreetView = async () => {
      try {
        console.log('Initializing Street View with:', { location, apiKey: apiKey ? 'Present' : 'Missing' });
        
        // Wait for the DOM element to be available
        if (!streetViewRef.current) {
          console.log('Waiting for Street View container...');
          setTimeout(initializeStreetView, 100);
          return;
        }

        console.log('Street View container found, proceeding with initialization');
        
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: []
        });

        console.log('Loading Google Maps API...');
        await loader.load();
        console.log('Google Maps API loaded successfully');

        console.log('Creating Street View Service...');
        const streetViewService = new google.maps.StreetViewService();
        
        // Check if Street View data is available for this location
        console.log('Requesting panorama for location:', location);
        streetViewService.getPanorama({
          location: location,
          radius: 500, // Increased radius significantly to find nearby Street View data
          source: google.maps.StreetViewSource.OUTDOOR
        }, (data, status) => {
          console.log('Street View Service response:', { status, data });
          
          if (status === google.maps.StreetViewStatus.OK && data && streetViewRef.current) {
            console.log('Street View data found, creating panorama...');
            
            // Create the Street View panorama
            const panoramaOptions: google.maps.StreetViewPanoramaOptions = {
              position: data.location?.latLng,
              pov: {
                heading: 0,
                pitch: 0
              },
              zoom: 1,
              // VR-friendly options
              fullscreenControl: true,
              panControl: true,
              zoomControl: true,
              addressControl: false,
              linksControl: true,
              enableCloseButton: false,
              showRoadLabels: false
            };

            try {
              const pano = new google.maps.StreetViewPanorama(
                streetViewRef.current,
                panoramaOptions
              );

              // Add event listener to know when panorama is ready
              pano.addListener('status_changed', () => {
                console.log('Panorama status changed:', pano.getStatus());
                if (pano.getStatus() === google.maps.StreetViewStatus.OK) {
                  console.log('Panorama loaded successfully');
                  setPanorama(pano);
                  setIsLoading(false);
                }
              });

              // Also listen for the first image load
              pano.addListener('pano_changed', () => {
                console.log('Panorama changed, setting as loaded');
                setPanorama(pano);
                setIsLoading(false);
              });

            } catch (panoError) {
              console.error('Error creating panorama:', panoError);
              setError('Failed to create Street View panorama');
              setIsLoading(false);
            }

          } else {
            console.error('Street View not available:', status);
            let errorMessage = 'Street View imagery may not be available for this specific location.';
            
            switch (status) {
              case google.maps.StreetViewStatus.ZERO_RESULTS:
                errorMessage = 'No Street View imagery found within 500m of this location.';
                break;
              case google.maps.StreetViewStatus.UNKNOWN_ERROR:
                errorMessage = 'Unknown error occurred while loading Street View.';
                break;
              default:
                errorMessage = `Street View unavailable. Status: ${status}`;
            }
            
            setError(errorMessage);
            setIsLoading(false);
          }
        });

      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError(`Failed to load Street View: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.error('Street View loading timeout');
        setError('Street View loading timeout. Please try again.');
        setIsLoading(false);
      }
    }, 20000); // 20 second timeout

    // Small delay to ensure component is mounted
    const initTimeout = setTimeout(initializeStreetView, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initTimeout);
    };
  }, [location, apiKey]);

  const enterFullscreen = () => {
    if (streetViewRef.current) {
      if (streetViewRef.current.requestFullscreen) {
        streetViewRef.current.requestFullscreen();
      }
    }
  };

  const toggleVRMode = () => {
    if (panorama) {
      // Enable motion tracking for VR-like experience
      panorama.setMotionTracking(true);
      enterFullscreen();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Loading VR Experience</h2>
          <p className="text-gray-300">Preparing 360° view of {locationName}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold mb-4">VR Experience Unavailable</h2>
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-gray-300 mb-2">{error}</p>
          </div>
          <div className="text-sm text-gray-400 space-y-2">
            <p>This could happen because:</p>
            <ul className="list-disc list-inside text-left space-y-1">
              <li>Street View imagery is not available for this location</li>
              <li>The location is in a restricted area</li>
              <li>Network connectivity issues</li>
            </ul>
          </div>
          <button
            onClick={() => window.close()}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Close VR Viewer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h1 className="text-2xl font-bold">{locationName}</h1>
            <p className="text-sm text-gray-300">360° Virtual Reality Experience</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleVRMode}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">🥽</span>
              VR Mode
            </button>
            <button
              onClick={enterFullscreen}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">⛶</span>
              Fullscreen
            </button>
            <button
              onClick={() => window.close()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">✕</span>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Street View Container */}
      <div 
        ref={streetViewRef} 
        className="w-full h-full"
        style={{ minHeight: '100vh' }}
      />

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="text-white text-center">
          <p className="text-sm text-gray-300 mb-2">
            Use mouse or touch to look around • Click and drag to navigate • Use VR Mode for immersive experience
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>🖱️ Mouse: Look around</span>
            <span>📱 Touch: Swipe to explore</span>
            <span>🥽 VR: Motion tracking enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetViewVR;