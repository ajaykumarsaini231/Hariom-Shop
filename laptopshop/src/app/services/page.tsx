"use client";

import React, { useRef, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform,
  Variants 
} from "framer-motion";
import { 
  Cpu, 
  Wrench, 
  Monitor, 
  Zap, 
  Award, 
  BookOpen, 
  Rocket, 
  ArrowRight, 
  CheckCircle2,
  Users,
  Settings,
  Layers,
  PenTool,
  Search,
  HardDrive,
  Smartphone,
  Gamepad
} from "lucide-react";

// ==================================================================================
// 1. ANIMATION CONFIGURATION
// ==================================================================================

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
// 2. DATA CONSTANTS
// ==========================================

const SERVICES_LIST = [
  {
    title: "Motherboard Chip-Level",
    desc: "Advanced diagnosis and repair of dead motherboards, power failures, and liquid damage using schematic tracing.",
    img: ASSETS.services.motherboard,
    icon: Cpu,
    href: "/services/motherboard",
    details: ["Power Rail Repair", "IO/PCH Replacement", "Bios Flashing"],
    badge: "Most Popular"
  },
  {
    title: "MacBook Specialists",
    desc: "Specialized repair for MacBook Air & Pro models. Logic board repair, screen replacement, and flexgate solutions.",
    img: ASSETS.services.macbook,
    icon: Layers,
    href: "#",
    details: ["Logic Board Repair", "Screen Replacement", "Keyboard/Trackpad"],
    badge: "Apple Expert"
  },
  {
    title: "Data Recovery",
    desc: "Professional data retrieval from crashed hard drives, SSDs, and corrupted operating systems.",
    img: ASSETS.services.dataRecovery,
    icon: HardDrive,
    href: "#",
    details: ["HDD/SSD Recovery", "Deleted Files", "OS Restoration"]
  },
  {
    title: "Screen & Body Panel",
    desc: "Original quality screen replacements for all brands. Hinge repair and body fabrication for broken laptops.",
    img: ASSETS.services.screenBroken,
    icon: Monitor,
    href: "#",
    details: ["4K/OLED Screens", "Hinge Fabrication", "Bezel Replacement"]
  },
  {
    title: "iPad & Tablet Repair",
    desc: "Complete care for iPads and high-end tablets including digitizer replacement and charging port fixes.",
    img: ASSETS.services.ipad,
    icon: Smartphone,
    href: "#",
    details: ["Glass Replacement", "Battery Swap", "Charging Issues"]
  },
  {
    title: "Gaming PC Service",
    desc: "Thermal optimization, GPU repair, and upgrades for high-performance gaming laptops and consoles.",
    img: ASSETS.services.gaming,
    icon: Gamepad,
    href: "#",
    details: ["Overheating Fix", "GPU Reballing", "Performance Tune"]
  }
];

const TRAINING_MODULES = [
  {
    title: "Basic Electronics & Components",
    desc: "Understand the building blocks of motherboards. Learn to identify and test Resistors, Capacitors, Coils, MOSFETs, and ICs using a multimeter.",
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    features: ["Multimeter Mastery", "Component Identification", "Circuit Tracing"]
  },
  {
    title: "Chip-Level Logic & Schematics",
    desc: "Master the art of reading schematic diagrams and boardviews. Diagnose dead laptops by understanding power rails and signal flow.",
    icon: <Cpu className="w-8 h-8 text-blue-500" />,
    features: ["Schematic Reading", "Power Sequence", "Signal Tracing"]
  },
  {
    title: "Advanced BGA & Soldering",
    desc: "Hands-on training with soldering stations and BGA machines. Learn to remove and replace micro-components and Reball GPUs/CPUs safely.",
    icon: <Wrench className="w-8 h-8 text-red-500" />,
    features: ["Micro Soldering", "IO Controller Change", "BIOS Programming"]
  },
  {
    title: "Software & BIOS Programming",
    desc: "Learn to flash BIOS chips, remove passwords, clean ME regions, and troubleshoot OS-level driver conflicts efficiently.",
    icon: <Settings className="w-8 h-8 text-emerald-500" />,
    features: ["BIOS Flashing", "ME Region Cleaning", "Driver Solutions"]
  }
];

