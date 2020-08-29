import { Interact, InteractOptions } from "../core/interact.ts";
import { StateManager } from "../core/stateManager.ts";
import * as cursor from "../helpers/cursor.ts";
import * as logger from "../helpers/logger.ts";
import * as errors from "../helpers/errors.ts";
import { readKeypress } from "../deps.ts";
interface CheckedState {
  checkedList: Array<number>;
  position: number;
}

export class CheckList extends Interact {
  [key: string]: any
  stateManager: StateManager;
  constructor(opts: InteractOptions) {
    super(opts);
    if (typeof opts.options == "undefined" || !opts.options.length) {
      throw new errors.EssentialAbsence("options");
    }
    this.stateManager = new StateManager({
      checkedList: [],
      position: 0,
    });
  }

  async request(): Promise<Array<number>> {
    await this.printMessage();
    await this.printOptions();
    await cursor.lineUp(this.options?.length);
    const checkedList = await this.keyListener();
    return Promise.resolve(checkedList);
  }

  protected async printOptions() {
    let output = logger.darkGray(
      `\n(use "w" for up and "s" for down, "space" for select, "enter" for finalizing)\n`,
    );
    this.options?.forEach((option) => {
      output += `${logger.darkGray(this.unchecked)} ${option} \n`;
    });
    await logger.write(output);
  }

  async printChecked(): Promise<void> {
    const state = this.stateManager.state as CheckedState;
    await cursor.clearLine();
    await logger.write(
      `${logger.green(this.checked)} ${this.options![state.position]}`,
    );
    await cursor.moveLeft(
      this.options![state.position].length + this.checked.length + 1,
    );
  }

  async printUnChecked(): Promise<void> {
    const state = this.stateManager.state as CheckedState;
    await cursor.clearLine();
    await logger.write(
      `${logger.darkGray(this.unchecked)} ${this.options![state.position]}`,
    );
    await cursor.moveLeft(
      this.options![state.position].length + this.unchecked.length + 1,
    );
  }

  async keyListener(): Promise<Array<number>> {
    const state = this.stateManager.state as CheckedState;
    for await (const pressedKey of readKeypress()) {
      if (pressedKey.key === "w") {
        if (state.position === 0) continue;
        this.stateManager.setState({ position: state.position - 1 });
        await cursor.lineUp();
      } else if (pressedKey.key === "s") {
        if (state.position === this.options!.length - 1) continue;
        await cursor.lineDown();
        this.stateManager.setState({ position: state.position + 1 });
      } else if (pressedKey.key === "space") {
        if (state.checkedList.includes(state.position)) {
          this.stateManager.setState({
            checkedList: state.checkedList.filter(
              (item) => item != state.position,
            ),
          });
          await this.printUnChecked();
        } else {
          this.stateManager.setState({
            checkedList: [...state.checkedList, state.position],
          });
          await this.printChecked();
        }
      } else if (
        (pressedKey.ctrlKey && pressedKey.key === "c") ||
        pressedKey.key === "return"
      ) {
        await cursor.lineDown(this.options!.length - state.position);
        break;
      }
    }
    return Promise.resolve(state.checkedList);
  }
}
