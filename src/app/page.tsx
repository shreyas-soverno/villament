import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Amenities from '@/components/sections/Amenities';
import FloorPlans from '@/components/sections/FloorPlans';
import Gallery from '@/components/sections/Gallery';
import Location from '@/components/sections/Location';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Elegant Vertical Gold Accent Lines */}
      <div className="fixed left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent pointer-events-none" />
      <div className="fixed left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent pointer-events-none" />
      <div className="fixed left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/15 to-transparent pointer-events-none" />
      <div className="fixed left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent pointer-events-none" />
      
      <div className="fixed right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent pointer-events-none" />
      <div className="fixed right-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent pointer-events-none" />
      <div className="fixed right-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/15 to-transparent pointer-events-none" />
      <div className="fixed right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent pointer-events-none" />
      
      {/* Abstract Architectural Line Art */}
      <div className="fixed left-16 top-24 opacity-[0.08] pointer-events-none">
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none" className="text-gold">
          <rect x="10" y="10" width="40" height="50" stroke="currentColor" strokeWidth="1" />
          <rect x="60" y="10" width="40" height="50" stroke="currentColor" strokeWidth="1" />
          <rect x="10" y="70" width="40" height="50" stroke="currentColor" strokeWidth="1" />
          <rect x="60" y="70" width="40" height="50" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="10" x2="30" y2="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="80" y1="10" x2="80" y2="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="35" x2="50" y2="35" stroke="currentColor" strokeWidth="0.5" />
          <line x1="60" y1="35" x2="100" y2="35" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="fixed left-20 bottom-32 opacity-[0.06] pointer-events-none">
        <svg width="100" height="140" viewBox="0 0 100 140" fill="none" className="text-gold">
          <path d="M20 140 L20 40 L50 20 L80 40 L80 140" stroke="currentColor" strokeWidth="1" />
          <rect x="30" y="60" width="15" height="20" stroke="currentColor" strokeWidth="0.5" />
          <rect x="55" y="60" width="15" height="20" stroke="currentColor" strokeWidth="0.5" />
          <rect x="30" y="90" width="15" height="20" stroke="currentColor" strokeWidth="0.5" />
          <rect x="55" y="90" width="15" height="20" stroke="currentColor" strokeWidth="0.5" />
          <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>
      
      <div className="fixed right-16 top-32 opacity-[0.08] pointer-events-none">
        <svg width="140" height="180" viewBox="0 0 140 180" fill="none" className="text-gold">
          <rect x="20" y="20" width="100" height="60" stroke="currentColor" strokeWidth="1" />
          <rect x="20" y="100" width="100" height="60" stroke="currentColor" strokeWidth="1" />
          <line x1="70" y1="20" x2="70" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="70" y1="100" x2="70" y2="160" stroke="currentColor" strokeWidth="0.5" />
          <line x1="20" y1="50" x2="120" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="20" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="0.5" />
          <rect x="35" y="35" width="20" height="25" stroke="currentColor" strokeWidth="0.5" />
          <rect x="85" y="35" width="20" height="25" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="fixed right-20 bottom-40 opacity-[0.07] pointer-events-none">
        <svg width="110" height="120" viewBox="0 0 110 120" fill="none" className="text-gold">
          <path d="M10 120 L10 50 L55 10 L100 50 L100 120" stroke="currentColor" strokeWidth="1" />
          <rect x="25" y="70" width="25" height="35" stroke="currentColor" strokeWidth="0.5" />
          <rect x="60" y="70" width="25" height="35" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="85" x2="100" y2="85" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <line x1="55" y1="10" x2="55" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>
      
      {/* Navigation */}
      <Navigation />

      {/* All Sections */}
      <Hero />
      <About />
      <Amenities />
      <FloorPlans />
      <Gallery />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
