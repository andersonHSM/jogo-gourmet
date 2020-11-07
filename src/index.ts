import { Subject } from "rxjs";

import inquirer, { QuestionCollection, ListQuestion } from "inquirer";
var prompts = new Subject();

const firstQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "firstQuestion",
  message: "O seu prato é massa?",
  choices: ["Sim", "Não"],
};

const isMassQuestions: QuestionCollection<ListQuestion>[] = [
  {
    type: "list",
    name: "defaultQuestion",
    message: "O seu prato é lasanha?",
    choices: ["Sim", "Não"],
  },
  {
    type: "list",
    name: "subsequent",
    message: "O seu prato é macarrão?",
    choices: ["Sim", "Não"],
  },
  {
    type: "list",
    name: "subsequent",
    message: "O seu prato é arroz?",
    choices: ["Sim", "Não"],
  },
];

const isNotMassQuestions: QuestionCollection<ListQuestion>[] = [
  {
    type: "list",
    name: "defaultQuestion",
    message: "O seu prato é bolo de chocolate?",
    choices: ["Sim", "Não"],
  },
  {
    type: "list",
    name: "subsequent",
    message: "O seu prato é torta?",
    choices: ["Sim", "Não"],
  },
  {
    type: "list",
    name: "subsequent",
    message: "O seu prato é vinho?",
    choices: ["Sim", "Não"],
  },
];

const promptQuestions = async (
  questions: QuestionCollection<ListQuestion>[]
) => {
  for (const question of questions) {
    const answer = await inquirer.prompt(question as ListQuestion);
    if (answer["defaultQuestion"] && answer["defaultQuestion"] === "Sim") {
      showRight();
      return;
    } else if (answer["subsequent"] && answer["subsequent"] === "Sim") {
      showRight();
      return;
    }
  }
  const newQuestion = await inquirer.prompt({
    type: "input",
    name: "newQuestion",
    message: "Esse prato é _________ e lasanha não é",
  });

  const dish = newQuestion["newQuestion"];

  const newDish: QuestionCollection<ListQuestion> = {
    type: "list",
    name: "subsequent",
    message: `O seu prato é ${dish}?`,
    choices: ["Sim", "Não"],
  };

  questions.unshift(newDish);
};

const main = async () => {
  while (true) {
    const firstAnswer = await inquirer.prompt(firstQuestion);

    if (firstAnswer["firstQuestion"] === "Sim") {
      await promptQuestions(isMassQuestions);
      continue;
    }

    await promptQuestions(isNotMassQuestions);
  }
};

const showRight = () => {
  console.log("Acertei novamente");
};

main();
