// this file is for connecting to mysql database

var mysql = require("mysql2")

// my database info
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@123Gmail",
    database: "student_task_manager"
})

// connect to database
connection.connect(function(err) {

    if(err) {
        console.log("database not connected", err)
    } else {
        console.log("database connected successfully")
    }

})

module.exports = connection