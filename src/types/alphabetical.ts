import { Interact, InteractOptions } from "../core/interact.ts";
import * as logger from "../helpers/logger.ts";
import { readKeypress } from "../deps.ts";
import { moveLeft, clearRight } from "../helpers/cursor.ts";

export class Alphabetical extends Interact {
  constructor(opts: InteractOptions) {
    super(opts);
  }
  async request(): Promise<string> {
    await this.printMessage();
    const result = await this.getInput();
    return Promise.resolve(result);
  }

  public isAlphabetical(input: string): boolean {
    const enAlphabet = input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 122;
    // TODO: Adding persian, greek alphabet

    return enAlphabet;
  }

  protected async getInput(): Promise<string> {
    let input = "";
    for await (const pressedKey of readKeypress()) {
      if (
        typeof pressedKey.key == "undefined" || pressedKey.key === "space"
      ) {
        continue;
      }
      if (pressedKey.key === "return") {
        await logger.write("\n");
        break;
      }

      if (pressedKey.key === "backspace") {
        if (input.length === 0) {
          continue;
        }
        input = input.slice(0, -1);
        await moveLeft(1);
        await clearRight();
        continue;
      }

      if (this.isAlphabetical(pressedKey.key)) {
        logger.write(pressedKey.key);
        input += pressedKey.key!;
      }
    }
    return input;
  }
}
