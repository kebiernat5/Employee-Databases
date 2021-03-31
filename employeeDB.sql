-- Drops the employee_db if it exists currently -- Deletes if it exists
DROP DATABASE IF EXISTS employees_db;
-- Creates the "employees_db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
USE employees_db;

-- Creates the table "people" within employees_db --creates properties for peopple
CREATE TABLE department (
  -- Makes a numerical column called "id" 
  id INT AUTO_INCREMENT,
  -- Makes a string column called "name" with max chars at 30
  name VARCHAR(30),
  --sets id as primaary key
  PRIMARY KEY (id)
);
CREATE TABLE department (
  
  id INT AUTO_INCREMENT,
  
  name VARCHAR(30),

  PRIMARY KEY (id)
);

CREATE TABLE role (
  -- Makes a numerical column called "id"
  id INT AUTO_INCREMENT,
  -- make a string column called "title" with max chars at 30
  title VARCHAR(30),
  -- makes a decimal column called "salary"; gives 10 spaces to display info with 4 being the right side of decimal
  salary DECIMAL(10,4),
  -- makes a numerical column called "department_id"
  department_id INT,
  -- sets id as primary key
  PRIMARY KEY (id)
);
CREATE TABLE role (
  
  id INT AUTO_INCREMENT,
  
  title VARCHAR(30),
  
  salary DECIMAL(10,2),
 
  department_id INT,
  
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  --make a numerical column called "id"
  id INT AUTO_INCREMENT,
  --make a string column called "first_name"
  first_name VARCHAR(30),
  --make a string column called "last_name"
  last_name VARCHAR(30)
  --make a numerical column called "role_id"
  role_id INT,
  --make a numerical column called "manager_id"
  manager_id INT,
  --set id as primary key
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  
  id INT AUTO_INCREMENT,
 
  first_name VARCHAR(30),
  
  last_name VARCHAR(30),
  
  role_id INT,
  
  manager_id INT,
  
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Management");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 150000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tucker", "Beauchamp", 1 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kim", "Hage", 2, 1);

INSERT INTO employee (first_name, last_name , role_id, manager_id)
VALUES ("Sergio", "Gomez", 3 , 1);
