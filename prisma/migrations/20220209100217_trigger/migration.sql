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
    UPDATE animes SET popularity_count = popularity_count + 1 WHERE id = NEW.anime_id;

    UPDATE animes a
    SET popularity_rank = (SELECT ranking
                           FROM (SELECT id, DENSE_RANK() over (ORDER BY a2.popularity_count DESC) as ranking
                                 FROM animes a2
                                 WHERE a2.popularity_count > 0) AS tab
                           WHERE tab.id = a.id);

    IF NEW.rating IS NOT NULL THEN
        UPDATE animes
        SET rating_average = (SELECT ROUND(AVG(rating), 2) FROM entries WHERE rating IS NOT NULL AND anime_id = NEW.anime_id)
        WHERE id = NEW.anime_id;

        UPDATE animes a
        SET rating_rank = (SELECT ranking
                           FROM (SELECT id, DENSE_RANK() over (ORDER BY a2.rating_average DESC) as ranking
                                 FROM animes a2
                                 WHERE a2.rating_average IS NOT NULL) AS tab
                           WHERE tab.id = a.id);
    END IF;
END;

CREATE OR REPLACE TRIGGER update_animes_after_entries_delete
    AFTER DELETE
    ON entries
    FOR EACH ROW
BEGIN
    UPDATE animes SET popularity_count = popularity_count - 1 WHERE  id = OLD.anime_id;

    UPDATE animes a
    SET popularity_rank = (SELECT ranking
                           FROM (SELECT id, DENSE_RANK() over (ORDER BY a2.popularity_count DESC) as ranking
                                 FROM animes a2
                                 WHERE a2.popularity_count > 0) AS tab
                           WHERE tab.id = a.id);

    IF OLD.rating IS NOT NULL THEN
        UPDATE animes
        SET rating_average = (SELECT ROUND(AVG(rating), 2) FROM entries WHERE rating IS NOT NULL AND anime_id = OLD.anime_id)
        WHERE id = OLD.anime_id;

        UPDATE animes a
        SET rating_rank = (SELECT ranking
                           FROM (SELECT id, DENSE_RANK() over (ORDER BY a2.rating_average DESC) as ranking
                                 FROM animes a2
                                 WHERE a2.rating_average IS NOT NULL) AS tab
                           WHERE tab.id = a.id);
    END IF;
END;

CREATE OR REPLACE TRIGGER update_animes_after_entries_update
    AFTER UPDATE
    ON entries
    FOR EACH ROW
BEGIN
    IF ((OLD.rating != NEW.rating)) THEN
        UPDATE animes
        SET rating_average = (SELECT ROUND(AVG(rating), 2) FROM entries WHERE rating IS NOT NULL AND anime_id = NEW.anime_id)
        WHERE id = NEW.anime_id;

        UPDATE animes a
        SET rating_rank = (SELECT ranking
                           FROM (SELECT id, DENSE_RANK() over (ORDER BY a2.rating_average DESC) as ranking
                                 FROM animes a2
                                 WHERE a2.rating_average IS NOT NULL) AS tab
                           WHERE tab.id = a.id);
    END IF;
END;
