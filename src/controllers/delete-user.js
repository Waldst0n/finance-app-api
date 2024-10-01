import { DeleteUserUseCase } from '../use-cases/index.js';
import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
} from './helpers/index.js';

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.param.userId;
      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return InvalidIdResponse();
      }

      const deleteUserUsecase = new DeleteUserUseCase();

      const deletedUser = await deleteUserUsecase.execute(userId);

      return ok(deletedUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
