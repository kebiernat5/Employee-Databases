const connection = require("./db");
const inquirer = require("inquirer");
const mysql = require("mysql");

init();

function init(){
    loadPrompts() {
        prompt([
            name: "Menu",
            type: list,
        ])
    }
}

const 

newEmployee();

async function newEmployee() {
  const { newEmp } = await inquirer.prompt({
    name: "empID",
    type: "input",
    message: "What is this employee's ID number?",
  },
  {
    name: "first_name",
    type: "input",
    message: "What is this employee's first name?",   
  },
  {
    name: "last_name",
    type: "input",
    message: "What is this employee's last name?",   
  },
  {
    name: "role_id",
    type: "input",
    message: "Which department does this employee work in?",   
  },
  {
    name: "manager_id",
    type: "input",
    message: "Who is this employee's manager?",   
  },
  );

  switch (postOrBid) {
    case "POST":
      // Post an item
      postItem();
      break;
    case "BID":
      // Bid on an item
      bidItem();
      break;
    default:
      process.exit(0);
  }
}
newDept();

async function newDept() {
    const { newEmp } = await inquirer.prompt({
      name: "deptName",
      type: "input",
      message: "Which department does this employee work for?",
    },

};

newRole();
async function newRole() {
    const { newEmp } = await inquirer.prompt({
      name: "roleTitle",
      type: "input",
      message: "What role is this employee in?",
    },
    {
      name: "roleSalary",
      type: "input",
      message: "What is this employee's salary",   
    },
    {
      name: "deptID",
      type: "input",
      message: "What department does this employee work for?",   
    },
  

};

// async function postItem() {
//   try {
//     const { item_name, item_category, item_price } = await inquirer.prompt([
//       {
//         name: "item_name",
//         message: "What is the item you would like to submit?",
//         type: "input",
//       },
//       {
//         name: "item_category",
//         message: "What category would you like to place your auction in?",
//         type: "input",
//       },
//       {
//         name: "item_price",
//         message: "What would you like your starting bid to be?",
//         type: "input",
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return "Please insert a valid number";
//         },
//       },
//     ]);

//     // insert the item into our database
//     const result = await connection.query("INSERT INTO auctions SET ?", {
//       item_name,
//       category: item_category,
//       starting_bid: item_price,
//       highest_bid: item_price,
//     });

//     console.log("Item inserted successfully!");
//   } catch (err) {
//     console.log("Whoopsy!");
//   }
//   init();
// }

// async function bidItem() {
//   // Retrieve all item from the db

//   const items = await connection.query("SELECT * FROM auctions");

//   // prompt the user for which one they want to bid on
//   const { itemIndex } = await inquirer.prompt({
//     type: "rawlist",
//     name: "itemIndex",
//     message: "What item would you like to bid on?",
//     choices: items.map(({ item_name: name }, i) => ({
//       name,
//       value: i,
//     })),
//   });

//   const { bidValue } = await inquirer.prompt({
//     type: "input",
//     message: "How much would you like to bid?",
//     name: "bidValue",
//     validate(value) {
//       if (isNaN(value) === false) {
//         return true;
//       }
//       return false;
//     },
//   });

//   const chosenItem = items[itemIndex];

//   // Did the user bid higher than the highest bid?
//   if (bidValue > chosenItem.highest_bid) {
//     // User out bid the previous bid
//     // update the table to reflect new highest_bid
//     await connection.query("UPDATE auctions SET ? WHERE ?", [
//       {
//         highest_bid: bidValue,
//       },
//       {
//         id: chosenItem.id,
//       },
//     ]);
//     console.log("You successfully out bid the previous bid");
//   } else {
//     // User did not outbid highest bid
//     // inform the user
//     console.log("You bid too low, try again...");
//   }

//   // rerun init function
//   init();
// }
