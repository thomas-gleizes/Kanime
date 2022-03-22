-- CreateTable
CREATE TABLE `reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `id_reaction` INTEGER NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reactions` ADD CONSTRAINT `reactions_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reactions` ADD CONSTRAINT `reactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reactions` ADD CONSTRAINT `reactions_id_reaction_fkey` FOREIGN KEY (`id_reaction`) REFERENCES `reactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
