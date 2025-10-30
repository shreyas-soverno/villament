"use client";

import React, { useEffect, useState } from "react";
import { ShaderAnimation } from './ui/shader-animation';

export default function InitialLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/90" 
      role="status" 
      aria-live="polite"
    >
      <ShaderAnimation />
      <div className="absolute pointer-events-none z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-wider text-white mb-2 font-heading">
          MAHALAYA GROUP
        </h1>
        <div className="relative w-48 mx-auto mt-6">
          <div className="h-px bg-linear-to-r from-transparent via-gold to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45" />
        </div>
        <p className="text-xs tracking-[0.3em] text-gray-300 mt-4 font-body">LUXURY DEVELOPERS</p>
      </div>
    </div>
  );
}
