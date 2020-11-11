import inquirer, { QuestionCollection, ListQuestion } from "inquirer";
import { MassQuestionary } from "./mass-questionary";
import { NotMassQuestionary } from "./not-mass-questionary";

export class Game {
  constructor(
    private readonly massQuestionary: MassQuestionary,
    private readonly notMassQuestionary: NotMassQuestionary
  ) {}

  private readonly firstQuestion: QuestionCollection<ListQuestion> = {
    type: "list",
    name: "firstQuestion",
    message: "O prato que você pensou é massa?",
    choices: ["Sim", "Não"],
  };

  private readonly defaultMassQuestion: QuestionCollection<ListQuestion> = {
    type: "list",
    name: "defaultQuestion",
    message: "O prato que você pensou é Lasanha?",
    choices: ["Sim", "Não"],
  };

  private readonly defultNotMassQuestion: QuestionCollection<ListQuestion> = {
    type: "list",
    name: "defaultQuestion",
    message: "O prato que você pensou é Bolo de Chocolate?",
    choices: ["Sim", "Não"],
  };

  private isMassQuestions: QuestionCollection<ListQuestion>[][] = [];

  private isNotMassQuestions: QuestionCollection<ListQuestion>[][] = [];

  init = async () => {
    while (true) {
      await inquirer.prompt({
        type: "list",
        name: "start",
        choices: ["Ok"],
        message: "Pense em um prato que gosta",
      });

      const firstAnswer = await inquirer.prompt(this.firstQuestion);

      if (firstAnswer["firstQuestion"] === "Sim") {
        await this.massQuestionary.promptQuestions(
          this.isMassQuestions,
          this.defaultMassQuestion,
          "Lasanha"
        );
        continue;
      }

      console.log("oi");

      await this.notMassQuestionary.promptQuestions(
        this.isNotMassQuestions,
        this.defultNotMassQuestion,
        "Bolo de Chocolate"
      );
    }
  };
}
