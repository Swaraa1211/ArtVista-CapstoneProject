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
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

--drop table Art

select * from Users
select * from Art


-- Create ArtistPortfolio table
CREATE TABLE ArtistPortfolio (
  id INT PRIMARY KEY,
  userid INT,
  artistname VARCHAR(255),
  about TEXT,
  masterpiece TEXT,
  contact VARCHAR(255),
  journey TEXT,
  FOREIGN KEY (userid) REFERENCES Users(id)
);

-- Create Favorites table
CREATE TABLE Favorites (
  id INT PRIMARY KEY,
  userid INT,
  artid INT,
  FOREIGN KEY (userid) REFERENCES Users(id),
  FOREIGN KEY (artid) REFERENCES Art(id)
);


-- Create Price table
CREATE TABLE Price (
  id INT PRIMARY KEY,
  bidprice DECIMAL(10, 2),
  artid INT,
  userid INT,
  FOREIGN KEY (artid) REFERENCES Art(id),
  FOREIGN KEY (userid) REFERENCES Users(id)
);

-- Create Review table
CREATE TABLE Review (
  id INT PRIMARY KEY,
  userid INT,
  artid INT,
  rating INT,
  reviewcomment TEXT,
  FOREIGN KEY (userid) REFERENCES Users(id),
  FOREIGN KEY (artid) REFERENCES Art(id)
);

-- Create Cart table
CREATE TABLE Cart (
  id INT PRIMARY KEY,
  artid INT,
  quantity INT,
  artname VARCHAR(255),
  FOREIGN KEY (artid) REFERENCES Art(id)
);

-- Create Order table
CREATE TABLE Order (
  id INT PRIMARY KEY,
  userid INT,
  totalamount DECIMAL(10, 2),
  payment VARCHAR(255),
  orderdate DATE,
  FOREIGN KEY (userid) REFERENCES Users(id)
);

-- Create OrderItem table
CREATE TABLE OrderItem (
  id INT PRIMARY KEY,
  orderid INT,
  artid INT,
  artname VARCHAR(255),
  quantity INT,
  price DECIMAL(10, 2),
  FOREIGN KEY (orderid) REFERENCES Order(id),
  FOREIGN KEY (artid) REFERENCES Art(id)
);

-- Create Payment table
CREATE TABLE Payment (
  id INT PRIMARY KEY,
  amount DECIMAL(10, 2),
  date DATE
);
