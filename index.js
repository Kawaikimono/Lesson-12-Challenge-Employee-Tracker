require("console.table");
const inquirer = require("inquirer");
const sqlQueries = require("./sqlQueries");
const Department = require("./classes/department");
const Employee = require("./classes/employee");
const Role = require("./classes/roles");

function checkDatabase() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "Veiw all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((ans) => {
      if (ans.choice === "View all departments") {
        sqlQueries.allDepartments();
        checkDatabase();
      } else if (ans.choice === "View all roles") {
        sqlQueries.allRoles();
        checkDatabase();
      } else if (ans.choice === "Veiw all employees") {
        sqlQueries.allEmployees();
        checkDatabase();
      } else if (ans.choice === "Add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "addDepo",
              message: "What is the new department's name?",
            },
          ])
          .then((res) => {
            const dept = new Department(res.addDepo);
            sqlQueries.addDepartment(dept);
            checkDatabase();
          });
      } else if (ans.choice === "Add a role") {
        sqlQueries.departmentsAvail().then(function (choicess) {
          inquirer
            .prompt([
              {
                type: "input",
                name: "eTitle",
                message: "What is the name of the new role?",
              },
              {
                type: "input",
                name: "eSalary",
                message: "What is the salary of the new role?",
              },
              {
                type: "list",
                name: "eDepartmentId",
                message: "What department does this role belong to?",
                choices: choicess,
              },
            ])
            .then((erole) => {
              const role = new Role(
                erole.eTitle,
                erole.eSalary,
                erole.eDepartmentId
              );
              sqlQueries.addRole(role);
              checkDatabase();
            });
        });
      } else if (ans.choice === "Add an employee") {
        sqlQueries.managerAvail().then(function (manager) {
          sqlQueries.roleAvail().then(function (roles) {
            manager.push({ name: "None", value: null });
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "first",
                  message: "What is the first name of the employee?",
                },
                {
                  type: "input",
                  name: "last",
                  message: "What is the last name of the employee?",
                },
                {
                  type: "list",
                  name: "role",
                  message: "What is the employee's role?",
                  choices: roles,
                },
                {
                  type: "list",
                  name: "manager",
                  message: "Does this employee have a manager?",
                  choices: manager,
                },
              ])
              .then((newE) => {
                const employee = new Employee(
                  newE.first,
                  newE.last,
                  newE.role,
                  newE.manager
                );
                sqlQueries.addEmployee(employee);
                checkDatabase();
              });
          });
        });
      } else if (ans.choice === "Update an employee role") {
        // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
        sqlQueries.managerAvail().then(function (manager) {
          sqlQueries.roleAvail().then(function (roles) {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "eUpdate",
                  message: "What employee do you want to update?",
                  choices: manager,
                },
                {
                  type: "list",
                  name: "uRole",
                  message: "What is the employee's new role?",
                  choices: roles,
                },
              ])
              .then((uemp) => {
                sqlQueries.updateEmployee(uemp.eUpdate,uemp.uRole);
                checkDatabase();
              });
          });
        });
      } else {
        console.log("Have a good day!");
        process.exit();
      }
    });
}

checkDatabase();

