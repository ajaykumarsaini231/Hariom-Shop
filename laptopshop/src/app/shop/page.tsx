"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/app/_zustand/store";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { toast } from "react-hot-toast";
import { 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X, 
  Heart, 
  Phone, 
  MessageCircle,
  Search, 
  SlidersHorizontal 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- Types ----------------
interface Product {
  _id?: string;
  id?: string;
  title: string;
  manufacturer?: string;
  size?: string;
  price: number;
  rating?: number;
  inStock?: number;
  categoryId?: string;
  mainImage: string;
  description?: string;
}

// ---------------- Helper: Smart Pagination Logic ----------------
// Generates the array like [1, 2, "...", 10] matches reference images
const generatePagination = (currentPage: number, totalPages: number) => {
  const delta = 1; // Number of pages to show on each side of current page
  const range = [];
  const rangeWithDots = [];
  let l;

  // Always show first page, last page, and pages around current
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  // Insert dots where there are gaps
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1); // If gap is just 1 number, show the number instead of dots
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

// ---------------- Components ----------------

// 1. Product Skeleton
const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col h-[480px] animate-pulse">
    <div className="h-48 bg-gray-200 rounded-xl mb-4 w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-6" />
    <div className="mt-auto space-y-3">
      <div className="h-8 bg-gray-200 rounded w-full" />
      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  </div>
);

