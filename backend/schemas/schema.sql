create database cinema;
use cinema;

create table client (
  id_client INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  second_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  pass VARCHAR(45) NOT NULL,
  bonuses INT NULL
);

insert into client (first_name, second_name, email, pass)
values
('Danylo', 'Vovk', 'dantervovk@gmail.com', '12345'),
('Vladik', 'Skugra', 'vladik@gmail.com', '123456'); 

create table movie (
  id_movie INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  year INT NOT NULL,
  country VARCHAR(45) NOT NULL,
  age_rating INT NOT NULL,
  runtime_min INT NULL,
  director VARCHAR(45) NOT NULL,
  script VARCHAR(45) NOT NULL
);

insert into movie (name, year, country, age_rating, runtime_min, director, script)
values
('Оппенгеймер', '2023', 'Велика Британія', '16', '180', 'Крістофер Нолан', 'Крістофер Нолан'),
('Людина-павук: Додому шляху нема', '2021', 'США', '12', '148', 'Джон Воттс', 'Кріс Маккенна'),
('Месники: Завершення', '2019', 'США', '13', '181', 'Ентоні Руссо', 'Крістофер Маркус');

create table genre (
  id_genre INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL
);

insert into genre (name)
values
('Екшн'),
('Трилер'),
('Історичний'); 

CREATE TABLE IF NOT EXISTS `Cinema`.`movie_has_genre` (
  `movie_id_movie` INT NOT NULL,
  `genre_id_genre` INT NOT NULL,
  PRIMARY KEY (`movie_id_movie`, `genre_id_genre`),
  INDEX `fk_movie_has_genre_genre1_idx` (`genre_id_genre` ASC) VISIBLE,
  INDEX `fk_movie_has_genre_movie1_idx` (`movie_id_movie` ASC) VISIBLE,
  CONSTRAINT `fk_movie_has_genre_movie1`
    FOREIGN KEY (`movie_id_movie`)
    REFERENCES `Cinema`.`movie` (`id_movie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movie_has_genre_genre1`
    FOREIGN KEY (`genre_id_genre`)
    REFERENCES `Cinema`.`genre` (`id_genre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

insert into movie_has_genre (movie_id_movie, genre_id_genre)
values
('1', '3'),
('2', '1'),
('3', '2'); 

CREATE TABLE IF NOT EXISTS `Cinema`.`showtime` (
  `id_showtime` INT NOT NULL AUTO_INCREMENT,
  `movie_id_st` INT NOT NULL,
  `show_time` DATETIME NOT NULL,
  `showtimeformat` VARCHAR(45) NOT NULL,
  `hall_number` INT NOT NULL,
  PRIMARY KEY (`id_showtime`),
  UNIQUE (`movie_id_st`, `show_time`),
  CONSTRAINT `fk_movie_showtime`
    FOREIGN KEY (`movie_id_st`)
    REFERENCES `Cinema`.`movie` (`id_movie`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `Cinema`.`ticket` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `seat_number` INT NOT NULL,
  `row_number` INT NOT NULL,
  `seat_price` DECIMAL(10, 2) NOT NULL,
  `ticket_showtime_id_showtime` INT NOT NULL,
  PRIMARY KEY (`id_ticket`, `ticket_showtime_id_showtime`),
  INDEX `fk_ticket_showtime_idx` (`ticket_showtime_id_showtime`),
  CONSTRAINT `fk_ticket_showtime`
    FOREIGN KEY (`ticket_showtime_id_showtime`)
    REFERENCES `Cinema`.`showtime` (`id_showtime`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

INSERT INTO `showtime` (movie_id_st, show_time, showtimeformat, hall_number)
VALUES
(1, '2025-01-03 15:00:00', '2D', 1),
(1, '2025-01-03 18:30:00', '3D', 2),
(2, '2025-01-04 14:00:00', '2D', 1),
(2, '2025-01-04 17:30:00', 'IMAX', 3),
(3, '2025-01-05 12:00:00', '2D', 2),
(3, '2025-01-05 16:30:00', '3D', 1);

INSERT INTO `ticket` (`seat_number`, `row_number`, `seat_price`, `ticket_showtime_id_showtime`)
VALUES
(1, 1, 150.00, 1),
(2, 2, 150.00, 2),
(3, 3, 150.00, 3),
(4, 4, 150.00, 4),
(5, 5, 150.00, 5),
(6, 6, 150.00, 6);
