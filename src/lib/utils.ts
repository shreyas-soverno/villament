import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Webhook Configuration
export const WEBHOOK_CONFIG = {
  WEBHOOK_URL: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '',

  // Form configuration
  FORM_CONFIG: {
    // Set to true to enable webhook integration
    ENABLED: process.env.NEXT_PUBLIC_WEBHOOK_ENABLED === 'true',
    
    // Method for webhook requests (usually POST for Fillout)
    METHOD: 'POST' as const,
    
    // Headers for webhook requests
    HEADERS: {
      'Content-Type': 'application/json',
    },
  },
} as const;

// Calendly Configuration
export const CALENDLY_CONFIG = {
  // Your Calendly scheduling URL
  // Example: 'https://calendly.com/your-username/site-visit'
  SCHEDULING_URL: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-team/site-visit',
  
  // Configuration for embedded scheduling
  EMBED_CONFIG: {
    // Set to true to use embedded Calendly widget
    USE_EMBED: process.env.NEXT_PUBLIC_CALENDLY_EMBED === 'true',
    
    // Popup configuration
    POPUP_CONFIG: {
      utm: {
        utmCampaign: 'Site Visit',
        utmSource: 'Villament Website',
        utmMedium: 'website'
      },
      prefill: {
        name: '',
        email: '',
        customAnswers: {
          a1: '', // Interest in floor plan
          a2: '', // Preferred visit time
        }
      }
    },
  },
} as const;

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for scroll-triggered animations
export function useScrollAnimation() {
  const elementRef = useRef<HTMLElement>(null)

  const animateOnScroll = (
    selector: string | Element,
    animation: gsap.TweenVars,
    trigger?: ScrollTrigger.Vars
  ) => {
    if (typeof window === "undefined") return

    gsap.fromTo(
      selector,
      { opacity: 0, y: 50, ...animation.from },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        ...animation.to,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none",
          ...trigger,
        },
      }
    )
  }

  const staggerAnimation = (
    selector: string,
    animation?: { from?: gsap.TweenVars; to?: gsap.TweenVars & { stagger?: number } },
    trigger?: ScrollTrigger.Vars
  ) => {
    if (typeof window === "undefined") return

    const fromVars = {
      opacity: 0,
      y: 30,
      scale: 0.95,
      ...animation?.from,
    };

    // Extract stagger from to vars and keep it separate
    const { stagger = 0.1, ...toAnimation } = animation?.to || {};

    // Set initial values first
    gsap.set(selector, fromVars);

    // Then animate to final values with stagger
    gsap.to(selector, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: stagger,
      ...toAnimation,
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
        ...trigger,
      },
    });
  }

  const fadeInUp = (selector: string, delay = 0) => {
    if (typeof window === "undefined") return

    gsap.fromTo(
      selector,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    )
  }

  const scaleIn = (selector: string, delay = 0) => {
    if (typeof window === "undefined") return

    gsap.fromTo(
      selector,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    )
  }

  // Special animation for hero section that accounts for loader timing
  const heroAnimation = (
    selector: string, 
    animation: gsap.TweenVars,
    loaderDelay = 2.3 // Default loader delay + buffer
  ) => {
    if (typeof window === "undefined") return

    const { from = {}, to = {}, ...options } = animation;
    
    gsap.fromTo(
      selector,
      { opacity: 0, y: 50, ...from },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: loaderDelay,
        ...to,
        ...options,
      }
    )
  }

  return {
    elementRef,
    animateOnScroll,
    staggerAnimation,
    fadeInUp,
    scaleIn,
    heroAnimation,
  }
}

// Calendly Integration Utilities
export interface CalendlyOptions {
  name?: string;
  email?: string;
  floorPlan?: string;
  preferredTime?: string;
  message?: string;
}

interface CalendlyPrefillData {
  name?: string;
  email?: string;
  customAnswers?: Record<string, string>;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        utm?: Record<string, string>;
        prefill?: CalendlyPrefillData;
      }) => void;
      closePopupWidget: () => void;
    };
  }
}

// Load Calendly script dynamically
export const loadCalendlyScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not available'));
      return;
    }

    // Check if script is already loaded
    if (window.Calendly) {
      resolve();
      return;
    }

    // Check if script tag already exists
    if (document.querySelector('script[src*="calendly.com"]')) {
      // Wait for script to load
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          resolve();
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkCalendly);
        reject(new Error('Calendly script failed to load'));
      }, 10000);
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      // Wait for Calendly to be available
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          resolve();
        }
      }, 100);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkCalendly);
        reject(new Error('Calendly failed to initialize'));
      }, 5000);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Calendly script'));
    };

    document.head.appendChild(script);
  });
};

