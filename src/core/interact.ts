export enum InteractType {
  any,
  /* todo : 
  number,
  alphabetical,
  choice,
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
  name: string;
  type: InteractType = InteractType.any;
  message?: string;
  prefix?: string;
  suffix?: string;
  bold?: boolean;
  options?: Array<string>;
}
