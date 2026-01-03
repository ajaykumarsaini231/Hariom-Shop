import "./globals.css";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "@/app/context/Authprovider";
import Header from "../components/header";
import Footer from "../components/Footer";
import Newsletter from "@/components/Newsletter";
import { Toaster } from "react-hot-toast";
import type { Metadata, Viewport } from "next";

const siteConfig = {
  name: "Ajay Kumar Saini | Expert Full-Stack Developer",
  shortName: "AjayDev",
  title: "Best Website Developer in India | Custom, Fast & Affordable Web Design",
  description: "Looking for the best website developer in India? I build high-performance, SEO-friendly websites using Next.js and AI. From small business landing pages to complex e-commerce stores, get premium quality development at affordable Indian rates. Book a consultation today.",
  url: "https://scaleupweb.vercel.app",
  ogImage: "https://scaleupweb.vercel.app/og-image.jpg",
  logo: "/logo.svg",
  email: "nabalsaini231@gmail.com",
  phone: "+91-8107469345",
  whatsapp: "https://wa.me/918107469345",
  address: "Jaipur, Rajasthan, India",
  twitterHandle: "@your_twitter_handle",
  locale: "en_IN",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "website developer in India",
    "web design agency India",
    "freelance web developer India",
    "best website developer in Jaipur",
    "web developer in Delhi",
    "web developer in Mumbai",
    "web developer in Bangalore",
    "web developer in Hyderabad",
    "web developer in Chennai",
    "web developer in Kolkata",
    "web developer in Pune",
    "web developer in Ahmedabad",
    "web developer in Gurgaon",
    "web developer in Noida",
    "web developer in Chandigarh",
    "web developer in Indore",
    "web developer in Lucknow",
    "web developer in Bhopal",
    "web developer in Patna",
    "web developer in Ranchi",
    "web developer in Raipur",
    "hire developer online India",
    "website development services",
    "custom website design India",
    "responsive web design services",
    "professional website builder",
    "small business website India",
    "low cost website design India",
    "affordable web developer for startup",
    "startup website development packages",
    "corporate website design India",
    "ecommerce website developer India",
    "online store developer India",
    "shopify alternative developer",
    "woocommerce expert India",
    "magento developer India",
    "custom ecommerce solution",
    "payment gateway integration India",
    "razorpay integration expert",
    "stripe payment integration India",
    "React js developer India",
    "Next.js developer India",
    "MERN stack developer India",
    "Node.js developer India",
    "full stack developer India",
    "frontend developer India",
    "backend developer India",
    "javascript expert India",
    "typescript developer India",
    "tailwind css expert",
    "headless CMS developer",
    "sanity io developer",
    "strapi developer",
    "educational website developer",
    "real estate website developer",
    "hotel website developer",
    "restaurant website developer",
    "hospital website developer",
    "clinic website design",
    "portfolio website maker",
    "landing page designer",
    "high converting landing page",
    "SEO friendly website developer",
    "fast loading website builder",
    "google core web vitals expert",
    "mobile first web design",
    "PWA developer India",
    "progressive web app builder",
    "website banwana hai",
    "website banane wala",
    "website kaise banaye",
    "online business kaise start kare",
    "ecommerce website ka price",
    "dukan ke liye website",
    "shop ke liye website",
    "business website cost in India",
    "website banane ka kharcha",
    "website developer number",
    "web designer contact number",
    "sabse sasta website developer",
    "best web designer near me",
    "website maker near me",
    "freelancer website developer",
    "freelance web designer price",
    "website maintenance services",
    "website redesign services",
    "wordpress website developer",
    "custom coding website",
    "website development company Jaipur",
    "website development company Delhi",
    "IT services in India",
    "software developer India",
    "mobile app developer India",
    "digital marketing ready website",
    "lead generation website",
    "appointment booking website",
    "consultancy website design",
    "law firm website design",
    "gym website design",
    "yoga studio website design",
    "travel agency website design",
    "ngo website design",
    "school website design",
    "college website design",
    "coaching institute website design",
    "grocery store website design",
    "fashion store website design",
    "jewelry store website design",
    "electronics store website design",
    "furniture store website design",
    "blog website designer",
    "news portal website developer",
    "magazine website developer",
    "directory website developer",
    "membership website developer",
    "learning management system developer",
    "LMS website design",
    "online course website builder",
    "marketplace website developer",
    "classified website developer",
    "job portal website developer",
    "matrimonial website developer",
    "dating website developer",
    "social media website developer",
    "forum website developer",
    "wiki website developer",
    "knowledge base website developer",
    "help desk website developer",
    "customer support website",
    "intranet website developer",
    "extranet website developer",
    "web portal development",
    "enterprise web development",
    "B2B website development",
    "B2C website development",
    "C2C website development",
    "API development services",
    "database design services",
    "cloud hosting setup",
    "AWS setup for website",
    "Vercel deployment expert",
    "Netlify deployment expert",
    "DigitalOcean setup",
    "domain registration help",
    "SSL certificate installation",
    "website security audit",
    "website speed optimization",
    "website bug fixing",
    "website migration services",
    "content management system",
    "dynamic website developer",
    "static website developer",
    "single page application developer",
    "multi page application developer",
    "cross platform web app",
    "hybrid app developer",
    "native app developer",
    "flutter developer India",
    "react native developer India",
    "website ui ux designer",
    "figma to html",
    "figma to react",
    "figma to nextjs",
    "psd to html",
    "psd to react",
    "adobe xd to react",
    "sketch to react",
    "zeplin to react",
    "invision to react",
    "wireframing services",
    "prototyping services",
    "user research services",
    "usability testing services",
    "accessibility audit",
    "WCAG compliance",
    "GDPR compliance website",
    "privacy policy generator",
    "terms and conditions generator",
    "cookie consent banner",
    "website analytics setup",
    "google analytics 4 setup",
    "google tag manager setup",
    "facebook pixel setup",
    "linkedin insight tag setup",
    "twitter pixel setup",
    "conversion rate optimization",
    "A/B testing services",
    "heatmap analysis",
    "session recording analysis",
    "user journey mapping",
    "persona development",
    "competitor analysis",
    "keyword research for website",
    "on page SEO services",
    "technical SEO services",
    "off page SEO services",
    "link building services",
    "local SEO services",
    "google my business optimization",
    "bing places optimization",
    "apple maps optimization",
    "voice search optimization",
    "image search optimization",
    "video search optimization",
    "schema markup implementation",
    "rich snippets implementation",
    "knowledge graph optimization",
    "featured snippet optimization",
    "sitemap creation",
    "robots txt creation",
    "canonical tag implementation",
    "hreflang tag implementation",
    "meta tag optimization",
    "header tag optimization",
    "alt tag optimization",
    "title tag optimization",
    "description tag optimization",
    "url structure optimization",
    "internal linking strategy",
    "external linking strategy",
    "content marketing strategy",
    "blogging services",
    "guest posting services",
    "article submission services",
    "press release distribution",
    "social media marketing",
    "email marketing services",
    "sms marketing services",
    "whatsapp marketing services",
    "push notification services",
    "chatbot development",
    "live chat integration",
    "helpdesk integration",
    "crm integration",
    "erp integration",
    "accounting software integration",
    "inventory management integration",
    "shipping api integration",
    "logistics api integration",
    "maps api integration",
    "weather api integration",
    "currency converter api",
    "language translator api",
    "text to speech api",
    "speech to text api",
    "image recognition api",
    "face recognition api",
    "sentiment analysis api",
    "machine learning integration",
    "artificial intelligence integration",
    "blockchain integration",
    "cryptocurrency payment integration",
    "nft marketplace development",
    "smart contract development",
    "web3 development",
    "metaverse development",
    "augmented reality web",
    "virtual reality web",
    "3d website development",
    "three js developer",
    "webgl developer",
    "canvas api developer",
    "svg animation expert",
    "gsap animation expert",
    "framer motion expert",
    "lottie animation expert",
    "video background website",
    "parallax scrolling website",
    "scrollytelling website",
    "interactive website design",
    "gamified website design",
    "minimalist website design",
    "brutalist website design",
    "corporate memphis design",
    "glassmorphism design",
    "neumorphism design",
    "material design expert",
    "flat design expert",
    "skeuomorphic design",
    "typographic website design",
    "illustrative website design",
    "photographic website design",
    "dark mode website",
    "light mode website",
    "theme switcher website",
    "multi language website",
    "internationalization expert",
    "localization expert",
    "rtl website support",
    "ltr website support",
    "currency switcher",
    "timezone converter",
    "date time formatter",
    "number formatter",
    "string manipulator",
    "array manipulator",
    "object manipulator",
    "function composer",
    "algorithm expert",
    "data structure expert",
    "problem solver",
    "logical thinker",
    "analytical thinker",
    "creative thinker",
    "innovative thinker",
    "detail oriented",
    "quality focused",
    "customer focused",
    "result oriented",
    "deadline driven",
    "budget friendly",
    "cost effective",
    "value for money",
    "roi focused",
    "business growth partner",
    "digital transformation partner",
    "technology partner",
    "consulting partner",
    "strategic partner",
    "reliable developer",
    "trustworthy developer",
    "honest developer",
    "transparent developer",
    "communicative developer",
    "responsive developer",
    "proactive developer",
    "dedicated developer",
    "passionate developer",
    "experienced developer",
    "skilled developer",
    "talented developer",
    "certified developer",
    "award winning developer",
    "top rated developer",
    "best rated developer",
    "highly recommended",
    "client favorite",
    "industry leader",
    "thought leader",
    "influencer",
    "mentor",
    "coach",
    "trainer",
    "speaker",
    "author",
    "blogger",
    "vlogger",
    "podcaster",
    "community builder",
    "open source contributor",
    "github star",
    "stackoverflow contributor",
    "reddit contributor",
    "quora contributor",
    "linkedin influencer",
    "twitter influencer",
    "instagram influencer",
    "facebook influencer",
    "youtube influencer",
    "tiktok influencer",
    "pinterest influencer",
    "snapchat influencer",
    "telegram influencer",
    "discord influencer",
    "slack influencer",
    "whatsapp influencer",
    "clubhouse influencer",
    "medium writer",
    "dev to writer",
    "hashnode writer",
    "substack writer",
    "newsletter creator",
    "course creator",
    "ebook creator",
    "webinar host",
    "workshop host",
    "meetup organizer",
    "conference organizer",
    "hackathon organizer",
    "competition organizer",
    "judge",
    "panelist",
    "interviewer",
    "guest speaker",
    "keynote speaker"
  ],
  authors: [{ name: "Ajay Kumar Saini", url: siteConfig.url }],
  creator: "Ajay Kumar Saini",
  publisher: "Ajay Kumar Saini",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: siteConfig.logo,
    shortcut: siteConfig.logo,
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Premium Website Development Services by Ajay Saini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  verification: {
    google: "33UQOm1w1UNGwnNTPN1HuPdpuPmqWd-MBr9wl_BlCmg",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        "name": "Ajay Kumar Saini",
        "jobTitle": "Senior Full Stack Developer",
        "alumniOf": "IIT Patna",
        "image": `${siteConfig.url}/profile.jpg`,
        "url": siteConfig.url,
        "sameAs": [
          "https://www.linkedin.com/in/yourprofile",
          "https://github.com/yourprofile",
          "https://twitter.com/yourprofile"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        "name": "Ajay Saini Web Development",
        "image": `${siteConfig.url}${siteConfig.logo}`,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "telephone": siteConfig.phone,
        "email": siteConfig.email,
        "priceRange": "₹5000 - ₹50000",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Rajasthan",
          "addressLocality": "Jaipur"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "26.9124",
          "longitude": "75.7873"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "availableLanguage": [
          {
            "@type": "Language",
            "name": "English",
            "alternateName": "en"
          },
          {
            "@type": "Language",
            "name": "Hindi",
            "alternateName": "hi"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
            "opens": "09:00",
            "closes": "22:00"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Website Development Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic Portfolio Website",
                "description": "5 Page responsive website for personal profiles or small business info.",
                "offers": {
                    "@type": "Offer",
                    "price": "7000",
                    "priceCurrency": "INR"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard Business Website",
                "description": "Custom design, photo gallery, social integration, SEO basics.",
                "offers": {
                    "@type": "Offer",
                    "price": "15000",
                    "priceCurrency": "INR"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Professional Website",
                "description": "UI/UX improved layout, better conversion focus, newsletter/lead form, CMS.",
                "offers": {
                    "@type": "Offer",
                    "price": "24000",
                    "priceCurrency": "INR"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "E-Commerce Online Store",
                "description": "Full online store with payment gateway, inventory, and cart system.",
                "offers": {
                    "@type": "Offer",
                    "price": "20000",
                    "priceCurrency": "INR"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Landing Page",
                "description": "One high-converting page, Lead form + CTA, Simple analytics, Fast Turnaround.",
                "offers": {
                    "@type": "Offer",
                    "price": "5000",
                    "priceCurrency": "INR"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Redesign",
                "description": "Visual upgrade, Speed improvements, SEO fixes, Modern Tech Stack for old websites.",
                "offers": {
                    "@type": "Offer",
                    "price": "15000",
                    "priceCurrency": "INR"
                }
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does a website cost in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every project is unique. A simple business landing page starts at ₹5,000, while complex e-commerce platforms can range from ₹20,000 to ₹50,000. My packages are designed to be affordable for Indian businesses."
            }
          },
          {
            "@type": "Question",
            "name": "How long will it take to build my website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard 5-page business website takes about 7-10 days. E-commerce sites typically take 2-3 weeks to ensure payment gateways and product uploads are perfect."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide hosting and domain services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! I can guide you through purchasing a domain and set up high-speed hosting so you don't have to worry about the technical side."
            }
          },
          {
            "@type": "Question",
            "name": "Will I be able to edit the site myself?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. I build sites using modern CMS tools or provide an easy-to-use admin panel where you can update text, images, and prices without knowing any code."
            }
          },
          {
            "@type": "Question",
            "name": "Is SEO included in the website cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basic SEO (Titles, Meta descriptions, Sitemap, Fast loading speed) is included in all packages. Advanced SEO strategies are available as an add-on service."
            }
          },
          {
            "@type": "Question",
            "name": "Do you make websites for small shops in Jaipur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, I specialize in helping local businesses in Jaipur and Rajasthan get online. I can build websites for shops, salons, coaching centers, and more."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen relative">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Toaster 
                position="top-center" 
                toastOptions={{
                  style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                  },
                  success: {
                    duration: 4000,
                    iconTheme: {
                      primary: '#4ade80',
                      secondary: '#fff',
                    },
                  },
                }}
              />
              <Newsletter />
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}