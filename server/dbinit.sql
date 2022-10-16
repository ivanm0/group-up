SET sql_safe_updates = FALSE;

USE defaultdb;
DROP DATABASE IF EXISTS groupup CASCADE;
CREATE DATABASE IF NOT EXISTS groupup;

USE groupup;

CREATE TABLE teachers (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    firstname STRING,
    lastname STRING
);

CREATE TABLE students (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    firstname STRING,
    lastname STRING
);

INSERT INTO teachers (firstname, lastname)
    VALUES ('Paul', 'Ahn');

-- INSERT INTO scores (avatar, playername, points)
--   VALUES (3, 'James O. Ewing', 721);