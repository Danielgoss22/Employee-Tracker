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
          "Update an Employee role",
        ],
      },
    ])

    .then((data) => {
      const db = new DB(connection);
      switch (data.allEmployees) {
        case "View all Departments":
          db.findDepartments().then((data) => {
            console.table(data[0]);
            start();
          });
          console.log("departments");
          break;
        case "View all Roles":
          db.findRoles().then((data) => {
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
          inquirer
            .prompt([
              {
                type: "input",
                message: "What department would you like to add?",
                name: "name",
              },
            ])
            .then((data) => {
              db.createDepartment(data).then((data) => {
                console.log("Department sucsessfully added!");
                start();
              });
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
        case "Update an Employee role":
          inquirer
            .prompt([
              {
                type: "input",
                message: "What employee would you like to update?",
                name: "role_id",
              },
              {
                type: "input",
                message: "What role would you like to assign to this employee?",
                name: "id",
              },
            ])
            .then((data) => {
              db.updateEmployeeRole(data.role_id, data.id).then((data) => {
                console.log(data);
                start();
              });
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
