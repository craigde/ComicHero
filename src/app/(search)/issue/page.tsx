"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IssueSearchForm } from "@/components/search/issue-search-form";
import { ListingGrid } from "@/components/listings/listing-grid";
import { VolumeCard } from "@/components/comics/volume-card";
import { useSearch } from "@/hooks/use-search";
import { useComicSearch } from "@/hooks/use-comic-search";

function IssueSearchContent() {
  const searchParams = useSearchParams();
  const initialVolumeName = searchParams.get("volumeName") || "";
  const initialIssueNumber = searchParams.get("issueNumber") || "";

  const {
    listings,
    total,
    loading: ebayLoading,
    error: ebayError,
    searchByIssue,
  } = useSearch();

  const {
    volumes,
    loading: cvLoading,
    error: cvError,
    config,
    searchVolumes,
  } = useComicSearch();

  useEffect(() => {
    if (initialVolumeName) {
      searchVolumes(initialVolumeName);
      if (initialIssueNumber) {
        searchByIssue(initialVolumeName, initialIssueNumber);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (
    volumeName: string,
    issueNumber: string,
    maxPrice?: number,
    sort?: string
  ) => {
    searchVolumes(volumeName);
    if (config?.ebayEnabled) {
      searchByIssue(volumeName, issueNumber, maxPrice, sort);
    }
  };

  const loading = cvLoading || ebayLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search by Issue</h1>
        <p className="mt-1 text-sm text-gray-600">
          Search the Comic Vine database for comic series and issues
          {config?.ebayEnabled && " and find eBay listings"}
        </p>
      </div>

      <IssueSearchForm
        onSearch={handleSearch}
        loading={loading}
        initialVolumeName={initialVolumeName}
        initialIssueNumber={initialIssueNumber}
        ebayEnabled={config?.ebayEnabled ?? false}
      />

      {(cvError || ebayError) && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {cvError || ebayError}
        </div>
      )}

      {/* Comic Vine volume results */}
      {volumes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Comic Series ({volumes.length} found)
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {volumes.map((volume) => (
              <VolumeCard key={volume.id} volume={volume} />
            ))}
          </div>
        </div>
      )}

      {/* eBay listings */}
      {config?.ebayEnabled && total > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            eBay Listings ({total} found)
          </h2>
          <ListingGrid listings={listings} loading={ebayLoading} />
        </div>
      )}

      {!config?.ebayEnabled && volumes.length > 0 && (
        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-700">
          eBay listing search will be available once you configure your eBay API
          credentials.
        </div>
      )}

      {/* Show empty state only when not loading and nothing found */}
      {!loading && volumes.length === 0 && listings.length === 0 && (
        <ListingGrid listings={[]} loading={false} />
      )}
    </div>
  );
}

export default function IssueSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse text-gray-400">Loading...</div>
      }
    >
      <IssueSearchContent />
    </Suspense>
  );
}
