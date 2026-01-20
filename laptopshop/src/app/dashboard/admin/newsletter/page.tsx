"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { format } from "date-fns";
import { Mail, Calendar, Search, RefreshCw, Download, Copy, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Define the Subscriber type matching your Prisma schema
type Subscriber = {
  id: number;
  email: string;
  createdAt: string;
};

const DashboardNewsletter = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      // Fetching from the API endpoint you provided
      const res = await apiClient.get("/api/news-letter/");
      
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      
      const json = await res.json();
      // Handle different response structures (e.g., array or { data: [] })
      const data = json.data || json;

      if (Array.isArray(data)) {
        setSubscribers(data);
      } else {
        setSubscribers([]);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  // Filter subscribers based on search
  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to copy email to clipboard
  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied!");
  };

  // Function to export emails as CSV
  const exportCSV = () => {
    if (subscribers.length === 0) return toast.error("No subscribers to export");
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Date Joined\n" 
      + subscribers.map(s => `${s.email},${new Date(s.createdAt).toISOString()}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to delete subscriber (Optional)
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const res = await apiClient.delete(`/api/news-letter/${id}`);
      if (res.ok) {
        toast.success("Subscriber removed");
        fetchSubscribers();
      } else {
        toast.error("Failed to remove subscriber");
      }
    } catch (error) {
      toast.error("Error removing subscriber");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Newsletter Subscribers</h1>
            <p className="text-gray-500 mt-1">Manage your email marketing list</p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
             {/* Search Bar */}
            <div className="relative flex-1 md:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search email..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Export Button */}
            <button 
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Refresh Button */}
            <button 
              onClick={fetchSubscribers}
              className="p-2 bg-white border rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
              title="Refresh List"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
             <div className="p-8 text-center text-gray-500">Loading subscribers...</div>
          ) : filteredSubscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm uppercase">
                    <th className="p-4 font-semibold">Email Address</th>
                    <th className="p-4 font-semibold">Joined Date</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                            <Mail size={16} />
                          </div>
                          <span className="font-medium text-gray-800">{sub.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {format(new Date(sub.createdAt), "MMM d, yyyy")}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => copyToClipboard(sub.email)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Copy Email"
                          >
                            <Copy size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(sub.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">No Subscribers Yet</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm ? "No emails match your search." : "Users who subscribe will appear here."}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-400 text-center">
          Showing {filteredSubscribers.length} total subscribers
        </div>

      </div>
    </div>
  );
};

export default DashboardNewsletter;