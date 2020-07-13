import { Interact, InteractOptions } from "../core/interact.ts";
import * as logger from "../core/logger.ts";
import { BufReader } from "https://deno.land/std@0.60.0/io/bufio.ts";

export class Any extends Interact {
  constructor(opts: InteractOptions) {
    super(opts);
  }
  async request(): Promise<string> {
    await this.printMessage();
    const result = await this.getUserInput();
    return Promise.resolve(result);
  }

  protected async getUserInput(): Promise<string> {
    const reader = new BufReader(Deno.stdin);
    const input = await reader.readLine();
    if (input == null) return "";
    return input.line && logger.decode(input.line);
  }
}
