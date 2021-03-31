const inquirer = require("inquirer");
const { prompt } = require("inquirer");
const mysql = require("mysql");
const { employee_view } = require("./functions");

const database = require("./functions");
// console table 
require("console-table");

init();

function init() {

  loadPrompts();
}

function loadPrompts() {

  prompt([
    {
      name: "Menu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Roles",
        "View Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
      ],
    },
  ])
    .then(function (answer) {
      switch (answer.Menu) {
        case "View Employees":
          viewAllEmployees();
          break;
        case "View Roles":
          viewAllRoles();
          break;
        case "View Departments":
          viewAllDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        default:
          init();
      }
    });
}



async function viewAllEmployees() {
  console.log("Viewing employees..")
  const employees = await database.employee_view();
  console.table(employees);
  loadPrompts();
}

async function viewAllRoles() {
  console.log("Viewing roles..")
  const roles = await database.role_view();
  console.table(roles);
  loadPrompts();
}

async function viewAllDepartments() {
  console.log("Viewing departments..")
  const departments = await database.department_view();
  console.table(departments);
  loadPrompts();
}


async function addEmployee() {
  try { 
    const allRoles = await database.role_view();
    const allManagers = await database.manager_view();
    newEmp = {};
    newEmp.name = await
      prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
        },
      ])
    newEmp.role = await prompt(
      {
        name: "role_id",
        type: "rawlist",
        message: "what is the employee's Role?",
        choices: allRoles.map(({ id, title }) => ({
          name: title,
          value: id
        }))
      }),

      newEmp.manager = await prompt({
        name: "manager_id",
        type: "rawlist",
        message: "Who is this employee's manager?",
        choices: allManagers.map(({ id, first_name, last_name }) => ({
          name: first_name, last_name,
          value: id
        }))
      }),
      await database.employee_add(newEmp);
    console.log(newEmp)
    console.log("Employee has been added!!");
    viewAllEmployees();
  } catch (err) { console.log(err) }
}

async function addRole() {
  try{
  const allDepartments = await database.department_view();
  const newRole = {};
  newRole.title = await
    prompt([
      {
        name: "title",
        type: "input",
        message: "What is the Role title?",
      }])
  newRole.salary = await
    prompt([{
      name: "salary",
      type: "number",
      message: "What is the Role salary?",
    }])
  newRole.department_id = await
    prompt([{
      name: "department_id",
      type: "rawlist",
      message: "what department does this Role belong to?",
      choices: allDepartments.map(({ id, name }) => ({
        name: name,
        value: id
      }))
    }]),
    await database.role_add(newRole);
    console.log(newRole)
    console.log("Role has been added!!");
    viewAllRoles();
  } catch(err) {console.log(err)}
}

async function addDepartment() {
  try{
  const allDepartments = await database.department_view();
  const newDepartment = {};
  newDepartment.title = await
    prompt([
      {
        name: "title",
        type: "input",
        message: "What is the Department title?",
      }])

  
    await database.department_add(newDepartment);
    console.log(newDepartment)
    console.log("Department has been added!!");
    viewAllDepartments();
  } catch(err) {console.log(err)}
}

async function updateEmployeeRole() {
  const allEmployees = await database.employee_view();
  const allRoles = await database.role_view();
  updateEmp = {};
  updateEmp = await prompt([{
    name: "first_name",
    type: "rawlist",
    message:
      "What is the name of the employee that you would like to update?",
    choices: allEmployees.map(({ first_name, last_name }) => ({
      name: first_name, last_name,
    }))
  }]),
    updateEmp.role = await prompt([{
      name: "role_id",
      type: "rawlist",
      message: "What role would you like to change it to?",
      choices: allRoles.map(({ id, title }) => ({
        name: title,
        value: id,
      }))
    }]),
    console.log(updateEmp)
    await database.employee_update(updateEmp);
    console.log("Updating employee role!!")
    viewAllEmployees();


}
