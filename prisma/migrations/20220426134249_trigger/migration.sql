CREATE OR REPLACE TRIGGER update_user_follow_count_insert
    AFTER INSERT
    ON users_follows
    FOR EACH ROW
BEGIN
UPDATE users SET follow_count = follow_count + 1 WHERE id = NEW.follower_id;
UPDATE users SET follower_count = follower_count + 1 WHERE id = NEW.follow_id;
END;

CREATE OR REPLACE TRIGGER update_user_follow_count_delete
    AFTER DELETE
ON users_follows
    FOR EACH ROW
BEGIN
UPDATE users SET follow_count = follow_count - 1 WHERE id = OLD.follower_id;
UPDATE users SET follower_count = follower_count - 1 WHERE id = OLD.follow_id;
END;


CREATE OR REPLACE TRIGGER update_animes_after_entries_insert
    AFTER INSERT
    ON entries
    FOR EACH ROW
BEGIN
UPDATE animes SET popularity_count = IF(popularity_count IS NULL, 0, popularity_count) + 1 WHERE id = NEW.anime_id;

IF NEW.rating IS NOT NULL THEN
UPDATE animes
SET rating_average = (SELECT ROUND(AVG(rating) * 10, 2)
                      FROM entries
                      WHERE rating IS NOT NULL AND anime_id = NEW.anime_id)
WHERE id = NEW.anime_id;
END IF;
END;

CREATE OR REPLACE TRIGGER update_animes_after_entries_delete
    AFTER DELETE
ON entries
    FOR EACH ROW
BEGIN
UPDATE animes
SET popularity_count = IF(popularity_count - 1 = 0, NULL, popularity_count - 1)
WHERE id = OLD.anime_id;

IF OLD.rating IS NOT NULL THEN
UPDATE animes
SET rating_average = (SELECT ROUND(AVG(rating) * 10, 2)
                      FROM entries
                      WHERE rating IS NOT NULL AND anime_id = OLD.anime_id)
WHERE id = OLD.anime_id;
END IF;
END;

CREATE OR REPLACE TRIGGER update_animes_after_entries_update
    AFTER UPDATE
                     ON entries
                     FOR EACH ROW
BEGIN
    IF ((NEW.rating IS NOT NULL AND OLD.rating IS NULL) OR (OLD.rating IS NOT NULL AND NEW.rating IS NULL) OR
        (OLD.rating != NEW.rating)) THEN
UPDATE animes
SET rating_average = (SELECT ROUND(AVG(rating) * 10, 2)
                      FROM entries
                      WHERE rating IS NOT NULL AND anime_id = NEW.anime_id)
WHERE id = NEW.anime_id;
END IF;
END;

CREATE OR REPLACE PROCEDURE update_animes_ranking()
BEGIN
INSERT INTO event_logs SET name = 'update_animes_ranking';

UPDATE animes a
SET popularity_rank = (SELECT ranking
                       FROM (SELECT id,
                                    DENSE_RANK() over (ORDER BY a2.popularity_count DESC, a2.created_at) as ranking
                             FROM animes a2
                             WHERE a2.popularity_count IS NOT NULL) AS tab
                       WHERE tab.id = a.id)
WHERE a.popularity_count IS NOT NULL;

UPDATE animes a
SET rating_rank = (SELECT ranking
                   FROM (SELECT id, DENSE_RANK() over (ORDER BY a2.rating_average DESC, a2.created_at) as ranking
                         FROM animes a2
                         WHERE a2.rating_average IS NOT NULL) AS tab
                   WHERE tab.id = a.id)
WHERE a.popularity_count IS NOT NULL;
END;

SET GLOBAL event_scheduler = ON;

CREATE OR REPLACE EVENT event_update_animes_ranking
    ON SCHEDULE EVERY 1 HOUR STARTS NOW()
    DO CALL update_animes_ranking();
