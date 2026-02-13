import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome to ComicHero</h1>
        <p className="mt-2 max-w-2xl text-lg text-indigo-100">
          Your comic book research hub. Browse the Comic Vine database for series,
          characters, and key issues. When eBay API is connected, search live
          listings with deal detection.
        </p>
      </div>

      {/* Search Options */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/issue"
          className="group rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Search by Issue</h2>
          <p className="mt-1 text-sm text-gray-600">
            Look up a comic series in the Comic Vine database. See cover art, publisher info, and issue counts.
          </p>
          <p className="mt-3 text-sm font-medium text-indigo-600">
            e.g., Amazing Spider-Man #129
          </p>
        </Link>

        <Link
          href="/character"
          className="group rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Search by Character</h2>
          <p className="mt-1 text-sm text-gray-600">
            Find characters in Comic Vine. See their publisher, appearance count, and first appearance info.
          </p>
          <p className="mt-3 text-sm font-medium text-purple-600">
            e.g., Captain America, Wolverine
          </p>
        </Link>

        <Link
          href="/key-issues"
          className="group rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Key Issues</h2>
          <p className="mt-1 text-sm text-gray-600">
            Browse first appearances, deaths, and major storyline events -- the most collectible issues.
          </p>
          <p className="mt-3 text-sm font-medium text-amber-600">
            First appearances, origins, deaths & more
          </p>
        </Link>
      </div>

      {/* Want List CTA */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Want List</h2>
            <p className="mt-1 text-sm text-gray-600">
              Track comics you&apos;re hunting for. Set target prices and check for deals automatically.
            </p>
          </div>
          <Link
            href="/want-list"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Manage Want List
          </Link>
        </div>
      </div>

      {/* API Setup Info */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-medium text-amber-800">API Setup</h3>
        <p className="mt-1 text-sm text-amber-700">
          A <strong>Comic Vine API key</strong> powers series, character, and key issue lookups.
          Add an <strong>eBay Developer account</strong> when ready to search live marketplace listings and detect deals.
          Configure both in the{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">.env</code>{" "}
          file.
        </p>
      </div>
    </div>
  );
}
