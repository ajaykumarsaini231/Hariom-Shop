"use client";
import React, { useRef, FC } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  Variants,
} from "framer-motion";
import {
  Cpu,
  Zap,
  HardDrive,
  Monitor,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Settings,
  ShieldCheck,
  MessageSquare,
  Phone,
  Database,
  GraduationCap,
  BookOpen,
  Apple,
  Clock,
  Globe,
  Video,
  IndianRupee,
  Briefcase,
  Gamepad2,
  Tablet,
  PcCase,
  Laptop,
  ClipboardCheck,
  FileSearch,
  BadgeCheck,
  Truck
} from "lucide-react";
import CategoryPage from "@/components/Category";

// ==========================================
// 1. ASSET CONFIGURATION
// ==========================================
const ASSETS = {
  hero: {
    main: "assest/laptop.png",
    bg: "assest/macbook.jpg",
  },
  services: {
    motherboard: "assest/motherboard.jpg",
    screenBroken: "assest/screendamage.jpg",
    dataRecovery: "assest/ssd.jpeg",
    macbook: "assest/macbook2.jpg",
    ipad: "assest/ipad_repair.jpg", 
    gaming: "assest/gaming_pc.png", 
  },
  tech: {
    chipLevel: "assest/chiplverl.jpg",
    motherboard: "assest/motherboard.jpg",
  },
  store: {
    newBoard: "assest/motherboard.jpg",
    parts: "assest/parts.jpg",
  },
  training: {
    poster: "assest/service.png", 
  },
  process: {
    repairing: "assest/laptopreparing.jpg",
    lab: "assest/laptops-repair-639676639.jpg",
    aesthetic: "assest/pexels-photo-15554492.jpeg",
    macAlt: "assest/macbook2.jpg",
  },
};

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const imageHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.4 } },
};

