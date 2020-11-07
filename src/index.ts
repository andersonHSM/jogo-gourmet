import inquirer, { QuestionCollection, ListQuestion } from "inquirer";

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

const promptQuestions = async (
  questions: QuestionCollection<ListQuestion>[][],
  defaultQuestion: QuestionCollection<ListQuestion>,
  defaultDish: string
) => {
  if (questions.length > 0) {
    for (const question of questions) {
      const tip = await inquirer.prompt(question[0] as ListQuestion);

      if (tip["subsequentTip"] && tip["subsequentTip"] === "Sim") {
        const answer = await inquirer.prompt(question[1] as ListQuestion);

        if (answer["subsequent"] && answer["subsequent"] === "Sim") {
          showRight();
          return;
        }
      }
    }
  }

  const defaultAnswer = await inquirer.prompt(defaultQuestion as ListQuestion);
  if (
    defaultAnswer["defaultQuestion"] &&
    defaultAnswer["defaultQuestion"] === "Sim"
  ) {
    showRight();
    return;
  }

  const newDish = await insertNewDish(defaultDish);

  questions.unshift(newDish);
};

const insertNewDish = async (defaultDish: string) => {
  const newQuestion = await inquirer.prompt({
    type: "input",
    name: "newQuestion",
    message: "Qual prato você pensou?",
  });

  const dish = newQuestion["newQuestion"];

  const newQuestionTip = await inquirer.prompt({
    type: "input",
    name: "newQuestionTip",
    message: `Esse prato é _________, mas ${defaultDish} não é: `,
  });

  const dishTip = newQuestionTip["newQuestionTip"];

  const newDish: QuestionCollection<ListQuestion>[] = [
    {
      type: "list",
      name: "subsequentTip",
      message: `O seu prato é ${dishTip}, mas ${defaultDish} não é?`,
      choices: ["Sim", "Não"],
    },
    {
      type: "list",
      name: "subsequent",
      message: `O seu prato é ${dish}?`,
      choices: ["Sim", "Não"],
    },
  ];

  return newDish;
};

const showRight = () => {
  console.log("Acertei novamente");
};

const main = async () => {
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

main();
