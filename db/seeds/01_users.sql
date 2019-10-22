INSERT INTO users (full_name, email, password)
VALUES ('Avijit Choudhury', 'avijit.choudhury24@gmail.com', 'password');

INSERT INTO maps (user_id, title, description, is_favorite)
VALUES (1, 'Cities in the GTA', 'There are where my friends live', true);


<<<<<<< HEAD
INSERT INTO pins (map_id, comment, latitude, longitude)
VALUES ( 1, 'Toronto', 43.6532, -79.3832),
( 1, 'Missisauga', 43.6532, -79.3832),
( 1, 'Vaughan', 43.6532, -79.3832),
( 1, 'Richmond Hill', 43.6532, -79.3832);
=======
INSERT INTO pins (id, map_id, comment, latitude, longitude)
VALUES (1, 1, 'Toronto', 43.6532, -79.3832),
(2, 1, 'Missisauga', 43.5890, -79.6441),
(3, 1, 'Vaughan', 43.8563, -79.5085),
(4, 1, 'Richmond Hill', 43.8828, -79.4403)
>>>>>>> createMap
