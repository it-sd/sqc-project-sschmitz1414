--Character Query
DROP TABLE IF EXISTS character;
CREATE TABLE character (
    character_id SERIAL PRIMARY KEY,
    comic_id INTEGER,
    name VARCHAR(50) NOT NULL,
    profile VARCHAR(50) NOT NULL,
    powers VARCHAR(100) NOT NULL,
    feedback INTEGER NOT NULL
    --0 is N/A, 1 is best, 2 is worst
);

INSERT INTO character (name, profile, powers, feedback) VALUES 
	('Black-Cat', 'White Female Anti-Hero', 'Super Strength, Super Agility, Grappling Hook', 0),
	('Ultron', 'Masculine AI Villain', 'Hive Mind, Lasers, Magnets, Flight', 0), 
	('Onslaught', 'Masculine Entity Villain', 'Telepathy, Telekinesis, Magnetism, Flight', 0),
	('Psylocke', 'Asian Female Anti-Hero', 'Psychic Energy, Telepathy', 0),
	('Spider-Man', 'White Male Hero', 'Spidey Sense, Superhuman Abilities, Web Shooters', 0),
	('Ms-Marvel', 'Pakistani Female Hero', 'Shape Shift, Crystal Generation', 0),
	('Moon-Knight', 'Jewish Male Hero', 'Regeneration, Superhuman Abilities, Cape Glider', 0),
	('Venom', 'Masculine Symbiote Anti-Hero', 'Absorption, Regeneration, Enhance Abilities', 0),
	('Hawkeye', 'White Male Hero', 'Mastered Archery, Martial Arts, Ronin Sword', 0),
	('Iron-Man', 'White Male Hero', 'Armored Suit, Nano Tech, Lasers, Explosives, Flight, AI', 0),
	('Star-Lord', 'White Male Hero', 'Celestial Powers, Quad Blasters, Explosives, Flight', 0),
	('Shang-Chi', 'Asian Male Hero', '10 Rings, Martial Arts', 0);

--Comic Query
DROP TABLE IF EXISTS comic;
CREATE TABLE comic (
    comic_id SERIAL PRIMARY KEY,
    character_id INTEGER,
	title VARCHAR(50) NOT NULL,
    creators VARCHAR(50) NOT NULL,
    startYear VARCHAR(50) NOT NULL
);