export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`The email ${email} already is in use`);
    this.name = 'EmailAlreadyInUse';
  }
}

export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found`);
    this.name = 'UserNotFoundError';
  }
}
