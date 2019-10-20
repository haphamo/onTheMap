INSERT INTO users (id, full_name, email, password)
VALUES (1, 'Avijit Choudhury', 'avijit.choudhury24@gmail.com', 'password'),
(2, 'Ha Pham', 'hapham0392@gmail.com', 'password'),
(3, 'Jordan Owens', 'jordanowens86@gmail.com', 'password');

INSERT INTO maps (id, title, description, is_favorite)
VALUES (1, 'Travel adventures', 'Places I have travelled to', true),
(2, 'Dining', 'Places I ate at today', true),
(3, 'Rare animal sightings', 'White squirrels discovered', false);

INSERT INTO pins (id, comment, latitude, longitude)
VALUES (1, 'George Clooney spotting', 43.38518, -79.2343),
(2, 'White Squirrel spotting', 43.37591, -79.2528),
(3, 'Oretta', 43.3837, -79.2406);
