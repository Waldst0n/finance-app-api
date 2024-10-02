import { DeleteUserUseCase } from '../use-cases/index.js';
import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return InvalidIdResponse();
      }

      const deleteUserUsecase = new DeleteUserUseCase();

      const deletedUser = await deleteUserUsecase.execute(userId);

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
