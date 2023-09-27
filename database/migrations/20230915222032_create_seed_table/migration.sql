-- CreateTable
CREATE TABLE "__seeds" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__seeds_name_createdAt_key" ON "__seeds"("name", "createdAt");
