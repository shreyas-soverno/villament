'use client';

import { useScrollAnimation } from '@/lib/utils';
import { useEffect } from 'react';

export default function Amenities() {
  const { elementRef, fadeInUp, staggerAnimation } = useScrollAnimation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate section header
    fadeInUp('.amenities-header');
    
    // Animate amenities grid with stagger
    staggerAnimation('.amenities-card', { 
      from: { opacity: 0, y: 50, scale: 0.9 },
      to: { duration: 0.7, stagger: 0.15, ease: 'power2.out' }
    });
    
    // Animate highlight section
    fadeInUp('.amenities-highlight', 0.5);
  }, [fadeInUp, staggerAnimation]);
  const amenities = [
    {
      title: 'Swimming Pool',
      description: '785 sq.ft pristine swimming pool with sun deck and lounging area',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: 'Fitness Center',
      description: '500 sq.ft state-of-the-art gym with modern equipment and spa facilities',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Clubhouse',
      description: 'Spacious clubhouse for community gatherings and social events',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Landscaped Gardens',
      description: 'Beautifully maintained green spaces and gardens throughout the property',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: '24/7 Security',
      description: 'Round-the-clock security with CCTV surveillance and trained personnel',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Children\'s Play Area',
      description: 'Safe and fun play area designed for children of all ages',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Visitor Parking',
      description: 'Ample parking space for residents and visitors',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
    {
      title: 'Power Backup',
      description: 'Full power backup ensuring uninterrupted electricity supply',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={elementRef} id="amenities" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="amenities-header text-center mb-16">
          <div className="inline-block">
            <div className="w-16 h-px bg-gold mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium <span className="gold-shimmer">Amenities</span>
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience world-class facilities designed to enhance your lifestyle and provide 
            the ultimate in comfort and convenience.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div
              key={`amenity-${amenity.title}`}
              className="amenities-card group p-6 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gold transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-6 text-gold group-hover:scale-110 transition-transform duration-300">
                {amenity.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-gold transition-colors duration-300">
                {amenity.title}
              </h3>
              
              {/* Divider */}
              <div className="w-12 h-px bg-gold/30 mb-3" />
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

