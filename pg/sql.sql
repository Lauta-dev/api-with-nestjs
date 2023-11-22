CREATE TABLE IF NOT EXISTS users (
  user_id         INTEGER,
  user_handle     VARCHAR(75),
  user_password   VARCHAR(40),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS game (
  user_id        INTEGER REFERENCES users(user_id),
  game_id        UUID DEFAULT uuid_generate_v4(),
  game_title     VARCHAR(250) NOT NULL,
  game_release   DATE NOT NULL,
  game_genre     VARCHAR(150) NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (game_id)
);


INSERT INTO users (user_id, user_handle, user_password) VALUES 
(1, '@lauta', 'ana123'),
(2, '@mario', 'password123'),
(3, '@karina', 'maria_pass'),
(4, '@facu', 'securepass'),
(5, '@marzelo', 'ana123'),
(6, '@yonikua', 'password123'),
(7, '@javier', 'password123'),
(8, '@maria', 'maria_pass'),
(9, '@carlos', 'securepass'),
(10, '@sofia', 'sofia_pass'),
(11, '@diego', 'd1ego!pass'),
(12, '@laura', 'laura1234'),
(13, '@pablo', 'pablo_pass'),
(14, '@valentina', 'v_pass'),
(15, '@juan', 'juanpass');

select * from users;

-- Usuario 2
INSERT INTO game (user_id, game_title, game_release, game_genre)
VALUES
(2, 'Grand Theft Auto: San Andreas', '26/08/2004', 'Devolver a Grove Street'),
(3, 'Grand Theft Auto: San Andreas', '26/08/2004', 'Devolver a Grove Street'),
(4, 'Grand Theft Auto: San Andreas', '26/08/2004', 'Devolver a Grove Street'),
(5, 'Grand Theft Auto: San Andreas', '26/08/2004', 'Devolver a Grove Street'),
(2, 'Dark Souls', '22/08/2011', 'Matar a dios'),
(2, 'Age Of Empire II', '19/08/1999', 'Comunismo en su maxima exprecion'),
(2, 'Grand Theft Auto: Vice City', '26/08/2002', 'Los 80s pa'),
(2, 'Battlefield 4', '28/08/2013', 'Tata'),
(2, 'Watch Dogs', '26/03/2014', 'Hackear CTOS');

-- Usuario 3
INSERT INTO game (user_id, game_title, game_release, game_genre)
VALUES
(3, 'The Witcher 3: Wild Hunt', '19/05/2015', 'RPG de fantasía'),
(3, 'Counter-Strike: Global Offensive', '21/08/2012', 'Disparos en primera persona'),
(3, 'Minecraft', '18/11/2011', 'Mundo abierto y construcción'),
(2, 'Minecraft', '18/11/2011', 'Mundo abierto y construcción'),
(1, 'Minecraft', '18/11/2011', 'Mundo abierto y construcción'),
(5, 'Minecraft', '18/11/2011', 'Mundo abierto y construcción'),
(3, 'FIFA 22', '01/10/2021', 'Deportes');

-- Usuario 4
INSERT INTO game (user_id, game_title, game_release, game_genre)
VALUES
(4, 'The Legend of Zelda: Breath of the Wild', '03/03/2017', 'Acción y aventuras'),
(2, 'The Legend of Zelda: Breath of the Wild', '03/03/2017', 'Acción y aventuras'),
(3, 'The Legend of Zelda: Breath of the Wild', '03/03/2017', 'Acción y aventuras'),
(4, 'Overwatch', '24/05/2016', 'Disparos en primera persona'),
(1, 'Fortnite', '25/07/2017', 'Battle Royale'),
(2, 'Fortnite', '25/07/2017', 'Battle Royale'),
(3, 'Fortnite', '25/07/2017', 'Battle Royale'),
(4, 'Rocket League', '07/07/2015', 'Deportes y conducción');

-- Usuario 5
INSERT INTO game (user_id, game_title, game_release, game_genre)
VALUES
(5, 'Assassins Creed Valhalla', '10/11/2020', 'Acción y aventuras'),
(5, 'Cyberpunk 2077', '10/12/2020', 'Juego de rol y acción');


SELECT * FROM game;

select game.game_title AS Title,
       users.user_id AS user, 
       COUNT(users.user_id) AS likes
FROM game
JOIN users ON game.user_id = users.user_id
GROUP BY game.game_title, users.user_id
ORDER BY users.user_id ASC;

-- DROP TABLE IF EXISTS game;
-- DROP TABLE IF EXISTS users;

