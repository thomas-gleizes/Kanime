/*
  Warnings:

  - You are about to drop the `reactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reactions` DROP FOREIGN KEY `reactions_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `reactions` DROP FOREIGN KEY `reactions_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `reactions` DROP FOREIGN KEY `reactions_user_id_fkey`;

-- DropTable
DROP TABLE `reactions`;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `attachments` TEXT NULL,
    `anime_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `parent_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
