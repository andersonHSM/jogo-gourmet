import inquirer, { ListQuestion, QuestionCollection } from "inquirer";

export const insertNewDish = async (defaultDish: string) => {
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
