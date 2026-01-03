"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Rocket,
  Globe,
  ArrowRight,
  Phone,
  Zap,
  MessageSquare,
  ChevronDown,
  Check,
  Server,
  Shield,
  TrendingUp,
} from "lucide-react";

// --- ANIMATION CONFIG ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- DATA: REAL IMAGES FROM UNSPLASH ---
const projects = [
  {
    title: "Dreamora - Modern E-Commerce",
    category: "Full Stack Development",
    desc: "A premium shopping experience with real-time inventory, secure stripe payments, and an admin dashboard.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    stats: "200% Sales Boost",
    accent: "border-blue-500/20",
  },
  {
    title: "Questivo - AI EdTech Platform",
    category: "AI & Education",
    desc: "Intelligent learning platform using Llama-3 AI to generate personalized quizzes and track student progress.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    tags: ["React 19", "AI Agents", "Analytics"],
    stats: "10k+ Active Users",
    accent: "border-purple-500/20",
  },
  {
    title: "Luxe Interiors - Corporate",
    category: "Brand & Identity",
    desc: "A minimalist, motion-heavy portfolio for a high-end interior design firm. Focus on visual storytelling.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
    tags: ["Framer Motion", "UI/UX", "SEO"],
    stats: "Award Winning Design",
    accent: "border-orange-500/20",
  },
  {
    title: "Urban Eats - Restaurant App",
    category: "Local Business",
    desc: "Mobile-first food ordering system for a local chain. Features live delivery tracking and table booking.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
    tags: ["Mobile First", "PWA", "Maps API"],
    stats: "40% More Orders",
    accent: "border-green-500/20",
  },
];

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "Blazing Fast Speed",
    desc: "I build on Next.js, making your site load instantly. Google loves fast sites, and so do your customers.",
    bg: "bg-blue-500",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-white" />,
    title: "Mobile Perfection",
    desc: "Your site will look stunning on every device. I test on iPhone, Android, and Tablets to ensure perfection.",
    bg: "bg-purple-500",
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "SEO Domination",
    desc: "Rank higher on Google Maps and Search. I structure every page to capture local traffic in your city.",
    bg: "bg-green-500",
  },
  {
    icon: <Code2 className="w-6 h-6 text-white" />,
    title: "Bulletproof Code",
    desc: "No buggy templates. As an engineer, I write clean, secure code that doesn't break when you need it most.",
    bg: "bg-orange-500",
  },
];

// --- NEW PRICING DATA ---
const pricingPlans = [
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
    highlight: true, // Adds a visual pop
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

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/20 blur-[120px] rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 blur-[120px] rounded-full mix-blend-multiply"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                Accepting New Clients
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
              >
                I Build Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Masterpieces.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Hi, I'm{" "}
                <span className="font-bold text-slate-900">Ajay Kumar Saini</span>
                . I combine IIT-level engineering with premium design to build
                websites that don't just look good—they dominate the market.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 hover:scale-105 transition-all shadow-xl hover:shadow-2xl shadow-indigo-500/20"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
                >
                  View My Work
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern Dashboard Design"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          STATS BANNER
      ========================================= */}
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-700">
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-indigo-400">IIT</p>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest">
                Patna Engineer
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-indigo-400">2%</p>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest">
                Top JEE Ranker
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-indigo-400">10+</p>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest">
                Projects Live
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-indigo-400">24/7</p>
              <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest">
                Tech Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SERVICES SECTION
      ========================================= */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
              My Expertise
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Built for Growth.
            </h3>
            <p className="text-lg text-slate-600">
              I don't use drag-and-drop builders. I engineer digital assets
              tailored to your specific business goals using the latest
              technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="group relative p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.bg} transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          PORTFOLIO SECTION
      ========================================= */}
      <section id="portfolio" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Featured Work
              </h2>
              <p className="text-slate-600 max-w-xl">
                A selection of projects where design meets engineering excellence.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Case Study
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      {project.stats}
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          NEW PRICING SECTION
      ========================================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
              Transparent Pricing
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Invest in Your Growth.
            </h3>
            <p className="text-lg text-slate-600">
              Clear, upfront pricing packages designed for businesses at every stage.
              No hidden fees, just quality engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
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
                      className={`text-3xl font-extrabold ${
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

                <Link
                  href="/contact"
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

      {/* =========================================
          FAQ SECTION
      ========================================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Everything you need to know about working with me.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How much does a website cost?",
                a: "Every project is unique. A simple business landing page starts at a lower budget, while complex e-commerce platforms require more investment. Check out the Pricing section above for detailed packages.",
              },
              {
                q: "How long will it take?",
                a: "A standard 5-page business website takes about 7-10 days. E-commerce sites typically take 2-3 weeks to ensure payment gateways and product uploads are perfect.",
              },
              {
                q: "Do you provide hosting?",
                a: "Yes! I can set up your domain and high-speed hosting so you don't have to worry about the technical side.",
              },
              {
                q: "Will I be able to edit the site myself?",
                a: "Absolutely. I can build an easy-to-use admin panel where you can update text, images, and prices without knowing any code.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-300 bg-white"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-lg">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      activeFaq === i ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
              Ready to Upgrade Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Business Online?
              </span>
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
              Your competitors are already online. Don't fall behind. Let's build a
              website that drives real revenue for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:+918107469345"
                className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl"
              >
                <Phone className="mr-3 w-5 h-5" />
                Call +91 8107469345
              </a>

              <a
                href="mailto:nabalsaini231@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <MessageSquare className="mr-3 w-5 h-5" />
                Email Me
              </a>
            </div>

            <p className="mt-8 text-slate-500 text-sm">
              Free Consultation • No Obligations • 100% Satisfaction
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          FLOATING WHATSAPP BUTTON
      ========================================= */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          href="https://wa.me/918107469345"
          target="_blank"
          className="flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-2xl hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 group"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-8 h-8 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}