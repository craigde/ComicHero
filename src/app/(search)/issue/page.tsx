"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IssueSearchForm } from "@/components/search/issue-search-form";
import { ListingGrid } from "@/components/listings/listing-grid";
import { useSearch } from "@/hooks/use-search";

function IssueSearchContent() {
  const searchParams = useSearchParams();
  const initialVolumeName = searchParams.get("volumeName") || "";
  const initialIssueNumber = searchParams.get("issueNumber") || "";

  const { listings, total, loading, error, searchByIssue } = useSearch();

  useEffect(() => {
    if (initialVolumeName && initialIssueNumber) {
      searchByIssue(initialVolumeName, initialIssueNumber);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search by Issue</h1>
        <p className="mt-1 text-sm text-gray-600">
          Enter a comic title and issue number to find eBay listings
        </p>
      </div>

      <IssueSearchForm
        onSearch={searchByIssue}
        loading={loading}
        initialVolumeName={initialVolumeName}
        initialIssueNumber={initialIssueNumber}
      />

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {total > 0 && (
        <p className="text-sm text-gray-600">
          Found <strong>{total}</strong> listings
        </p>
      )}

      <ListingGrid listings={listings} loading={loading} />
    </div>
  );
}

export default function IssueSearchPage() {
  return (
    <Suspense fallback={<div className="animate-pulse text-gray-400">Loading...</div>}>
      <IssueSearchContent />
    </Suspense>
  );
}
