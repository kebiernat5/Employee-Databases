USE workPlace_DB;

INSERT INTO department (name)
VALUES ("Communications"),("Accounting")

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Developer", "$88,975.64", 527),("Senior Developer", "$109,962.68", 358)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Biernat", 100, 100)
