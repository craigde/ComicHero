import Link from "next/link";
import type { ComicIssue } from "@/types/comic";

interface IssueCardProps {
  issue: ComicIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link
      href={`/issue/${issue.comicVineId}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        {issue.imageUrl ? (
          <img
            src={issue.imageUrl}
            alt={`${issue.volumeName} #${issue.issueNumber}`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600">
              #{issue.issueNumber}
            </p>
          </div>
        )}
        {issue.coverDate && (
          <div className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5">
            <span className="text-xs font-medium text-white">
              {issue.coverDate}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-gray-900">
            #{issue.issueNumber}
          </span>
          {issue.name && (
            <span className="line-clamp-1 text-xs text-gray-600">
              {issue.name}
            </span>
          )}
        </div>

        {issue.description && (
          <p className="line-clamp-2 text-xs text-gray-500">
            {issue.description}
          </p>
        )}
      </div>
    </Link>
  );
}
