-- CreateTable
CREATE TABLE `animes_import` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kitsu_id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `canonical_title` VARCHAR(191) NOT NULL,
    `titles` LONGTEXT NULL,
    `synopsis` TEXT NULL,
    `description` TEXT NULL,
    `date_begin` DATE NULL,
    `date_end` DATE NULL,
    `rating_average` DOUBLE NULL,
    `rating_rank` INTEGER UNSIGNED NULL,
    `popularity_count` DOUBLE NULL,
    `popularity_rank` INTEGER UNSIGNED NULL,
    `type` VARCHAR(191) NULL,
    `poster` LONGTEXT NULL,
    `cover` LONGTEXT NULL,
    `episode_count` INTEGER UNSIGNED NULL,
    `episode_length` INTEGER UNSIGNED NULL,
    `status` VARCHAR(191) NULL,
    `import_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
