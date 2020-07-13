import { InteractOptions, InteractType } from "./src/core/interact.ts";
export { InteractOptions };
import { Any, Numeric } from "./src/types/mod.ts";

export class Interaction {
  answers: Record<string, string | number> = {};
  async interact(opts: Array<InteractOptions>): Promise<any> {
    for (const opt of opts) {
      switch (opt.type) {
        case InteractType.any:
          this.answers[opt.name] = await new Any(opt).request();
          break;
        case InteractType.numeric:
          this.answers[opt.name] = await new Numeric(opt).request();
          break;
      }
    }
    return Promise.resolve(this.answers);
  }
}
