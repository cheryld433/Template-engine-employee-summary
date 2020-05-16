const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let employeeID = 1;
let employeeList = [];

function managerPrompts() {
   inquirer
      .prompt([
         {
            type: "input",
            message: "Manager name: ",
            name: "managerName",
            validate: async (input) => {
               if (input == "" || /\s/.test(input)) {
                   return "Please enter first or last name.";
               }
               return true;
           }
         },
         {
            type: "input",
            message: "What is your email address?",
            name: "managerEmail"
         },
         {
            type: "input",
            message: "Enter office number:",
            name: "managerOffice",
            validate: async (input) => {
               if (isNaN(input)) {
                   return "Please enter a number";
               }
               return true;
           }
         }
      ])
      .then(function(response) {
         let managerName = response.managerName;
         let managerEmail = response.managerEmail;
         let managerOffice = response.managerOffice;
         let manager = new Manager(
            managerName,
            employeeID,
            managerEmail,
            managerOffice
         );

         employeeList.push(manager);

         employeeID++;

         console.log("let's build your team.");

         employeePrompts();
      });
}

function employeePrompts() {
   inquirer
      .prompt([
         {
            type: "list",
            message: "Employee role:",
            choices: ["Engineer", "Intern"],
            name: "employeeType",
            validate: async (input) => {
               if (input == "" || /\s/.test(input)) {
                   return "Choose employee type.";
               }
               return true;
           }
         },
         {
            type: "input",
            message: "Enter employee name:",
            name: "employeeName",
            validate: async (input) => {
               if (input == "" || /\s/.test(input)) {
                   return "Please enter first or last name.";
               }
               return true;
           }
         },
         {
            type: "input",
            message: "What is the employee's email address?",
            name: "employeeEmail",
            validate: async (input) => {
               if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                   return true;
               }
               return "Please enter a valid email address.";
           }
         }
      ])
      .then(function(response) {
         let employeeType = response.employeeType;
         let employeeName = response.employeeName;
         let employeeEmail = response.employeeEmail;

         if (employeeType === "Engineer") {
            inquirer
               .prompt([
                  {
                     type: "input",
                     message: "Enter github username:",
                     name: "gitHubUN",
                     validate: async (input) => {
                        if (input == "" || /\s/.test(input)) {
                            return "Please enter github username.";
                        }
                        return true;
                    }
                  },
                  {
                     type: "list",
                     message: "Would you like to add another employee?",
                     choices: ["Yes", "No"],
                     name: "moreEmployees"
                  }
               ])
               .then(function(response) {
                  let employeeGitHub = response.gitHubUN;

                  let engineer = new Engineer(
                     employeeName,
                     employeeID,
                     employeeEmail,
                     employeeGitHub
                  );

                  employeeList.push(engineer);
                  employeeID++;

                  if (response.moreEmployees === "Yes") {
                     employeePrompts();
                  } else {
                     generatePage();
                     return;
                  }
               });
         } else {
            inquirer
               .prompt([
                  {
                     type: "input",
                     message: "Enter school:",
                     name: "internSchool",
                     validate: async (input) => {
                        if (input == "" || /\s/.test(input)) {
                            return "Please enter school name.";
                        }
                        return true;
                    }
                  },
                  {
                     type: "list",
                     message: "Would you like to add another employee?",
                     choices: ["Yes", "No"],
                     name: "moreEmployees"
                  }
               ])
               .then(function(response) {
                  let employeeSchool = response.internSchool;

                  let intern = new Intern(
                     employeeName,
                     employeeID,
                     employeeEmail,
                     employeeSchool
                  );

                  employeeList.push(intern);

                  employeeID++;

                  if (response.moreEmployees === "Yes") {
                     employeePrompts();
                  } else {
                     generatePage();
                     return;
                  }
               });
         }
      });
   // console.log(employeeList);
}

function generatePage() {
   let allCards = "";

   employeeList.forEach(item => {
      let cardString = item.createCard();
      allCards += cardString;
   });

   let fullHTML = `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />

      <link
         rel="stylesheet"
         href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
         integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
         crossorigin="anonymous"
      />

      <script
         src="https://kit.fontawesome.com/ab3fd93a87.js"
         crossorigin="anonymous"
      ></script>

      <title>My Team</title>
   </head>
   <body>
      <div
         class="container-fluid bg-dark text-center d-flex align-items-center justify-content-center"
         style="height: 20vh"
      >
         <div class="h1 text-white" style="display: inline-block;">
            My Team
         </div>
      </div>

      <div class="container mt-5">
         <!-- start of card group -->
         <div class="card-deck d-inline-flex justify-content-center">
            ${allCards}
         </div>
         <!-- end of card group -->
      </div>
   </body>
</html>
   `;

   fs.writeFile("./output/team.html", fullHTML, function(err) {
      if (err) {
         return console.log(err);
      }
   });
}

managerPrompts();

