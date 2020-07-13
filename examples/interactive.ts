import { Interaction, InteractType } from "../mod.ts";

//TODO: make prefix,suffix,bold,... global configurable:
const interaction = new Interaction();

const results = await interaction.interact([
  {
    name: "name",
    message: "enter your name",
    type: InteractType.any,
    prefix: "> ",
    suffix: ": ",
    bold: true,
  },
  {
    name: "age",
    message: "enter your age",
    type: InteractType.numeric,
    prefix: "> ",
    suffix: ": ",
    bold: true,
  },
  {
    name: "pizza",
    message: "enter your favorite food",
    type: InteractType.choice,
    options: ["pizza", "hamburger"],
    prefix: "> ",
    suffix: ": ",
    bold: true,
  },
]);

console.log(results);
