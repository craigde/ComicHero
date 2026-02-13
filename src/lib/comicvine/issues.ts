import { comicVineFetch } from "./client";
import type { CVApiResponse, CVIssue, CVVolume } from "./types";
import type { ComicIssue, ComicVolume } from "@/types/comic";
import { getFromCache, setInCache } from "@/lib/cache/cache";

function mapCVIssue(cv: CVIssue): ComicIssue {
  return {
    id: String(cv.id),
    comicVineId: cv.id,
    volumeId: String(cv.volume.id),
    volumeName: cv.volume.name,
    issueNumber: cv.issue_number,
    name: cv.name,
    coverDate: cv.cover_date,
    imageUrl: cv.image?.medium_url || null,
    description: cv.deck,
    characterIds: cv.character_credits?.map((c) => c.id) || [],
  };
}

function mapCVVolume(cv: CVVolume): ComicVolume {
  return {
    id: String(cv.id),
    comicVineId: cv.id,
    name: cv.name,
    startYear: cv.start_year ? parseInt(cv.start_year, 10) : null,
    publisher: cv.publisher?.name || null,
    issueCount: cv.count_of_issues || 0,
    imageUrl: cv.image?.medium_url || null,
    description: cv.deck,
  };
}

export async function searchVolumes(query: string): Promise<ComicVolume[]> {
  const cacheKey = `volume_search:${query.toLowerCase()}`;
  const cached = await getFromCache<ComicVolume[]>(cacheKey);
  if (cached) return cached;

  const data = await comicVineFetch<CVApiResponse<CVVolume[]>>("search", {
    query,
    resources: "volume",
    field_list: "id,name,start_year,publisher,count_of_issues,image,deck",
    limit: "10",
  });

  const volumes = data.results.map(mapCVVolume);
  await setInCache(cacheKey, "volume_search", volumes, 300, 7 * 24 * 60 * 60);
  return volumes;
}

export async function getIssueDetail(issueId: number): Promise<ComicIssue | null> {
  const cacheKey = `issue:${issueId}`;
  const cached = await getFromCache<ComicIssue>(cacheKey);
  if (cached) return cached;

  const data = await comicVineFetch<CVApiResponse<CVIssue>>(
    `issue/4000-${issueId}`,
    {
      field_list:
        "id,name,issue_number,volume,cover_date,image,deck,character_credits,first_appearance_characters",
    }
  );

  if (!data.results) return null;

  const issue = mapCVIssue(data.results);
  await setInCache(cacheKey, "issue", issue, 300, 30 * 24 * 60 * 60);
  return issue;
}
