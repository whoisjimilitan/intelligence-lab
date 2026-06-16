"use client";

import { useState } from "react";

interface PostcodeSearchProps {
  onSearch: (postcode: string, radius: number) => void;
  isLoading?: boolean;
}

export default function PostcodeSearch({
  onSearch,
  isLoading,
}: PostcodeSearchProps) {
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      onSearch(postcode.trim(), radius);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postcode" className="block text-sm font-medium mb-2">
            Postcode
          </label>
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode (e.g., M1 1AA)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="radius" className="block text-sm font-medium mb-2">
            Search Radius (miles)
          </label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value={1}>1 mile</option>
            <option value={3}>3 miles</option>
            <option value={5}>5 miles</option>
            <option value={10}>10 miles</option>
            <option value={15}>15 miles</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !postcode.trim()}
          className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Scanning Market..." : "Search Market"}
        </button>
      </form>
    </div>
  );
}
