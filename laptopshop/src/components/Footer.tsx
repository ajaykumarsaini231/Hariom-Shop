"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageSquare,
  MapPin,
  Phone,
  Clock,
  Laptop,
  ArrowRight,
  ShieldCheck,
  Save,
  Code
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 relative overflow-hidden">
        
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* 1. Brand & Description (Col Span 4) */}
            <div className="lg:col-span-4 space-y-8">
              {/* BRAND LOGO */}
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Laptop className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-xl font-black tracking-tight text-white uppercase">
                      Laptop<span className="text-blue-500">Solutions</span>
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase group-hover:text-blue-400 transition-colors">
                      & Enterprises
                    </span>
                </div>
              </Link>

              <p className="text-slate-400 leading-relaxed max-w-sm">
                Your one-stop destination for premium laptop repairs, spare parts, and accessories. 
                Specializing in chip-level service and original components for all major brands.
              </p>

              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#", color: "hover:bg-[#1877F2]" },
                  { icon: Instagram, href: "#", color: "hover:bg-[#E4405F]" },
                  { icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2]" },
                  { icon: Youtube, href: "#", color: "hover:bg-[#FF0000]" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg transition-all duration-300 text-white hover:scale-110 ${social.color}`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Quick Links (Col Span 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-b-2 border-blue-600 inline-block pb-1">
                Company
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Our Services", href: "/services" },
                  { name: "Spare Parts", href: "/shop" },
                  { name: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm hover:text-blue-400 transition-colors duration-300"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Contact Info (Col Span 3) */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-b-2 border-blue-600 inline-block pb-1">
                Visit Us
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg text-blue-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Store Location</h4>
                    <p className="text-sm mt-1 leading-relaxed text-slate-400">
                      SP Verma Road, Patna - 01.<br />
                      Opposite Om Complex, 1st Floor.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg text-blue-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Contact Numbers</h4>
                    <div className="flex flex-col gap-2 mt-2">
                      
                      {/* Number 1: Phone + WhatsApp Link */}
                      <div className="flex flex-wrap items-center gap-2">
                        <a 
                          href="tel:+919122901467" 
                          className="text-sm hover:text-blue-400 transition-colors font-mono"
                        >
                          +91 91229 01467
                        </a>
                        <a 
                          href="https://wa.me/919122901467" 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[10px] bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800 hover:bg-green-800 transition-colors cursor-pointer"
                        >
                          <MessageSquare size={10} /> WhatsApp
                        </a>
                      </div>

                      {/* Number 2: Phone Only */}
                      <a 
                        href="tel:+919334730111" 
                        className="text-sm hover:text-blue-400 transition-colors font-mono"
                      >
                        +91 93347 30111
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg text-blue-500 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Working Hours</h4>
                    <p className="text-sm mt-1 text-slate-400">
                      Mon - Sat: 10:00 AM - 8:00 PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 4. Expertise & Status (Col Span 3) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-blue-500" size={16} /> Our Expertise
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Professional service for all major laptop brands.
                </p>
                <div className="flex flex-wrap gap-2">
                   {["Chip Level", "Screen Replacement", "SSD Upgrade", "Motherboard", "Hinges"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-800 text-[10px] font-bold text-slate-300 rounded uppercase tracking-wider">
                        {tech}
                      </span>
                   ))}
                </div>
              </div>

              <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Enquiries</p>
                  <div className="flex gap-3 items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="bg-green-500 p-1.5 rounded-full text-slate-900 animate-pulse">
                      <Save size={12} />
                    </div>
                    <span className="text-xs font-bold text-green-400">
                      Save +91 91229 01467 for future enquiry
                    </span>
                  </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 bg-slate-950/50">
          <div className="container mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs font-medium text-slate-500">
            
            {/* Copyright */}
            <p className="text-center lg:text-left">
              © {currentYear} <span className="text-slate-300">Laptop Solutions & Enterprises</span>. All rights reserved.
            </p>

            {/* Developer Credit */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800/50">
              <span className="flex items-center gap-2 text-slate-400">
                <Code size={14} className="text-blue-500" />
                Designed & Developed by <span className="text-white font-bold">Ajay Kumar Saini</span>
              </span>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-wide">
                <a href="mailto:nabalsaini231@gmail.com" className="hover:text-blue-400 transition-colors">
                  nabalsaini231231@gmail.com
                </a>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <a href="tel:+918107469345" className="hover:text-green-400 transition-colors">
                  +91 8107469345
                </a>
                <span className="hidden md:inline text-slate-600 ml-1 normal-case tracking-normal">(Open for Projects)</span>
              </div>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-1">
              <span>Located in</span>
              <span className="text-blue-400 font-bold">Patna, Bihar</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) - Opens WhatsApp directly */}
      <a
        href="https://wa.me/919122901467"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-green-500/30 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={24} fill="currentColor" />
        {/* Tooltip for FAB */}
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
          Chat with us!
        </span>
      </a>
    </>
  );
}