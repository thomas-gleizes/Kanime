/*
  Warnings:

  - You are about to drop the column `libelle` on the `categories` table. All the data in the column will be lost.
  - Added the required column `name` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories`
    DROP COLUMN `libelle`,
    ADD COLUMN `description`       TEXT         NULL,
    ADD COLUMN `name`              VARCHAR(191) NOT NULL,
    ADD COLUMN `slug`              VARCHAR(191) NOT NULL,
    ADD COLUMN `total_media_count` smallint     NOT NULL default 0,
    ADD COLUMN `updated_at`        TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0);
