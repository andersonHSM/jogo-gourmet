import inquirer, { ListQuestion, QuestionCollection } from "inquirer";
import { insertNewDish } from "./insert-new-dish";
import { showRight } from "./show-right";

export const promptQuestions = async (
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
