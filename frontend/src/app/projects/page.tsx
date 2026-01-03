"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Import Variants
import { 
  Code2, 
  ExternalLink, 
  Github, 
  Layers, 
  Zap, 
  Smartphone, 
  Database, 
  Cpu, 
  Layout, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Server,
  Globe
} from "lucide-react";

// ==================================================================================
// 1. ANIMATION CONFIGURATION
//    Smooth, professional motion variants.
// ==================================================================================

// Explicitly type animation objects as Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardHover: Variants = {
  rest: { 
    scale: 1, 
    y: 0 
  },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { 
      duration: 0.3, 
      ease: "easeInOut" 
    }
  }
};

// ==================================================================================
// 2. PROJECT DATA (RICH CONTENT)
//    Detailed case studies derived from your resume & skills.
// ==================================================================================

type Category = "All" | "Full Stack" | "AI & ML" | "Frontend" | "Business";

const CATEGORIES: Category[] = ["All", "Full Stack", "AI & ML", "Frontend", "Business"];

const PROJECTS = [
  {
    id: 1,
    title: "Dreamora E-Commerce",
    category: "Full Stack",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    desc: "A production-ready e-commerce platform built for high-volume sales. Features include real-time inventory management, secure Stripe payment processing, and a comprehensive admin dashboard for analytics.",
    tech: ["Next.js 14", "PostgreSQL", "Prisma", "Stripe API", "Redux"],
    features: [
      "Real-time Inventory Sync",
      "Secure Payment Gateway",
      "Admin Analytics Dashboard",
      "Optimized Database Queries"
    ],
    demoLink: "#",
    repoLink: "https://github.com/ajaykumarsaini231",
    stats: "200% Faster Load Times"
  },
  {
    id: 2,
    title: "Questivo AI EdTech",
    category: "AI & ML",
    role: "Solo Engineer",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    desc: "An intelligent learning platform that uses Llama-3 AI agents to generate personalized quizzes for JEE/GATE aspirants. The system adapts to student performance in real-time.",
    tech: ["React 19", "Groq AI", "Node.js", "Tailwind v4", "Python"],
    features: [
      "AI Question Generation",
      "Adaptive Difficulty Engine",
      "Performance Heatmaps",
      "Instant Doubt Resolution"
    ],
    demoLink: "#",
    repoLink: "https://github.com/ajaykumarsaini231",
    stats: "10k+ Questions Generated"
  },
  {
    id: 3,
    title: "Luxe Interiors",
    category: "Business",
    role: "Frontend Architect",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
    desc: "A visually stunning corporate portfolio for a high-end interior design firm. Focused on SEO domination and lead generation through elegant UI/UX design.",
    tech: ["Next.js", "Framer Motion", "GSAP", "Sanity CMS"],
    features: [
      "3D Parallax Effects",
      "Dynamic Case Studies",
      "Automated SEO Meta Tags",
      "Lead Capture Forms"
    ],
    demoLink: "#",
    repoLink: "#",
    stats: "Award Winning Design"
  },
  {
    id: 4,
    title: "Urban Eats Manager",
    category: "Full Stack",
    role: "Full Stack Dev",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
    desc: "A restaurant management system helping local businesses handle orders, table bookings, and delivery tracking in one unified interface.",
    tech: ["React", "Firebase", "Google Maps API", "Express"],
    features: [
      "Live Order Tracking",
      "QR Code Menu System",
      "Table Reservation Logic",
      "Kitchen Display System (KDS)"
    ],
    demoLink: "#",
    repoLink: "https://github.com/ajaykumarsaini231",
    stats: "40% Efficiency Boost"
  },
  {
    id: 5,
    title: "DataViz Dashboard",
    category: "Frontend",
    role: "UI Engineer",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    desc: "A complex analytics dashboard for visualizing large datasets. Uses D3.js and Recharts to render millions of data points smoothly.",
    tech: ["React", "TypeScript", "D3.js", "Material UI"],
    features: [
      "Interactive Charts",
      "Data Export (CSV/PDF)",
      "Dark/Light Mode",
      "Role-Based Access"
    ],
    demoLink: "#",
    repoLink: "#",
    stats: "Process 1M+ Records"
  },
  {
    id: 6,
    title: "SecureChat App",
    category: "Full Stack",
    role: "Backend Dev",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
    desc: "End-to-end encrypted messaging application. Built with WebSockets for sub-millisecond latency and absolute privacy.",
    tech: ["Node.js", "Socket.io", "MongoDB", "Redis"],
    features: [
      "E2E Encryption",
      "Real-time Typing Status",
      "File Sharing",
      "Group Channels"
    ],
    demoLink: "#",
    repoLink: "https://github.com/ajaykumarsaini231",
    stats: "<50ms Latency"
  }
];

