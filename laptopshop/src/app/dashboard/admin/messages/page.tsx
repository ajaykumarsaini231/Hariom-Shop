"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { format } from "date-fns";
import { 
  Mail, Phone, Calendar, User, Search, RefreshCw, 
  CheckCircle, XCircle, Trash2 
} from "lucide-react";
import toast from "react-hot-toast";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isSolved: boolean;
  createdAt: string;
};

type FilterType = "all" | "pending" | "solved";

const DashboardMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/quary-messages/messages");
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      
      const json = await res.json();
      const data = json.data || json; 
      
      if (Array.isArray(data)) setMessages(data);
      else setMessages([]);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Solved Status
  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    // Optimistic UI Update
    setMessages((prev) => prev.map(m => m.id === id ? { ...m, isSolved: newStatus } : m));

    try {
      const res = await apiClient.patch(`/api/quary-messages/messages/${id}`, { isSolved: newStatus });
      if (!res.ok) throw new Error("Failed");
      toast.success(newStatus ? "Marked as Solved" : "Marked as Pending");
    } catch (error) {
      setMessages((prev) => prev.map(m => m.id === id ? { ...m, isSolved: currentStatus } : m)); // Revert
      toast.error("Failed to update status");
    }
  };

  // Delete Message
  const deleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message? This cannot be undone.")) return;

    // Optimistic UI Update (Remove from list immediately)
    const previousMessages = [...messages];
    setMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const res = await apiClient.delete(`/api/quary-messages/messages/${id}`);
      if (!res.ok) throw new Error("Failed");
      toast.success("Message deleted");
    } catch (error) {
      setMessages(previousMessages); // Revert
      toast.error("Failed to delete message");
    }
  };

  // Filtering Logic
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      (msg.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (msg.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (msg.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus = 
      filter === "all" ? true :
      filter === "solved" ? msg.isSolved :
      !msg.isSolved;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customer Messages</h1>
            <p className="text-gray-500 mt-1">Manage inquiries and resolutions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Filter Tabs */}
            <div className="flex bg-white p-1 rounded-lg border shadow-sm">
              <button onClick={() => setFilter("all")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>All</button>
              <button onClick={() => setFilter("pending")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "pending" ? "bg-yellow-100 text-yellow-700" : "text-gray-600 hover:bg-gray-50"}`}>Pending</button>
              <button onClick={() => setFilter("solved")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === "solved" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>Solved</button>
            </div>

            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button onClick={fetchMessages} className="p-2 bg-white border rounded-lg hover:bg-gray-50 text-gray-600">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border h-48 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-16 bg-gray-100 rounded mt-6"></div>
              </div>
            ))}
          </div>
        ) : filteredMessages.length > 0 ? (
          // Messages Grid
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`bg-white rounded-xl shadow-sm border transition-all duration-200 flex flex-col ${
                  msg.isSolved ? "border-green-200 bg-green-50/10" : "border-gray-100 hover:shadow-md"
                }`}
              >
                {/* Card Header */}
                <div className={`p-5 border-b rounded-t-xl ${msg.isSolved ? "bg-green-50 border-green-100" : "bg-gray-50/50 border-gray-50"}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 truncate pr-2">{msg.subject || "No Subject"}</h3>
                    <span className={`text-xs px-2 py-1 rounded border flex items-center font-medium ${
                      msg.isSolved ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}>
                      {msg.isSolved ? "Solved" : "Pending"}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <User size={14} className="mr-2 text-blue-500" /> <span className="font-medium">{msg.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail size={14} className="mr-2 text-blue-500" /> <a href={`mailto:${msg.email}`} className="hover:text-blue-600 truncate">{msg.email}</a>
                    </div>
                    {msg.phone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone size={14} className="mr-2 text-blue-500" /> <a href={`tel:${msg.phone}`} className="hover:text-blue-600">{msg.phone}</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-5 flex-1 bg-white">
                  <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-4 text-right">{format(new Date(msg.createdAt), "MMM d, yyyy h:mm a")}</p>
                </div>

                {/* Action Buttons */}
                <div className="p-3 border-t bg-gray-50 flex justify-between items-center rounded-b-xl">
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={14} className="mr-1.5" /> Delete
                  </button>

                  {/* Toggle Status Button */}
                  <button
                    onClick={() => toggleStatus(msg.id, msg.isSolved)}
                    className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors border ${
                      msg.isSolved 
                        ? "bg-white text-gray-600 border-gray-200 hover:bg-gray-100" 
                        : "bg-green-600 text-white border-green-600 hover:bg-green-700"
                    }`}
                  >
                    {msg.isSolved ? (
                      <><XCircle size={14} className="mr-1.5" /> Mark Unsolved</>
                    ) : (
                      <><CheckCircle size={14} className="mr-1.5" /> Mark Solved</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
             <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">No Messages Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMessage;