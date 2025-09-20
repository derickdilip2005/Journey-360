import React from 'react';
import { getVRUrl } from '../../data/vrUrls';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface VREmbedProps {
  locationName: string;
  embedUrl?: string;
  onExit?: () => void;
}

const VREmbed: React.FC<VREmbedProps> = ({ locationName, embedUrl, onExit }) => {
  // Get the VR URL for this location from centralized data or use provided embedUrl
  const vrUrl = embedUrl || getVRUrl(locationName);

  if (!vrUrl) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-yellow-500 text-6xl mb-4">🏗️</div>
          <h2 className="text-2xl font-bold mb-2">VR Experience Coming Soon</h2>
          <p className="text-gray-300 mb-4">
            360° VR view for {locationName} is being prepared.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            We're working on bringing you immersive virtual reality experiences for all locations.
          </p>
          {onExit && (
            <Button
              onClick={onExit}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Exit button overlay for VREmbed component */}
      {onExit && (
        <div className="absolute top-4 right-4 z-50">
          <Button
            onClick={onExit}
            variant="destructive"
            size="sm"
            className="bg-red-600/90 hover:bg-red-700 text-white shadow-lg backdrop-blur-sm"
          >
            <X className="w-4 h-4 mr-1" />
            Exit
          </Button>
        </div>
      )}

      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          🥽 VR Experience: {locationName}
        </h2>
        <p className="text-gray-300 text-sm">
          Use mouse to look around • Drag to rotate • Scroll to zoom
        </p>
      </div>
      
      <div className="relative w-full" style={{ height: 'calc(100vh - 120px)' }}>
        <iframe
          src={vrUrl}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`VR Experience - ${locationName}`}
          className="shadow-lg"
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          💡 Tip: For the best VR experience, use fullscreen mode and compatible VR headsets
        </p>
      </div>
    </div>
  );
};

export default VREmbed;