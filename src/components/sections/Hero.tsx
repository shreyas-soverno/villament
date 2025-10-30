'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
import InitialLoader from '../../components/InitialLoader';

export default function Hero() {
  // Ref to the hero section so we can pause the shader when out of view
  const heroRef = useRef<HTMLElement | null>(null);

  // Whether the environment is allowed to run the shader (not reduced motion, not small screen)
  const [canRenderShader, setCanRenderShader] = useState(false);

  // Whether the hero is currently visible in viewport (so we can stop the shader when it's offscreen)
  const [isVisible, setIsVisible] = useState(true);

  // State to control when hero animations should start (after loader)
  const [showHeroContent, setShowHeroContent] = useState(false);

  // Decide if we should render the shader: respect prefers-reduced-motion and small screens
  useEffect(() => {
    if (typeof window === 'undefined') return;

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)') as MediaQueryList;
  const check = () => {
      // treat small screens as low-power/cost and avoid running the shader there
      const smallScreen = window.innerWidth < 640; // tailwind's `sm` breakpoint-ish
      setCanRenderShader(!mq.matches && !smallScreen);
    };

    check();
    // Listen for changes to reduced-motion preference and resize
  if ('addEventListener' in mq) mq.addEventListener('change', check);
  else (mq as any).addListener(check);
    window.addEventListener('resize', check);

    return () => {
      if ('removeEventListener' in mq) mq.removeEventListener('change', check);
      else (mq as any).removeListener(check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // Pause the shader when the hero section is mostly offscreen
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  // Trigger hero animations after loader finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 2100); // Slightly after loader finishes (2000ms)
    
    return () => clearTimeout(timer);
  }, []);

  // Memoize the shader element so we don't rerender it unnecessarily
  const shaderNode = useMemo(() => (
    <GrainGradient
      className="w-full h-full"
      // slightly reduced quality settings to lower GPU usage
      colors={["#f4e4b8", "#ffffff"]}
      colorBack="#ffffff"
      softness={0.6}
      intensity={0.08}
      noise={0.5}
      shape="corners"
      speed={1}
      scale={1.2}
      rotation={0}
    />
  ), []);
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

  return (
  <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center px-6 py-16 sm:py-24 relative overflow-hidden">
      {/* Initial Loader */}
      <InitialLoader />
      
      {/* Hero Content */}
      {/* Animated Grain Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/*
          The shader is expensive on some devices. We only render it when:
            - user does not prefer reduced motion
            - screen is not small (mobile)
            - the hero section is visible
          Otherwise show a lightweight static CSS gradient fallback.
        */}
        {canRenderShader && isVisible ? (
          shaderNode
        ) : (
          <div className="w-full h-full bg-linear-to-br from-[#f4e4b8] to-white" />
        )}
      </div>

  {/* Background decorative elements - now over the shader (hidden on small screens) */}
  <div className="hero-bg-element hidden sm:block absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-gold/10 rounded-full blur-3xl z-5" />
  <div className="hero-bg-element hidden sm:block absolute bottom-0 right-0 w-56 sm:w-96 h-56 sm:h-96 bg-gold/10 rounded-full blur-3xl z-5" />
  <div className="hero-bg-element hidden sm:block absolute sm:top-1/4 sm:right-1/4 top-16 right-8 w-32 sm:w-48 h-32 sm:h-48 bg-gold/8 rounded-full blur-2xl z-5" />
  <div className="hero-bg-element hidden sm:block absolute sm:bottom-1/3 sm:left-1/4 bottom-20 left-8 w-40 sm:w-56 h-40 sm:h-56 bg-gold/8 rounded-full blur-3xl z-5" />

  {/* Decorative corner accents - enhanced for visibility (reduced on small screens) */}
  <div className="hero-corner hidden sm:block absolute sm:top-24 sm:left-24 top-8 left-4 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-gold/40 z-5" />
  <div className="hero-corner hidden sm:block absolute sm:top-24 sm:right-24 top-8 right-4 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-gold/40 z-5" />
  <div className="hero-corner hidden sm:block absolute sm:bottom-24 sm:left-24 bottom-12 left-4 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-gold/40 z-5" />
  <div className="hero-corner hidden sm:block absolute sm:bottom-24 sm:right-24 bottom-12 right-4 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-gold/40 z-5" />

  <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col justify-center items-center min-h-[70vh] sm:min-h-[80vh] px-4 sm:px-0">
        {/* Logo/Brand */}
        <div className={`mt-16 mb-4 relative ${showHeroContent ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-block relative">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-wider mb-2 font-heading">
              THE
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider gold-shimmer mb-6 font-heading">
              VILLAMENT
            </h1>
            <div className="relative w-full max-w-md mx-auto">
              <div className="h-px bg-linear-to-r from-transparent via-gold to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45" />
            </div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mt-4 font-body">LUXURY LIVING</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold max-w-3xl mx-auto leading-relaxed mt-4">
              Where villa exclusivity meets apartment community
            </p>
          </div>
        </div>

        {/* Main Description */}
        <div className={`mb-4 space-y-6 max-w-3xl mx-auto relative ${showHeroContent ? 'animate-fade-in-delay-2' : 'opacity-0'}`}>
          <div className="relative px-6 sm:px-8 py-6 sm:py-8 border-l-2 border-gold/30">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-left font-body">
              A suave abode in the heart of Dharwad city featuring unique homes
              that give you the exclusivity of villa life while building a community together.
              Living spaces carefully crafted to open to nature while ensuring maximum privacy.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 ${showHeroContent ? 'animate-fade-in-delay-3' : 'opacity-0'}`}>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="px-6 py-3 md:px-8 md:py-4 bg-gold text-white font-semibold tracking-wider hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm md:text-base"
          >
            EXPLORE MORE
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="px-6 py-3 md:px-8 md:py-4 border-2 border-gold text-gold font-semibold tracking-wider hover:bg-gold hover:text-white transition-all duration-300 text-sm md:text-base"
          >
            CONTACT US
          </button>
        </div>

        {/* Stats */}
        <div className={`flex items-center justify-center gap-3 sm:gap-4 mb-6 ${showHeroContent ? 'animate-fade-in-delay-3' : 'opacity-0'}`}>
          <div className="w-12 sm:w-16 h-px bg-gold/30" />
          <p className="text-sm sm:text-sm text-gray-500 tracking-wider font-body">
            ONLY <span className="text-gold font-semibold">10</span> EXCLUSIVE UNITS
          </p>
          <div className="w-12 sm:w-16 h-px bg-gold/30" />
        </div>

        {/* Location tag */}
        <div className="inline-flex items-center gap-2 text-xs text-gray-400 tracking-wider font-body">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <title>Location</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
          </svg>
          DHARWAD, KARNATAKA
        </div>
      </div>

      {/* Scroll Indicator - Fixed at bottom of viewport */}
      <button
        type="button"
        onClick={() => scrollToSection('about')}
        className="absolute sm:bottom-8 bottom-6 left-1/2 -translate-x-1/2 animate-bounce hover:animate-none transition-all duration-300 hover:scale-110 cursor-pointer z-20"
        aria-label="Scroll to next section"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold hover:text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <title>Scroll Down</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}

