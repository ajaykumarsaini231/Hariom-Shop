"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/app/_zustand/store";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { 
  Heart, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  MessageCircle 
} from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

// --- Types ---
interface Category {
  id: string;
  name: string;
}

interface CategoryPillProps {
  category: Category;
  isSelected: boolean;
  onClick: (id: string) => void;
}

interface Product {
  _id?: string;
  id?: string;
  title: string;
  name?: string;
  description?: string;
  price: number;
  manufacturer: string;
  size: string;
  rating?: number;
  inStock?: number;
  categoryId?: string;
  mainImage: string;
}

type ProductCardProps = {
  product: Product;
};

// --- Helper: Smart Pagination Logic ---
const generatePagination = (currentPage: number, totalPages: number) => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

// --- Mock Data ---
const mockCategories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
];

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone",
    manufacturer: "TechCorp",
    size: "6.1 inch",
    price: 799,
    rating: 4.5,
    inStock: 12,
    categoryId: "1",
    mainImage: "/phone.jpg",
  },
];

// --- Components ---

const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  const baseClasses =
    "px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ease-in-out cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const selectedClasses = "bg-indigo-600 text-white shadow-lg scale-105";
  const unselectedClasses =
    "bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-inset ring-gray-200";

  return (
    <button
      onClick={() => onClick(category.id)}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      }`}
    >
      {category.name}
    </button>
  );
};

/* 🔹 ProductCard component */
const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useProductStore();
  const { addToWishlist } = useWishlistStore();
  const [showDesc, setShowDesc] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  const userId = user?.id || null;
  const isLoggedIn = !!token;
  const imageUrl = `${product.mainImage}`;

  // --- Dynamic Links ---
  const productLink = `https://laptopsolutions.shop/product/${product._id || product.id}`;
  const whatsappMessage = `Hello, I want to ask about or buy this product: *${product.title}*.\nPrice: ₹${product.price}\nLink: ${productLink}`;
  const whatsappUrl = `https://wa.me/919122901467?text=${encodeURIComponent(whatsappMessage)}`;

  // --- Add to Cart ---
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          productId: product._id || product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to add product to cart");
        return;
      }

      addToCart({
        id: (product._id || product.id || "").toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
        amount: 1,
      });

      toast.success("Product added to cart!");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Something went wrong!");
    }
  };

  // --- Add to Wishlist ---
  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            productId: product._id || product.id,
          }),
        }
      );

      if (!res.ok) {
        let message = "Something went wrong!";
        if (res.status === 409) {
          message = "Product is already in your wishlist";
        }
        toast.error(message);
        return;
      }

      addToWishlist({
        id: (product._id || product.id || "").toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
      });

      toast.success("Product added to wishlist!");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col h-full">
      <img
        className="w-full h-48 object-cover cursor-pointer"
        src={imageUrl}
        alt={product.title}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://placehold.co/600x400/cccccc/ffffff?text=Image+Error";
        }}
        onClick={() => router.push(`/product/${product._id || product.id}`)}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-xl font-bold text-gray-800 mb-2 cursor-pointer line-clamp-1"
          onClick={() => router.push(`/product/${product._id || product.id}`)}
        >
          {product.title}
        </h3>

        {/* Description Accordion */}
        <div className="mb-4">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowDesc(!showDesc); }}
                className="flex items-center justify-between w-full text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider py-1 border-b border-gray-100"
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
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed bg-gray-50 p-2 rounded">
                            {product.description || "No description available."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-black text-indigo-600">
              ₹{(product.price || 0).toFixed(2)}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleAddToWishlist}
                className="p-2 rounded-lg border border-gray-200 hover:bg-pink-100 transition cursor-pointer"
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5 text-pink-500" />
              </button>
              {/* <button
                onClick={handleAddToCart}
                className="p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors cursor-pointer"
                title="Add to Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          {/* New Contact Buttons */}
          <div className="flex flex-col gap-2 pt-2">
             <a 
               href="tel:+919122901467"
               className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-50 transition-colors text-sm"
            >
               <Phone size={16} /> Call Now
            </a>
            <a 
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 whitespace-nowrap bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2.5 px-4 rounded-lg transition-all shadow-md shadow-yellow-500/20 text-sm"
            >
               <MessageCircle size={18} /> Buy on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
