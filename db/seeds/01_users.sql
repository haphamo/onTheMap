INSERT INTO users (full_name, email, password)
VALUES ('Avijit Choudhury', 'avijit.choudhury24@gmail.com', 'password');

INSERT INTO maps (user_id, title, description, is_favorite)
VALUES (1, 'Cities in the GTA', 'There are where my friends live', true);


INSERT INTO pins (map_id, comment, latitude, longitude)
VALUES ( 1, 'Toronto', 43.6532, -79.3832),
( 1, 'Missisauga', 43.6532, -79.3832),
( 1, 'Vaughan', 43.6532, -79.3832),
( 1, 'Richmond Hill', 43.6532, -79.3832);
