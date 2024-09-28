export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`The email ${email} already is in use`);
    this.name = 'EmailAlreadyInUse';
  }
}
