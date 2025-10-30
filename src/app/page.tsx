import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Amenities from '@/components/sections/Amenities';
import FloorPlans from '@/components/sections/FloorPlans';
import Gallery from '@/components/sections/Gallery';
import Location from '@/components/sections/Location';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import { TestimonialsSection } from '@/components/sections/Testimonials';

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
      <TestimonialsSection
        title="What Our Residents Say"
        description="Discover why families choose The Villament as their dream home"
        testimonials={[
          {
            author: {
              name: "Priya Sharma",
              handle: "@priya_mumbai",
              avatar: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face&fm=jpg&q=80"
            },
            text: "The Villament has been a perfect home for our family. The vastu-compliant design and modern amenities create the ideal balance of tradition and comfort."
          },
          {
            author: {
              name: "Rajesh Kumar",
              handle: "@rajesh_bangalore",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&fm=jpg&q=80"
            },
            text: "Excellent connectivity to IT corridors and metro stations. The quality of construction and attention to detail is remarkable. Perfect for working professionals."
          },
          {
            author: {
              name: "Anita Desai",
              handle: "@anita_architect",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&fm=jpg&q=80"
            },
            text: "As an architect, I appreciate the thoughtful space planning and premium finishes. The club house and amenities rival five-star facilities."
          },
          {
            author: {
              name: "Vikram Singh",
              handle: "@vikram_realty",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&fm=jpg&q=80"
            },
            text: "Invested in The Villament two years ago - the appreciation has been phenomenal. The location and builder reputation make it a blue-chip investment."
          },
          {
            author: {
              name: "Meera Patel",
              handle: "@meera_ahmedabad",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&fm=jpg&q=80"
            },
            text: "Our children love the dedicated play zones and the swimming pool. The society has created a wonderful community feeling with cultural events and festivals."
          },
          {
            author: {
              name: "Arjun Reddy",
              handle: "@arjun_hyderabad",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face&fm=jpg&q=80"
            },
            text: "The 24/7 security and power backup give us complete peace of mind. The maintenance team is very responsive and professional."
          }
        ]}
      />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
