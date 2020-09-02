-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS passport_demo;
-- Creates the "todolist" database --
CREATE DATABASE passport_demo;


CREATE DATABASE CovidSym;
USE CovidSym;

CREATE TABLE Covid (
  id Int( 11 ) AUTO_INCREMENT NOT NULL,
  author VARCHAR( 255) NOT NULL,
  body VARCHAR( 255 ) NOT NULL,
  created_at DATETIME NOT NULL,

  PRIMARY KEY ( `id` ) 
);