// ==================================================================================
// 3. MAIN COMPONENT
// ==================================================================================

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  // Filter Logic
  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-6">
              <Code2 className="w-4 h-4" />
              Engineering Portfolio
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Real Problems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Engineered Solutions.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A collection of high-performance web applications built with modern technologies. 
              From AI agents to scalable e-commerce systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- STICKY FILTER BAR --- */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full border-2 border-indigo-500/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS GRID --- */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  variants={cardHover}
                  whileHover="hover"
                  // initial="rest"
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full"
                >
                  {/* Image Header */}
                  <div className="relative h-60 overflow-hidden bg-slate-200">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-slate-900 rounded-full shadow-sm border border-white/50 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>

                    {/* Links Overlay (Visible on Hover) */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <a 
                        href={project.demoLink} 
                        className="p-3 bg-white rounded-full text-slate-900 hover:text-indigo-600 hover:scale-110 transition-all shadow-lg"
                        title="View Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a 
                        href={project.repoLink} 
                        className="p-3 bg-slate-900 rounded-full text-white hover:bg-indigo-600 hover:scale-110 transition-all shadow-lg"
                        title="View Code"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wider">
                        {project.role}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {project.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center text-xs text-slate-500 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0" />
                          {feat}
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide rounded-md group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer Stats */}
                  <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Zap size={14} className="text-yellow-500" />
                      Result
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {project.stats}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 rounded-full bg-slate-100 mb-4">
                <Filter className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-500">Try selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- TECH STACK MARQUEE --- */}
      <section className="py-20 bg-slate-900 border-y border-slate-800 overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">My Technology Stack</h2>
          <p className="text-slate-400 text-sm">Tools I use to build scalable products</p>
        </div>
        
        {/* Animated Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
            {/* Repeat list twice for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <TechItem icon={<Code2 />} name="Next.js 14" />
                <TechItem icon={<Globe />} name="React 19" />
                <TechItem icon={<Database />} name="PostgreSQL" />
                <TechItem icon={<Server />} name="Node.js" />
                <TechItem icon={<Layout />} name="Tailwind CSS" />
                <TechItem icon={<Cpu />} name="TypeScript" />
                <TechItem icon={<Layers />} name="Prisma ORM" />
                <TechItem icon={<Smartphone />} name="React Native" />
                <TechItem icon={<Zap />} name="Vercel" />
              </React.Fragment>
            ))}
          </div>
          
          {/* Gradient Fade Edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-slate-50 to-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
              I am currently accepting new freelance projects and full-time opportunities. 
              Let's discuss how we can engineer your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 hover:scale-105 transition-all shadow-xl"
              >
                Start a Conversation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="https://github.com/ajaykumarsaini231" 
                target="_blank"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-slate-900 hover:bg-slate-50 transition-all"
              >
                View GitHub <Github className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Available for Hire • {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// Helper Component for Tech Marquee
function TechItem({ icon, name }: { icon: React.ReactNode, name: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-400 px-4">
      <div className="w-8 h-8">{icon}</div>
      <span className="text-xl font-bold">{name}</span>
    </div>
  );
}