// Open Calendly scheduling popup
export const openCalendlyScheduling = async (options: CalendlyOptions = {}): Promise<void> => {
  try {
    await loadCalendlyScript();
    
    if (!window.Calendly) {
      throw new Error('Calendly is not available');
    }

    const { name, email, floorPlan, preferredTime, message } = options;
    
    // Prepare prefill data
    const prefillData: CalendlyPrefillData = {};
    
    if (name) prefillData.name = name;
    if (email) prefillData.email = email;
    
    // Custom answers for additional fields
    const customAnswers: Record<string, string> = {};
    if (floorPlan) customAnswers.a1 = `Interested in: ${floorPlan}`;
    if (preferredTime) customAnswers.a2 = `Preferred time: ${preferredTime}`;
    if (message) customAnswers.a3 = `Additional message: ${message}`;
    
    if (Object.keys(customAnswers).length > 0) {
      prefillData.customAnswers = customAnswers;
    }

    // Open Calendly popup widget
    window.Calendly.initPopupWidget({
      url: CALENDLY_CONFIG.SCHEDULING_URL,
      utm: CALENDLY_CONFIG.EMBED_CONFIG.POPUP_CONFIG.utm,
      prefill: prefillData,
    });
    
  } catch (error) {
    console.error('Failed to open Calendly scheduling:', error);
    
    // Fallback: Open Calendly in new tab with URL parameters
    const urlParams = new URLSearchParams();
    if (options.name) urlParams.set('name', options.name);
    if (options.email) urlParams.set('email', options.email);
    
    const fallbackUrl = `${CALENDLY_CONFIG.SCHEDULING_URL}?${urlParams.toString()}`;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  }
};

// Quick site visit scheduling function
export const scheduleSiteVisit = (options: CalendlyOptions = {}) => {
  // Add default context for site visits
  const siteVisitOptions: CalendlyOptions = {
    ...options,
    message: options.message 
      ? `${options.message} (Scheduled via Villament website)`
      : 'Site visit request from Villament website',
  };
  
  return openCalendlyScheduling(siteVisitOptions);
};

// React hook for Calendly integration
export const useCalendlyScheduling = () => {
  const scheduleVisit = useCallback((options: CalendlyOptions = {}) => {
    return scheduleSiteVisit(options);
  }, []);

  const scheduleWithFloorPlan = useCallback((floorPlan: string, additionalOptions: Partial<CalendlyOptions> = {}) => {
    return scheduleSiteVisit({
      floorPlan,
      message: `Site visit request for ${floorPlan} from Villament website`,
      ...additionalOptions,
    });
  }, []);

  const scheduleFromContact = useCallback((formData: {
    name?: string;
    email?: string;
    message?: string;
    selectedPlan?: string;
  }) => {
    return scheduleSiteVisit({
      name: formData.name,
      email: formData.email,
      floorPlan: formData.selectedPlan,
      message: formData.message || 'Site visit request from Villament contact form',
    });
  }, []);

  return {
    scheduleVisit,
    scheduleWithFloorPlan,
    scheduleFromContact,
  };
};

// Maps and Directions Utilities
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface DirectionsOptions {
  destination: string;
  coordinates?: LocationCoordinates;
  label?: string;
}

// The Villament location details
export const VILLAMENT_LOCATION = {
  name: 'The Villament',
  address: '100m off Pune-Bangalore Highway, Dharwad, Karnataka',
  coordinates: {
    // These are approximate coordinates for Dharwad area
    // You should replace these with exact coordinates
    latitude: 15.4589,
    longitude: 75.0078,
  },
  googleMapsUrl: 'https://maps.app.goo.gl/fXaBDJwkZZVHG9to7?g_st=aw',
} as const;

// Detect user's device/platform
export const detectPlatform = () => {
  if (typeof window === 'undefined') return 'web';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';
  
  // iOS detection (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(userAgent) || (platform.includes('mac') && 'ontouchend' in document)) {
    return 'ios';
  }
  
  // Android detection
  if (/android/.test(userAgent)) {
    return 'android';
  }
  
  // macOS detection
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'macos';
  }
  
  // Windows detection
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }
  
  return 'web';
};

