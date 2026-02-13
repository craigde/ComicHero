import { NextRequest, NextResponse } from "next/server";
import { getSeededKeyIssues, getKeyIssuesForCharacter } from "@/lib/comicvine/key-issues";
import type { ApiResponse } from "@/types/api";
import type { KeyIssue, KeyIssueCategory } from "@/types/comic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || undefined;
  const category = searchParams.get("category") as KeyIssueCategory | null;
  const characterId = searchParams.get("characterId");

  try {
    let results: KeyIssue[];

    if (characterId) {
      results = await getKeyIssuesForCharacter(parseInt(characterId, 10));
    } else {
      results = getSeededKeyIssues({
        query,
        category: category || undefined,
      });
    }

    const response: ApiResponse<KeyIssue[]> = {
      success: true,
      data: results,
      error: null,
      meta: {
        total: results.length,
        offset: 0,
        limit: results.length,
        cached: false,
      },
    };
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: message,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
