DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department (
  
  id INT AUTO_INCREMENT,
  
  name VARCHAR(30),

  PRIMARY KEY (id)
);

CREATE TABLE role (
  
  id INT AUTO_INCREMENT,
  
  title VARCHAR(30),
  
  salary DECIMAL(10,2),
 
  department_id INT,
  
  PRIMARY KEY (id),

    FOREIGN KEY (department_id) 
        REFERENCES department(id)
);

CREATE TABLE employee (
  
  id INT AUTO_INCREMENT,
 
  first_name VARCHAR(30),
  
  last_name VARCHAR(30),
  
  role_id INT,
  
  manager_id INT,
  
  PRIMARY KEY (id),
  
    FOREIGN KEY (role_id) 
        REFERENCES role(id)
);

-- SELECT title, name
-- FROM role
-- INNER JOIN department ON role.department_id = department.id;

-- SELECT first_name,last_name, title
-- FROM employee
-- INNER JOIN role ON role_id = role.id;

-- SELECT first_name, last_name, role_id FROM employee INNER JOIN role ON role_id=1;-- DROP DATABASE IF EXISTS workPlace_DB;
-- CREATE DATABASE workPlace_DB;

-- USE workPlace_DB;

-- CREATE TABLE employee (
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INT NOT NULL,
--   manager_id INT NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE department(
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(30) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE roles (
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NOT NULL,
--   salary DECIMAL NOT NULL,
--   department_id INT NOT NULL,
--   PRIMARY KEY (id)
-- );

