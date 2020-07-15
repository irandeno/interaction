import { Interaction, InteractType } from "../mod.ts";

const interaction = new Interaction({ bold: true, prefix: "> ", suffix: "? " });

const results = await interaction.interact([
  {
    name: "name",
    message: "what's your name",
    type: InteractType.any,
    prefix: "- ",
  },
  {
    name: "age",
    message: "how old are you",
    type: InteractType.numeric,
    bold: false,
  },
  {
    name: "alpha",
    message: "enter a key",
    type: InteractType.alphabetical,
    suffix: ": ",
    prefix: "> ",
  },
  {
    name: "food",
    message: "enter your favorite food",
    type: InteractType.choice,
    options: ["pizza", "hamburger"],
    suffix: "... ",
  },
]);

console.log(results);
