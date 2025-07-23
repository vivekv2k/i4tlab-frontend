import React from "react";
import UserSelector from "../UserSelector";
import { Search, Filter, User } from 'lucide-react';

export default function TaskFilters({ filters, setFilters, setCurrentPage }) {
  const handleStatusChange = (e) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  const handleUserChange = (val) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, user_id: val }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<select
          value={filters.status}
          onChange={handleStatusChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* User Filter */}
      <div className="relative">
       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <UserSelector
          value={filters.user_id}
          onChange={handleUserChange}
          className="min-w-[200px]"
        />
      </div>
      </div>
    </div>
  );
}
