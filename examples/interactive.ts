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
    name: "food",
    message: "enter your favorite food",
    type: InteractType.choice,
    options: ["pizza", "hamburger"],
    suffix: "... ",
  },
]);

console.log(results);
