"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import type { ComicIssue } from "@/types/comic";
import type { ApiResponse } from "@/types/api";

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [issue, setIssue] = useState<ComicIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIssue() {
      setLoading(true);
      try {
        const res = await fetch(`/api/comicvine/issue/${id}`);
        const data: ApiResponse<ComicIssue> = await res.json();
        if (data.success && data.data) {
          setIssue(data.data);
        } else {
          setError(data.error || "Issue not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchIssue();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-6">
          <div className="h-64 w-44 animate-pulse rounded-lg bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-72 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
          </div>
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

  if (!issue) return null;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href={`/volume/${issue.volumeId}`}
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
        Back to {issue.volumeName}
      </Link>

      {/* Issue detail */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {issue.imageUrl && (
          <div className="shrink-0">
            <img
              src={issue.imageUrl}
              alt={`${issue.volumeName} #${issue.issueNumber}`}
              className="w-56 rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {issue.volumeName} #{issue.issueNumber}
          </h1>

          {issue.name && (
            <p className="text-lg text-gray-700">&ldquo;{issue.name}&rdquo;</p>
          )}

          <div className="flex flex-wrap gap-2">
            {issue.coverDate && (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-700">
                {issue.coverDate}
              </span>
            )}
            <Link
              href={`/volume/${issue.volumeId}`}
              className="rounded bg-indigo-50 px-2 py-0.5 text-sm text-indigo-700 hover:bg-indigo-100"
            >
              {issue.volumeName} (all issues)
            </Link>
          </div>

          {issue.description && (
            <div className="max-w-2xl">
              <h2 className="mb-1 text-sm font-semibold text-gray-900">
                Description
              </h2>
              <p className="text-sm text-gray-600">{issue.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
