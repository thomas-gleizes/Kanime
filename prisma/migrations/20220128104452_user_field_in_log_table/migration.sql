/*
  Warnings:

  - You are about to drop the column `auth_token` on the `logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `logs` DROP COLUMN `auth_token`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
