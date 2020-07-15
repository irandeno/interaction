export class EssentialAbsence extends Error {
  constructor(option: string) {
    super();
    this.name = "EssentialAbsence";
    this.message = `${option} is required.`;
  }
}
