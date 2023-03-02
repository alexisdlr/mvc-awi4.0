create table users (
  id int auto_increment primary key,
  username varchar(45) not null ,
  email varchar(45) not null unique,
  pass varchar(255) not null,
  coverPic varchar(100),
  profilePic varchar(100),
  city varchar(20),
  website varchar(100),
);

create table posts (
  `id` int auto_increment primary key,
  `desc` varchar(200),
  `img` varchar(200),
  `createdAt` datetime,
  `userId` int null,
  CONSTRAINT `userId`
  FOREIGN KEY (`userId`) 
  REFERENCES `social`.`users`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE
);

create table comments (
  `id` int auto_increment primary key,
  `desc` varchar(200),
  `createdAt` datetime,
  `postId` int not null,
  `userId` int not null,
  CONSTRAINT `commentuserId`
  FOREIGN KEY (`userId`) 
  REFERENCES `social`.`users`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE,
  CONSTRAINT `postId`
  FOREIGN KEY (`postId`) 
  REFERENCES `social`.`posts`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE
);

create table stories (
  `id` int auto_increment primary key,
  `img` varchar(200) not null,
  `userId` int not null,
  CONSTRAINT `storiesuserId`
  FOREIGN KEY (`userId`) 
  REFERENCES `social`.`users`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE
);

create table relationships (
  `id` int auto_increment primary key,
  `followerUser` int not null,
  `followedUser` int not null,
  CONSTRAINT `followerUser`
  FOREIGN KEY (`followerUser`) 
  REFERENCES `social`.`users`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE,
   CONSTRAINT `followedUser`
  FOREIGN KEY (`followedUser`) 
  REFERENCES `social`.`users`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE
);

create table likes (
  `id` int auto_increment primary key,
  `userId` int not null,
  `postId` int not null,
  CONSTRAINT `likeUserId`
  FOREIGN KEY (`userId`) 
  REFERENCES `social`.`users`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE,
   CONSTRAINT `postLikedId`
  FOREIGN KEY (`postId`) 
  REFERENCES `social`.`posts`(`id`) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE
);