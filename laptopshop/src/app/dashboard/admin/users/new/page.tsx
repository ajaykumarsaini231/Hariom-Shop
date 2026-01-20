"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { isValidEmailAddressFormat } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { sanitizeFormData } from "@/lib/form-sanitize";
import apiClient from "@/lib/api";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const addNewUser = async () => {
    const { email, password, role } = userInput;

    if (!email || !password) {
      toast.error("⚠️ Please fill all fields");
      return;
    }

    if (!isValidEmailAddressFormat(email)) {
      toast.error("❌ Invalid email format");
      return;
    }

    if (password.length < 8) {
      toast.error("🔒 Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      const sanitizedUserInput = sanitizeFormData({ email, password, role });

      const response = await apiClient.post(`/api/users`, sanitizedUserInput, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success("✅ User added successfully!");
        setUserInput({ email: "", password: "", role: "user" });
      } else {
        toast.error("❌ Failed to create user");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error("🚨 Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5 p-8 rounded-lg shadow-md">
      <div className="flex flex-col gap-y-6 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900">Add New User</h1>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={userInput.email}
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter at least 8 characters"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={userInput.password}
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            User Role
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            value={userInput.role}
            onChange={(e) =>
              setUserInput({ ...userInput, role: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={addNewUser}
          disabled={loading}
          className={`cursor-pointer uppercase w-full py-3 text-lg font-semibold rounded-md transition-all duration-200 shadow-sm ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;
