import inquirer from "inquirer";

export const showRight = async () => {
  await inquirer.prompt({
    type: "list",
    name: "right",
    choices: ["Ok"],
    message: "Acertei de novo!",
  });
};
