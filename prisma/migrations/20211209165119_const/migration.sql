/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_user_index` ON `users`;

-- CreateIndex
CREATE UNIQUE INDEX `categories_slug_key` ON `categories` (`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users` (`username`);
