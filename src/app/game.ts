import inquirer, { QuestionCollection, ListQuestion } from "inquirer";
import { promptQuestions } from "./promp-questions";

const firstQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "firstQuestion",
  message: "O prato que você pensou é massa?",
  choices: ["Sim", "Não"],
};

const defaultMassQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "defaultQuestion",
  message: "O prato que você pensou é Lasanha?",
  choices: ["Sim", "Não"],
};

const defultNotMassQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "defaultQuestion",
  message: "O prato que você pensou é Bolo de Chocolate?",
  choices: ["Sim", "Não"],
};

const isMassQuestions: QuestionCollection<ListQuestion>[][] = [];

const isNotMassQuestions: QuestionCollection<ListQuestion>[][] = [];

export const main = async () => {
  while (true) {
    await inquirer.prompt({
      type: "list",
      name: "start",
      choices: ["Ok"],
      message: "Pense em um prato que gosta",
    });

    const firstAnswer = await inquirer.prompt(firstQuestion);

    if (firstAnswer["firstQuestion"] === "Sim") {
      await promptQuestions(isMassQuestions, defaultMassQuestion, "Lasanha");
      continue;
    }

    await promptQuestions(
      isNotMassQuestions,
      defultNotMassQuestion,
      "Bolo de chocolate"
    );
  }
};