const PRICING_PLANS = [
  {
    name: "Crash Course",
    price: "₹ 9,999",
    desc: "For beginners wanting to learn basic card-level repair.",
    features: [
      "1 Month Duration",
      "Basic Electronics",
      "Card Level Troubleshooting",
      "Software Installation",
      "Certificate of Completion"
    ],
    recommended: false,
    accent: "border-slate-200"
  },
  {
    name: "Advanced Diploma",
    price: "₹ 24,999",
    desc: "Complete chip-level mastery for professional careers.",
    features: [
      "3 Months Duration",
      "Deep Schematic Training",
      "Live Motherboard Repair",
      "BGA Machine Training",
      "Business Setup Guidance",
      "Lifetime Technical Support"
    ],
    recommended: true,
    accent: "border-blue-500 ring-2 ring-blue-500 ring-offset-2"
  },
  {
    name: "Master Class",
    price: "Custom",
    desc: "For shop owners needing specialized upgrade training.",
    features: [
      "15 Days Intensive",
      "Specific Brand Mastery (Apple/Dell)",
      "Oscilloscope Training",
      "Advanced Fault Finding",
      "Vendor Contacts Sharing",
      "1-on-1 Mentorship"
    ],
    recommended: false,
    accent: "border-slate-200"
  }
];

const LEARNING_PATH = [
  {
    step: "01",
    title: "Foundation",
    desc: "Start with the basics of voltage, current, and electronic components. Build a strong theoretical base.",
    icon: <BookOpen className="w-5 h-5 text-blue-500" />
  },
  {
    step: "02",
    title: "Tools & Equipment",
    desc: "Get comfortable with DC Power Supplies, CROs, BGA Stations, and Programmer tools.",
    icon: <PenTool className="w-5 h-5 text-purple-500" />
  },
  {
    step: "03",
    title: "Diagnosis & Repair",
    desc: "Work on live dead boards. Trace faults, replace bad ICs, and bring laptops back to life.",
    icon: <Search className="w-5 h-5 text-yellow-500" />
  },
  {
    step: "04",
    title: "Certification & Career",
    desc: "Pass the final practical exam, receive your certification, and get placement assistance or business support.",
    icon: <Award className="w-5 h-5 text-emerald-500" />
  }
];

const PHILOSOPHY = [
  {
    title: "100% Practical",
    desc: "Theory is useless without practice. Our labs are open all day for you to practice on scrap and live boards until you are confident.",
    icon: <Wrench className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50"
  },
  {
    title: "Market Ready Skills",
    desc: "We teach you what the market needs today. From latest generation processors to modern USB-C charging circuits.",
    icon: <Rocket className="w-8 h-8 text-purple-600" />,
    bg: "bg-purple-50"
  },
  {
    title: "Business Guidance",
    desc: "Not just repair, we teach you how to estimate costs, manage customers, and source spare parts at wholesale rates.",
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    bg: "bg-emerald-50"
  }
];

const STATS = [
  { label: "Students Trained", value: "500+" },
  { label: "Placement Rate", value: "95%" },
  { label: "Live Boards Fixed", value: "10k+" },
  { label: "Years Experience", value: "15+" }
];

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
  details?: string[];
}