// ==========================================
// 3. REUSABLE COMPONENTS
// ==========================================

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  dark?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  subtitle,
  title,
  description,
  dark = false,
}) => (
  <div className="max-w-3xl mb-12 md:mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 mb-4"
    >
      <span className={`h-px w-8 ${dark ? "bg-blue-400" : "bg-blue-600"}`}></span>
      <span className={`uppercase tracking-widest text-xs font-bold ${dark ? "text-blue-400" : "text-blue-600"}`}>
        {subtitle}
      </span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight ${dark ? "text-white" : "text-gray-900"}`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-base md:text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

interface ServiceCardProps {
  img: string;
  title: string;
  desc: string;
  icon: any;
  href: string; 
  badge?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ img, title, desc, icon: Icon, href, badge }) => {
  return (
    <Link href={href} className="block w-full h-full cursor-pointer">
      <motion.div
        variants={fadeInUp}
        className="group relative h-[380px] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-xl border border-transparent hover:border-blue-500/30 transition-colors"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            variants={imageHover}
            initial="rest"
            whileHover="hover"
            src={img}
            alt={title}
            className="h-full w-full object-cover opacity-100 transition-all"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />

        {badge && (
           <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
             {badge}
           </div>
        )}

        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
          <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
            <Icon size={20} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 shadow-sm leading-tight">
            {title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-[95%] opacity-90 group-hover:text-white transition-colors">
            {desc}
          </p>
          <div className="mt-4 flex items-center gap-2 text-blue-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            View Details <ArrowRight size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// ==========================================
// 4. SECTIONS
// ==========================================

const HeroSection: FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center py-20 lg:py-0">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/80 to-[#0a0a0a] z-10" />
        <img src={ASSETS.hero.bg} alt="Background" className="w-full h-full object-cover opacity-60" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-medium mx-auto lg:mx-0">
              <ShieldCheck size={14} />
              <span>Premium Laptop Solutions & Training</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none">
              REVIVE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                RESTORE.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed mx-auto lg:mx-0 lg:border-l-4 lg:border-blue-600 lg:pl-6">
              Complete solutions for MacBook, iPad, Gaming PCs, and Laptops. From chip-level repairs to genuine parts and expert training.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="https://wa.me/919122901467" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Book Repair <Wrench size={20} />
              </a>
              <Link href="#training" className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors backdrop-blur-md flex items-center justify-center gap-2">
                Join Training <GraduationCap size={20} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2 }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="relative lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px]" />
            <img src={ASSETS.hero.main} alt="Laptop Repair Hero" className="relative z-10 w-full max-w-[400px] lg:max-w-full mx-auto drop-shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SpecializedServices: FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          subtitle="Our Expertise"
          title="Complete Care Solutions"
          description="Beyond basic repairs. We specialize in complex diagnostics, Apple ecosystems, Gaming Rigs, and critical data retrieval."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* 1. MacBook Specialist */}
          <ServiceCard
            img={ASSETS.services.macbook}
            title="MacBook Repair"
            desc="Logic board repair, screen replacement, liquid damage fix, and battery swaps for MacBook Pro & Air."
            icon={Apple}
            href="/services#macbook"
            badge="Apple Expert"
          />

          {/* 2. iPad Repair (Explicit) */}
          <ServiceCard
            img={ASSETS.services.ipad || ASSETS.services.screenBroken} 
            title="iPad Repair"
            desc="Specialized in iPad screen replacement, charging port repair, motherboard fixes, and software restoration."
            icon={Tablet}
            href="/services#ipad"
          />

           {/* 3. Gaming PC Services (Explicit) */}
           <ServiceCard
            img={ASSETS.services.gaming || ASSETS.tech.motherboard}
            title="Gaming PC Services"
            desc="Custom gaming PC builds, GPU installation, power supply upgrades, cooling optimization, and motherboard repair."
            icon={Gamepad2}
            href="/services#gaming"
            badge="Custom Builds"
          />

          {/* 4. Chip Level */}
          <ServiceCard
            img={ASSETS.services.motherboard}
            title="Laptop Chip Level"
            desc="Schematic-based diagnosis. We fix dead motherboards, short-circuits, and IC replacements."
            icon={Cpu}
            href="/services#motherboard"
          />

          {/* 5. Data Recovery */}
          <ServiceCard
            img={ASSETS.services.dataRecovery}
            title="Data Recovery"
            desc="Recover data from crashed HDDs, SSDs, formatted drives, and corrupted OS partitions."
            icon={Database}
            href="/services#data-recovery"
            badge="High Success"
          />

          {/* 6. Display */}
          <ServiceCard
            img={ASSETS.services.screenBroken}
            title="Screen Replacement"
            desc="Original LED/LCD screens for HP, Dell, Lenovo, Asus. Fix lines and cracks instantly."
            icon={Monitor}
            href="/services#screen"
          />

          {/* 7. Battery & Power */}
          <ServiceCard
            img={ASSETS.hero.bg}
            title="Battery & Charging"
            desc="Original battery replacements, DC Jack repairs, and adapter solutions."
            icon={Zap}
            href="/services"
          />

          {/* 8. Software & BIOS */}
          <ServiceCard
            img={ASSETS.tech.chipLevel}
            title="BIOS & Software"
            desc="BIOS programming, password removal, OS installation, and virus removal."
            icon={Settings}
            href="/services"
          />
        </div>
      </div>
    </section>
  );
};

const PartsAndStore: FC = () => {
  return (
    <section className="py-20 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
          <SectionHeader
            subtitle="The Store"
            title="Parts & New Motherboards"
            description="Genuine spare parts and brand new motherboards for wholesale and retail."
          />
          <Link
            href="/store"
            className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all mb-12"
          >
            Visit Store <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Card 1: New Motherboards (Explicit Focus) */}
          <Link href="/store/motherboards">
            <motion.div
              whileHover={{ y: -5 }}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={ASSETS.store.newBoard}
                  alt="New Motherboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BRAND NEW
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">New Laptop Motherboards</h3>
                <p className="text-gray-500 mb-4 text-sm">
                  Brand-new motherboards available for HP, Dell, Lenovo, Acer, and Asus.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" /> Wholesale & Retail
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" /> Replacement Warranty
                  </li>
                </ul>
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Spare Parts (Explicit Enumeration) */}
          <Link href="/store/parts">
            <motion.div
              whileHover={{ y: -5 }}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={ASSETS.store.parts}
                  alt="Laptop Parts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  WHOLESALE RATES
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">Laptop Spare Parts</h3>
                <p className="text-gray-500 mb-4 text-sm">
                   Extensive inventory of genuine components.
                </p>
                {/* Explicit SEO List */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {["Cooling Fans", "DC Jacks", "Keyboards", "Screens (LED/LCD)", "Adapters", "Batteries", "Hinges", "Body Panels"].map((item, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{item}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <CheckCircle2 size={16} /> Original Quality Guaranteed
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 3: Upgrades */}
          <Link href="/store/upgrades">
            <motion.div
              whileHover={{ y: -5 }}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={ASSETS.services.dataRecovery}
                  alt="SSD Ram"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PERFORMANCE
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">SSD & RAM Upgrades</h3>
                <p className="text-gray-500 mb-4 text-sm">
                  Boost your laptop speed by 10x with NVMe SSDs and High-Speed RAM.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" /> Free Installation
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle2 size={16} className="text-blue-500" /> 3-5 Year Warranty
                  </li>
                </ul>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TrainingSection: FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <section id="training" ref={ref} className="py-20 md:py-32 bg-[#1a1a1a] relative overflow-hidden text-white">
         <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:30px_30px] bg-[position:0_0,15px_15px] opacity-10" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">
                        <GraduationCap size={18} />
                        Skill Sikho | Career Banao
                    </div>
                    {/* SEO OPTIMIZED HEADING */}
                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                        Laptop Repair <br/>
                        <span className="text-blue-500">Training Centre</span>
                    </h2>
                    
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 font-bold">
                        <Briefcase size={18} />
                        <span>Business Setup Guidance</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                            <Clock className="text-blue-400 mt-1" size={20} />
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Duration</div>
                                <div className="text-lg font-bold">45 Days</div>
                            </div>
                         </div>
                         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                            <IndianRupee className="text-green-400 mt-1" size={20} />
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Fees (Offer)</div>
                                <div className="text-lg font-bold">₹9999</div>
                            </div>
                         </div>
                         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                            <Video className="text-purple-400 mt-1" size={20} />
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Mode</div>
                                <div className="text-lg font-bold">Live Practical</div>
                            </div>
                         </div>
                         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                            <Globe className="text-orange-400 mt-1" size={20} />
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Language</div>
                                <div className="text-lg font-bold">Hindi + English</div>
                            </div>
                         </div>
                    </div>

                    <div className="space-y-4 mb-8">
                         <h4 className="font-bold text-lg">Course Includes:</h4>
                        {[
                            "Computer + Laptop Hardware",
                            "Software Repairing",
                            "Chip-Level Motherboard Training", // Updated Keyword
                            "Schematic Diagram Reading",
                            "Live Online Practical Classes"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-500 flex-shrink-0" size={18} />
                                <span className="font-medium text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="text-sm text-blue-200 mb-1">Limited Seats Available</div>
                            <div className="text-xl font-bold text-white">Seat Book Karein Sirf <span className="text-yellow-400 text-2xl">₹599</span> Me</div>
                        </div>
                        <a href="https://wa.me/919122901467?text=I%20want%20to%20book%20seat%20for%20Laptop%20Course" className="whitespace-nowrap bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-yellow-500/20">
                            Book Now
                        </a>
                    </div>
                </motion.div>

                <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={isInView ? { opacity: 1, scale: 1 } : {}}
                     transition={{ duration: 0.8 }}
                     className="relative flex justify-center"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30" />
                    <img 
                        src={ASSETS.training.poster} 
                        alt="Laptop Repair Training Centre Poster" 
                        className="relative rounded-2xl shadow-2xl border border-white/10 w-full max-w-md object-cover"
                    />
                </motion.div>
            </div>
        </div>
      </section>
    );
};

// ==========================================
// 5. PROCESS SECTION (Updated)
// ==========================================

const ProcessSection: FC = () => {
  const steps = [
    {
      title: "Intake & Diagnosis",
      desc: "Comprehensive 24-point check to accurately identify hardware & software issues.",
      icon: ClipboardCheck,
    },
    {
      title: "Approval & Quote",
      desc: "Transparent pricing. No hidden charges. Repair begins only after your approval.",
      icon: FileSearch,
    },
    {
      title: "Precision Repair",
      desc: "Expert engineers fix the device using ESD-safe protocols and genuine parts.",
      icon: BadgeCheck,
    },
    {
      title: "Quality Control & Delivery",
      desc: "Rigorous stress testing (CPU/GPU) before the device is ready for pickup or delivery.",
      icon: Truck,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Images (Masonry Layout) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                 {/* Image 1 - Offset Top */}
                 <img
                  src={ASSETS.process.aesthetic}
                  alt="Repair Workspace"
                  className="rounded-2xl shadow-2xl w-full h-[250px] md:h-[350px] object-cover hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Decorative Element */}
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hidden md:block">
                    <p className="text-blue-800 font-semibold text-sm">
                        "Precision requires patience and the right tools."
                    </p>
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6 pt-12">
                 {/* Image 2 - Offset Bottom */}
                 <img
                  src={ASSETS.process.lab}
                  alt="Advanced Lab"
                  className="rounded-2xl shadow-2xl w-full h-[250px] md:h-[350px] object-cover hover:scale-[1.02] transition-transform duration-500"
                />
                 {/* Stats Badge */}
                 <div className="bg-gray-900 text-white p-4 rounded-xl text-center shadow-lg transform -translate-x-4 md:-translate-x-8">
                    <div className="text-2xl font-bold text-blue-400">12k+</div>
                    <div className="text-xs uppercase tracking-wider text-gray-400">Devices Fixed</div>
                 </div>
              </div>
            </div>
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-blue-100/50 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Side: Process Steps */}
          <div className="flex flex-col justify-center">
            <SectionHeader
              subtitle="Workflow"
              title="Transparent Repair Process"
              description="We believe in complete transparency. From diagnosis to delivery, you stay informed at every step."
            />

            <div className="space-y-10 relative">
              {/* Vertical Connecting Line */}
              <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-600 via-blue-200 to-transparent z-0" />

              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex gap-6 relative z-10 group"
                >
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-100 text-blue-600 flex items-center justify-center shadow-md group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <step.icon size={20} />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {idx + 1}. {step.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100">
                <Link href="/track-status" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                    Check Repair Status <ArrowRight size={18} />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA: FC = () => {
  return (
    <section className="py-20 md:py-24 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8"
        >
          Fix Your Device Today
        </motion.h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Whether it's a dead MacBook, a broken iPad screen, a custom Gaming PC build, or you need a new motherboard—we have the solution.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6"
        >
          <a
            href="https://wa.me/919122901467"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 md:px-10 md:py-5 bg-white text-blue-700 font-bold text-lg rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            WhatsApp Us <MessageSquare size={20} />
          </a>
          <a
            href="tel:+919122901467"
            className="px-8 py-4 md:px-10 md:py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
          >
            Call Now <Phone size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 6. MAIN PAGE COMPONENT
// ==========================================

const HomePage: FC = () => {
  return (
    <div className="font-sans text-gray-900 antialiased selection:bg-blue-200">
      <HeroSection />
      <SpecializedServices />
      <PartsAndStore />
      <TrainingSection />
      <CategoryPage/>
      <ProcessSection />
      <CTA />
    </div>
  );
};

export default HomePage;