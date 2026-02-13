-- CreateTable
CREATE TABLE "WantListItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "volumeName" TEXT NOT NULL,
    "issueNumber" TEXT NOT NULL,
    "comicVineIssueId" INTEGER,
    "targetMaxPrice" REAL NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastCheckedAt" DATETIME
);

-- CreateTable
CREATE TABLE "WantListMatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wantListItemId" TEXT NOT NULL,
    "ebayItemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "totalPrice" REAL NOT NULL,
    "imageUrl" TEXT,
    "itemUrl" TEXT NOT NULL,
    "dealScore" REAL,
    "percentBelow" REAL,
    "foundAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "WantListMatch_wantListItemId_fkey" FOREIGN KEY ("wantListItemId") REFERENCES "WantListItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CachedComicVineData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cacheKey" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "jsonData" TEXT NOT NULL,
    "fetchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PriceSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "volumeName" TEXT NOT NULL,
    "issueNumber" TEXT NOT NULL,
    "grade" REAL,
    "averagePrice" REAL NOT NULL,
    "medianPrice" REAL NOT NULL,
    "dataPoints" INTEGER NOT NULL,
    "snapshotDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "WantListItem_volumeName_issueNumber_idx" ON "WantListItem"("volumeName", "issueNumber");

-- CreateIndex
CREATE INDEX "WantListMatch_wantListItemId_idx" ON "WantListMatch"("wantListItemId");

-- CreateIndex
CREATE UNIQUE INDEX "WantListMatch_wantListItemId_ebayItemId_key" ON "WantListMatch"("wantListItemId", "ebayItemId");

-- CreateIndex
CREATE UNIQUE INDEX "CachedComicVineData_cacheKey_key" ON "CachedComicVineData"("cacheKey");

-- CreateIndex
CREATE INDEX "CachedComicVineData_cacheKey_idx" ON "CachedComicVineData"("cacheKey");

-- CreateIndex
CREATE INDEX "CachedComicVineData_expiresAt_idx" ON "CachedComicVineData"("expiresAt");

-- CreateIndex
CREATE INDEX "PriceSnapshot_volumeName_issueNumber_grade_idx" ON "PriceSnapshot"("volumeName", "issueNumber", "grade");

-- CreateIndex
CREATE INDEX "PriceSnapshot_snapshotDate_idx" ON "PriceSnapshot"("snapshotDate");
