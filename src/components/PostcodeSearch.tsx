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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="postcode" className="text-muted-label mb-3 block">
            Postcode
          </label>
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="M1 1AA"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="radius" className="text-muted-label mb-3 block">
            Search Radius
          </label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="input-field"
            disabled={isLoading}
          >
            <option value={1}>1 mile</option>
            <option value={3}>3 miles</option>
            <option value={5}>5 miles (default)</option>
            <option value={10}>10 miles</option>
            <option value={15}>15 miles</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !postcode.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Scanning Market..." : "Scan Market"}
        </button>
      </form>
    </div>
  );
}
