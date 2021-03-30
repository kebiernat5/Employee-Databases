const connection = require("./db");
const inquirer = require("inquirer");

init();

// async function init() {
//   const { postOrBid } = await inquirer.prompt({
//     name: "postOrBid",
//     type: "list",
//     message: "Would you like to [POST] an auction or [BID] on an auction?",
//     choices: ["POST", "BID", "EXIT"],
//   });

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
//     // User did not outbit highest bid
//     // inform the user
//     console.log("You bid too low, try again...");
//   }

//   // rerun init function
//   init();
// }
