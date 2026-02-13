"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { IssueCard } from "@/components/comics/issue-card";
import type { ComicVolume, ComicIssue } from "@/types/comic";
import type { ApiResponse } from "@/types/api";

const PAGE_SIZE = 100;

export default function VolumeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [volume, setVolume] = useState<ComicVolume | null>(null);
  const [issues, setIssues] = useState<ComicIssue[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVolume(0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchVolume(pageOffset: number) {
    if (pageOffset === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const params = new URLSearchParams({
        offset: String(pageOffset),
        limit: String(PAGE_SIZE),
      });
      const res = await fetch(`/api/comicvine/volume/${id}?${params}`);
      const data: ApiResponse<{ volume: ComicVolume; issues: ComicIssue[] }> =
        await res.json();

      if (data.success && data.data) {
        setVolume(data.data.volume);
        if (pageOffset === 0) {
          setIssues(data.data.issues);
        } else {
          setIssues((prev) => [...prev, ...data.data!.issues]);
        }
        setTotal(data.meta?.total ?? 0);
        setOffset(pageOffset + data.data.issues.length);
      } else {
        setError(data.error || "Failed to load volume");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-96 animate-pulse rounded bg-gray-200" />
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link
          href="/issue"
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          &larr; Back to search
        </Link>
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!volume) return null;

  const hasMore = offset < total;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/issue"
        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Back to search
      </Link>

      {/* Volume header */}
      <div className="flex gap-6">
        {volume.imageUrl && (
          <div className="hidden shrink-0 sm:block">
            <img
              src={volume.imageUrl}
              alt={volume.name}
              className="w-32 rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{volume.name}</h1>
          <div className="flex flex-wrap gap-2">
            {volume.publisher && (
              <span className="rounded bg-indigo-50 px-2 py-0.5 text-sm text-indigo-700">
                {volume.publisher}
              </span>
            )}
            {volume.startYear && (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-700">
                Started {volume.startYear}
              </span>
            )}
            <span className="rounded bg-purple-50 px-2 py-0.5 text-sm text-purple-700">
              {total} issues
            </span>
          </div>
          {volume.description && (
            <p className="max-w-2xl text-sm text-gray-600">
              {volume.description}
            </p>
          )}
        </div>
      </div>

      {/* Issue grid */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Issues
          {issues.length < total && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              (showing {issues.length} of {total})
            </span>
          )}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchVolume(offset)}
            disabled={loadingMore}
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loadingMore ? "Loading..." : `Load more issues`}
          </button>
        </div>
      )}
    </div>
  );
}
