"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView 
} from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Globe, 
  Zap, 
  Award, 
  BookOpen, 
  Rocket, 
  ArrowRight, 
  CheckCircle2,
  Coffee,
  Terminal,
  Layers,
  Monitor,
  Database,
  Smartphone,
  Search,
  Check
} from "lucide-react";

// ==================================================================================
// 1. ANIMATION CONFIGURATION
// ==================================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const} 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

// ==================================================================================
// 2. DATA CONSTANTS
// ==================================================================================

const SERVICES = [
  {
    title: "Custom Web Development",
    desc: "Bespoke websites built from scratch using Next.js and React. No templates, just pure, optimized code tailored to your brand's unique identity.",
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
    features: ["Single Page Applications (SPA)", "Interactive UI/UX", "CMS Integration"]
  },
  {
    title: "Backend & API Architecture",
    desc: "Robust server-side solutions using Node.js and SQL/NoSQL databases. I architect APIs that are secure, scalable, and ready for high traffic.",
    icon: <Database className="w-8 h-8 text-emerald-500" />,
    features: ["RESTful & GraphQL APIs", "Database Design", "Authentication Systems"]
  },
  {
    title: "Performance & SEO",
    desc: "Speed is a feature. I optimize every asset and line of code to ensure your site loads instantly and ranks high on Google.",
    icon: <Search className="w-8 h-8 text-purple-500" />,
    features: ["Core Web Vitals Optimization", "Technical SEO", "Fast Loading Speeds"]
  },
  {
    title: "SaaS & MVP Building",
    desc: "Turning startup ideas into functional Minimum Viable Products. I handle the full lifecycle from database schema to frontend deployment.",
    icon: <Rocket className="w-8 h-8 text-pink-500" />,
    features: ["Rapid Prototyping", "Scalable Architecture", "Payment Gateway Setup"]
  }
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "₹15,000",
    desc: "Perfect for portfolios and small business landing pages.",
    features: [
      "5-Page Responsive Website",
      "Next.js Speed Optimization",
      "Contact Form Integration",
      "Basic SEO Setup",
      "1 Month Support"
    ],
    recommended: false,
    accent: "border-slate-200"
  },
  {
    name: "Business",
    price: "₹35,000",
    desc: "For growing businesses needing a dynamic online presence.",
    features: [
      "10-Page Dynamic Website",
      "CMS (Content Management)",
      "Blog/News Section",
      "Advanced SEO & Analytics",
      "Social Media Integration",
      "3 Months Support"
    ],
    recommended: true,
    accent: "border-indigo-500 ring-2 ring-indigo-500 ring-offset-2"
  },
  {
    name: "Enterprise / E-Com",
    price: "Custom",
    desc: "Full-scale web applications and online stores.",
    features: [
      "Full Stack Application",
      "User Authentication",
      "Payment Gateway (Stripe/Razorpay)",
      "Database Integration",
      "Admin Dashboard",
      "Priority Support"
    ],
    recommended: false,
    accent: "border-slate-200"
  }
];

const JOURNEY_STEPS = [
  {
    year: "2022",
    title: "The Beginning",
    desc: "Secured a top rank in JEE Advanced (Top 2% of 1.4M candidates). Joined IIT Patna, setting the foundation for engineering excellence.",
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />
  },
  {
    year: "2023",
    title: "Deep Dive into Code",
    desc: "Mastered C++, Data Structures, and Algorithms. Started exploring Web Development with the MERN stack.",
    icon: <Terminal className="w-5 h-5 text-purple-500" />
  },
  {
    year: "2024",
    title: "Leadership & Building",
    desc: "Led the Entrepreneurship Cell at IIT Patna. Built 'Dreamora' (E-commerce) and 'Questivo' (EdTech AI).",
    icon: <Rocket className="w-5 h-5 text-pink-500" />
  },
  {
    year: "2025",
    title: "Professional Excellence",
    desc: "Research Intern at IIT Jodhpur (Materials & Tech). Launched freelance web development services for businesses globally.",
    icon: <Award className="w-5 h-5 text-emerald-500" />
  }
];

const VALUES = [
  {
    title: "Engineering > Coding",
    desc: "I don't just write scripts; I engineer systems. Every line of code is written with scalability, security, and performance in mind.",
    icon: <Cpu className="w-8 h-8 text-indigo-600" />,
    bg: "bg-indigo-50"
  },
  {
    title: "User-Centric Design",
    desc: "A powerful backend is useless without an intuitive frontend. I focus heavily on UI/UX to ensure your customers love the experience.",
    icon: <Layers className="w-8 h-8 text-purple-600" />,
    bg: "bg-purple-50"
  },
  {
    title: "Business First",
    desc: "I speak both 'Tech' and 'Business'. I build features that drive revenue, generate leads, and solve real operational problems.",
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50"
  }
];

const STATS = [
  { label: "Lines of Code", value: "50k+" },
  { label: "Projects Built", value: "15+" },
  { label: "Coffee Cups", value: "∞" },
  { label: "Happy Clients", value: "100%" }
];

