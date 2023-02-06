const mysql = require("mysql2");
const { Console } = require("console");
const { debugPort } = require("process");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

// THEN I am presented with a formatted table showing department names and department ids
function allDepartments() {
  db.query(`SELECT * FROM department`, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("\n\nAll Departments");
      console.log("=====================");
      return console.table(data);
    }
  });
}

// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function allRoles() {
  db.query(
    `SELECT role.title, role.id, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id=department.id `,
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log("\n\nAll Roles");
        console.log("=====================");
        return console.table(data);
      }
    }
  );
}

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function allEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee
          LEFT JOIN role ON employee.role_id=role.id 
          LEFT JOIN department ON role.department_id=department.id 
          LEFT JOIN employee as manager ON employee.manager_id=manager.id`,
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log("\n\nAll Employees");
        console.log("=====================");
        return console.table(data);
      }
    }
  );
}

//         // THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment(dept) {
  db.query(
    `INSERT INTO department(name) VALUES(?)`,
    [dept.name],
    (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        return ;
      }
    }
  );
}

//         // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function departmentsAvail() {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT id AS value, name FROM department`, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addRole(role) {
  db.query(
    `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`,
    [role.title, role.salary, role.department_id],
    (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        return ;
      }
    }
  );
}
//         // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

function roleAvail() {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT id AS value, title as name FROM role`, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function managerAvail() {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee`,
      (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}
function addEmployee(employee) {
  console.log(employee);
  db.query(
    `INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES(?,?,?,?)`,
    [
      employee.first_name,
      employee.last_name,
      employee.role_id,
      employee.manager_id,
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        return;
      }
    }
  );
}

//         // THEN I am prompted to select an employee to update and their new role and this information is updated in the database

function updateEmployee(employee,role) {
  db.query(
    `UPDATE employee SET role_id = ? WHERE id = ?`,
    [
     role,
     employee
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        return;
      }
    }
  );
}


module.exports = {
  allDepartments,
  allRoles,
  allEmployees,
  addDepartment,
  addRole,
  departmentsAvail,
  addEmployee,
  roleAvail,
  managerAvail,
  updateEmployee,
};
