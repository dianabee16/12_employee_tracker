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
}

start()