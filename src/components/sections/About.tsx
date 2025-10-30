'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/lib/utils';
import { useEffect } from 'react';

export default function About() {
  const { elementRef, fadeInUp, staggerAnimation } = useScrollAnimation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate section header
    fadeInUp('.about-header');
    
    // Animate feature content with stagger
    staggerAnimation('.about-feature > *', { duration: 0.8 });
    
    // Animate highlights grid
    staggerAnimation('.about-highlight', { 
      from: { opacity: 0, y: 40, scale: 0.95 },
      to: { duration: 0.6, stagger: 0.15 }
    });
    
    // Animate stats with scale effect
    staggerAnimation('.about-stat', {
      from: { opacity: 0, scale: 0.8 },
      to: { duration: 0.6, ease: 'back.out(1.7)', stagger: 0.2 }
    });
  }, [fadeInUp, staggerAnimation]);
  const highlights = [
    {
      title: 'Grand Luxury Homes',
      description: 'Double height volumes with expansive full-length windows and large balconies',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Prime Location',
      description: '100m off Pune-Bangalore highway with schools, shopping & dining nearby',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Exclusive Community',
      description: 'Villa exclusivity combined with the benefits of apartment community living',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Premium Amenities',
      description: '785 sq.ft pool, 500 sq.ft gym with spa, and spacious clubhouse',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: '10', label: 'Exclusive Units' },
    { number: '785', label: 'Sq.Ft Pool' },
    { number: '500', label: 'Sq.Ft Gym' },
  ];

  return (
    <section ref={elementRef} id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="about-header text-center mb-16">
          <div className="inline-block">
            <div className="w-16 h-px bg-gold mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="gold-shimmer">Villament</span> Experience
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover a new way of luxury living where the privacy and space of a villa 
            meets the convenience and community of an apartment complex.
          </p>
        </div>

        {/* Feature Image with Text */}
        <div className="about-feature grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-96 bg-linear-to-br from-gold/10 to-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/images/exterior/extracted-001.jpg"
              alt="The Villament Exterior"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900">
              Redefining Luxury in Dharwad
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Villament brings together the best of both worlds - the exclusivity and spaciousness 
              of villa living with the security and amenities of a gated apartment community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each home is meticulously designed with double-height volumes, expansive windows, and 
              private outdoor spaces that blur the boundaries between indoor and outdoor living.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-3 text-gold">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Nature-integrated design</span>
              </div>
              <div className="flex items-center gap-3 text-gold mt-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Maximum privacy ensured</span>
              </div>
              <div className="flex items-center gap-3 text-gold mt-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Premium finishes throughout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {highlights.map((highlight, highlightIndex) => (
            <div
              key={`highlight-${highlightIndex}`}
              className="about-highlight group p-8 bg-white hover:bg-gold/5 border border-gray-100 hover:border-gold transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-gold transition-colors duration-300">
                {highlight.title}
              </h3>
              <div className="w-12 h-px bg-gold/30 mx-auto mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={`stat-${stat.label}`}
              className="about-stat text-center p-8 bg-white border-2 border-gold/20 hover:border-gold transition-all duration-300"
            >
              <div className="text-5xl font-bold gold-shimmer mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

