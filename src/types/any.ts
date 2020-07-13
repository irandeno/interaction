import { Interact, InteractOptions } from "../core/interact.ts";
import { BufReader } from "https://deno.land/std@0.60.0/io/bufio.ts";

export class Any extends Interact {
  constructor(opts: InteractOptions) {
    super(opts);
  }
  async request(): Promise<unknown> {
    await this.printMessage();
    const result = await this.getUserInput();
    return Promise.resolve(result);
  }

  protected async getUserInput(): Promise<string | undefined> {
    const reader = new BufReader(Deno.stdin);
    const input = await reader.readLine();
    if (input == null) return;
    return input.line && new TextDecoder().decode(input.line);
  }
}
