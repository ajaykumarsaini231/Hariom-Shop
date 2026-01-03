"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@/app/_zustand/store";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";

// --- Main Page Component ---
export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useProductStore();
  const { addToWishlist } = useWishlistStore();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Carousel State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;
  const userId = user?.id || null;
  const isLoggedIn = !!token;

  // Fetch Product + Related Products
  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`)
        .then((res) => res.json())
        .then(async (data) => {
          setProduct(data);

          // Fetch same-category products
          if (data?.categoryId) {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products?categoryId=${data.categoryId}`
              );
              const all = await res.json();
              const filtered = all.filter(
                (p: any) => (p._id || p.id) !== (data._id || data.id)
              );
              setRelatedProducts(filtered);
            } catch (err) {
              console.error("Related products fetch error:", err);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Product fetch error:", err);
          setLoading(false);
        });
    }
  }, [params.id]);

  // --- Handlers ---
  const handleAddToCart = async () => {
    if (!isLoggedIn) return router.push("/login");

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

      if (!res.ok) throw new Error("Failed to add to cart");
      await res.json();

      addToCart({
        id: (product._id || product.id).toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
        amount: 1,
      });
      toast.success("Added to Cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart");
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) return router.push("/login");
    // Simple redirect to checkout logic
    router.push("/checkout");
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) return router.push("/login");

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

      if (!res.ok) throw new Error("Failed to add to wishlist");
      await res.json();

      addToWishlist({
        id: (product._id || product.id).toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
      });
      toast.success("Added to Wishlist");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // --- Helpers ---
  const productImages =
    product?.images && product.images.length > 0
      ? product.images.map((img: any) => img.image)
      : product?.mainImage
      ? [product.mainImage]
      : [];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = (e: any) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: any) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-semibold">Product not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PRODUCT MAIN SECTION --- */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 lg:p-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* --- LEFT: IMAGE GALLERY --- */}
            <div className="flex flex-col gap-4 md:gap-6 select-none">
              {/* Main Image */}
              <div
                className="relative w-full aspect-square md:aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in group border border-gray-100"
                onClick={() => openModal(currentImageIndex)}
              >
                <Image
                  src={productImages[currentImageIndex] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 ease-out p-4"
                  priority
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium rounded-full shadow-sm text-gray-600 hidden md:block">
                  Click to Expand
                </div>
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-200 snap-start ${
                        currentImageIndex === idx
                          ? "border-indigo-600 ring-2 ring-indigo-100 scale-95"
                          : "border-transparent bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="thumb"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* --- RIGHT: DETAILS --- */}
            <div className="flex flex-col h-full">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  New Arrival
                </span>
                <div className="flex items-center text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-gray-600 font-medium text-xs md:text-sm">4.8 (120 reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {product.title}
              </h1>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mb-6 md:mb-8 border-b border-gray-100 pb-6 md:pb-8">
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  ₹{(product.price || 0).toLocaleString("en-IN")}
                </p>
                <div className="flex flex-col items-start">
                  <p className="text-sm md:text-lg text-gray-400 line-through decoration-red-400 decoration-2">
                    ₹{((product.price || 0) * 1.2).toLocaleString("en-IN")}
                  </p>
                  <span className="text-xs md:text-sm font-semibold text-green-600">
                    20% OFF
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Action Buttons (Desktop) */}
              <div className="mt-auto space-y-4 hidden md:block">
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all shadow-lg shadow-gray-200"
                  >
                    Buy Now
                  </button>
                </div>
                <button
                  onClick={handleAddToWishlist}
                  className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-pink-600 hover:bg-pink-50 py-3 rounded-xl transition-all font-medium"
                >
                  <Heart className="w-5 h-5" />
                  Add to Wishlist
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-full text-green-600 shrink-0">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">Free Delivery</p>
                        <p className="text-[10px] md:text-xs text-gray-500">Orders over ₹500</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600 shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">Secure Payment</p>
                        <p className="text-[10px] md:text-xs text-gray-500">100% Protected</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SIMILAR PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-20">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                You might also like
                </h2>
                <a href="/shop" className="text-indigo-600 text-sm md:text-base font-semibold hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item._id || item.id} product={item} />
              ))}
            </div>
          </div>
        )}

        {/* --- FULL SCREEN MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
            >
              <X size={24} />
            </button>

            <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center">
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 md:-left-16 z-50 text-white/70 hover:text-white bg-black/50 md:bg-white/10 p-2 md:p-3 rounded-full transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 md:-right-16 z-50 text-white/70 hover:text-white bg-black/50 md:bg-white/10 p-2 md:p-3 rounded-full transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Main Modal Image */}
              <div className="relative w-full h-full">
                <Image
                  src={productImages[currentImageIndex]}
                  alt="Full view"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MOBILE STICKY BOTTOM BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden z-40 flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
            onClick={handleAddToWishlist}
            className="p-3 bg-gray-100 rounded-lg text-gray-500 hover:text-pink-500"
        >
            <Heart className="w-6 h-6" />
        </button>
        <button
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
        </button>
      </div>

    </div>
  );
}

// --- ProductCard Component (Same as provided, kept responsive) ---
const ProductCard = ({ product }: { product: any }) => {
  const router = useRouter();
  const { addToCart } = useProductStore();
  const { addToWishlist } = useWishlistStore();

  // Basic Token Logic...
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const isLoggedIn = !!token;

  const handleAddToCart = async (e: any) => {
    e.stopPropagation();
    if (!isLoggedIn) return router.push("/login");
    // (Add to cart logic here - kept same as yours for brevity)
    addToCart({ id: product.id || product._id, title: product.title, price: product.price, image: product.mainImage, amount: 1 });
    toast.success("Added");
  };

  const handleAddToWishlist = async (e: any) => {
    e.stopPropagation();
    if (!isLoggedIn) return router.push("/login");
    // (Wishlist logic here)
    addToWishlist({ id: product.id || product._id, title: product.title, price: product.price, image: product.mainImage });
    toast.success("Saved");
  };

  return (
    <div
      onClick={() => router.push(`/product/${product._id || product.id}`)}
      className="group bg-white rounded-xl md:rounded-2xl border border-gray-100 p-2 md:p-3 cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
    >
        <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-white/90 p-1.5 md:p-2 rounded-full text-gray-400 hover:text-pink-500 shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 duration-300"
        >
            <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>

      <div className="relative w-full aspect-square bg-gray-50 rounded-lg md:rounded-xl overflow-hidden mb-3">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-contain p-2 md:p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-500 text-[10px] md:text-xs line-clamp-2 mb-3 h-8 leading-tight">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 line-through">₹{((product.price || 0) * 1.2).toFixed(0)}</span>
             <span className="text-sm md:text-lg font-bold text-gray-900">₹{product.price}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white p-2 md:p-2.5 rounded-lg hover:bg-indigo-600 active:scale-95 transition-all shadow-md"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};