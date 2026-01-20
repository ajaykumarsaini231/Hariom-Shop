"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
      
      {/* 1. Background Image */}
      {/* Ensure you have 'hero.png' inside your 'public' folder */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero.png" 
          alt="Hari Om Electronics - Premium Laptops"
          fill
          priority // Loads immediately since it's the largest paint
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 2. Dark Overlay */}
      {/* This ensures the white text is readable regardless of how bright the hero.png is */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 3. Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-10">
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-xl mb-4 uppercase">
          HariOm Shop
        </h1>

        {/* Subtitle / Description */}
        <p className="text-lg md:text-2xl max-w-2xl text-gray-100 mb-8 drop-shadow-md font-medium">
          The ultimate destination for premium laptops. 
          <br className="hidden md:block" />
          Power, performance, and best prices guaranteed.
        </p>

        {/* Call to Action Button */}
        <Link
          href="/shop"
          className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        >
          <span className="relative z-10">Shop Laptops</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;