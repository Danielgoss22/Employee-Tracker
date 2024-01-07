const inquirer = require("inquirer");

const connection = require("./db/connection");
const DB = require("./db/index");
const mysql = require("mysql2");

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "allEmployees",
        message: "What employee information would you like to see?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employee's",
          "Add a Department",
          "Add a Role",
          "Add an  Employee",
          "Update an EMployee role",
        ],
      },
    ])
    .then((data) => {
      const db = new DB(connection);
      switch (data.allEmployees) {
        case "View all Departments":
          db.findAllDepartments().then((data) => {
            console.table(data[0]);
            start();
          });
          console.log("departments");
          break;
        case "View all Roles":
          db.findAllRoles().then((data) => {
            console.table(data[0]);
            start();
          });
          console.log("roles");
          break;
        case "View all Employee's":
          db.findAllEmployees().then((data) => {
            console.table(data[0]);
            start();
          });
          break;
        case "Add a Department":
          db.createDepartment().then((data) => {
            console.table(data[0]);
            start();
          });
          break;
        case "Add a Role":
          db.creatRole().then((data) => {
            console.table(data[0]);
            start();
          });
          break;
        case "Add an  Employee":
          db.createEmployee().then((data) => {
            console.table(data[0]);
            start();
          });
          break;
        case "Update an EMployee role":
          db.updateEmployeeRole().then((data) => {
            console.table(data[0]);
            start();
          });
          break;
        default:
          console.log(data);
      }
    });
}
connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    start();
  }
});
