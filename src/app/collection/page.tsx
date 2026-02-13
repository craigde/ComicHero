"use client";

import { useCollection, useCollectionStats } from "@/hooks/use-collection";
import { IssueCard } from "@/components/comics/issue-card";
import type { ComicIssue } from "@/types/comic";

export default function CollectionPage() {
  const { items, total, loading, error } = useCollection();
  const { stats, loading: statsLoading } = useCollectionStats();

  // Convert CollectionItems to ComicIssue shape for IssueCard reuse
  const asIssues: ComicIssue[] = items.map((item) => ({
    id: item.id,
    comicVineId: item.comicVineIssueId,
    volumeId: String(item.comicVineVolumeId),
    volumeName: item.volumeName,
    issueNumber: item.issueNumber,
    name: item.name,
    coverDate: item.coverDate,
    imageUrl: item.imageUrl,
    description: null,
    characterIds: [],
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Collection</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track the comics you own
        </p>
      </div>

      {/* Stats cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs font-medium uppercase text-gray-500">
              Issues Owned
            </p>
            <p className="mt-1 text-2xl font-bold text-indigo-600">
              {stats.totalIssues.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs font-medium uppercase text-gray-500">
              Volumes
            </p>
            <p className="mt-1 text-2xl font-bold text-purple-600">
              {stats.totalVolumes.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs font-medium uppercase text-gray-500">
              Total Paid
            </p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-[3/4] bg-gray-200" />
              <div className="space-y-2 p-3">
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No comics yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Search for volumes and click &ldquo;Collect&rdquo; on issues to start
            building your collection.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            {total} issue{total !== 1 ? "s" : ""} in your collection
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {asIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
