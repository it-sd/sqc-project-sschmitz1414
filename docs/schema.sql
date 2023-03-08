--Character Query
DROP TABLE IF EXISTS character;
CREATE TABLE character (
    character_id INTEGER,
    comic_id INTEGER,
    name VARCHAR(50),
    profile VARCHAR(50),
    powers VARCHAR(50)
);


--Comic Query
DROP TABLE IF EXISTS comic;
CREATE TABLE comic (
    comic_id INTEGER,
    character_id INTEGER,
    author VARCHAR(50),
    illustrator VARCHAR(50),
    release_date VARCHAR(50)
);