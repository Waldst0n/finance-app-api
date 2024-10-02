import {
  checkIfIdIsValid,
  InvalidIdResponse,
  userNotFoundResponse,
  ok,
  serverError,
} from './helpers/index.js';

import { GetUserByIDUseCase } from '../use-cases/index.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = checkIfIdIsValid(httpRequest.params.userId);
      if (!isIdValid) {
        return InvalidIdResponse();
      }

      const getUserByIdUSecase = new GetUserByIDUseCase();

      const user = await getUserByIdUSecase.execute(httpRequest.params.userId);

      if (!user) {
        return userNotFoundResponse();
      }

      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
