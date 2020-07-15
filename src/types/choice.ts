import { Interact, InteractOptions } from "../core/interact.ts";
import { StateManager } from "../core/stateManager.ts";
import * as cursor from "../helpers/cursor.ts";
import * as logger from "../helpers/logger.ts";
import * as errors from "../helpers/errors.ts";
import { readKeypress } from "../deps.ts";
interface ChoiceState {
  options: Array<string>;
  selected: number;
}

export class Choice extends Interact {
  [key: string]: any
  stateManager: StateManager;
  constructor(opts: InteractOptions) {
    super(opts);
    if (typeof opts.options == "undefined" || !opts.options.length) {
      throw new errors.EssentialAbsence("options");
    }
    this.stateManager = new StateManager({
      options: opts.options,
      selected: 0,
    });
  }

  async request(): Promise<number> {
    await this.printMessage();
    await this.printOptions();
    await cursor.lineUp(this.options?.length);
    const state = this.stateManager.state;
    await cursor.moveRight(state.options[state.selected].length);
    const selected = await this.keyListener();
    return Promise.resolve(selected);
  }

  protected async printOptions() {
    let output = logger.darkGray(
      `\n(use "w" for up and "s" for down, "space" for select)\n`,
    );
    this.options?.forEach((option, index) => {
      if (index == 0) {
        output += logger.green(option) + "\n";
      } else {
        output += option + "\n";
      }
    });
    await logger.write(output);
  }

  async keyListener(): Promise<number> {
    const state = this.stateManager.state as ChoiceState;
    for await (const pressedKey of readKeypress()) {
      if (pressedKey.key === "w") {
        if (state.selected === 0) continue;
        await cursor.clearLine();
        await cursor.moveLeft(state.options[state.selected].length);
        await logger.write(state.options[state.selected]);
        await cursor.lineUp();
        this.stateManager.setState({ selected: state.selected - 1 });
        await logger.write(logger.green(state.options[state.selected]));
      } else if (pressedKey.key === "s") {
        if (state.selected === state.options.length - 1) continue;
        await cursor.clearLine();
        await cursor.moveLeft(state.options[state.selected].length);
        await logger.write(state.options[state.selected]);
        await cursor.lineDown();
        this.stateManager.setState({ selected: state.selected + 1 });
        await logger.write(logger.green(state.options[state.selected]));
      } else if (
        pressedKey.key === "space" ||
        pressedKey.key === "enter" ||
        (pressedKey.ctrlKey && pressedKey.key === "c")
      ) {
        await cursor.lineDown(state.options.length - state.selected);
        break;
      }
    }
    return Promise.resolve(state.selected);
  }
}
