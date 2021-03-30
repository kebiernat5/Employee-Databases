const inquirer = require("inquirer");
const { prompt } = require("inquirer");
const mysql = require("mysql");
// const { department_add } = require("./functions");
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
        // case "Add Department":
        //   database.department_add();
        //   init();
        //   break;
        // case "Update Employee Role":
        //   database.employee_update();
        // //   init();
        //   break;
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
  try { // cREATE
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
  newRole = {};
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
      message: "what department is it does this Role belong to?",
      choices: allDepartments.map(({ id, name }) => ({
        name: name,
        value: id
      }))
    }]),
    await database.department_add(newRole);
    console.log(newRole)
    console.log("Role has been added!!");
    viewAllRoles();
  } catch(err) {console.log(err)}
}

// const connection = require("./db");
// const inquirer = require("inquirer");
// const mysql = require("mysql");

// init();

// function init(){
//     loadPrompts() {
//         prompt([
//             name: "Menu",
//             type: list,
//         ])
//     }
// }

// const 

// newEmployee();

// async function newEmployee() {
//   const { newEmp } = await inquirer.prompt({
//     name: "empID",
//     type: "input",
//     message: "What is this employee's ID number?",
//   },
//   {
//     name: "first_name",
//     type: "input",
//     message: "What is this employee's first name?",   
//   },
//   {
//     name: "last_name",
//     type: "input",
//     message: "What is this employee's last name?",   
//   },
//   {
//     name: "role_id",
//     type: "input",
//     message: "Which department does this employee work in?",   
//   },
//   {
//     name: "manager_id",
//     type: "input",
//     message: "Who is this employee's manager?",   
//   },
//   );

//   switch (postOrBid) {
//     case "POST":
//       // Post an item
//       postItem();
//       break;
//     case "BID":
//       // Bid on an item
//       bidItem();
//       break;
//     default:
//       process.exit(0);
//   }
// }
// newDept();

// async function newDept() {
//     const { newEmp } = await inquirer.prompt({
//       name: "deptName",
//       type: "input",
//       message: "Which department does this employee work for?",
//     },

// };

// newRole();
// async function newRole() {
//     const { newEmp } = await inquirer.prompt({
//       name: "roleTitle",
//       type: "input",
//       message: "What role is this employee in?",
//     },
//     {
//       name: "roleSalary",
//       type: "input",
//       message: "What is this employee's salary",   
//     },
//     {
//       name: "deptID",
//       type: "input",
//       message: "What department does this employee work for?",   
//     },
  

// };

// // async function postItem() {
// //   try {
// //     const { item_name, item_category, item_price } = await inquirer.prompt([
// //       {
// //         name: "item_name",
// //         message: "What is the item you would like to submit?",
// //         type: "input",
// //       },
// //       {
// //         name: "item_category",
// //         message: "What category would you like to place your auction in?",
// //         type: "input",
// //       },
// //       {
// //         name: "item_price",
// //         message: "What would you like your starting bid to be?",
// //         type: "input",
// //         validate(value) {
// //           if (isNaN(value) === false) {
// //             return true;
// //           }
// //           return "Please insert a valid number";
// //         },
// //       },
// //     ]);

// //     // insert the item into our database
// //     const result = await connection.query("INSERT INTO auctions SET ?", {
// //       item_name,
// //       category: item_category,
// //       starting_bid: item_price,
// //       highest_bid: item_price,
// //     });

// //     console.log("Item inserted successfully!");
// //   } catch (err) {
// //     console.log("Whoopsy!");
// //   }
// //   init();
// // }

// // async function bidItem() {
// //   // Retrieve all item from the db

// //   const items = await connection.query("SELECT * FROM auctions");

// //   // prompt the user for which one they want to bid on
// //   const { itemIndex } = await inquirer.prompt({
// //     type: "rawlist",
// //     name: "itemIndex",
// //     message: "What item would you like to bid on?",
// //     choices: items.map(({ item_name: name }, i) => ({
// //       name,
// //       value: i,
// //     })),
// //   });

// //   const { bidValue } = await inquirer.prompt({
// //     type: "input",
// //     message: "How much would you like to bid?",
// //     name: "bidValue",
// //     validate(value) {
// //       if (isNaN(value) === false) {
// //         return true;
// //       }
// //       return false;
// //     },
// //   });

// //   const chosenItem = items[itemIndex];

// //   // Did the user bid higher than the highest bid?
// //   if (bidValue > chosenItem.highest_bid) {
// //     // User out bid the previous bid
// //     // update the table to reflect new highest_bid
// //     await connection.query("UPDATE auctions SET ? WHERE ?", [
// //       {
// //         highest_bid: bidValue,
// //       },
// //       {
// //         id: chosenItem.id,
// //       },
// //     ]);
// //     console.log("You successfully out bid the previous bid");
// //   } else {
// //     // User did not outbid highest bid
// //     // inform the user
// //     console.log("You bid too low, try again...");
// //   }

// //   // rerun init function
// //   init();
// // }
