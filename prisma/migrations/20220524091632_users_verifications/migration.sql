/*
  Warnings:

  - A unique constraint covering the columns `[real_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `real_email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false AFTER `country_id`,
    ADD COLUMN `real_email` VARCHAR(191) NOT NULL AFTER `email_verified`;

-- CreateIndex
CREATE UNIQUE INDEX `users_real_email_key` ON `users`(`real_email`);
