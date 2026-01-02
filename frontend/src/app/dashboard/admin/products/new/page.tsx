"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import apiClient from "@/lib/api";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import { sanitizeFormData } from "@/lib/form-sanitize";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });

  type Category = {
    id: string;
    name: string;
    image?: string;
    description?: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);

  // ✅ Upload Image File
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await apiClient.post("/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Image uploaded successfully!");
        setProduct({ ...product, mainImage: data.filePath || file.name });
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      toast.error("Error while uploading file!");
      console.error("Upload error:", error);
    }
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await apiClient.get(`/api/categories`);
      const data = await res.json();
      setCategories(data);
      setProduct((prev) => ({
        ...prev,
        categoryId: data[0]?.id || "",
      }));
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Add Product
  const addProduct = async () => {
    if (
      !product.title ||
      !product.manufacturer ||
      !product.description ||
      !product.slug
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    const sanitizedProduct = sanitizeFormData(product);

    try {
      const response = await apiClient.post(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedProduct),
      });

      if (response.status === 201) {
        toast.success("✅ Product added successfully!");
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: categories[0]?.id || "",
        });
      } else {
        toast.error("Failed to add product!");
      }
    } catch (error) {
      toast.error("Error adding product!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Add New Product
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product.slug}
              onChange={(e) =>
                setProduct({
                  ...product,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
              placeholder="auto-generated slug"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="select select-bordered w-full"
              value={product.categoryId}
              onChange={(e) =>
                setProduct({ ...product, categoryId: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              placeholder="Enter price"
            />
          </div>

          {/* Manufacturer */}
          <div>
            <label className="block text-sm font-medium mb-1">Manufacturer</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product.manufacturer}
              onChange={(e) =>
                setProduct({ ...product, manufacturer: e.target.value })
              }
              placeholder="Enter manufacturer name"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-1">In Stock?</label>
            <select
              className="select select-bordered w-full"
              value={product.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: Number(e.target.value) })
              }
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Main Image</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full cursor-pointer"
              onChange={(e: any) => {
                const file = e.target.files[0];
                uploadFile(file);
              }}
            />
            {product.mainImage && (
              <div className="mt-3 flex justify-center">
                <Image
                  src={`/${product.mainImage}`}
                  alt={product.title}
                  width={120}
                  height={120}
                  className="rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Product Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="Write a short description..."
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={addProduct}
            disabled={loading}
            className={`uppercase px-8 py-4 font-semibold rounded-lg text-white shadow-md 
              transition-all duration-200 ease-in-out cursor-pointer 
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
