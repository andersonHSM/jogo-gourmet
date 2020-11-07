import { Subject } from "rxjs";

const inquirer = require("inquirer");
var prompts = new Subject();

const firstQuestion = {
  type: "list",
  name: "fisrtQuestion",
  message: "O seu prato é massa?",
  choices: ["Sim", "Não"],
};
const isMassQuestions = [
  {
    type: "list",
    name: "isLasanha",
    message: "O seu prato é lasanha?",
    choices: ["Sim", "Não"],
  },
];

inquirer
  .prompt(firstQuestion)
  .then((answer) => {
    if (answer.fisrtQuestion === "Sim") {
      console.log("oi");
      massQuestions();
    }

    nonMassQuestions();
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

const massQuestions = () => {
  return inquirer.prompt(isMassQuestions).then((answers) => {
    console.log(answers);
  });
};

const nonMassQuestions = () => {};

// const inquirer = require("inquirer");

// var questions = [
//   {
//     type: "input",
//     name: "name",
//     message: "What's your name?",
//   },
// ];

// inquirer.prompt(questions).then((answers) => {
//   console.log(`Hi ${answers["name"]}!`);
// });
