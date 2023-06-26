create table Users(
	user_id int primary key identity(1,1),
	user_name varchar(100),
	user_email varchar(100),
	user_password varchar(100)
);



--drop table Users

-- Create Users table
--CREATE TABLE Users (
--  id INT PRIMARY KEY,
--  username VARCHAR(255),
--  password VARCHAR(255),
--  email VARCHAR(255)
--);

-- Create Art table
CREATE TABLE Art (
  art_id INT PRIMARY KEY identity(1,1),
  art_description VARCHAR(255),
  artist_name VARCHAR(255),
  art_name VARCHAR(255),
  price INT,
  picture VARCHAR(255),
  user_id INT,
  user_name  varchar(100),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

--drop table Art


-- Create Favorites table
CREATE TABLE Favorites (
  fav_id INT PRIMARY KEY,
  user_id INT,
  art_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION,
  FOREIGN KEY (art_id) REFERENCES Art(art_id) ON DELETE NO ACTION
);

	
-- Create ArtistPortfolio table
CREATE TABLE ArtistPortfolio (
  artist_id INT PRIMARY KEY identity(1,1),
  artist_name VARCHAR(255),
  about VARCHAR(255),
  masterpiece VARCHAR(255),
  contact VARCHAR(255),
  journey VARCHAR(255),
  user_id INT,
  user_name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION
);

---- Create BidPrice table
CREATE TABLE BidPrice (
  bidprice_id INT PRIMARY KEY identity(1,1),
  bidprice INT,
  art_id INT,
  user_id INT,
  FOREIGN KEY (art_id) REFERENCES Art(art_id) ON DELETE NO ACTION,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION
);


-- Create Review table

CREATE TABLE Review (
  review_id INT PRIMARY KEY identity(1,1),
  user_id INT,
  art_id INT,
  rating INT,
  reviewcomment VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (art_id) REFERENCES Art(art_id)
);

select * from Users
select * from Art
select * from Favorites
select * from ArtistPortfolio
select * from BidPrice
select * from Review



-- Create Cart table
--CREATE TABLE Cart (
--  id INT PRIMARY KEY,
--  artid INT,
--  quantity INT,
--  artname VARCHAR(255),
--  FOREIGN KEY (artid) REFERENCES Art(id)
--);

-- Create Order table
--CREATE TABLE Order (
--  id INT PRIMARY KEY,
--  userid INT,
--  totalamount DECIMAL(10, 2),
--  payment VARCHAR(255),
--  orderdate DATE,
--  FOREIGN KEY (userid) REFERENCES Users(id)
--);

-- Create OrderItem table
--CREATE TABLE OrderItem (
--  id INT PRIMARY KEY,
--  orderid INT,
--  artid INT,
--  artname VARCHAR(255),
--  quantity INT,
--  price DECIMAL(10, 2),
--  FOREIGN KEY (orderid) REFERENCES Order(id),
--  FOREIGN KEY (artid) REFERENCES Art(id)
--);

-- Create Payment table
--CREATE TABLE Payment (
--  id INT PRIMARY KEY,
--  amount DECIMAL(10, 2),
--  date DATE
--);
