"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName,
} from "../../../../../utils/categoryFormating";
import { nanoid } from "nanoid";
import apiClient from "@/lib/api";

interface DashboardProductDetailsProps {
  params: Promise<{ id: string }>;
}

type Category = { id: string; name: string };
type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  manufacturer: string;
  description: string;
  mainImage?: string;
  categoryId: string;
  inStock: number;
};

// Simplified type for local state
type OtherImage = { id?: string; image: string };

const DashboardProductDetails = ({ params }: DashboardProductDetailsProps) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  
  // State for the list of other images
  const [otherImages, setOtherImages] = useState<OtherImage[]>([]);
  
  // State for the text input to add a new URL
  const [imageUrlInput, setImageUrlInput] = useState(""); 
  
  const router = useRouter();

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Categories
        const catRes = await apiClient.get(`/api/categories`);
        setCategories(await catRes.json());

        // Fetch Product
        const prodRes = await apiClient.get(`/api/products/${id}`);
        const prodData = await prodRes.json();
        setProduct(prodData);

        // Fetch Existing Images
        const imgRes = await apiClient.get(`/api/images/${id}`);
        setOtherImages(await imgRes.json());
      } catch (err) {
        console.error(err);
        toast.error("Error loading data");
      }
    };
    fetchData();
  }, [id]);


  // --- Handlers ---

  // 1. Add Image URL to the list (Client Side Only)
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;

    // Add to state
    setOtherImages((prev) => [
      ...prev,
      { image: imageUrlInput.trim(), id: nanoid() },
    ]);
    
    // Clear input
    setImageUrlInput("");
  };

  // 2. Remove Image URL from the list
  const handleRemoveImage = (indexToRemove: number) => {
    setOtherImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 3. Update Product (Send Data to Backend)
  const updateProduct = async () => {
    if (!product?.title || !product?.price) {
      toast.error("Please fill required fields");
      return;
    }

    // Format images exactly as your controller expects:
    // images = [{ image: "url1" }, { image: "url2" }]
    const formattedImages = otherImages.map((img) => ({ image: img.image }));

    try {
      const payload = {
        ...product,
        images: formattedImages, // Sending the array of objects
      };

      const response = await apiClient.put(`/api/products/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Product updated successfully");
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  // 4. Delete Product
  const deleteProduct = async () => {
    if(!confirm("Are you sure?")) return;
    try {
      const response = await apiClient.delete(`/api/products/${id}`);
      if (response.status === 204) {
        toast.success("Product deleted");
        router.push("/dashboard/admin/products");
      } else {
        toast.error("Cannot delete product (check orders)");
      }
    } catch {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="bg-gray-50 flex min-h-screen max-w-screen-2xl mx-auto p-8">
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Details</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
          
          {/* Top Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                value={product?.title || ""}
                onChange={(e) => setProduct({ ...product!, title: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="number"
                value={product?.price || ""}
                onChange={(e) => setProduct({ ...product!, price: Number(e.target.value) })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
             <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                value={product?.categoryId || ""}
                onChange={(e) => setProduct({ ...product!, categoryId: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{formatCategoryName(c.name)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Slug</label>
              <input
                type="text"
                value={product?.slug || ""}
                onChange={(e) => setProduct({ ...product!, slug: convertSlugToURLFriendly(e.target.value) })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">In Stock</label>
              <select
                value={product?.inStock ?? 1}
                onChange={(e) => setProduct({ ...product!, inStock: Number(e.target.value) })}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Manufacturer</label>
              <input
                type="text"
                value={product?.manufacturer || ""}
                onChange={(e) => setProduct({ ...product!, manufacturer: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* --- IMAGES SECTION --- */}
          <div className="border-t pt-6 space-y-6">
            
            {/* Main Image URL Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Main Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={product?.mainImage || ""}
                onChange={(e) => setProduct({ ...product!, mainImage: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
              />
              {/* Preview Main Image */}
              {product?.mainImage && (
                 <img src={product.mainImage} alt="Main" className="w-24 h-24 object-cover rounded border" />
              )}
            </div>

            {/* Other Images URL Input (The part you wanted fixed) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Other Images</label>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Paste image URL here"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                />
                <button 
                  onClick={handleAddImageUrl}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Add
                </button>
              </div>

              {/* List of Added Images */}
              <div className="flex flex-wrap gap-4">
                {otherImages.map((img, index) => (
                  <div key={img.id || index} className="relative group">
                    <img
                      src={img.image}
                      alt={`Gallery ${index}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                      onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={product?.description || ""}
              onChange={(e) => setProduct({ ...product!, description: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 h-32"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={updateProduct}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Update Product
            </button>
            <button
              onClick={deleteProduct}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardProductDetails;