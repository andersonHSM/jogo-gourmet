import { Subject } from "rxjs";

import inquirer, { QuestionCollection, ListQuestion } from "inquirer";
var prompts = new Subject();

const firstQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "firstQuestion",
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

const massQuestions = async () => {
  const isMassAnswers = await inquirer.prompt(isMassQuestions);

  if (isMassAnswers["isLasanha"] === "Sim") {
    showRight();
  }
};

const main = async () => {
  let counter = 0;

  while (true) {
    const firstAnswer = await inquirer.prompt(firstQuestion);

    if (firstAnswer["firstQuestion"] === "Sim") {
      await massQuestions();
    }

    counter += 1;
  }
};

const showRight = () => {
  console.log("Acertei novamente");
};

main();
