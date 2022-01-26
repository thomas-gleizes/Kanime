/*
  Warnings:

  - The values [Movie] on the enum `animes_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[anime_id]` on the table `animes_import` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `animes` MODIFY `type` ENUM('TV', 'movie', 'OAV', 'ONA', 'OVA', 'special', 'music') NULL;

-- AlterTable
ALTER TABLE `animes_import` ADD COLUMN `anime_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `animes_import_anime_id_key` ON `animes_import`(`anime_id`);

-- AddForeignKey
ALTER TABLE `animes_import` ADD CONSTRAINT `animes_import_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
