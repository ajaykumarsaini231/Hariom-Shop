"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Loader2, 
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Globe,
  HelpCircle,
  ChevronDown,
  Check,
  Server,
  Shield,
  TrendingUp
} from "lucide-react";

// ==================================================================================
// 1. ANIMATION CONFIGURATION
// ==================================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] as const 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// ==================================================================================
// 2. DATA CONSTANTS
// ==================================================================================

const CONTACT_DETAILS = [
  {
    id: "phone",
    icon: <Phone className="w-6 h-6" />,
    label: "Phone / WhatsApp",
    value: "+91 81074 69345",
    link: "tel:+918107469345",
    subtext: "Mon-Sat, 9am - 9pm IST",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200"
  },
  {
    id: "email",
    icon: <Mail className="w-6 h-6" />,
    label: "Email Address",
    value: "nabalsaini231@gmail.com",
    link: "mailto:nabalsaini231@gmail.com",
    subtext: "For projects & inquiries",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200"
  },
  {
    id: "location",
    icon: <MapPin className="w-6 h-6" />,
    label: "Location",
    value: "IIT Patna Campus",
    link: "#map",
    subtext: "Bihta, Bihar, India",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200"
  }
];

const PRICING_PLANS = [
  {
    id: 1,
    title: "Basic Website",
    target: "Small businesses, portfolio, personal sites",
    price: "₹7,000 – ₹10,000",
    features: [
      "4–6 pages",
      "Mobile responsive",
      "Contact form + Google Maps",
      "SEO basics (titles, meta)",
      "Fast loading",
    ],
  },
  {
    id: 2,
    title: "Standard Business",
    target: "Shops, salons, clinics, freelancers",
    price: "₹15,000 – ₹20,000",
    features: [
      "Everything in Basic",
      "Custom Design",
      "Photo gallery",
      "Social links & call button",
      "Domain + hosting guidance",
    ],
    highlight: true, 
  },
  {
    id: 3,
    title: "Professional",
    target: "Growing businesses, services, restaurants",
    price: "₹24,000 – ₹30,000",
    features: [
      "Everything in Standard",
      "UI/UX improved layout",
      "Better conversion focus",
      "Newsletter / lead form",
      "CMS (WordPress/Next.js)",
    ],
  },
  {
    id: 4,
    title: "E-Commerce",
    target: "Online selling stores",
    price: "Starts at ₹20,000",
    features: [
      "Product listing",
      "Cart & checkout",
      "Payment (Stripe/Razorpay)",
      "Inventory management",
      "User accounts",
    ],
  },
  {
    id: 5,
    title: "Landing Page",
    target: "Ads, campaigns, product launch",
    price: "₹5,000 – ₹12,000",
    features: [
      "One high-converting page",
      "Lead form + CTA",
      "Simple analytics",
      "Fast Turnaround",
    ],
  },
  {
    id: 6,
    title: "Website Redesign",
    target: "Old websites that need a refresh",
    price: "₹15,000 – ₹40,000",
    features: ["Visual upgrade", "Speed improvements", "SEO fixes", "Modern Tech Stack"],
  },
];

const FAQS = [
  {
    question: "What services do you offer?",
    answer: "I specialize in Full Stack Development (Next.js, MERN), AI Integration, and Custom Website Development for businesses and startups."
  },
  {
    question: "What is your typical project timeline?",
    answer: "A standard business website typically takes 1-2 weeks. Complex web applications with backend logic usually require 3-4 weeks depending on the features."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, absolutely. I provide 1 month of free support after delivery to ensure everything runs smoothly, with optional maintenance packages available."
  }
];

// ==================================================================================
// 3. MAIN COMPONENT
// ==================================================================================

