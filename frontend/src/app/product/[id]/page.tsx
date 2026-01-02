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
              console.error(" Related products fetch error:", err);
            }
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error(" Product fetch error:", err);
          setLoading(false);
        });
    }
  }, [params.id]);

  // --- Cart & Wishlist Handlers ---
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
      await res.json(); // Consuming promise

      addToCart({
        id: product._id || product.id,
        title: product.title,
        price: product.price,
        image: product.mainImage,
        amount: 1,
      });
      toast.success("Added to Cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(" Error adding to cart:", err);
      toast.error("Error adding to cart");
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) return router.push("/login");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            items: [{ productId: product._id || product.id, quantity: 1 }],
          }),
        }
      );

      if (!res.ok) throw new Error("Checkout failed");
      const { checkoutUrl } = await res.json();
      router.push(checkoutUrl || "/checkout");
    } catch (err) {
      console.error(" Error on buy now:", err);
    }
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
        id: product._id || product.id,
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

  // --- Carousel Logic Helpers ---
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
        <div className="animate-pulse text-indigo-600 font-semibold">
          Loading...
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-semibold">Product not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PRODUCT MAIN SECTION --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* --- LEFT: IMAGE GALLERY --- */}
            <div className="flex flex-col gap-6 select-none">
              {/* Main Image */}
              <div
                className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in group border border-gray-100"
                onClick={() => openModal(currentImageIndex)}
              >
                <Image
                  src={productImages[currentImageIndex] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 ease-out"
                  priority
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium rounded-full shadow-sm text-gray-600">
                  Click to Expand
                </div>
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
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
              {/* Category / Meta (Optional) */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  New Arrival
                </span>
                <div className="flex items-center text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-gray-600 font-medium">4.8 (120 reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {product.title}
              </h1>

              {/* Price Block */}
              <div className="flex items-baseline gap-4 mb-8 border-b border-gray-100 pb-8">
                <p className="text-4xl font-bold text-gray-900">
                  ₹{(product.price || 0).toFixed(2)}
                </p>
                <div className="flex flex-col items-start">
                  <p className="text-lg text-gray-400 line-through decoration-red-400 decoration-2">
                    ₹{((product.price || 0) * 1.2).toFixed(2)}
                  </p>
                  <span className="text-sm font-semibold text-green-600">
                    20% OFF
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all shadow-lg shadow-gray-200"
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
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-full text-green-600">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Free Delivery</p>
                        <p className="text-xs text-gray-500">Orders over ₹500</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                        <p className="text-xs text-gray-500">100% Protected</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SIMILAR PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                You might also like
                </h2>
                <a href="#" className="text-indigo-600 font-semibold hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
            >
              <X size={28} />
            </button>

            <div className="relative w-full max-w-6xl h-[85vh] flex flex-col items-center justify-center">
              {/* Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:-left-12 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:-right-12 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="relative w-full h-full">
                <Image
                  src={productImages[currentImageIndex]}
                  alt="Full view"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Thumbnails */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 flex gap-3 overflow-x-auto p-2 bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
                        currentImageIndex === idx
                          ? "border-white opacity-100 scale-110"
                          : "border-transparent opacity-50 hover:opacity-100"
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
          </div>
        )}
      </div>
    </div>
  );
}

// --- ProductCard Component ---
type ProductCardProps = {
  product: {
    _id?: string;
    id?: string;
    title: string;
    name?: string;
    description?: string;
    price: number;
    mainImage: string;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useProductStore();
  const { addToWishlist } = useWishlistStore();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;
  const userId = user?.id || null;
  const isLoggedIn = !!token;
  const imageUrl = `${product.mainImage}`;

  const handleAddToCart = async (e: any) => {
    e.stopPropagation();
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

      if (!res.ok) {
        toast.error("⚠️ Failed to add to cart");
        return;
      }
      addToCart({
        id: (product._id || product.id || "").toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
        amount: 1,
      });
      toast.success("Added to Cart!");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddToWishlist = async (e: any) => {
    e.stopPropagation();
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

      if (!res.ok) {
        if (res.status === 409) toast.error("Already in wishlist");
        else toast.error("Error adding to wishlist");
        return;
      }
      addToWishlist({
        id: (product._id || product.id || "").toString(),
        title: product.title,
        price: product.price,
        image: product.mainImage,
      });
      toast.success("Added to Wishlist!");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      onClick={() => router.push(`/product/${product._id || product.id}`)}
      className="group bg-white rounded-2xl border border-gray-100 p-3 cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all duration-300 ease-in-out flex flex-col h-full relative overflow-hidden"
    >
        {/* Wishlist Button (Floating) */}
        <button
            onClick={handleAddToWishlist}
            className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
        >
            <Heart className="w-4 h-4" />
        </button>

      {/* Image Area */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback handled
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3 h-8">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-xs text-gray-400 line-through">₹{((product.price || 0) * 1.2).toFixed(0)}</span>
             <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-indigo-600 active:scale-95 transition-all shadow-md"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};