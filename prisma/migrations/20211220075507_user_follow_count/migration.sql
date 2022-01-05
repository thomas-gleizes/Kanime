-- AlterTable
ALTER TABLE `users`
    ADD COLUMN `avatar_path`     VARCHAR(191)      NULL,
    ADD COLUMN `background_path` VARCHAR(191)      NULL,
    ADD COLUMN `follow_count`    SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    ADD COLUMN `follower_count`  SMALLINT UNSIGNED NOT NULL DEFAULT 0;

CREATE OR REPLACE TRIGGER update_user_follow_count_insert
    AFTER INSERT ON users_follow FOR EACH ROW
BEGIN
    UPDATE users SET follow_count = follow_count + 1 WHERE id = NEW.follower_id;
    UPDATE users SET follower_count = follower_count + 1 WHERE id = NEW.follow_id;
END;

CREATE OR REPLACE TRIGGER update_user_follow_count_delete
    AFTER DELETE ON users_follow FOR EACH ROW
BEGIN
    UPDATE users SET follow_count = follow_count - 1 WHERE id = OLD.follower_id;
    UPDATE users SET follower_count = follower_count - 1 WHERE id = OLD.follow_id;
END;