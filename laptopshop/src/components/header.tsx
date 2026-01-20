"use client";

import Cookies from 'js-cookie';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "../app/context/ThemeProvider";
import UserPanel from "../components/userPanel";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  LogIn,
  Phone,
  MessageCircle 
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // --- 1. Load User & Token ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    }
  }, []);

  // --- 2. Handle Scroll Effect for Glass UI ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 3. Token Expiry Check ---
  useEffect(() => {
    if (!token) return;

    try {
      const decoded: { exp: number; [key: string]: any } = jwtDecode(token);
      if (Date.now() >= decoded.exp * 1000) {
        handleLogout("Session expired. Please login again.");
      }
    } catch {
      handleLogout("Invalid session. Please login again.");
    }
  }, [token, router]);

  const handleLogout = (msg: string) => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove('Authorization', { path: '/' });
    toast.error(msg);
    router.push("/login");
    setTimeout(() => window.location.reload(), 500);
  };

  // --- 4. Fetch Cart/Wishlist Counts ---
  const fetchCounts = useCallback(async () => {
    if (!user?.id || !token) return;

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [wishlistRes, cartRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${user.id}`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${user.id}`, { headers }),
      ]);

      if (wishlistRes.ok) {
        const wishlistData = await wishlistRes.json();
        setWishlistCount(Array.isArray(wishlistData) ? wishlistData.length : 0);
      }

      if (cartRes.ok) {
        const cartData = await cartRes.json();
        const totalCount = Array.isArray(cartData)
          ? cartData.reduce((sum, item) => sum + (item.quantity || 1), 0)
          : 0;
        setCartCount(totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch counts:", err);
    }
  }, [user, token]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts, pathname]);

  useEffect(() => {
    const handleUpdate = () => fetchCounts();
    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("wishlistUpdated", handleUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("wishlistUpdated", handleUpdate);
    };
  }, [fetchCounts]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ];

  // WhatsApp Query
  const whatsappQuery = encodeURIComponent("Hi, I'm looking for a product that isn't listed on your site. Can you help me check availability?");

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
          scrolled
            ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-black border-transparent"
        }`}
      >
        <div className={`container mx-auto px-4 md:px-6 flex justify-between items-center transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
          
          {/* --- LOGO --- */}
          <Link href="/" className="group inline-block">
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-colors">
                Laptop<span className="text-indigo-600 group-hover:text-indigo-500 transition-colors">Solutions</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.28em] text-slate-500 group-hover:tracking-[0.38em] group-hover:text-indigo-400 transition-all duration-300 uppercase">
                ENTERPRISES
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAV --- */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 relative group ${
                  pathname === item.path
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300 ${
                    pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
          </nav>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-transform hover:rotate-12">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link href="/wishlist" className="relative text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {!user ? (
              <Link href="/login" className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors uppercase tracking-wide">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            ) : (
              <button onClick={() => setIsPanelOpen(true)} className="relative group flex items-center justify-center">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-indigo-500 transition-colors">
                  <img src={user.photoUrl || "https://placehold.co/100x100/6366f1/white?text=U"} alt="User" className="w-full h-full object-cover" />
                </div>
              </button>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-gray-200">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* --- NOTIFICATION BAR (NEW) --- */}
        <div className="bg-slate-900 text-white py-1.5 px-4 text-center border-t border-slate-800">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-4 text-[10px] md:text-xs tracking-wide font-medium">
                <span className="opacity-90">
                    Can't find a product? We might have it in store!
                </span>
                <div className="flex items-center gap-3">
                    <a href="tel:+919122901467" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                        <Phone size={10} className="md:w-3 md:h-3" /> 
                        <span>+91 9122901467</span>
                    </a>
                    <span className="opacity-30 hidden md:inline">|</span>
                    <a href={`https://wa.me/919122901467?text=${whatsappQuery}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
                        <MessageCircle size={10} className="md:w-3 md:h-3" /> 
                        <span>WhatsApp Us</span>
                    </a>
                </div>
            </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col items-center py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-bold tracking-widest uppercase ${pathname === item.path ? "text-indigo-600 dark:text-indigo-400" : "text-gray-800 dark:text-gray-200"}`}
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold tracking-wide uppercase">
                Login Account
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content overlap (Header Height + Notification Bar) */}
      <div className="h-[88px] md:h-[96px]" />

      <UserPanel user={user} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
}