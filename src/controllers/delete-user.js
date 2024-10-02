import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
  constructor(deleteUserUsecase) {
    this.deleteUserUsecase = deleteUserUsecase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return InvalidIdResponse();
      }

      const deletedUser = await this.deleteUserUsecase.execute(userId);

      if (!deletedUser) {
        return userNotFoundResponse();
      }

      return ok(deletedUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
