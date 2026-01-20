"use client";

import React, { useState } from "react";
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
  Facebook,
  Instagram,
  Twitter,
  Globe,
  HelpCircle,
  ChevronDown,
  Smartphone,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

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

// ==================================================================================
// 2. DATA CONSTANTS
// ==================================================================================

const CONTACT_DETAILS = [
  {
    id: "phone",
    icon: <Phone className="w-6 h-6" />,
    label: "Call / WhatsApp",
    value: "+91 91229 01467",
    link: "tel:+919122901467",
    subtext: "Secondary: +91 93347 30111",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200"
  },
  {
    id: "email",
    icon: <Mail className="w-6 h-6" />,
    label: "Email Address",
    value: "laptopsolutionlse@gmail.com",
    link: "mailto:laptopsolutionlse@gmail.com",
    subtext: "For corporate inquiries",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200"
  },
  {
    id: "location",
    icon: <MapPin className="w-6 h-6" />,
    label: "Service Center",
    value: "SP Verma Road, Patna",
    link: "#map",
    subtext: "Opp. Om Complex, 1st Floor",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200"
  }
];

const FAQS = [
  {
    question: "Do you provide a warranty on repairs?",
    answer: "Yes, we provide up to 6 months of warranty on specific spare parts and chip-level repairs. Please ask our technician for details on your specific service."
  },
  {
    question: "How long does a typical repair take?",
    answer: "Minor issues like screen or battery replacement can be done in 1-2 hours. Complex motherboard/chip-level repairs typically take 24-48 hours for testing and quality assurance."
  },
  {
    question: "Do you sell original spare parts?",
    answer: "Absolutely. We stock genuine original spare parts for HP, Dell, Lenovo, Asus, and Apple. We also offer high-quality compatible options for budget-friendly needs."
  }
];

// ==================================================================================
// 3. MAIN COMPONENT
// ==================================================================================

export default function ContactPage() {
  // --- Form State Management ---
  const [formState, setFormState] = useState({
    name: "",
    email: "", // Added Email field
    phone: "",
    service: "Chip Level Repair (Dead Laptop)",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");

    try {
      // API Call to your backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/quary-messages/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          subject: formState.service, // Mapping 'service' dropdown to 'subject'
          message: formState.message,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        // console.log(data.error)
        throw new Error(data.error || "Failed to send message");
      }

      // Success Logic
      setIsSuccess(true);
      toast.success("Message sent successfully!");
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: "", email: "", phone: "", service: "Chip Level Repair (Dead Laptop)", message: "" });
      }, 5000);

    } catch (error: any) {
      console.error("Submission Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* ==================================================================================
          SECTION: HERO
      ================================================================================== */}
      <section className="relative w-full py-24 lg:py-32 bg-slate-900 overflow-hidden text-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-semibold tracking-wide uppercase mb-8 shadow-xl shadow-blue-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Open Mon - Sat (10 AM - 8 PM)
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Expert Repairs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient-x">
                Genuine Parts.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Facing issues with your laptop? Visit <strong>Laptop Solutions & Enterprises</strong> on SP Verma Road. 
              We specialize in complex logic board repairs and original component replacements.
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
                {/* Hover Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent ${item.border} opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`}></div>
                
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-2">{item.label}</h3>
                  <p className="text-xl font-bold text-slate-900 mb-1 truncate">{item.value}</p>
                  <p className="text-slate-400 text-sm font-medium">{item.subtext}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
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
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

                <div className="p-8 md:p-12">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <MessageSquare className="text-blue-600" />
                      Get a Quick Quote
                    </h2>
                    <p className="text-slate-600">
                      Tell us about your device issue or spare part requirement. We usually respond via WhatsApp or Email within an hour.
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
                      <h3 className="text-xl font-bold text-green-900 mb-2">Inquiry Sent!</h3>
                      <p className="text-green-700">
                        Thanks! We have received your query. Our team will contact you at {formState.phone} or {formState.email} shortly.
                      </p>
                    </motion.div>
                  ) : (
                    // Form View
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {errorMessage && (
                         <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm">
                            <AlertCircle size={16} /> {errorMessage}
                         </div>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Amit Kumar"
                            value={formState.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                          />
                        </div>

                        {/* Email Field (Added) */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="amit@example.com"
                            value={formState.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                         {/* Phone Field */}
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Mobile Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="+91 91229 01467"
                            value={formState.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                          />
                        </div>

                        {/* Service Selection */}
                        <div className="space-y-2">
                          <label htmlFor="service" className="text-sm font-semibold text-slate-700">Issue / Requirement</label>
                          <div className="relative">
                            <select
                              id="service"
                              name="service"
                              value={formState.service}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 appearance-none cursor-pointer"
                            >
                              <option>Chip Level Repair (Dead Laptop)</option>
                              <option>Screen Replacement</option>
                              <option>Battery / Charger Issue</option>
                              <option>Keyboard / Body Panel</option>
                              <option>SSD / RAM Upgrade</option>
                              <option>Hinge Repair</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-slate-700">Describe the Issue</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          placeholder="e.g., My HP laptop is not turning on, blinking light..."
                          value={formState.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" /> Processing...
                          </>
                        ) : (
                          <>
                            Submit Inquiry <Send size={20} />
                          </>
                        )}
                      </button>
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
                  {/* Google Map Iframe */}
                  <iframe 
                    src="https://maps.google.com/maps?q=Laptop+Solutions+and+Enterprises+SP+Verma+Road+Patna&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    title="Laptop Solutions Patna Location"
                  ></iframe>

                  {/* Location Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-start gap-3">
                    <div className="bg-red-50 p-2 rounded-full text-red-500 shrink-0">
                      <MapPin size={20} fill="currentColor" className="fill-red-500/20" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Store Location</p>
                      <p className="text-sm font-bold text-slate-900">SP Verma Road, Patna - 01</p>
                      <p className="text-xs text-slate-500">Opposite Om Complex, 1st Floor</p>
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
                  <Clock className="text-blue-400" /> Availability
                </h3>
                
                <div className="space-y-4 relative z-10 text-slate-300">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Status</span>
                    <span className="font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs">OPEN NOW</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-3">
                    <span>Mon - Sat</span>
                    <span className="font-semibold text-white">10:00 AM - 08:00 PM</span>
                  </div>
                  <div className="flex justify-between text-blue-200">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700 relative z-10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Facebook size={20} />, href: "#" },
                      { icon: <Instagram size={20} />, href: "#" },
                      { icon: <Twitter size={20} />, href: "#" }
                    ].map((social, idx) => (
                      <a 
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 border border-slate-700 hover:border-blue-400 hover:scale-110"
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
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2 block">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Before You Visit</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index} 
                className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-50 hover:bg-blue-50/50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-lg flex items-center gap-3">
                    <HelpCircle size={20} className="text-blue-500" />
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 ${activeFaq === index ? "rotate-180 text-blue-600" : ""}`} 
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
          <h2 className="text-3xl font-bold text-white mb-6">Need Immediate Assistance?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a 
              href="https://wa.me/919122901467" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#20bd5a] hover:scale-105 transition-all shadow-lg shadow-green-900/20"
            >
              <MessageSquare size={24} />
              Chat on WhatsApp
            </a>
            <a 
              href="tel:+919122901467" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-lg"
            >
              <Smartphone size={24} className="text-blue-600" />
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}