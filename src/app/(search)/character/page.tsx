"use client";

import { CharacterSearchForm } from "@/components/search/character-search-form";
import { ListingGrid } from "@/components/listings/listing-grid";
import { useSearch } from "@/hooks/use-search";

export default function CharacterSearchPage() {
  const { listings, total, loading, error, searchByCharacter } = useSearch();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search by Character</h1>
        <p className="mt-1 text-sm text-gray-600">
          Find comic books featuring your favorite character
        </p>
      </div>

      <CharacterSearchForm onSearch={searchByCharacter} loading={loading} />

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
