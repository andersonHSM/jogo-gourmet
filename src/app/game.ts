import inquirer, { QuestionCollection, ListQuestion } from "inquirer";
import { promptQuestions } from "./promp-questions";

const firstQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "firstQuestion",
  message: "O seu prato é massa?",
  choices: ["Sim", "Não"],
};

const defaultMassQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "defaultQuestion",
  message: "O seu prato é lasanha?",
  choices: ["Sim", "Não"],
};

const defultNotMassQuestion: QuestionCollection<ListQuestion> = {
  type: "list",
  name: "defaultQuestion",
  message: "O seu prato é bolo de chocolate?",
  choices: ["Sim", "Não"],
};

const isMassQuestions: QuestionCollection<ListQuestion>[][] = [];

const isNotMassQuestions: QuestionCollection<ListQuestion>[][] = [];

export const main = async () => {
  await inquirer.prompt({
    type: "list",
    name: "start",
    choices: ["Ok"],
    message: "Pense em um prato que você gosta!",
  });

  while (true) {
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
