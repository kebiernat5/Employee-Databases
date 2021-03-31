const inquirer = require("inquirer");
const connection = require("./db/index.js");

class Database {
    constructor(connection) {
        this.connection = connection;
    }
    /////////////////////// view methods (department, role, employee)
    department_view() {
        return this.connection.query("SELECT * FROM department");
    }

    role_view() {
        return this.connection.query("SELECT * FROM role");
    }

    employee_view() {
        return this.connection.query("SELECT first_name, last_name, title FROM employee INNER JOIN role ON role_id = role.id");
    }
    manager_view() {
        return this.connection.query("SELECT * FROM employee WHERE role_id=1");
    }

    ////////add methods (department, role, employee)
    department_add(newDepartment) {
     
                this.connection.query(
                    `INSERT INTO department (name) VALUES ("${newDepartment.title.title}")`,
                    function (err, results) {
                        if (err) throw err;
                        console.table(results);
                    }
                );
           
    }

    role_add(newRole) {
         return this.connection.query(
            "INSERT INTO role (title,salary,department_id) VALUES (?,?,?)",
            [newRole.title.title,newRole.salary.salary,newRole.department_id.department_id]
        );

    }

    employee_add(newEmp) {
        return this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES (?,?,?,?)",
            [newEmp.name.first_name, newEmp.name.last_name, newEmp.role.role_id, newEmp.manager.manager_id]
        );
    }


    ///////////////update method for employee
    employee_update() {
        return this.connection.query(
            "Update employee SET role_id = ? WHERE first_name = ?",
            [updateEmp.role.role_id, updateEmp.first_name]
           
        ); 
}
};

//export database and myDatabase
module.exports = new Database(connection);