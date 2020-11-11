import inquirer, { QuestionCollection, ListQuestion } from "inquirer";

export class BaseQuestionary {
  promptQuestions = async (
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
            await this.showRight();
            return;
          }
        }
      }
    }

    const defaultAnswer = await inquirer.prompt(
      defaultQuestion as ListQuestion
    );
    if (
      defaultAnswer["defaultQuestion"] &&
      defaultAnswer["defaultQuestion"] === "Sim"
    ) {
      await this.showRight();
      return;
    }

    const newDish = await this.insertNewDish(defaultDish);

    questions.unshift(newDish);
    return;
  };

  showRight = async () => {
    await inquirer.prompt({
      type: "list",
      name: "start",
      choices: ["Ok"],
      message: "Acertei de novo!",
    });
  };

  insertNewDish = async (defaultDish: string) => {
    const newQuestion = await inquirer.prompt({
      type: "input",
      name: "newQuestion",
      message: "Qual prato você pensou?",
    });

    const dish = newQuestion["newQuestion"];

    const newQuestionTip = await inquirer.prompt({
      type: "input",
      name: "newQuestionTip",
      message: `${dish} é _________, mas ${defaultDish} não.`,
    });

    const dishTip = newQuestionTip["newQuestionTip"];

    const newDish: QuestionCollection<ListQuestion>[] = [
      {
        type: "list",
        name: "subsequentTip",
        message: `O prato que você pensou é ${dishTip}?`,
        choices: ["Sim", "Não"],
      },
      {
        type: "list",
        name: "subsequent",
        message: `O prato que você pensou é ${dish}?`,
        choices: ["Sim", "Não"],
      },
    ];

    return newDish;
  };
}
