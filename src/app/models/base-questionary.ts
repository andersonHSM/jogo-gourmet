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
            this.showRight();
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
      this.showRight();
      return;
    }

    const newDish = await this.insertNewDish(defaultDish);

    questions.unshift(newDish);
  };

  showRight = () => {
    console.log("Acertei novamente");
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
}
