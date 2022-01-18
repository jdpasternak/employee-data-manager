const inquirer = require("inquirer");
const db = require("./db/connection");
const {
  selectAllFromDepartment,
  selectAllFromRole,
  selectAllFromEmployee,
} = require("./db/queries");

// const sql = `
// SELECT
//     CONCAT(e.first_name," ",e.last_name) AS name,
//     role.title AS title,
//     CONCAT(em.first_name," ",em.last_name) AS manager_name
// FROM employee e
// INNER JOIN employee em ON e.manager_id = em.id
// LEFT JOIN role ON e.role_id = role.id;
// `;

// db.promise()
//   .query(sql)
//   .then(([rows]) => {
//     console.table(rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .then(() => db.end());

const start = () =>
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit",
      ],
      validate: (input) => {
        if (!input) {
          console.log("Please select an option.");
          return false;
        }
        return true;
      },
    })
    .then(({ choice }) => {
      switch (choice) {
        case "View all departments":
          selectAllFromDepartment()
            .then((data) => console.table(data))
            .then(() => start());
          break;
        case "View all roles":
          selectAllFromRole()
            .then((data) => console.table(data))
            .then(() => start());
        case "View all employees":
          selectAllFromEmployee()
            .then((data) => console.table(data))
            .then(start());
        default:
          console.log("Hello!");
      }
    })
    .catch((err) => {
      console.log(err);
    });

start();
