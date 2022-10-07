CREATE OR REPLACE PROCEDURE generate_entries(IN i INT)
BEGIN
    DECLARE n INT default 1;

    WHILE n < i
        DO
            INSERT IGNORE INTO entries (anime_id, user_id, rating, favorite, status, progress)
            SELECT a.anime_id                                                                            as anime_id,
                   FLOOR((RAND()) * (b.count - 2)) + 2                                                   as user_id,
                   IF(a.random_status = 'Completed' OR a.random_status = 'Dropped',
                      IF(random_rating > 10, ROUND(RAND() * (9 - 7 + 0.5) + 7, 2), random_rating), null) as rating,
                   IF(RAND() > 0.95, TRUE, FALSE)                                                        as favorite,
                   a.random_status                                                                       as status,
                   CASE a.random_status
                       WHEN 'Wanted' THEN 0
                       WHEN 'Completed' THEN IF(a.episode_count IS NOT NULL, a.episode_count, 1)
                       ELSE FLOOR(RAND() * IF(a.episode_count IS NOT NULL, a.episode_count, 1))
                       END                                                                               as progress
            FROM (SELECT i.*,
                         ROUND((i.rating_average / 10) * (RAND() * (1.3 - 0.7 + 0.1) + 0.7), 2) as random_rating,
                         CASE
                             WHEN r.value < 4 THEN 'Wanted'
                             WHEN r.value < 5 THEN 'Watching'
                             WHEN r.value < 10 THEN 'Completed'
                             WHEN r.value < 11 THEN 'OnHold'
                             ELSE 'Dropped'
                             END                                                                as random_status
                  FROM import_animes i
                           JOIN (SELECT FLOOR(RAND() * 12) as value, id FROM import_animes) as r ON r.id = i.id
                  ORDER BY RAND()
                  LIMIT 8000) as a,
                 (SELECT COUNT(*) as count FROM users) as b
            ORDER BY a.rating_average DESC
            LIMIT 4000;
            SET n = n + 1;
        END WHILE;
END;

CREATE OR REPLACE PROCEDURE seed_users(IN i INT)
BEGIN
    DECLARE last_id int default 0;
    DECLARE n int default 0;

    SELECT MAX(id) INTO last_id FROM users ORDER BY id DESC;

    WHILE (n < i)
        DO
            INSERT INTO users
            SET username   = CONCAT('user ', last_id + n),
                slug       = CONCAT('user-', last_id + n),
                email      = CONCAT('user_', last_id + n, '@kanime.dev'),
                real_email = CONCAT('user_', last_id + n, '@kanime.dev'),
                password   = 'password';

            SET n = n + 1;
        END WHILE;
END;
