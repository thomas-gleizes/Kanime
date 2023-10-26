-- CreateTable
CREATE TABLE `animes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kitsu_id` INTEGER UNSIGNED NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `canonical_title` VARCHAR(191) NOT NULL,
    `titles` LONGTEXT NULL,
    `synopsis` TEXT NULL,
    `description` TEXT NULL,
    `season` ENUM('Winter', 'Springs', 'Summer', 'Fall') NULL,
    `season_year` VARCHAR(4) NULL,
    `date_begin` DATE NULL,
    `date_end` DATE NULL,
    `rating_average` FLOAT NULL,
    `rating_rank` INTEGER UNSIGNED NULL,
    `popularity_count` INTEGER UNSIGNED NULL,
    `popularity_rank` INTEGER UNSIGNED NULL,
    `type` ENUM('TV', 'movie', 'OAV', 'ONA', 'OVA', 'special', 'music') NULL,
    `poster` LONGTEXT NULL,
    `cover` LONGTEXT NULL,
    `episode_count` INTEGER UNSIGNED NULL,
    `episode_length` INTEGER UNSIGNED NULL,
    `status` ENUM('finished', 'current', 'unreleased', 'tba', 'upcoming') NOT NULL DEFAULT 'unreleased',
    `saga_id` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `animes_kitsu_id_key`(`kitsu_id`),
    UNIQUE INDEX `animes_slug_key`(`slug`),
    INDEX `animes_canonical_title_index`(`canonical_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sagas` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `canonical_title` VARCHAR(191) NOT NULL,
    `titles` LONGTEXT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `sagas_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `total_media_count` SMALLINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animes_categories` (
    `anime_id` INTEGER UNSIGNED NOT NULL,
    `category_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`anime_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar_path` VARCHAR(255) NULL,
    `background_path` VARCHAR(255) NULL,
    `bio` TEXT NULL,
    `birthday` DATE NULL,
    `gender` ENUM('Male', 'Female', 'Secret') NOT NULL DEFAULT 'Secret',
    `city` VARCHAR(191) NULL,
    `country_id` INTEGER UNSIGNED NULL,
    `real_email` VARCHAR(191) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `reset_password_token` VARCHAR(255) NULL,
    `last_ask_reset_password` DATETIME(3) NULL,
    `last_reset_password` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `follow_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `follower_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `visibility` ENUM('private', 'public', 'limited') NOT NULL DEFAULT 'public',
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_slug_key`(`slug`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_real_email_key`(`real_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entries` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `status` ENUM('Wanted', 'Watching', 'Completed', 'OnHold', 'Dropped') NOT NULL DEFAULT 'Wanted',
    `rating` DOUBLE NULL,
    `progress` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `favorite` BOOLEAN NOT NULL DEFAULT false,
    `started_at` DATE NULL,
    `finish_at` DATE NULL,
    `note` MEDIUMTEXT NULL,
    `visibility` ENUM('private', 'public', 'limited') NOT NULL DEFAULT 'public',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `entries_anime_id_user_id_key`(`anime_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `attachments` TEXT NULL,
    `anime_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `parent_id` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_follows` (
    `follower_id` INTEGER UNSIGNED NOT NULL,
    `follow_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`follower_id`, `follow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `iso` CHAR(2) NOT NULL,
    `iso3` VARCHAR(3) NULL,
    `name` VARCHAR(80) NOT NULL,
    `nicename` VARCHAR(80) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `method` ENUM('GET', 'POST', 'PUT', 'PATCH', 'DELETE') NOT NULL,
    `user_id` INTEGER UNSIGNED NULL,
    `ip` VARCHAR(64) NOT NULL,
    `params` TEXT NULL,
    `body` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_logs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `import_animes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER UNSIGNED NULL,
    `kitsu_id` INTEGER UNSIGNED NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `canonical_title` VARCHAR(255) NOT NULL,
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
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `import_animes_anime_id_key`(`anime_id`),
    UNIQUE INDEX `import_animes_kitsu_id_key`(`kitsu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `import_sagas` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `import_id` INTEGER UNSIGNED NOT NULL,
    `details` LONGTEXT NOT NULL,
    `treat` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `import_sagas_import_id_key`(`import_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `animes` ADD CONSTRAINT `animes_saga_id_fkey` FOREIGN KEY (`saga_id`) REFERENCES `sagas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `posts` ADD CONSTRAINT `posts_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_follows` ADD CONSTRAINT `users_follows_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_follows` ADD CONSTRAINT `users_follows_follow_id_fkey` FOREIGN KEY (`follow_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `import_animes` ADD CONSTRAINT `import_animes_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `import_sagas` ADD CONSTRAINT `import_sagas_import_id_fkey` FOREIGN KEY (`import_id`) REFERENCES `import_animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
