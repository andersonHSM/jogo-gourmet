import { Game } from "./app/game";
import { MassQuestionary } from "./app/mass-questionary";
import { NotMassQuestionary } from "./app/not-mass-questionary";

const massQuestionary = new MassQuestionary();
const notMassQuestionary = new NotMassQuestionary();

const { init } = new Game(massQuestionary, notMassQuestionary);

init();
