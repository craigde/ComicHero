"use client";

import { CharacterSearchForm } from "@/components/search/character-search-form";
import { ListingGrid } from "@/components/listings/listing-grid";
import { CharacterCard } from "@/components/comics/character-card";
import { useSearch } from "@/hooks/use-search";
import { useComicSearch } from "@/hooks/use-comic-search";

export default function CharacterSearchPage() {
  const {
    listings,
    total,
    loading: ebayLoading,
    error: ebayError,
    searchByCharacter: ebaySearchByCharacter,
  } = useSearch();

  const {
    characters,
    loading: cvLoading,
    error: cvError,
    config,
    searchCharacters,
  } = useComicSearch();

  const handleSearch = (
    characterName: string,
    maxPrice?: number,
    sort?: string
  ) => {
    searchCharacters(characterName);
    if (config?.ebayEnabled) {
      ebaySearchByCharacter(characterName, maxPrice, sort);
    }
  };

  const loading = cvLoading || ebayLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Search by Character
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Look up characters in the Comic Vine database
          {config?.ebayEnabled && " and find eBay listings"}
        </p>
      </div>

      <CharacterSearchForm
        onSearch={handleSearch}
        loading={loading}
        ebayEnabled={config?.ebayEnabled ?? false}
      />

      {(cvError || ebayError) && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {cvError || ebayError}
        </div>
      )}

      {/* Comic Vine character results */}
      {characters.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Characters ({characters.length} found)
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
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

      {!config?.ebayEnabled && characters.length > 0 && (
        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-700">
          eBay listing search will be available once you configure your eBay API
          credentials.
        </div>
      )}

      {/* Show empty state only when not loading and nothing found */}
      {!loading && characters.length === 0 && listings.length === 0 && (
        <ListingGrid listings={[]} loading={false} />
      )}
    </div>
  );
}
