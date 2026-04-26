Developer
Name: Malik Ahsan Ali Awan
Student ID: 24051444
GitHub: https://github.com/ahsanalee5/student-task-manager

Technologies Used
- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript

Requirements
Make sure you have these installed before running the project:
- Node.js → https://nodejs.org (download LTS version)
- MySQL → https://dev.mysql.com/downloads/installer
- VS Code → https://code.visualstudio.com

** Database Setup

Step 1 — Open MySQL Workbench

Step 2 — Connect to Local Instance and enter your root password

Step 3 — Click File → Open SQL Script

Step 4 — Select the `database.sql` file from the project folder

Step 5 — Click the ⚡ lightning bolt button to run it

Step 6 — You should see `student_task_manager` database created with all tables


** Project Setup

# If You Have ZIP File:

Step 1 — Extract the ZIP folder on your computer

Step 2 — Open VS Code

Step 3 — Click File → Open Folder → Select the extracted folder

Step 4 — Press `Ctrl + `` ` to open Terminal in VS Code

Step 5 — Type this and press Enter:
npm install

Step 6 — Open the `db.js` file and change the password to your MySQL root password:
```javascript
password: "your_mysql_password_here"
```

Step 7 — In VS Code Terminal type:
node server.js

Step 8 — You should see:
server started on port 3000
connected

Step 9 — Open Chrome and go to:
localhost:3000/login.html


# If You Have GitHub Link:

Step 1 — Go to the repository link:
https://github.com/ahsanalee5/student-task-manager

Step 2 — Click the green **Code** button

Step 3 — Click **Download ZIP** and extract it

Step 4 — OR if you have Git installed run this in CMD:
git clone https://github.com/ahsanalee5/student-task-manager.git

Step 5 — Open the folder in VS Code

Step 6 — Press `Ctrl + `` ` to open Terminal in VS Code

Step 7 — Type this and press Enter:
npm install

Step 8 — Open `db.js` and change password to your MySQL root password:
```javascript
password: "your_mysql_password_here"
```

Step 9 — In Terminal type:
node server.js

Step 10 — You should see:
server started on port 3000
connected

Step 11 — Open Chrome and go to:
localhost:3000/login.html


⚠️ Important Notes

- Do NOT close VS Code Terminal while using the application — the server runs inside it
- If you see `database connected successfully` the project is working correctly
- If you get a database error open `db.js` and make sure the password matches your MySQL root password
- The `node_modules` folder is not included — run `npm install` to generate it automatically

---

## 📁 Project Structure
student-task-manager/
│
├── public/
│   ├── login.html        ← Login page
│   ├── register.html     ← Register page
│   ├── dashboard.html    ← Main dashboard
│   ├── style.css         ← All styling
│   └── img/              ← Background images
│
├── server.js             ← Backend server and all API routes
├── db.js                 ← MySQL database connection
├── database.sql          ← Run this to create all tables
├── package.json          ← Project dependencies
└── README.md             ← This file
