/*
  Warnings:

  - You are about to drop the column `slug` on the `ShortLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortCode]` on the table `ShortLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortCode` to the `ShortLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ShortLink_slug_key";

-- AlterTable
ALTER TABLE "ShortLink" DROP COLUMN "slug",
ADD COLUMN     "shortCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_shortCode_key" ON "ShortLink"("shortCode");
