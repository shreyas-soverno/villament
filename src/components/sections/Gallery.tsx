"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/lib/utils';

type Group = {
  name: string;
  images: string[];
};

export default function Gallery() {
  const { elementRef, fadeInUp, staggerAnimation } = useScrollAnimation();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data?.groups) setGroups(data.groups);
      })
      .catch((e) => {
        console.error('Failed to load gallery groups', e);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate section header
    fadeInUp('.gallery-header');
    
    // Animate gallery groups
    staggerAnimation('.gallery-group', { 
      from: { opacity: 0, y: 40 },
      to: { duration: 0.8, stagger: 0.2 }
    });
    
    // Animate gallery images
    staggerAnimation('.gallery-image', { 
      from: { opacity: 0, scale: 0.9 },
      to: { duration: 0.6, stagger: 0.05 }
    });
  }, [fadeInUp, staggerAnimation]);

  return (
    <section ref={elementRef} id="gallery" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="gallery-header text-center mb-16">
          <div className="inline-block">
            <div className="w-16 h-px bg-gold mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Photo <span className="gold-shimmer">Gallery</span>
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Take a visual tour of The Villament and discover the elegance and sophistication that awaits you.
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-12">
          {groups.length === 0 && (
            <div className="text-center text-gray-500">No gallery images found.</div>
          )}

          {groups.map((group) => (
            <div key={group.name}>
              <h3 className="text-2xl font-semibold mb-4 capitalize">{group.name.replace(/[-_]/g, ' ')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.images.map((src, idx) => (
                  <div
                    key={src + idx}
                    className="group relative h-64 bg-gray-200 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedImage(src);
                      setSelectedLabel(group.name);
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${group.name} ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                        <div className="text-white text-sm uppercase tracking-wider mb-2">{group.name}</div>
                        <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image src={selectedImage} alt={selectedLabel ?? 'Gallery Image'} fill className="object-contain" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

