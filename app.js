const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const jest = require("jest");

const teamMembers = [];


// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Choose member type:",
            choices: [
                "Manager",
                "Intern",
                "Engineer"
            ]
        }
    ]).then(userChoice => {
        switch(userChoice.memberChoice) {
            case "Manager":
                addManager ();
                break;

            case "Intern":
                addIntern();
                break;

            case "Engineer":
                addEngineer ();
                break;
                default:
        }
    })

    function addManager() {
        inquirer.prompt ([
           {
               type: "input",
               name: "ManangerName",
               message: "Enter manager name:",
               validate: async (input) => {
                if (input == "" || /\s/.test(input)){
                    return "Please enter first or last name.";
                }
                return true;
            }
           },
           {
               type: "input",
               name: "managerId",
               message:"Enter manager ID?",
               validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
           },
           {
               type: "input",
               name: "managerEmail",
               message: "Enter email address:",
               validate: async (input) => {
                if (/\S+@\S+\.\S+/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address."
            },
           },
           {
               type: "input",
               name: "managerOfficeNumber",
               message: "Enter office number:",
               validate: async (input)=> {
                if (isNaN(input)) {
                    return "Please enter a number"
                }
                return true;
            },
           }
        ]).then(userChoice => {
            console.log(userChoice);

            const manager = new Manager(userChoice.ManangerName, userChoice.managerId, userChoice.managerEmail, userChoice.managerOfficeNumber);
            teamMembers.push(manager);
            createTeam();
        })

    }

    function addEngineer(){
        inquirer.prompt([
            {
                 type: "input",
                name: "engineerName",
                 message: "Enter engineer name",
                 validate: async (input) => {
                    if (input == "" || /\s/.test(input)){
                        return "Please enter first or last name.";
                    }
                    return true;
                },
            },
            {
                type: "input",
                 name: "engineerId",
                 message: "Enter engineer ID",
                 validate: async (input) => {
                     if (isNaN(input)) {
                         return "Please enter a number";
                     }
                     return true;
                 }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Enter email address:",
                validate: async (input) => {
                    if (/\S+@\S+\.\S+/.test(input)) {
                        return true;
                    }
                    return "Please enter a valid email address."
                },
                
            },
            {
                type: "input",
                name: "engineerGithub",
                 message: "Enter github username:",
                 validate: async (input) => {
                    if (input == "" || /\s/.test(input)){
                        return "please enter school name:"
                    }
                    return true;
                }
            }



        ]).then(userChoice => {
            console.log(userChoice);
                
             const engineer = new Engineer(userChoice.engineerName, userChoice.engineerId, userChoice.engineerEmail, userChoice.engineerGithub);
            teamMembers.push(engineer);
             createTeam();
        });
    };


    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Enter intern name:",
                validate: async (input) => {
                    if (input == "" || /\s/.test(input)){
                        return "Please enter first or last name.";
                    }
                    return true;
                
            },
            {
                type: "input",
                name: "internId",
                message: "Enter intern ID:",
                 validate: async (input) => {
                     if (isNaN(input)) {
                         return "Please enter a number";
                     }
                     return true;
                 }
            },
            {
                type: "input",
                name: "internEmail",
                message: "Enter email address:",
                validate: async (input) => {
                    if (/\S+@\S+\.\S+/.test(input)) {
                        return true;
                    }
                    return "Please enter a valid email address."
                },
            },
            {
                type: "input",
                name: "internSchool",
                message: "Enter school:",
                validate: async (input) => {
                    if (input == "" || /\s/.test(input)){
                        return "please enter school name:"
                    }
                    return true;
                }
            }
        ]).then(userChoice => {
            console.log(userChoice);

            const intern = new Intern(userChoice.internName, userChoice.internId, userChoice.internEmail, userChoice.internSchool);
            teamMembers.push(intern);
            createTeam();
        });
    };
}

module.exports = teamMembers;

createTeam();
