const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo")

require("console.table");


const db = mysql.createConnection(
    {
        host: "localhost", 
        user: "root",
        password: "",
        database: "mydatabase",
    },
    console.log("connected to database")
)

function start(){
    const logoText = logo({
        name: "Employee Tracker"
    }).render()
    console.log(logoText)
    inquirer.prompt([
        {
            type: "list", 
            name: "startingQuestion",
            message: "What would you like to do?",
            choices: ["ViewAllDepartments", 
            "ViewAllRoles", 
            "ViewAllEmployees", 
            "AddDepartment", 
            "AddRole", 
            "AddEmployee", 
            "UpdateEmployeeRole",
        "quit"],

        }
    ]).then((response) => {
        console.log("I selected: " + response.startingQuestion)
        let choices = response.startingQuestion;
        switch(choices){
            case "ViewAllDepartments": 
            viewAllDepartments()
            break;

            case "ViewAllRoles": 
            viewAllRoles()
            break;

            case "ViewAllEmployees": 
            viewAllEmployees()
            break;

            case "AddDepartment": 
            addDepartment()
            break;

            case "AddRole": 
            addRole()
            break;

            case "AddEmployee": 
            addEmployee()
            break;

            case "UpdateEmployeeRole": 
            updateEmployeeRole()
            break;

            case "quit":
                quit()
                break;

        }
    })
}

function viewAllDepartments(){
    db.query("SELECT * FROM department", function(err, results) {
      (err) ? console.log(err) : console.table(results), start();
    });
  }

  function viewAllRoles(){
    db.query("SELECT * FROM role", function(err, results) {
      (err) ? console.log(err) : console.table(results), start();
    })
  }

  function viewAllEmployees(){
    db.query("SELECT * FROM employee", function (err, results) {
       (err) ? console.log(err) :  console.table(results), start();
    });
    
  }


start()