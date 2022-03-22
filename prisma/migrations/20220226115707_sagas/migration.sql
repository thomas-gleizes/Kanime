-- AlterTable
ALTER TABLE `animes` ADD COLUMN `saga_id` INTEGER NULL AFTER status;

-- AlterTable
ALTER TABLE `users` MODIFY `last_ask_reset_password` DATETIME(3) NULL,
    MODIFY `last_reset_password` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `sagas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `canonical_title` VARCHAR(191) NOT NULL,
    `titles` LONGTEXT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE INDEX `sagas_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sagas_import` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `import_id` INTEGER NOT NULL,
    `details` LONGTEXT NOT NULL,
    `treat` BOOLEAN NOT NULL,
    `import_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `sagas_import_import_id_key`(`import_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `animes` ADD CONSTRAINT `animes_saga_id_fkey` FOREIGN KEY (`saga_id`) REFERENCES `sagas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sagas_import` ADD CONSTRAINT `sagas_import_import_id_fkey` FOREIGN KEY (`import_id`) REFERENCES `animes_import`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
