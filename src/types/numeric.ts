import { Interact, InteractOptions } from "../core/interact.ts";
import * as logger from "../helpers/logger.ts";
import { readKeypress } from "../deps.ts";
import { moveLeft, clearRight } from "../helpers/cursor.ts";

export class Numeric extends Interact {
  constructor(opts: InteractOptions) {
    super(opts);
  }
  async request(): Promise<number> {
    await this.printMessage();
    const result = await this.keyListener();
    return Promise.resolve(result);
  }

  async keyListener(): Promise<number> {
    let input = "";
    const allowedInputs = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      ".",
    ];
    for await (const pressedKey of readKeypress()) {
      if (typeof pressedKey.key == "undefined") continue;

      if (pressedKey.key === "backspace") {
        if (input.length === 0) {
          continue;
        }
        input = input.slice(0, -1);
        await moveLeft(1);
        await clearRight();
        continue;
      }

      if (allowedInputs.includes(pressedKey.key)) {
        logger.write(pressedKey.key);
        input += pressedKey.key!;
      } else if (
        pressedKey.key === "return" ||
        (pressedKey.ctrlKey && pressedKey.key === "c")
      ) {
        await logger.write("\n");
        break;
      }
    }
    return Promise.resolve(Number(input));
  }
}