const ServiceCard: FC<ServiceCardProps> = ({ img, title, desc, icon: Icon, href, badge, details }) => {
  return (
    <Link href={href} className="block w-full h-full cursor-pointer">
      <motion.div
        variants={fadeInUp}
        className="group relative h-[450px] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-xl border border-transparent hover:border-blue-500/30 transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />

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
          <p className="text-gray-300 text-sm leading-relaxed mb-4 opacity-90 group-hover:text-white transition-colors">
            {desc}
          </p>
          
          {details && (
            <ul className="space-y-1 mb-4">
              {details.map((item, i) => (
                <li key={i} className="flex items-center text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                  <CheckCircle2 size={12} className="text-blue-500 mr-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* <div className="mt-2 flex items-center gap-2 text-blue-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            View Details <ArrowRight size={16} />
          </div> */}
        </div>
      </motion.div>
    </Link>
  );
};

// ==================================================================================
// 4. SUB-COMPONENTS
// ==================================================================================

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ==================================================================================
// 5. MAIN PAGE COMPONENT
// ==================================================================================

export default function TrainingPage() {
  const containerRef = useRef(null);
  
  // Parallax Effect Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen font-sans selection:bg-blue-500 selection:text-white">
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
          {/* Background Image: Electronic Repair / Circuit Board */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-bold tracking-[0.1em] uppercase backdrop-blur-md">
                # Laptop Repair Training Centre
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              Master The Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient-x">
                Chip-Level Repair
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Join Patna's premier training institute. Learn advanced diagnostics, schematic reading, and micro-soldering from industry experts.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="#courses" 
                className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-slate-600 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all"
              >
                Book a Free Demo
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
          SECTION 2: THE INSTITUTE (SPLIT LAYOUT)
      ================================================================== */}
      <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
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
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/20 border border-slate-100 group">
                <Image
                  src="/assest/service.png"
                  alt="Advanced Chip Level Repair Lab"
                  width={600}
                  height={800}
                  className="object-cover w-full h-[600px] transform transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50">
                    <div className="flex justify-between items-center text-center">
                      <div>
                        <p className="text-3xl font-bold text-blue-600">100%</p>
                        <p className="text-xs font-bold text-slate-500 uppercase">Practical</p>
                      </div>
                      <div className="w-px h-10 bg-slate-200"></div>
                      <div>
                        <p className="text-3xl font-bold text-purple-600">ISO</p>
                        <p className="text-xs font-bold text-slate-500 uppercase">Certified</p>
                      </div>
                      <div className="w-px h-10 bg-slate-200"></div>
                      <div>
                        <p className="text-3xl font-bold text-emerald-600">Job</p>
                        <p className="text-xs font-bold text-slate-500 uppercase">Ready</p>
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
                <h4 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">Why Choose Us</h4>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  We Don't Just Teach. <br />
                  <span className="text-slate-400">We Create Experts.</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  At <strong>Laptop Solutions & Enterprises</strong>, we believe that true engineering lies in the hands. Reading a book won't fix a dead motherboard; holding a soldering iron and understanding the flow of current will.
                </p>
                <p>
                  Our training center in Patna is equipped with state-of-the-art diagnostic tools, including oscilloscopes, DC power supplies, and BGA rework stations.
                </p>
                <p>
                  Whether you are a student looking for a career, or a shop owner wanting to upgrade your skills, our modules are designed to take you from zero to hero.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Tools We Master</p>
                  <div className="flex gap-6 text-slate-400">
                     <Wrench className="w-8 h-8 hover:text-blue-600 transition-colors" />
                     <Cpu className="w-8 h-8 hover:text-purple-600 transition-colors" />
                     <Monitor className="w-8 h-8 hover:text-emerald-600 transition-colors" />
                     <Settings className="w-8 h-8 hover:text-yellow-500 transition-colors" />
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 3: SERVICE INTEGRATION (NEWLY ADDED)
      ================================================================== */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
           <SectionHeader 
             subtitle="Our Expertise"
             title="Premium Repair Services"
             description="Beyond training, we operate a fully functional service center. We fix what others can't."
             dark={true}
           />
           
           <motion.div 
             variants={staggerContainer}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
           >
             {SERVICES_LIST.map((service, index) => (
                <ServiceCard 
                  key={index}
                  {...service}
                />
             ))}
           </motion.div>

           {/* <div className="mt-16 text-center">
              <Link href="/services" className="inline-flex items-center text-white font-bold text-lg hover:text-blue-400 transition-colors">
                 View All Services <ArrowRight className="ml-2" />
              </Link>
           </div> */}
        </div>
      </section>

      {/* ==================================================================
          SECTION 4: PHILOSOPHY / VALUES
      ================================================================== */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-40 mix-blend-soft-light pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            subtitle="Our Approach"
            title="Training Philosophy"
            description="We bridge the gap between theoretical knowledge and real-world application. Here is how we ensure your success."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {PHILOSOPHY.map((value, idx) => (
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
          SECTION 5: COURSE MODULES
      ================================================================== */}
      <section id="courses" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Syllabus</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900">
                Comprehensive Training <br /> Modules
              </h3>
            </div>
            <Link href="/contact" className="hidden md:flex group items-center text-blue-600 font-bold border-b-2 border-blue-100 hover:border-blue-600 transition-all pb-1">
              Download Brochure <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINING_MODULES.map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-300"
              >
                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                  {module.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{module.title}</h4>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {module.desc}
                </p>
                <ul className="space-y-2">
                  {module.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-xs font-semibold text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
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
          SECTION 6: LEARNING PATH
      ================================================================== */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Your Learning Path</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2"></div>
            <div className="space-y-12">
              {LEARNING_PATH.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-5/12"></div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-600 z-10 transform -translate-x-1/2 flex items-center justify-center shadow-lg">
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="ml-12 md:ml-0 w-full md:w-5/12 bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow relative">
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b border-l border-slate-100 transform rotate-45 ${idx % 2 === 0 ? '-left-2.5' : '-right-2.5 border-b-0 border-l-0 border-t border-r'}`}></div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-black text-slate-200">{step.step}</span>
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
          SECTION 7: STATS
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
                <div className="text-sm md:text-base font-medium text-blue-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 8: PRICING / FEES
      ================================================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Course Fees</h2>
            <p className="text-lg text-slate-600">
              Investing in your skills pays the highest interest. Affordable plans with installment options available.
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
                className={`relative flex flex-col p-8 rounded-3xl bg-white border ${plan.accent} ${plan.recommended ? 'shadow-2xl shadow-blue-500/20 z-10 scale-105' : 'shadow-xl'}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Best Value
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
                      <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.recommended ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="text-sm text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                    plan.recommended 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 9: FINAL CTA
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
              Start Your Career in <br />
              <span className="text-blue-600">Hardware Engineering</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
              Limited seats available per batch to ensure personal attention. Secure your spot today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-600/30"
              >
                Join Now <Rocket className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Visit Center
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}