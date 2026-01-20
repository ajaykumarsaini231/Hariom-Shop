import "./globals.css";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "@/app/context/Authprovider";
import Header from "../components/header";
import Footer from "../components/Footer";
import Newsletter from "@/components/Newsletter";
import { Toaster } from "react-hot-toast";
import type { Metadata, Viewport } from "next";

// --- 🚀 SITE CONFIGURATION ---
const siteInfo = {
  name: "Laptop Solutions & Enterprises",
  description: "#1 Laptop Repair Center in Patna (SP Verma Road). We are the leading wholesale distributor of laptop screens, keyboards, batteries, and motherboards. Expert Chip-Level Repair & Training Institute.",
  url: "https://laptopsolutions.shop",
  twitterHandle: "@LaptopSolutionsPatna",
  phonePrimary: "+91-9122901467",
  phoneSecondary: "+91-9334730111",
  address: "SP Verma Road, Opposite Om Complex 1st Floor, Patna - 800001, Bihar",
};

// --- 📱 VIEWPORT SETTINGS ---
export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// --- 🔍 METADATA (SEO) ---
export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),

  // Title Strategy: [Service] + [Location] + [Brand]
  // Front-loading "Patna" is critical for local ranking.
  title: {
    default: "Laptop Repair Patna | Wholesale Parts & Chip Level Training | Laptop Solutions",
    template: `%s | ${siteInfo.name} - Patna`,
  },

  description: siteInfo.description,

  // Keywords: Mix of English, Hinglish, and specific technical terms
  keywords: [
    // Primary Local Keywords
    "Laptop Repair Patna", "Computer Shop in Patna", "Second Hand Laptop Patna",
    "Laptop Accessories Shop Patna", "SP Verma Road Laptop Market",
    
    // Service Specific
    "Chip Level Laptop Repair Patna", "Motherboard Repair Service Bihar",
    "Broken Laptop Screen Replacement Patna", "Laptop Hinge Repair Cost Patna",
    "MacBook Repair Center Patna", "Apple Service Center Patna (Third Party)",
    
    // Wholesale/B2B
    "Laptop Spare Parts Wholesale Patna", "Laptop Battery Distributor Bihar",
    "Laptop Keyboard Wholesale Price", "Original Laptop Screen Dealer Patna",
    
    // Education/Training
    "Laptop Repairing Course Patna", "Mobile & Laptop Repair Institute",
    "Chip Level Training Fees", "BGA Machine Training Patna",
    
    // Hinglish (Voice Search Optimization)
    "Patna me sabse sasta laptop parts", "Laptop banwane ki dukan",
    "Laptop repairing center near me", "Purana laptop kharidna hai"
  ],

  authors: [{ name: "Ajay (Admin)", url: siteInfo.url }],
  creator: siteInfo.name,
  publisher: siteInfo.name,
  applicationName: "Laptop Solutions App",
  category: "Technology",

  // Local SEO Geo-Tags
  other: {
    "geo.region": "IN-BR", // India, Bihar
    "geo.placename": "Patna",
    "geo.position": "25.6100;85.1414",
    "ICBM": "25.6100, 85.1414",
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

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteInfo.url,
    title: "Best Laptop Repair & Wholesale Parts in Patna | Laptop Solutions",
    description: "Visit Laptop Solutions on SP Verma Road for wholesale prices on screens, batteries, and expert motherboard repair. Call +91-9122901467.",
    siteName: siteInfo.name,
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Laptop Solutions Shop Front - SP Verma Road Patna",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Laptop Solutions Patna - Wholesale & Repair",
    description: "Best rates for Laptop Parts & Chip Level Repair in Bihar.",
    creator: siteInfo.twitterHandle,
    images: ["/logo.jpeg"],
  },

  verification: {
    google: "F9kYqMYzfwOnSoj_LeLCIFGOIFdCnsD4rpFqm8mLSvE",
  },
  

  alternates: {
    canonical: siteInfo.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // --- 🧠 JSON-LD SCHEMA (Advanced Local SEO) ---
  
  // 1. LocalBusiness: Combined ComputerStore and RepairShop
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ComputerStore", "ElectronicsRepairShop"], 
    "name": siteInfo.name,
    "image": [
      `${siteInfo.url}/logo.jpeg`,
      `${siteInfo.url}/store-front.jpg`
    ],
    "@id": siteInfo.url,
    "url": siteInfo.url,
    "telephone": siteInfo.phonePrimary,
    "priceRange": "₹₹", // Moderate pricing
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SP Verma Road, Opposite Om Complex 1st Floor",
      "addressLocality": "Patna",
      "addressRegion": "Bihar",
      "postalCode": "800001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.6100,
      "longitude": 85.1414
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Patna"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bihar"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/laptopsolutionspatna", 
      "https://www.instagram.com/laptopsolutions",
      "https://wa.me/919122901467",
      "https://g.page/laptopsolutionspatna" // GMB Link if available
    ],
    // Explicitly listing services helps Google understand the business better
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Laptop Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Motherboard Chip Level Repair"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Laptop Screen Replacement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MacBook Logic Board Repair"
          }
        }
      ]
    }
  };

  // 2. Course Schema: Optimized for "Training" keywords
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced Chip Level Laptop Repair Training Course",
    "description": "A comprehensive 3-month course in Patna covering BGA machine operation, schematic reading, and motherboard diagnostics.",
    "provider": {
      "@type": "Organization",
      "name": siteInfo.name,
      "sameAs": siteInfo.url
    },
    "offers": {
      "@type": "Offer",
      "category": "Vocational Training",
      "priceCurrency": "INR",
      "price": "15000", // Example price, helps richer results
      "availability": "https://schema.org/InStock"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "location": "Patna, Bihar"
    }
  };

  // 3. Breadcrumb Schema: Helps site structure in SERPs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteInfo.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": `${siteInfo.url}/shop`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Repair Services",
        "item": `${siteInfo.url}/services`
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Inject JSON-LD Schema Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen flex flex-col">
              {children}
            </main>
            <Toaster position="top-center" reverseOrder={false} />
            <Newsletter />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}