export default function ContactPage() {
  // --- Form State Management ---
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call (Replace with actual backend logic later)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormState({ name: "", email: "", phone: "", service: "Web Development", message: "" });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* ==================================================================================
          SECTION: HERO
      ================================================================================== */}
      <section className="relative w-full py-24 lg:py-32 bg-slate-900 overflow-hidden text-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-8 shadow-xl shadow-indigo-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Available for Freelance & Hiring
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                Extraordinary.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or just want to discuss tech? I'm <strong>Ajay Kumar Saini</strong>, 
              an engineer from <strong>IIT Patna</strong>, ready to bring your vision to life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================================
          SECTION: CONTACT CARDS
      ================================================================================== */}
      <section className="relative z-20 px-4 -mt-16 mb-24">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {CONTACT_DETAILS.map((item) => (
              <motion.a
                key={item.id}
                href={item.link}
                variants={fadeInUp}
                className={`group relative bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-transparent transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent ${item.border} opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`}></div>
                
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-2">{item.label}</h3>
                  <p className="text-xl md:text-2xl font-bold text-slate-900 mb-1 truncate">{item.value}</p>
                  <p className="text-slate-400 text-sm">{item.subtext}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================================================================================
          SECTION: PRICING (ADDED AS REQUESTED)
      ================================================================================== */}
      <section className="py-12 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-2 block">Transparent Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Invest in Your Growth.
            </h2>
            <p className="text-lg text-slate-600">
              Clear, upfront pricing packages designed for businesses at every stage.
              No hidden fees, just quality engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={plan.id}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                  plan.highlight
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-indigo-500/20"
                    : "bg-white text-slate-900 border-slate-200 hover:shadow-xl hover:border-indigo-200"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p
                    className={`text-sm mb-6 ${
                      plan.highlight ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.target}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-2xl font-extrabold ${
                        plan.highlight
                          ? "text-white"
                          : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                      }`}
                    >
                      {plan.price}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`mt-1 p-0.5 rounded-full ${
                          plan.highlight ? "bg-indigo-500/20" : "bg-indigo-50"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 ${
                            plan.highlight ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          plan.highlight ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Link to Contact Form Section */}
                <Link
                  href="#contact-form"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                    plan.highlight
                      ? "bg-white text-slate-900 hover:bg-indigo-50"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pricing Notes Section */}
          <div className="mt-16 bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100">
            <h4 className="text-xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Client Need-to-Knows
            </h4>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  <Server className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Domain & Hosting</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Not included in base price. <br />
                    <span className="font-semibold">Domain:</span> ₹800–₹1500/yr <br />
                    <span className="font-semibold">Hosting:</span> ₹2k–₹8k/yr
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Maintenance</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Optional monthly support for updates, security & backups:
                    <br />
                    <span className="font-semibold">₹2,000 – ₹6,000 / month</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">SEO & Marketing</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Basic SEO included in all professional plans. Advanced SEO + Content
                    Strategy is priced separately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================================
          SECTION: MAIN CONTENT (FORM + MAP)
      ================================================================================== */}
      <section className="py-12 lg:py-24" id="contact-form">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* ----------------------------------------------------
                LEFT COLUMN: CONTACT FORM
            ---------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                {/* Decorative Top Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

                <div className="p-8 md:p-12">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <MessageSquare className="text-indigo-600" />
                      Send Me a Message
                    </h2>
                    <p className="text-slate-600">
                      Fill out the form below for project inquiries, freelance work, or just to say hello. I usually respond within 24 hours.
                    </p>
                  </div>

                  {isSuccess ? (
                    // Success State View
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-green-700">
                        Thank you for reaching out, Ajay. I will get back to you shortly at {formState.email}.
                      </p>
                    </motion.div>
                  ) : (
                    // Form View
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formState.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formState.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+91 98765 43210"
                            value={formState.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="service" className="text-sm font-semibold text-slate-700">Service Interest</label>
                          <div className="relative">
                            <select
                              id="service"
                              name="service"
                              value={formState.service}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 appearance-none cursor-pointer"
                            >
                              <option>Web Development</option>
                              <option>App Development</option>
                              <option>AI Integration</option>
                              <option>Consulting</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-slate-700">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell me about your project needs..."
                          value={formState.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send size={20} />
                          </>
                        )}
                      </button>
                      
                      <p className="text-center text-xs text-slate-400 mt-4">
                        Your information is safe. I never spam.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------
                RIGHT COLUMN: MAP & INFO
            ---------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              
              {/* --- MAP WIDGET --- */}
              <div id="map" className="w-full bg-white p-2 rounded-3xl shadow-xl border border-slate-100 group">
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-slate-200">
                  {/* Google Map Iframe Integration */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3807409109218!2d84.8487216753929!3d25.53564477749464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed577f6954a4ab%3A0x6ce8f1b9fc2aa02a!2sIndian%20Institute%20of%20Technology%2C%20Patna!5e1!3m2!1sen!2sin!4v1767423348255!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    title="Ajay Kumar Saini Location"
                  ></iframe>

                  {/* Location Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-start gap-3">
                    <div className="bg-red-50 p-2 rounded-full text-red-500 shrink-0">
                      <MapPin size={20} fill="currentColor" className="fill-red-500/20" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Primary Location</p>
                      <p className="text-sm font-bold text-slate-900">IIT Patna Campus, Bihta</p>
                      <p className="text-xs text-slate-500">Bihar, India - 801103</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- CONNECT WIDGET --- */}
              <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Globe size={180} />
                </div>
                
                <h3 className="text-2xl font-bold mb-6 relative z-10 flex items-center gap-2">
                  <Clock className="text-indigo-400" /> Availability
                </h3>
                
                <div className="space-y-4 relative z-10 text-slate-300">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Status</span>
                    <span className="font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs">ONLINE NOW</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-3">
                    <span>Mon - Fri</span>
                    <span className="font-semibold text-white">10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between text-indigo-200">
                    <span>Weekend</span>
                    <span className="font-semibold">By Appointment</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700 relative z-10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect Socially</p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/ajay-kumar-saini-44b99a284" },
                      { icon: <Github size={20} />, href: "https://github.com/ajaykumarsaini231" },
                      { icon: <Twitter size={20} />, href: "#" }
                    ].map((social, idx) => (
                      <a 
                        key={idx}
                        href={social.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300 border border-slate-700 hover:border-indigo-400 hover:scale-110"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================================
          SECTION: FAQ & ADDITIONAL INFO
      ================================================================================== */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-2 block">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Before You Contact</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index} 
                className="border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-50 hover:bg-indigo-50/50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-lg flex items-center gap-3">
                    <HelpCircle size={20} className="text-indigo-500" />
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 ${activeFaq === index ? "rotate-180 text-indigo-600" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================================
          SECTION: FOOTER CTA
      ================================================================================== */}
      <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Prefer to chat on WhatsApp?</h2>
          <a 
            href="https://wa.me/918107469345" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#20bd5a] hover:scale-105 transition-all shadow-lg shadow-green-900/20"
          >
            <MessageSquare size={24} />
            Chat on WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}