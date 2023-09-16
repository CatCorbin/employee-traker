//We need inquirer and mysql to use this application
const inquirer = require("inquirer");
const mysql = require("mysql2");

//creating mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "trilogy123",
    database: "employeeTracker_db",
});

//connecting to the database we just created
connection.connect((err) => {
    if (err) throw err;
    console.log("Connection to database successful!");
    start();
});

// View departments
function viewDepartments() {
    const query = "SELECT * FROM departments";
    start();
  }
  
  
  // View roles
  function viewRoles() {
    const query = "SELECT * FROM roles";
    start();
  }
  
  
  // View employees
  function viewEmployees() {
    const query = "SELECT * FROM employees";
    start();
  }
  
  // Add a department
function addDepartment() {
    inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the new department name?',
        },
      ])
      .then((req, res) => {
        const query = 'INSERT INTO departments (department_name) VALUES (?)';
        connection.query(query, [res.departmentName], (err) => {
          if (err) throw err;
          console.log(`Department '${res.departmentName}' was created!`);
          start();
        });
      });
  }
  
  
  // Add a role
  function addRole() {
    inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What is the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is this role's salary?",
        },
        {
          type: "input",
          name: "departmentId",
          message: "What is the department ID for this role?",
        },
      ])
      .then((req, res) => {
        const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(query, [res.title, res.salary, res.departmentId], (err) => {
          if (err) throw err;
          console.log(`Role '${res.title}' created successfully!`);
          start();
        });
      });
  }
  
  
  // Add new employee
  function addEmployee() {
    inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "input",
          name: "roleId",
          message: "What is the role ID for the employee?",
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter manager's ID if applicable.",
        },
      ])
      .then((req,res) => {
        const query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(query, [res.firstName, res.lastName, res.roleId, res.managerId || null], (err) => {
          if (err) throw err;
          console.log(`Employee '${res.firstName} ${res.lastName}' created successfully!`);
          start();
        });
      });
  }
  