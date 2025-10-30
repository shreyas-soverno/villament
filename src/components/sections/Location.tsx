"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/lib/utils';

export default function Location() {
  const { elementRef, fadeInUp, staggerAnimation } = useScrollAnimation();
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const nearbyPlaces = [
    { name: 'Airport', distance: '1-2 km', icon: '✈️' },
    { name: 'Schools & Colleges', distance: '1-2 km', icon: '🎓' },
    { name: 'Shopping Centers', distance: '0.5 km', icon: '🛍️' },
    { name: 'Hospitals', distance: '2.5 km', icon: '🏥' },
    { name: 'Movie Theater(Inox)', distance: '0.5 km', icon: '🎬' },
    { name: 'Restaurants & Cafes', distance: '1 km', icon: '🍽️' },
    { name: 'Parks & Recreation', distance: '1.5 km', icon: '🌳' },
    { name: 'Banks & ATMs', distance: '0.5 km', icon: '🏦' },
  ];

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!marqueeElement) return;
      
      if (document.hidden) {
        // Page is out of focus - pause animation to save resources
        marqueeElement.style.animationPlayState = 'paused';
      } else {
        // Page is focused - resume animation
        marqueeElement.style.animationPlayState = 'running';
      }
    };

    // Ensure animation is running initially (in case CSS doesn't start it)
    marqueeElement.style.animationPlayState = 'running';

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate section header
    fadeInUp('.location-header');
    
    // Animate location content
    staggerAnimation('.location-content > *', { 
      from: { opacity: 0, y: 30 },
      to: { duration: 0.8, stagger: 0.2 }
    });
    
    // Animate nearby places with faster stagger and earlier trigger
    staggerAnimation('.location-place', { 
      from: { opacity: 0, x: -20 },
      to: { duration: 0.4, stagger: 0.02 } // Faster duration and much smaller stagger
    }, {
      start: "top 90%", // Trigger earlier when 90% of section is visible
    });
  }, [fadeInUp, staggerAnimation]);

  return (
    <section ref={elementRef} id="location" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="location-header text-center mb-16">
          <div className="inline-block">
            <div className="w-16 h-px bg-gold mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prime <span className="gold-shimmer">Location</span>
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Strategically located in the heart of Dharwad with excellent connectivity 
            and proximity to all essential amenities.
          </p>
        </div>

        <div className="location-content grid md:grid-cols-2 gap-12">
          {/* Static Map Image */}
          <div className="relative h-96 rounded-lg overflow-hidden border-2 border-gold/20 group">
            <Image
              src="/map/extracted-004.jpg"
              alt="The Villament Location Map - Dharwad, Karnataka"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium">The Villament</p>
              <p className="text-xs">Dharwad, Karnataka</p>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Address</h3>
              <div className="flex items-start gap-3 text-gray-600">
                <svg className="w-6 h-6 text-gold shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium">The Villament</p>
                  <p>100m off Pune-Bangalore Highway</p>
                  <p>Dharwad, Karnataka</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Connectivity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">100m from Pune-Bangalore Highway</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Easy access to major city areas</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Well-connected to public transport</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Nearby Locations - Marquee Style */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nearby <span className="gold-shimmer">Locations</span>
            </h3>
            <div className="w-16 h-px bg-gold mx-auto" />
            <p className="mt-4 text-gray-600">Everything you need is within reach</p>
          </div>
          
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <div className="group flex overflow-hidden p-2 [--gap:1rem] gap-(--gap) flex-row [--duration:60s]">
              <div ref={marqueeRef} className="flex shrink-0 gap-(--gap) animate-marquee flex-row group-hover:paused">
                {[...Array(6)].map((_, setIndex) => (
                  nearbyPlaces.map((place) => (
                    <div
                      key={`${place.name}-${setIndex}`}
                      className="location-place shrink-0 w-64 p-6 bg-white border border-gray-100 hover:border-gold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center group/card rounded-lg mr-4"
                    >
                      <div className="text-4xl mb-4 group-hover/card:scale-110 transition-transform duration-300">{place.icon}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-2 group-hover/card:text-gold transition-colors duration-300">{place.name}</div>
                      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">{place.distance}</div>
                    </div>
                  ))
                ))}
              </div>
            </div>

            {/* Gradient overlays for smooth edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-gray-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-gray-50 to-transparent" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            type="button"
            className="px-8 py-4 bg-gold text-white font-semibold tracking-wider hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            GET DIRECTIONS
          </button>
        </div>
      </div>
    </section>
  );
}

