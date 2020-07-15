import * as logger from "../helpers/logger.ts";
import * as errors from "../helpers/errors.ts";

export enum InteractType {
  any,
  numeric,
  choice,
  alphabetical,
  /* TODO: 
  checklist,
  */
}

export interface InteractOptions {
  name: string;
  message?: string;
  type?: InteractType;
  prefix?: string;
  suffix?: string;
  bold?: boolean;
  options?: Array<string>;
}

export class Interact implements InteractOptions {
  name: string = "";
  type: InteractType = InteractType.any;
  message?: string;
  prefix?: string;
  suffix?: string;
  bold?: boolean;
  options?: Array<string>;
  [key: string]: unknown
  constructor(opts: InteractOptions) {
    if (typeof opts.name == undefined) {
      throw new errors.EssentialAbsence("name");
    }
    for (const [key, value] of Object.entries(opts)) {
      this[key] = value;
    }
  }

  protected async printMessage() {
    let output = `${this.prefix}${this.message}${this.suffix}`;
    if (this.bold) {
      output = logger.bold(output);
    }
    await logger.write(output);
  }
}
