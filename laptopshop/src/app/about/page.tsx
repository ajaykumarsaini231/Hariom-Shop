"use client";

import Image from "next/image";
import Services from "@/components/features";
import { CheckCircle2, MapPin, Wrench, ShieldCheck, Cpu } from "lucide-react";

export default function About() {
  // Using the MacBook image from your file list for the hero background
  const imageUrl = "assest/macbook.jpg";

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fixed feel */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        
        {/* Elegant Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <span className="block text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4 animate-fade-in-up">
            Since 2010
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-2xl">
            #WhoWeAre
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Patna's most trusted destination for Chip-Level Engineering & Genuine Spare Parts.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Elegant Image Composition */}
            <div className="relative group">
              {/* Decorative Offset Border (The "Frame") */}
              <div className="absolute top-4 left-4 w-full h-full border-2 border-blue-200 rounded-2xl transform translate-x-2 translate-y-2 z-0 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>
              
              {/* Main Image - Using 'laptopreparing.jpg' from your list */}
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl h-[500px]">
                <Image
                  src="/assest/laptopreparing.jpg" 
                  alt="Technician working at Laptop Solutions"
                  width={600}
                  height={500}
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px]">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-blue-600">99.8%</p>
                  <p className="text-[10px] text-gray-400 mt-1">On Logic Board Repairs</p>
                </div>
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="space-y-8">
              <div>
                <h4 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2">
                  Our Expertise
                </h4>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Advanced Labs. <br />
                  <span className="text-gray-400">Expert Engineers.</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  Welcome to <span className="font-semibold text-gray-900">Laptop Solutions & Enterprises</span>. 
                  Located at the heart of Patna on SP Verma Road, we are not just another repair shop. We are a 
                  <span className="text-blue-600 font-medium"> Specialized Chip-Level Engineering Hub</span>.
                </p>

                <p>
                  While others suggest expensive motherboard replacements, we diagnose the root cause at the microscopic level. 
                  We deal in genuine spare parts for <strong>HP, Dell, Lenovo, Apple, and Asus</strong>, ensuring your device 
                  performs like new.
                </p>

                <p>
                  From complex logic board shorts to broken screens and hinge fabrication, we provide 
                  transparent, reliable, and cost-effective solutions for students, professionals, and businesses.
                </p>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { text: "Chip Level Repair", icon: Cpu },
                  { text: "Genuine Spares", icon: ShieldCheck },
                  { text: "Patna - 01 Based", icon: MapPin },
                  { text: "Advanced Tools", icon: Wrench }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                        <item.icon size={16} />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <div className="border-t border-gray-100">
        <Services />
      </div>
    </div>
  );
}