"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  Clock,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Code2,
  Globe
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 relative overflow-hidden">
        
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* 1. Brand & Description (Col Span 4) */}
            <div className="lg:col-span-4 space-y-8">
              {/* BRAND LOGO */}
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                   <TrendingUp className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <div className="flex flex-col leading-none">
                   <span className="text-2xl font-black tracking-tight text-white uppercase">
                     Scale<span className="text-indigo-500">Up</span>
                   </span>
                   <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase group-hover:text-indigo-400 transition-colors">
                     Web Development
                   </span>
                </div>
              </Link>

              <p className="text-slate-400 leading-relaxed max-w-sm">
                Engineering high-performance digital solutions that drive business growth. 
                Specializing in modern web applications, AI integration, and scalable architecture.
              </p>

              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/ajay-kumar-saini-44b99a284", color: "hover:bg-[#0A66C2]" },
                  { icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2]" },
                  { icon: Facebook, href: "#", color: "hover:bg-[#1877F2]" },
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
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-b-2 border-indigo-600 inline-block pb-1">
                Company
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "About Me", href: "/about" },
                  { name: "Portfolio", href: "/projects" },
                  { name: "Services", href: "/services" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-sm hover:text-indigo-400 transition-colors duration-300"
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
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-b-2 border-indigo-600 inline-block pb-1">
                Get in Touch
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg text-indigo-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Location</h4>
                    <p className="text-sm mt-1 leading-relaxed">
                      IIT Patna Campus, <br /> Bihta, Bihar, India
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg text-indigo-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Phone / WhatsApp</h4>
                    <a href="tel:+918107469345" className="text-sm mt-1 block hover:text-indigo-400 transition-colors">
                      +91 81074 69345
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-lg text-indigo-500 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Email</h4>
                    <a href="mailto:nabalsaini231@gmail.com" className="text-sm mt-1 block hover:text-indigo-400 transition-colors">
                      nabalsaini231@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* 4. Tech Stack & Info (Col Span 3) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                  <Code2 className="text-indigo-500" size={16} /> Core Technologies
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Building with the latest and most robust tech stack.
                </p>
                <div className="flex flex-wrap gap-2">
                   {["Next.js", "React", "TypeScript", "Node.js", "AI/ML"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-800 text-[10px] font-bold text-slate-300 rounded uppercase tracking-wider">
                        {tech}
                      </span>
                   ))}
                </div>
              </div>

              <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Availability</p>
                 <div className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-300">Open for new projects</span>
                 </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 bg-slate-950/50">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <p>
              © {currentYear} <span className="text-slate-300">ScaleUp Web Development</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span>Engineered by</span>
              <a 
                href="https://linkedin.com/in/ajay-kumar-saini-44b99a284" 
                target="_blank" 
                rel="noreferrer" 
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold"
              >
                Ajay Kumar Saini
              </a>
              <span className="text-slate-600 mx-1">|</span>
              <span className="text-slate-600">IIT Patna</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <a
        href="https://wa.me/918107469345"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-green-500/30 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={24} fill="currentColor" />
      </a>
    </>
  );
}