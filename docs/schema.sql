--Character Query
DROP TABLE IF EXISTS character;
CREATE TABLE character (
    character_id SERIAL PRIMARY KEY,
    comic_id INTEGER,
    name VARCHAR(100) NOT NULL,
    profile VARCHAR(100) NOT NULL,
    powers VARCHAR(100) NOT NULL,
    feedback INTEGER NOT NULL
    --0 is N/A, 1 is best, 2 is worst
);

INSERT INTO character (name, profile, powers, feedback) VALUES 
	('Black-Cat (Felicia Hardy)', 'White Female Anti-Hero', 'Super Strength, Super Agility, Grappling Hook', 0),
	('Ultron (N/A)', 'Masculine AI Villain', 'Hive Mind, Lasers, Magnets, Flight', 0), 
	('Onslaught (N/A)', 'Masculine Entity Villain', 'Telepathy, Telekinesis, Magnetism, Flight', 0),
	('Psylocke (Betsy Braddock)', 'Asian Female Anti-Hero', 'Psychic Energy, Telepathy', 0),
	('Spider-Man (Peter Parker)', 'White Male Hero', 'Spidey Sense, Superhuman Abilities, Web Shooters', 0),
	('Ms-Marvel (Kamala Khan)', 'Pakistani Female Hero', 'Shape Shift, Crystal Generation', 0),
	('Moon-Knight (Marc Spector)', 'Jewish Male Hero', 'Regeneration, Superhuman Abilities, Cape Glider', 0),
	('Venom (Host: Eddie Brock)', 'Masculine Symbiote Anti-Hero', 'Absorption, Regeneration, Enhanced Abilities', 0),
	('Hawkeye (Clint Barton)', 'White Male Hero', 'Mastered Archery, Martial Arts, Ronin Sword', 0),
	('Iron-Man (Tony Stark)', 'White Male Hero', 'Armored Suit, Nano Tech, Lasers, Explosives, Flight, AI', 0),
	('Star-Lord (Peter Quill)', 'White Male Hero', 'Celestial Powers, Quad Blasters, Explosives, Flight', 0),
	('Shang-Chi (Xu Wenwu)', 'Asian Male Hero', '10 Rings, Martial Arts', 0);

--Comic Query
DROP TABLE IF EXISTS comic;
CREATE TABLE comic (
    comic_id SERIAL PRIMARY KEY,
    character_id INTEGER,
	title VARCHAR(100) NOT NULL,
    creators VARCHAR(100) NOT NULL,
    startYear VARCHAR(4) NOT NULL
	--Specifically want String not Integer
);

INSERT INTO comic (title, creators, startYear) VALUES
	('The Amazing Spider-Man #194', 'Marv Wolfman, Dave Cockrum, Keith Pollard', '1963'),
	('The Avengers #54', 'Roy Thomas, John Buscema', '1968'),
	('X-Men Vol. 1 #53', 'Scott Lobdell, Mark Waid, Andy Kubert', '1996'),
	('Captain Britain #8', 'Chris Claremont', '1976'),
	('Amazing Fantasy #15', 'Stan Lee and Steve Ditko', '1962'),
	('Captain Marvel #14', 'Sana Amanat, G. Willow Wilson, Adrian Alphona, Jamie McKelvie', '2013'),
	('Werewolf by Night #32', 'Doug Moench, Don Perlin', '1975'),
	('The Amazing Spider-Man #300', 'Todd McFarlane, Mike Zeck, David Michelinie', '1988'),
	('Tales of Suspense #57', 'Stan Lee, Don Heck', '1964'),
	('Tales of Suspense #39', 'Stan Lee, Larry Lieber, Don Heck, Jack Kirby', '1963'),
	('Marvel Preview #4', 'Steve Englehart, Steve Gan', '1976'),
	('Special Marvel Edition #15', 'Jim Starlin, Steve Englehart, Sax Rohmer', '1973');