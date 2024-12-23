// Feature flags to control access to different features
export const FEATURE_FLAGS = {
  PROJECTS: false,
  SYNERGIES: false,
  CHAT: true,
  // Add other feature flags as needed
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (featureName) => {
  return FEATURE_FLAGS[featureName] ?? false;
}; 