// 2. Product Card (Updated Design)
const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToWishlist } = useWishlistStore();
  
  // State for Description Accordion
  const [showDesc, setShowDesc] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const userId = user?.id || null;
  const isLoggedIn = !!token;

  const imageUrl = product.mainImage || "https://placehold.co/600x400/f3f4f6/9ca3af?text=No+Image";
  const isOutOfStock = (product.inStock ?? 0) <= 0;

  // --- Dynamic Links ---
  // Generates specific product link for WhatsApp
  const productLink = `https://laptopsolutions.shop/product/${product._id || product.id}`;
  const whatsappMessage = `Hello, I want to ask about or buy this product: *${product.title}*.\nPrice: ₹${product.price}\nLink: ${productLink}`;
  const whatsappUrl = `https://wa.me/919122901467?text=${encodeURIComponent(whatsappMessage)}`;

  // --- Wishlist Handler ---
  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, productId: product._id || product.id }),
      });
      if (!res.ok) {
        if (res.status === 409) toast.error("Already in wishlist");
        else toast.error("Failed to add");
        return;
      }
      addToWishlist({
        id: (product._id || product.id || "").toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
      });
      toast.success("Added to wishlist!");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error(err);
      toast.error("Error adding to wishlist");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Stock Badge */}
      <div className="absolute top-3 left-3 z-10">
        {isOutOfStock ? (
          <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">Out of Stock</span>
        ) : (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">In Stock</span>
        )}
      </div>

      {/* Image Area */}
      <div className="relative h-60 overflow-hidden bg-gray-50 cursor-pointer" onClick={() => router.push(`/product/${product._id || product.id}`)}>
        <img className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out" src={imageUrl} alt={product.title} />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div onClick={() => router.push(`/product/${product._id || product.id}`)} className="cursor-pointer">
          <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.title}</h3>
          <p className="text-slate-500 text-xs mb-3 line-clamp-1">{product.manufacturer || "Generic"}</p>
          
          {/* Price & Wishlist Row */}
          <div className="flex justify-between items-center mb-4">
             {/* <span className="text-xl font-black text-indigo-600">₹{(product.price || 0).toLocaleString()}</span> */}
             <button 
                onClick={handleAddToWishlist} 
                className="p-2 rounded-full border border-gray-100 bg-white text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors shadow-sm"
                title="Add to Wishlist"
             >
                <Heart className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Description Accordion (FAQ Style) */}
        <div className="border-t border-gray-100 py-2 mb-4">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowDesc(!showDesc); }}
                className="flex items-center justify-between w-full text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider py-1"
            >
                Description
                {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
                {showDesc && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-slate-600 text-sm mt-2 leading-relaxed bg-gray-50 p-2 rounded-lg">
                            {product.description || "No specific description available for this item."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2.5">
            {/* Call Button */}
            <a 
               href="tel:+919122901467"
               className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-50 transition-colors text-sm"
            >
               <Phone size={16} /> Call Now
            </a>

            {/* WhatsApp Button (Yellow Style from User) */}
            <a 
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 whitespace-nowrap bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all shadow-md shadow-yellow-500/20 text-sm"
            >
               <MessageCircle size={18} /> Buy on WhatsApp
            </a>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------- MAIN PAGE COMPONENT ----------------
export default function ShopPage() {
  const [categories, setCategories] = React.useState<{id: string, name: string}[]>([]);
  const [currentProducts, setCurrentProducts] = React.useState<Product[]>([]); 
  const [displayProducts, setDisplayProducts] = React.useState<Product[]>([]); 

  // Filter State
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("all");
  const [priceRange, setPriceRange] = React.useState<number>(100000);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState("relevance");
  
  // UI State
  const [loading, setLoading] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(true);
  const [priceOpen, setPriceOpen] = React.useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage, setProductsPerPage] = React.useState(20);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  // 1. INITIAL LOAD
  React.useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=all`)
        ]);

        const cats = await catRes.json();
        const prods = await prodRes.json();

        setCategories([{ id: "all", name: "All Products" }, ...cats]);
        setCurrentProducts(prods);
        setDisplayProducts(prods);
      } catch (error) {
        console.error("Init fetch failed", error);
        toast.error("Failed to load shop data");
      } finally {
        setLoading(false);
      }
    };
    initFetch();
  }, []);

  // 2. RESPONSIVE
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setProductsPerPage(10);
      } else {
        setProductsPerPage(20);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. CATEGORY HANDLER
  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setLoading(true);
    setCurrentPage(1);

    try {
      let newProducts = [];
      if (categoryId === "all") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=all`);
        newProducts = await res.json();
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryId}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        newProducts = await res.json();
      }
      setCurrentProducts(newProducts);
    } catch (error) {
      console.error("Category fetch error", error);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=all`);
      const allProds = await res.json();
      const fallbackFiltered = allProds.filter((p: Product) => p.categoryId === categoryId);
      setCurrentProducts(fallbackFiltered);
    } finally {
      setLoading(false);
      if (window.innerWidth < 768) setMobileMenuOpen(false);
    }
  };

  // 4. FILTER LOGIC
  React.useEffect(() => {
    let result = [...currentProducts];
    setCurrentPage(1);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.title?.toLowerCase() || "").includes(q) || 
        (p.manufacturer?.toLowerCase() || "").includes(q)
      );
    }

    result = result.filter(p => (p.price || 0) <= priceRange);

    if (inStockOnly) {
      result = result.filter(p => (p.inStock || 0) > 0);
    }

    if (sortOrder === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    setDisplayProducts(result);
  }, [currentProducts, searchQuery, priceRange, inStockOnly, sortOrder]);

  // 5. PAGINATION
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  
  // Smart Dots Generator
  const paginationRange = generatePagination(currentPage, totalPages);

  const handlePageChange = (pageNumber: number | string, shouldScroll: boolean) => {
    if (typeof pageNumber !== "number") return;
    
    setCurrentPage(pageNumber);
    if (shouldScroll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 flex items-start gap-8">
        
        {/* --- MOBILE OVERLAY --- */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* --- SIDEBAR --- */}
        <aside className={`
          fixed md:sticky top-0 md:top-24 left-0 z-50 
          h-full md:h-[calc(100vh-6rem)] w-[280px] md:w-64 
          bg-white md:bg-transparent p-6 md:p-0 
          overflow-y-auto transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="font-bold text-xl">Filters</h3>
            <button onClick={() => setMobileMenuOpen(false)}><X /></button>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <button onClick={() => setCategoryOpen(!categoryOpen)} className="flex justify-between w-full font-bold text-slate-700 mb-3">
                Categories
                <ChevronDown className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {categoryOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="space-y-2 overflow-hidden"
                  >
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input 
                            type="radio" 
                            name="category"
                            checked={selectedCategoryId === cat.id} 
                            onChange={() => handleCategoryChange(cat.id)}
                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-indigo-500 checked:border-4 transition-all"
                          />
                        </div>
                        <span className={`text-sm group-hover:text-indigo-600 transition-colors ${selectedCategoryId === cat.id ? "text-indigo-600 font-semibold" : "text-slate-600"}`}>
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <button onClick={() => setPriceOpen(!priceOpen)} className="flex justify-between w-full font-bold text-slate-700 mb-3">
                Price Range
                <ChevronDown className={`transition-transform ${priceOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {priceOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <input 
                      type="range" min="0" max="100000" step="100" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between mt-2 text-sm font-medium text-slate-600">
                      <span>₹0</span>
                      <span className="text-indigo-600">₹{priceRange.toLocaleString()}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => {
                setSelectedCategoryId("all");
                setPriceRange(100000);
                setSearchQuery("");
                handleCategoryChange("all");
              }}
              className="w-full py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 w-full relative">
          
          <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex w-full md:w-auto items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-600">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="rounded text-indigo-600 w-4 h-4" />
                In Stock
              </label>
              <div className="relative">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="appearance-none bg-white border border-gray-200 text-slate-700 text-sm font-semibold py-2.5 pl-4 pr-10 rounded-xl cursor-pointer outline-none">
                  <option value="relevance">Sort: Relevance</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Top Pagination */}
          {totalPages > 1 && (
            <div className="sticky top-4 z-30 flex justify-end mb-4 pointer-events-none">
              <div className="pointer-events-auto bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600 px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage - 1, true)} 
                    disabled={currentPage === 1}
                    className={`p-1 rounded-full ${currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-indigo-100 text-indigo-600"}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1, true)}
                    disabled={currentPage === totalPages}
                    className={`p-1 rounded-full ${currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-indigo-100 text-indigo-600"}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="min-h-[500px]" ref={sectionRef}>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id || product._id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center text-slate-500">
                <Search className="w-12 h-12 mb-4 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-800">No products found</h3>
                <p>Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

          {/* Bottom Pagination (Smart Dots) */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1, true)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {paginationRange.map((page, index) => {
                if (page === "...") {
                  return (
                    <span key={`dots-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">
                      &#8230;
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page, false)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                      currentPage === page ? "bg-indigo-600 text-white shadow-md scale-110" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1, true)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}