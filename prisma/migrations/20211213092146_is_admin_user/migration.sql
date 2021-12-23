/*
  Warnings:

  - You are about to drop the column `params` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `logs` DROP COLUMN `params`,
DROP
COLUMN `token`,
    ADD COLUMN `auth_token` VARCHAR(255) NULL,
    ADD COLUMN `query` TEXT NULL;

-- AlterTable
ALTER TABLE `users`
    ADD COLUMN `is_admin` BOOLEAN NOT NULL DEFAULT false;
