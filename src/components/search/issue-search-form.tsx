"use client";

import { useState, FormEvent } from "react";

interface IssueSearchFormProps {
  onSearch: (
    volumeName: string,
    issueNumber: string,
    maxPrice?: number,
    sort?: string
  ) => void;
  loading?: boolean;
  initialVolumeName?: string;
  initialIssueNumber?: string;
  ebayEnabled?: boolean;
}

export function IssueSearchForm({
  onSearch,
  loading,
  initialVolumeName = "",
  initialIssueNumber = "",
  ebayEnabled = false,
}: IssueSearchFormProps) {
  const [volumeName, setVolumeName] = useState(initialVolumeName);
  const [issueNumber, setIssueNumber] = useState(initialIssueNumber);
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("best_match");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!volumeName.trim()) return;
    onSearch(
      volumeName.trim(),
      issueNumber.trim(),
      maxPrice ? parseFloat(maxPrice) : undefined,
      sort
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <label
            htmlFor="volumeName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Comic Title
          </label>
          <input
            id="volumeName"
            type="text"
            value={volumeName}
            onChange={(e) => setVolumeName(e.target.value)}
            placeholder="e.g., Amazing Spider-Man"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="w-full sm:w-32">
          <label
            htmlFor="issueNumber"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Issue #
          </label>
          <input
            id="issueNumber"
            type="text"
            value={issueNumber}
            onChange={(e) => setIssueNumber(e.target.value)}
            placeholder={ebayEnabled ? "e.g., 129" : "Optional"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        {ebayEnabled && (
          <>
            <div className="w-full sm:w-36">
              <label
                htmlFor="maxPrice"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Max Price ($)
              </label>
              <input
                id="maxPrice"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Optional"
                min="0"
                step="0.01"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full sm:w-40">
              <label
                htmlFor="sort"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Sort By
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="best_match">Best Match</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="date_newest">Newest First</option>
              </select>
            </div>
          </>
        )}
      </div>
      <button
        type="submit"
        disabled={loading || !volumeName.trim()}
        className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
