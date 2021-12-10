-- CreateTable
CREATE TABLE `animes`
(
    `id`               INTEGER                                                       NOT NULL AUTO_INCREMENT,
    `kitsu_id`         VARCHAR(191)                                                  NULL,
    `slug`             VARCHAR(191)                                                  NOT NULL,
    `canonical_title`  VARCHAR(191)                                                  NOT NULL,
    `titles`           LONGTEXT                                                      NULL,
    `synopsis`         TEXT                                                          NULL,
    `description`      TEXT                                                          NULL,
    `season`           ENUM ('Winter', 'Springs', 'Summer', 'Fall')                  NULL,
    `season_year`      VARCHAR(4)                                                    NULL,
    `date_begin`       DATE                                                          NULL,
    `date_end`         DATE                                                          NULL,
    `rating_average`   DOUBLE                                                        NULL,
    `rating_rank`      INTEGER UNSIGNED                                              NULL,
    `popularity_count` DOUBLE                                                        NULL,
    `popularity_rank`  INTEGER UNSIGNED                                              NULL,
    `type`             ENUM ('TV', 'Movie', 'OAV', 'ONA', 'OVA', 'special', 'music') NULL,
    `poster`           LONGTEXT                                                      NULL,
    `cover`            LONGTEXT                                                      NULL,
    `episode_count`    INTEGER UNSIGNED                                              NULL,
    `episode_length`   INTEGER UNSIGNED                                              NULL,
    `status`           ENUM ('finished', 'current', 'unreleased', 'tba', 'upcoming') NOT NULL DEFAULT 'unreleased',
    `created_at`       TIMESTAMP(0)                                                  NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `animes_kitsu_id_key` (`kitsu_id`),
    UNIQUE INDEX `animes_slug_key` (`slug`),
    INDEX `animes_canonical_title_index` (`canonical_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories`
(
    `id`         INTEGER      NOT NULL AUTO_INCREMENT,
    `libelle`    VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animes_categories`
(
    `anime_id`    INTEGER      NOT NULL,
    `category_id` INTEGER      NOT NULL,
    `created_at`  TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`anime_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users`
(
    `id`         INTEGER      NOT NULL AUTO_INCREMENT,
    `email`      VARCHAR(191) NOT NULL,
    `password`   VARCHAR(191) NOT NULL,
    `login`      VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_email_key` (`email`),
    INDEX `users_login_index` (`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animes_users`
(
    `anime_id`   INTEGER                                                      NOT NULL,
    `user_id`    INTEGER                                                      NOT NULL,
    `status`     ENUM ('Wanted', 'Watching', 'Completed', 'OnHold', 'Droped') NOT NULL DEFAULT 'Wanted',
    `created_at` TIMESTAMP(0)                                                 NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0)                                                 NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    INDEX `animes_users_user_id_fkey` (`user_id`),
    PRIMARY KEY (`anime_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_follow`
(
    `follower_id` INTEGER      NOT NULL,
    `follow_id`   INTEGER      NOT NULL,
    `created_at`  TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`follower_id`, `follow_id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `animes_categories`
    ADD CONSTRAINT `animes_categories_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animes_categories`
    ADD CONSTRAINT `animes_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animes_users`
    ADD CONSTRAINT `animes_users_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animes_users`
    ADD CONSTRAINT `animes_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_follow`
    ADD CONSTRAINT `users_follow_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_follow`
    ADD CONSTRAINT `users_follow_follow_id_fkey` FOREIGN KEY (`follow_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
