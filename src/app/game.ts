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
    message: "O seu prato é massa?",
    choices: ["Sim", "Não"],
  };

  private readonly defaultMassQuestion: QuestionCollection<ListQuestion> = {
    type: "list",
    name: "defaultQuestion",
    message: "O seu prato é lasanha?",
    choices: ["Sim", "Não"],
  };

  private readonly defultNotMassQuestion: QuestionCollection<ListQuestion> = {
    type: "list",
    name: "defaultQuestion",
    message: "O seu prato é bolo de chocolate?",
    choices: ["Sim", "Não"],
  };

  private isMassQuestions: QuestionCollection<ListQuestion>[][] = [];

  private isNotMassQuestions: QuestionCollection<ListQuestion>[][] = [];

  init = async () => {
    await inquirer.prompt({
      type: "list",
      name: "start",
      choices: ["Ok"],
      message: "Pense em um prato que você gosta!",
    });

    while (true) {
      const firstAnswer = await inquirer.prompt(this.firstQuestion);

      if (firstAnswer["firstQuestion"] === "Sim") {
        await this.massQuestionary.promptQuestions(
          this.isMassQuestions,
          this.defaultMassQuestion,
          "Lasanha"
        );
        continue;
      }

      await this.notMassQuestionary.promptQuestions(
        this.isNotMassQuestions,
        this.defultNotMassQuestion,
        "Bolo de chocolate"
      );
    }
  };
}