// ==================================================================================
// 3. SUB-COMPONENTS
// ==================================================================================

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ==================================================================================
// 4. MAIN PAGE COMPONENT
// ==================================================================================

export default function ServicesPage() {
  const containerRef = useRef(null);
  
  // Parallax Effect Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      <ScrollProgress />

      {/* ==================================================================
          SECTION 1: CINEMATIC HERO
      ================================================================== */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Dynamic Background */}
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <span className="px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                Available for Projects
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                Digital Futures
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              I am Ajay Kumar Saini. An IIT Patna engineer bridging the gap between complex algorithms and beautiful user experiences.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="#services" 
                className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  View Services <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-500 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* ==================================================================
          SECTION 2: THE BIO (SPLIT LAYOUT)
      ================================================================== */}
      <section id="story" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image Composition */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/20 border border-slate-100 group">
                <Image
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"
                  alt="Ajay Kumar Saini - Developer"
                  width={600}
                  height={800}
                  className="object-cover w-full h-[600px] transform transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50">
                   <div className="flex justify-between items-center text-center">
                     <div>
                       <p className="text-3xl font-bold text-indigo-600">2%</p>
                       <p className="text-xs font-bold text-slate-500 uppercase">Top JEE Rank</p>
                     </div>
                     <div className="w-px h-10 bg-slate-200"></div>
                     <div>
                       <p className="text-3xl font-bold text-purple-600">IIT</p>
                       <p className="text-xs font-bold text-slate-500 uppercase">Patna Alumni</p>
                     </div>
                     <div className="w-px h-10 bg-slate-200"></div>
                     <div>
                       <p className="text-3xl font-bold text-emerald-600">100%</p>
                       <p className="text-xs font-bold text-slate-500 uppercase">Commitment</p>
                     </div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-12 -left-12 w-full h-full bg-slate-100 rounded-[2.5rem] -z-10 transform -rotate-3"></div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h4 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2">The Engineer Behind The Code</h4>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  I don't just build websites. <br />
                  <span className="text-slate-400">I solve problems.</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  My journey began with a curiosity for how things work. That curiosity led me to crack one of the world's toughest exams, <strong>JEE Advanced</strong>, securing a spot in the top 2% of candidates.
                </p>
                <p>
                  At IIT, I didn't just study engineering; I lived it. From leading the Entrepreneurship Cell to researching advanced materials at IIT Jodhpur, I learned that technology is the most powerful tool for change.
                </p>
                <p>
                  Today, I leverage that rigorous academic background to build robust digital solutions, focusing on speed, security, and scalability.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Tech Arsenal</p>
                 <div className="flex gap-6 text-slate-400">
                    <Code2 className="w-8 h-8 hover:text-indigo-600 transition-colors" />
                    <Terminal className="w-8 h-8 hover:text-purple-600 transition-colors" />
                    <Cpu className="w-8 h-8 hover:text-blue-600 transition-colors" />
                    <Zap className="w-8 h-8 hover:text-yellow-500 transition-colors" />
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 3: VALUES
      ================================================================== */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-40 mix-blend-soft-light pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">My Philosophy</h2>
            <p className="text-lg text-slate-600">
              In a world of drag-and-drop builders, I choose to be an architect. Here is what separates my work from the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${value.bg} mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 4: SERVICES
      ================================================================== */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-3">What I Deliver</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900">
                Premium Services for <br /> Modern Businesses
              </h3>
            </div>
            <Link href="/contact" className="hidden md:flex group items-center text-indigo-600 font-bold border-b-2 border-indigo-100 hover:border-indigo-600 transition-all pb-1">
              Discuss a Project <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300"
              >
                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-xs font-semibold text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 5: TIMELINE JOURNEY
      ================================================================== */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">The Roadmap</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2"></div>
            <div className="space-y-12">
              {JOURNEY_STEPS.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-5/12"></div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-indigo-600 z-10 transform -translate-x-1/2 flex items-center justify-center shadow-lg">
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                  </div>
                  <div className="ml-12 md:ml-0 w-full md:w-5/12 bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow relative">
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b border-l border-slate-100 transform rotate-45 ${idx % 2 === 0 ? '-left-2.5' : '-right-2.5 border-b-0 border-l-0 border-t border-r'}`}></div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-black text-slate-200">{step.year}</span>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 6: FUN STATS
      ================================================================== */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="px-4"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium text-indigo-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 7: PRICING
      ================================================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Investment Plans</h2>
            <p className="text-lg text-slate-600">
              Transparent pricing. No hidden fees. Choose the package that fits your current growth stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col p-8 rounded-3xl bg-white border ${plan.accent} ${plan.recommended ? 'shadow-2xl shadow-indigo-500/20 z-10 scale-105' : 'shadow-xl'}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  </div>
                  <p className="text-sm text-slate-600">{plan.desc}</p>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.recommended ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-sm text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                    plan.recommended 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Select Plan
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 8: FINAL CTA
      ================================================================== */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              Ready to work with an <br />
              <span className="text-indigo-600">Engineer?</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
              Skip the agency fees and communication gaps. Work directly with a developer who understands your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-600/30"
              >
                Start Your Project <Rocket className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/projects" 
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all"
              >
                See My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}