const CategoryPage = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [loading, setLoading] = React.useState(true);
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  
  // Ref for Scrolling to top of Section
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage, setProductsPerPage] = React.useState(20); 
  const VISIBLE_CATEGORIES_COUNT = 5;

  // --- 1. RESPONSIVE PRODUCTS COUNT LOGIC ---
  React.useEffect(() => {
    const handleResize = () => {
      // If width < 768px (Mobile), show 10, else 20
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

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=all`),
        ]);

        if (!categoriesResponse.ok) throw new Error("Failed to fetch categories");
        if (!productsResponse.ok) throw new Error("Failed to fetch products");

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();

        setCategories([{ id: "all", name: "All Products" }, ...categoriesData]);
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("API call failed, fallback to mock data:", error);
        setCategories(mockCategories);
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Dropdown click outside handler
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Handle Category Change
  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // RESET PAGINATION

    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryId}`
        );
        if (!res.ok) throw new Error("Failed to fetch products by category");
        const categoryProducts = await res.json();
        setFilteredProducts(categoryProducts);
      } catch (err) {
        console.error("Error fetching products by category:", err);
        setFilteredProducts(
          products.filter((p) => p.categoryId === categoryId)
        );
      }
    }
  };

  const handleDropdownCategorySelect = (categoryId: string) => {
    handleCategorySelect(categoryId);
    setIsDropdownOpen(false);
  };

  // --- Pagination Logic ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Smart Dots Generator
  const paginationRange = generatePagination(currentPage, totalPages);

  // UPDATED: Handle Page Change with Conditional Scroll
  const handlePageChange = (pageNumber: number | string, shouldScroll: boolean) => {
    if (typeof pageNumber !== "number") return;

    setCurrentPage(pageNumber);
    
    // Only scroll if it's a Chevron click (shouldScroll is true)
    if (shouldScroll && sectionRef.current) {
        const topOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80; // -80 for sticky header buffer
        window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const visibleCategories = categories.slice(0, VISIBLE_CATEGORIES_COUNT + 1);
  const hiddenCategories = categories.slice(VISIBLE_CATEGORIES_COUNT + 1);

  return (
    <div className="bg-gray-50 min-h-screen font-sans" ref={sectionRef}> {/* Attached Ref Here */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
            Our Product Catalog
          </h1>
          <p className="text-lg text-gray-500">
            Find the best products from our curated collections.
          </p>
        </header>

        {/* Category Selector */}
        <nav className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8">
          {visibleCategories.map((category) => (
            <CategoryPill
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={handleCategorySelect}
            />
          ))}
          {hiddenCategories.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ease-in-out cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-inset ring-gray-200 flex items-center gap-1"
              >
                More
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200 origin-top animate-fade-in-down">
                  <div className="py-1">
                    {hiddenCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() =>
                          handleDropdownCategorySelect(category.id)
                        }
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          selectedCategory === category.id
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-700"
                        } hover:bg-gray-100`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Product Grid */}
        <main className="relative">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {/* --- 2. STICKY TOP PAGINATION (Side of Top) --- */}
              {totalPages > 1 && (
                <div className="sticky top-4 z-30 flex justify-end mb-4 pointer-events-none">
                  <div className="pointer-events-auto bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 flex items-center gap-2">
                     <span className="text-xs font-semibold text-gray-600 px-2">
                        Page {currentPage} of {totalPages}
                     </span>
                     <button
                        onClick={() => handlePageChange(currentPage - 1, true)} 
                        disabled={currentPage === 1}
                        className={`p-1 rounded-full ${
                          currentPage === 1
                            ? "text-gray-300"
                            : "text-gray-700 hover:bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1, true)}
                        disabled={currentPage === totalPages}
                        className={`p-1 rounded-full ${
                          currentPage === totalPages
                            ? "text-gray-300"
                            : "text-gray-700 hover:bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                  </div>
                </div>
              )}

              {currentProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product._id || product.id}
                        product={product}
                      />
                    ))}
                  </div>

                  {/* --- BOTTOM PAGINATION (With Dots) --- */}
                  {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1, true)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md transition-colors ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                        }`}
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
                              currentPage === page
                                ? "bg-indigo-600 text-white shadow-md scale-110"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1, true)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md transition-colors ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center col-span-full py-16">
                  <h3 className="text-2xl font-semibold text-gray-700">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    There are no products available in this category.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;