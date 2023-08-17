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



  function addDepartment() {
    inquirer
    .prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Please enter the new department name:"
        }
    ]).then(function (response) {
        db.query("INSERT INTO department SET ?", {
            departmentName: response.departmentName,
        },
        function (err, response){
            console.log("New department added!");
            viewAllDepartments();
        })
    })
  }

  function addRole() {
    db.query("SELECT * FROM department", function(err, response){
        if(err){
            console.log(err), start()
        }
        const departmentList = response.map((department) => ({
            value: department.id, 
            name: department.dept_name,
        }))
        inquirer
    .prompt([
        {
            name: "role",
            type: "input",
            message: "Please enter the new role:",
        },
        {
            name: "salary",
            type: "number",
            message: "Please enter the salary for this role:",
        },
        {
            name: "department",
            type: "list",
            message: "Please enter the department for this role:",
            choices: departmentList,
        }
    ]).then(function (response) {
        let roleTitle = response.role
        let roleSalary = response.salary
        let roleDepartment = response.department
        db.query(`INSERT INTO role (title, salary, department_id) VALUES
        ("${roleTitle}", "${roleSalary}", "${roleDepartment}")
        `,function (err) {
            if (err) throw err;
            viewAllRoles(),
            start();
        })
    })
    })
  };

  function addEmployee() {
    db.query("SELECT * FROM role", function(err, response){
        if(err){
            console.log(err)
            start();
            return
        }
        const roleList = response.map((role) => ({
            value: role.id, 
            name: role.title,

        }))
   
    inquirer
    .prompt([
        {
            name: "employeeFirstName",
            type: "input",
            message: "Please enter employee's first name:"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "Please enter employee's last name:"
        },
        {
            name: "roleName",
            type: "list",
            message: "What role does this employee belongs to?",
            choices: roleList
        }


    ]).then(function (response) {
        let firstName = response.employeeFirstName
        let lastName = response.employeeLastName
        let role = response.roleName

        db.query(`INSERT INTO employee (first_name, last_name, role_id)
        VALUES ("${firstName}", "${lastName}", "${role}")`, function(err, response){
            if (err){
                console.log(err)
                start();
                return
            }
            viewAllEmployees(),
            start();
        })
    })
})
};

start()