// Open appropriate maps application based on device
export const openMapsDirections = (options: DirectionsOptions = {
  destination: VILLAMENT_LOCATION.address,
  coordinates: VILLAMENT_LOCATION.coordinates,
  label: VILLAMENT_LOCATION.name,
}) => {
  const platform = detectPlatform();
  const { destination, coordinates, label } = options;
  
  try {
    switch (platform) {
      case 'ios': {
        // iOS: Try Apple Maps first, fallback to Google Maps
        const appleMapsiOS = coordinates
          ? `http://maps.apple.com/?q=${encodeURIComponent(label || destination)}&ll=${coordinates.latitude},${coordinates.longitude}&dirflg=d`
          : `http://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=d`;
        
        // Try Apple Maps
        window.location.href = appleMapsiOS;
        
        // Fallback to Google Maps after a short delay if Apple Maps fails
        setTimeout(() => {
          const googleMapsiOS = coordinates
            ? `https://maps.google.com/maps?daddr=${coordinates.latitude},${coordinates.longitude}&dirflg=d`
            : `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=d`;
          window.open(googleMapsiOS, '_blank', 'noopener,noreferrer');
        }, 1500);
        break;
      }
        
      case 'android': {
        // Android: Try Google Maps app first, fallback to web
        const googleMapsAndroid = coordinates
          ? `google.navigation:q=${coordinates.latitude},${coordinates.longitude}&mode=d`
          : `google.navigation:q=${encodeURIComponent(destination)}&mode=d`;
        
        // Try Google Maps app
        window.location.href = googleMapsAndroid;
        
        // Fallback to web Google Maps after a short delay
        setTimeout(() => {
          const googleMapsWeb = coordinates
            ? `https://maps.google.com/maps?daddr=${coordinates.latitude},${coordinates.longitude}&dirflg=d`
            : `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=d`;
          window.open(googleMapsWeb, '_blank', 'noopener,noreferrer');
        }, 1500);
        break;
      }
        
      case 'macos': {
        // macOS: Try Apple Maps first, fallback to Google Maps
        const appleMapsDesktop = coordinates
          ? `http://maps.apple.com/?q=${encodeURIComponent(label || destination)}&ll=${coordinates.latitude},${coordinates.longitude}&dirflg=d`
          : `http://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=d`;
        
        // Try Apple Maps
        window.location.href = appleMapsDesktop;
        
        // Fallback to Google Maps in new tab after a short delay
        setTimeout(() => {
          const googleMapsDesktop = coordinates
            ? `https://maps.google.com/maps?daddr=${coordinates.latitude},${coordinates.longitude}&dirflg=d`
            : `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=d`;
          window.open(googleMapsDesktop, '_blank', 'noopener,noreferrer');
        }, 1500);
        break;
      }
        
      default: {
        // Windows and other platforms: Open Google Maps in new tab
        // Also use the provided Google Maps URL if available
        if (options === undefined || (options.destination === VILLAMENT_LOCATION.address)) {
          // Use the specific Google Maps URL for Villament
          window.open(VILLAMENT_LOCATION.googleMapsUrl, '_blank', 'noopener,noreferrer');
        } else {
          // Use generic Google Maps URL
          const googleMapsGeneric = coordinates
            ? `https://maps.google.com/maps?daddr=${coordinates.latitude},${coordinates.longitude}&dirflg=d`
            : `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}&dirflg=d`;
          window.open(googleMapsGeneric, '_blank', 'noopener,noreferrer');
        }
        break;
      }
    }
    
    // Analytics tracking (optional)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const windowWithGtag = window as { gtag?: (...args: unknown[]) => void };
      if (typeof windowWithGtag.gtag === 'function') {
        windowWithGtag.gtag('event', 'get_directions', {
          event_category: 'user_interaction',
          event_label: destination,
          platform: platform,
        });
      }
    }
    
  } catch (error) {
    console.error('Failed to open maps directions:', error);
    
    // Ultimate fallback: Open the provided Google Maps URL or generic Google Maps
    const fallbackUrl = (options === undefined || options.destination === VILLAMENT_LOCATION.address)
      ? VILLAMENT_LOCATION.googleMapsUrl
      : `https://maps.google.com/maps?daddr=${encodeURIComponent(destination)}`;
    
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  }
};

// Convenience function specifically for Villament directions
export const getVillamentDirections = () => {
  openMapsDirections();
};

// React hook for maps integration
export const useMapsDirections = () => {
  const openDirections = useCallback((options?: DirectionsOptions) => {
    openMapsDirections(options);
  }, []);

  const getDirectionsToVillament = useCallback(() => {
    getVillamentDirections();
  }, []);

  return {
    openDirections,
    getDirectionsToVillament,
    detectPlatform,
  };
};
