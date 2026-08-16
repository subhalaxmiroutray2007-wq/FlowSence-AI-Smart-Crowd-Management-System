// FlowSense AI - Mobile Haptic Feedback Service

const HapticsService = {
  isSupported: () => typeof window !== 'undefined' && 'vibrate' in navigator,

  // Light haptic tap for tab navigation buttons
  lightTap: () => {
    if (HapticsService.isSupported()) {
      try {
        navigator.vibrate(12);
      } catch (e) {}
    }
  },

  // Medium haptic click for action buttons
  mediumTap: () => {
    if (HapticsService.isSupported()) {
      try {
        navigator.vibrate(25);
      } catch (e) {}
    }
  },

  // Success double-tap vibration for ticket pass booking / scanner grant
  success: () => {
    if (HapticsService.isSupported()) {
      try {
        navigator.vibrate([35, 60, 45]);
      } catch (e) {}
    }
  },

  // Warning pulse pattern for safety alert or crowd surge warning
  warning: () => {
    if (HapticsService.isSupported()) {
      try {
        navigator.vibrate([60, 100, 60, 100, 80]);
      } catch (e) {}
    }
  },

  // Error pattern
  error: () => {
    if (HapticsService.isSupported()) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch (e) {}
    }
  }
};

window.HapticsService = HapticsService;
