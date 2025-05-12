export class ActionHeaderException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionHeaderException";
  }
}
