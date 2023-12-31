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
--CREATE TABLE Favorites (
--  fav_id INT PRIMARY KEY identity(1,1),
--  user_id INT,
--  art_id INT,
--  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION,
--  FOREIGN KEY (art_id) REFERENCES Art(art_id) ON DELETE NO ACTION
--);
CREATE TABLE Favorites (
  fav_id INT PRIMARY KEY identity(1,1),
  Userid INT,
  Artid INT,
  FOREIGN KEY (Userid) REFERENCES Users(user_id) ON DELETE NO ACTION,
  FOREIGN KEY (Artid) REFERENCES Art(art_id) ON DELETE NO ACTION
);
--drop table Favorites

	
-- Create ArtistPortfolio table
CREATE TABLE ArtistPortfolio (
  artist_id INT PRIMARY KEY identity(1,1),
  artist_name VARCHAR(255),
  artist_picture VARCHAR(255),
  about VARCHAR(255),
  masterpiece VARCHAR(255),
  masterpiece_picture VARCHAR(255),
  contact VARCHAR(255),
  journey VARCHAR(255),
  user_id INT,
  user_name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION
);

--drop table ArtistPortfolio

CREATE TABLE BidArt (
  BidArt_id INT PRIMARY KEY identity(1,1),
  BidArt_description VARCHAR(255),
  BidArtist_name VARCHAR(255),
  BidArt_name VARCHAR(255),
  BidPrice INT,
  picture VARCHAR(255),
  User_id INT,
  User_name  varchar(100),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


---- Create BidPrice table
CREATE TABLE BidPrice (
  Bidprice_id INT PRIMARY KEY identity(1,1),
  Bidprice INT,
  BidArt_id INT,
  Status VARCHAR(10),
  Art_name VARCHAR(255),
  User_id INT,
  FOREIGN KEY (BidArt_id) REFERENCES BidArt(BidArt_id) ON DELETE NO ACTION,
  FOREIGN KEY (User_id) REFERENCES Users(user_id) ON DELETE NO ACTION
);

--drop table BidPrice


-- Create Review table

CREATE TABLE Review (
  review_id INT PRIMARY KEY identity(1,1),
  User_id INT,
  Art_id INT,
  rating INT,
  reviewcomment VARCHAR(255),
  FOREIGN KEY (User_id) REFERENCES Users(user_id)  ON DELETE NO ACTION,
  FOREIGN KEY (Art_id) REFERENCES Art(art_id)  ON DELETE NO ACTION
);

--drop table Review

-- Create Cart table
CREATE TABLE Cart (
  cart_id INT PRIMARY KEY identity(1,1),
  art_id INT,
  quantity INT,
  art_name VARCHAR(255),
  FOREIGN KEY (art_id) REFERENCES Art(art_id) ON DELETE NO ACTION
);

--drop table Cart

-- Create Order table
CREATE TABLE Orders (
  order_id INT PRIMARY KEY identity(1,1),
  user_id INT,
  total_amount INT,
  payment VARCHAR(255),
  order_date VARCHAR(255),
  art_id VARCHAR(255),
  art_name VARCHAR(255),
  picture VARCHAR(255),
  quantity VARCHAR(255),
  price VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION
);

--drop table Orders


-- Create OrderItem table
CREATE TABLE OrderItem (
  orderitem_id INT PRIMARY KEY identity(1,1),
  order_id INT,
  art_id INT,
  art_name VARCHAR(255),
  quantity INT,
  price INT,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE NO ACTION,
  FOREIGN KEY (art_id) REFERENCES Art(art_id) ON DELETE NO ACTION
);

--drop table OrderItem


-- Create Payment table
CREATE TABLE Payment (
  payment_id INT PRIMARY KEY identity(1,1),
  total_amount INT,
  order_date DATETIME,
    order_id INT,
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE NO ACTION,
);

--drop table Payment


select * from Users
select * from Art
select * from Favorites
select * from ArtistPortfolio
select * from Review
select * from Cart
select * from Orders


select * from BidPrice
select * from BidArt

--select * from OrderItem
--select * from Payment