var express = require("express")
var mysql = require("mysql2")

var app = express()

app.use(express.json())
app.use(express.static("public"))


// database connection
var db = mysql.createConnection({
host: "localhost",
user: "root",
password: "@123Gmail",
database: "student_task_manager"
})

db.connect(function(err){
if(err){
console.log("not connected")
}
else{
console.log("connected")
}
})



app.get("/", function(req, res){
res.send("server is running")
})




// register
app.post("/register", function(req, res){

var name = req.body.name
var email = req.body.email
var password = req.body.password

db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

res.json("User registered successfully")

})

})




// login
app.post("/login", function(req, res){

var email = req.body.email
var password = req.body.password

db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

if(result.length > 0){
res.json({ message: "Login successful", user: result[0] })
}
else{
res.json({ message: "Invalid email or password" })
}

})

})




// get categories
app.get("/categories", function(req, res){

db.query("SELECT * FROM categories", function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

res.json(result)

})

})




// add task
app.post("/tasks", function(req, res){

var user_id = req.body.user_id
var title = req.body.title
var description = req.body.description
var deadline = req.body.deadline
var priority = req.body.priority
var dependency_task_id = req.body.dependency_task_id
var repeat_type = req.body.repeat_type
var category_id = req.body.category_id

db.query("INSERT INTO tasks (user_id, title, description, deadline, priority, dependency_task_id, repeat_type, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user_id, title, description, deadline, priority, dependency_task_id, repeat_type, category_id], function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

res.json("Task created successfully")

})

})




// get tasks
app.get("/tasks/:user_id", function(req, res){

var user_id = req.params.user_id

// i use join here to get category name and dependency name
var q = "SELECT tasks.*, categories.name AS category_name, t2.title AS dependency_title FROM tasks LEFT JOIN categories ON tasks.category_id = categories.id LEFT JOIN tasks t2 ON tasks.dependency_task_id = t2.id WHERE tasks.user_id = ?"

db.query(q, [user_id], function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

res.json(result)

})

})




// complete task
app.put("/tasks/complete/:id", function(req, res){

var id = req.params.id

db.query("SELECT * FROM tasks WHERE id = ?", [id], function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

var task = result[0]

db.query("UPDATE tasks SET status = 'Completed' WHERE id = ?", [id])

// for repeating tasks i create new task with new date
if(task.repeat_type != null && task.repeat_type != "None"){

var d = new Date(task.deadline)

if(task.repeat_type == "Daily"){
d.setDate(d.getDate() + 1)
}

if(task.repeat_type == "Weekly"){
d.setDate(d.getDate() + 7)
}

if(task.repeat_type == "Monthly"){
d.setMonth(d.getMonth() + 1)
}

db.query("INSERT INTO tasks (user_id, title, description, deadline, priority, repeat_type, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [task.user_id, task.title, task.description, d, task.priority, task.repeat_type, task.category_id])

}

res.json({ message: "Task completed" })

})

})




// EDIT TASK
app.put("/tasks/edit/:id", function(req, res){

var id = req.params.id
var title = req.body.title
var description = req.body.description
var deadline = req.body.deadline
var priority = req.body.priority
var category_id = req.body.category_id
var repeat_type = req.body.repeat_type
var dependency_task_id = req.body.dependency_task_id

db.query("UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ?, category_id = ?, repeat_type = ?, dependency_task_id = ? WHERE id = ?",
[title, description, deadline, priority, category_id, repeat_type, dependency_task_id, id],
function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

res.json("Task updated successfully")

})

})




// delete task
app.delete("/tasks/:id", function(req, res){

var id = req.params.id

db.query("DELETE FROM tasks WHERE id = ?", [id], function(err, result){

if(err){
console.log(err)
res.status(500).json(err)
return
}

res.json("Task deleted")

})

})




app.listen(3000, function(){
console.log("server started on port 3000")
})