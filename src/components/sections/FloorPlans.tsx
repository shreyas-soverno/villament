'use client';

import Image from 'next/image';
import { useScrollAnimation, scheduleSiteVisit, type CalendlyOptions } from '@/lib/utils';
import { useEffect } from 'react';

export default function FloorPlans() {
  const { elementRef, fadeInUp, staggerAnimation } = useScrollAnimation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate section header
    fadeInUp('.floorplans-header');
    
    // Animate floor plan items
    staggerAnimation('.floorplan-item', { 
      from: { opacity: 0, y: 60, scale: 0.95 },
      to: { duration: 0.8, stagger: 0.3 }
    });
  }, [fadeInUp, staggerAnimation]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleKnowMore = (planName: string) => {
    // Store the selected plan in localStorage so Contact form can access it
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFloorPlan', planName);
    }
    scrollToSection('contact');
  };

  const handleScheduleVisit = (planName: string) => {
    const calendlyOptions: CalendlyOptions = {
      floorPlan: planName,
      message: `Site visit request for ${planName} from Villament website`,
    };
    
    scheduleSiteVisit(calendlyOptions);
  };
  const floorPlans = [
    {
      name: '3 BHK Villament',
      area: '2400 - 2600',
      bedrooms: 3,
      bathrooms: 3,
      description: 'Spacious 3-bedroom homes with double-height living areas',
      features: ['Double Height Living', 'Private Balconies', 'Open Kitchen', 'Study Room'],
      image: '/images/extracted-003.jpg',
    },
  ];

  return (
    <section ref={elementRef} id="floorplans" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="floorplans-header text-center mb-16">
          <div className="inline-block">
            <div className="w-16 h-px bg-gold mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Floor <span className="gold-shimmer">Plans</span>
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our thoughtfully designed floor plans that maximize space, 
            natural light, and functionality.
          </p>
        </div>

        {/* Floor Plans */}
        <div className="space-y-12">
          {floorPlans.map((plan, planIndex) => (
            <div
              key={`plan-${plan.name}`}
              className={`floorplan-item grid md:grid-cols-2 gap-12 items-center ${
                planIndex % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative h-96 bg-linear-to-br from-gold/10 to-gray-200 rounded-lg overflow-hidden ${
                planIndex % 2 === 1 ? 'md:col-start-2' : ''
              }`}>
                <Image
                  src={plan.image}
                  alt={plan.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className={`${planIndex % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white border border-gold/20">
                    <div className="text-2xl font-bold text-gold">{plan.area}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Sq.Ft</div>
                  </div>
                  <div className="p-4 bg-white border border-gold/20">
                    <div className="text-2xl font-bold text-gold">{plan.bedrooms}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Bedrooms</div>
                  </div>
                  <div className="p-4 bg-white border border-gold/20">
                    <div className="text-2xl font-bold text-gold">{plan.bathrooms}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Bathrooms</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <div key={`feature-${feature}`} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => handleKnowMore(plan.name)}
                    className="px-6 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 font-semibold tracking-wider"
                  >
                    KNOW MORE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScheduleVisit(plan.name)}
                    className="px-6 py-3 bg-gold text-white hover:bg-gold-dark border-2 border-gold hover:border-gold-dark transition-all duration-300 font-semibold tracking-wider"
                  >
                    SCHEDULE VISIT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 italic">
            * Floor plans are subject to minor variations. Please contact our sales team for detailed specifications.
          </p>
        </div>
      </div>
    </section>
  );
}

