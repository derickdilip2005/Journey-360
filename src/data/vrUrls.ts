// VR 360° Google Maps Embed URLs for tourist locations in Jharkhand
export interface VRLocation {
  name: string;
  embedUrl: string;
  description?: string;
}

export const vrUrls: { [key: string]: string } = {
  'Hundru Falls': 'https://www.google.com/maps/embed?pb=!4v1758386915666!6m8!1m7!1sCAoSHENJQUJJaERLcXIyYWpwOVh3QVB4SGRzNFhtQ1M.!2m2!1d23.44972456183475!2d85.66668677324596!3f32.745426!4f0!5f0.7820865974627469',
  'Betla National Park': 'https://www.google.com/maps/embed?pb=!4v1758386736341!6m8!1m7!1s8s5pt43Fj_KF9OFdPonHrQ!2m2!1d23.88581396203765!2d84.19252386991549!3f223.47702228751098!4f9.491516208527287!5f0.4000000000000002',
  'Ranchi Hill Station': 'https://www.google.com/maps/embed?pb=!4v1758388196023!6m8!1m7!1s3kyklyAMZZXWy1xjCSabLA!2m2!1d23.37683985744811!2d85.31144954911466!3f41.089395881039266!4f3.8216814224025484!5f0.7820865974627469',
  'Dassam Falls': 'https://www.google.com/maps/embed?pb=!4v1758394774358!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2xxNUR5YlE.!2m2!1d23.14625149397734!2d85.46722033848455!3f84.64996473595556!4f-14.346274207636213!5f0.4000000000000002',
  'Jagannath Temple Ranchi': 'https://www.google.com/maps/embed?pb=!4v1758394487607!6m8!1m7!1s_5U7BN9PKGhmmyllTYFpyA!2m2!1d23.31720768839073!2d85.28173410199324!3f169.0023733076746!4f4.133809265658016!5f0.7820865974627469'
};

export const vrLocations: VRLocation[] = [
  {
    name: 'Hundru Falls',
    embedUrl: vrUrls['Hundru Falls'],
    description: 'Experience the breathtaking 360° view of Hundru Falls, one of Jharkhand\'s most spectacular waterfalls. This immersive street view allows you to explore the natural beauty and surrounding landscape.'
  },
  {
    name: 'Betla National Park',
    embedUrl: vrUrls['Betla National Park'],
    description: 'Explore the wilderness of Betla National Park through this immersive 360° view. Discover the rich biodiversity and natural habitat of this renowned wildlife sanctuary in Jharkhand.'
  },
  {
    name: 'Ranchi Hill Station',
    embedUrl: vrUrls['Ranchi Hill Station'],
    description: 'Experience the panoramic view of Ranchi Hill Station from this immersive 360° view. Get a glimpse of the cityscape and the surrounding landscape as you explore this popular hill station in Jharkhand.'
  },
  {
    name: 'Dassam Falls',
    embedUrl: vrUrls['Dassam Falls'],
    description: 'Experience the cascading waterfall of Dassam Falls from this immersive 360° view. Get a glimpse of the natural beauty and surrounding landscape as you explore this popular waterfall in Jharkhand.'
  },
  {
    name: 'Jagannath Temple Ranchi',
    embedUrl: vrUrls['Jagannath Temple Ranchi'],
    description: 'Experience the spiritual journey of Jagannath Temple Ranchi through this immersive 360° view. Get a glimpse of the historical significance and spiritual aura of this sacred temple in Jharkhand.'
  }
];

// Helper function to get VR URL for a location
export const getVRUrl = (locationName: string): string | undefined => {
  return vrUrls[locationName];
};

// Helper function to check if VR is available for a location
export const hasVRExperience = (locationName: string): boolean => {
  return locationName in vrUrls;
};

export default vrUrls;