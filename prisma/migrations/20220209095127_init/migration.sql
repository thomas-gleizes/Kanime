-- CreateTable
CREATE TABLE `animes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kitsu_id` INTEGER NULL,
    `slug` VARCHAR(191) NOT NULL,
    `canonical_title` VARCHAR(191) NOT NULL,
    `titles` LONGTEXT NULL,
    `synopsis` TEXT NULL,
    `description` TEXT NULL,
    `season` ENUM('Winter', 'Springs', 'Summer', 'Fall') NULL,
    `season_year` VARCHAR(4) NULL,
    `date_begin` DATE NULL,
    `date_end` DATE NULL,
    `rating_average` DOUBLE NULL,
    `rating_rank` INTEGER UNSIGNED NULL,
    `popularity_count` DOUBLE NULL,
    `popularity_rank` INTEGER UNSIGNED NULL,
    `type` ENUM('TV', 'movie', 'OAV', 'ONA', 'OVA', 'special', 'music') NULL,
    `poster` LONGTEXT NULL,
    `cover` LONGTEXT NULL,
    `episode_count` INTEGER UNSIGNED NULL,
    `episode_length` INTEGER UNSIGNED NULL,
    `status` ENUM('finished', 'current', 'unreleased', 'tba', 'upcoming') NOT NULL DEFAULT 'unreleased',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `animes_kitsu_id_key`(`kitsu_id`),
    UNIQUE INDEX `animes_slug_key`(`slug`),
    INDEX `animes_canonical_title_index`(`canonical_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animes_import` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER NULL,
    `kitsu_id` INTEGER NOT NULL,
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

    UNIQUE INDEX `animes_import_anime_id_key`(`anime_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `total_media_count` SMALLINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animes_categories` (
    `anime_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`anime_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar_path` VARCHAR(191) NULL,
    `background_path` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `birthday` DATE NULL,
    `gender` ENUM('Male', 'Female', 'Secret') NOT NULL DEFAULT 'Secret',
    `city` VARCHAR(191) NULL,
    `country_id` INTEGER NULL,
    `follow_count` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `follower_count` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entries` (
    `anime_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `status` ENUM('Wanted', 'Watching', 'Completed', 'OnHold', 'Dropped') NOT NULL DEFAULT 'Wanted',
    `rating` DOUBLE NULL,
    `progress` SMALLINT NOT NULL DEFAULT 0,
    `started_at` DATETIME(3) NULL DEFAULT NULL,
    `finish_at` DATETIME(3) NULL DEFAULT NULL,
    `note` MEDIUMTEXT NULL,
    `visibility` ENUM('private', 'public', 'follow') NOT NULL DEFAULT 'public',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`anime_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_follows` (
    `follower_id` INTEGER NOT NULL,
    `follow_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`follower_id`, `follow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iso` CHAR(2) NOT NULL,
    `iso3` VARCHAR(3) NULL,
    `name` VARCHAR(80) NOT NULL,
    `nicename` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route` VARCHAR(191) NOT NULL,
    `method` ENUM('GET', 'POST', 'PUT', 'PATCH', 'DELETE') NOT NULL,
    `user_id` INTEGER NULL,
    `ip` VARCHAR(64) NOT NULL,
    `query` TEXT NULL,
    `body` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `animes_import` ADD CONSTRAINT `animes_import_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animes_categories` ADD CONSTRAINT `animes_categories_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animes_categories` ADD CONSTRAINT `animes_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_follows` ADD CONSTRAINT `users_follows_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_follows` ADD CONSTRAINT `users_follows_follow_id_fkey` FOREIGN KEY (`follow_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
