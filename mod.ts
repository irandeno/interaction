import { InteractOptions, InteractType } from "./src/core/interact.ts";
export { InteractType };
import { Any, Numeric, Choice, Alphabetical } from "./src/types/mod.ts";
import { deepExtend } from "./src/helpers/deepExtend.ts";

type globalOptions = {
  prefix?: string;
  suffix?: string;
  bold?: boolean;
};

export class Interaction {
  answers: Record<string, string | number> = {};
  globalOptions: globalOptions;
  constructor(globalOptions?: globalOptions) {
    this.globalOptions = globalOptions || {};
  }

  async interact(opts: Array<InteractOptions>): Promise<any> {
    for (const opt of opts) {
      const mergedOptions = deepExtend(
        { ...this.globalOptions },
        opt,
      ) as InteractOptions;

      switch (opt.type) {
        case InteractType.any:
          this.answers[opt.name] = await new Any(mergedOptions).request();
          break;
        case InteractType.numeric:
          this.answers[opt.name] = await new Numeric(mergedOptions).request();
          break;
        case InteractType.choice:
          this.answers[opt.name] = await new Choice(mergedOptions).request();
          break;
        case InteractType.alphabetical:
          this.answers[opt.name] = await new Alphabetical(mergedOptions)
            .request();
          break;
      }
    }
    return Promise.resolve(this.answers);
  }
}
