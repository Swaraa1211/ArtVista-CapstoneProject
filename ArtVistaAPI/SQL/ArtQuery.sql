create table Users(
	user_id int primary key identity(1,1),
	user_name varchar(100),
	user_email varchar(100),
	user_password varchar(100)
);

select * from Users

--drop table Users