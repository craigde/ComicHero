"use client";

import { useState } from "react";
import { WantListForm } from "@/components/want-list/want-list-form";
import { WantListTable } from "@/components/want-list/want-list-table";
import { useWantList } from "@/hooks/use-want-list";

export default function WantListPage() {
  const {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    checkDeals,
    checking,
  } = useWantList();
  const [showForm, setShowForm] = useState(false);
  const [dealCheckResult, setDealCheckResult] = useState<{
    checkedItems: number;
    newMatches: number;
  } | null>(null);

  const handleCheckDeals = async () => {
    const result = await checkDeals();
    if (result) {
      setDealCheckResult(result);
      setTimeout(() => setDealCheckResult(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Want List</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track comics you&apos;re looking for and check for deals on eBay
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCheckDeals}
            disabled={checking || items.length === 0}
            className="rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
          >
            {checking ? "Checking..." : "Check for Deals"}
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {showForm ? "Hide Form" : "Add Comic"}
          </button>
        </div>
      </div>

      {dealCheckResult && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
          Checked {dealCheckResult.checkedItems} items and found{" "}
          {dealCheckResult.newMatches} matching listings.
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {showForm && (
        <WantListForm
          onSubmit={async (volumeName, issueNumber, targetMaxPrice, notes) => {
            await addItem(volumeName, issueNumber, targetMaxPrice, notes);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded bg-gray-200" />
          ))}
        </div>
      ) : (
        <WantListTable
          items={items}
          onDelete={deleteItem}
          onToggleActive={(id, isActive) => updateItem(id, { isActive })}
        />
      )}
    </div>
  );
}
