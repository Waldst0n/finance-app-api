import { notFound, ok, serverError } from './helpers/http.js';
import { GetUserByIDUseCase } from '../use-cases/get-user-by-id.js';
import { checkIfIdIsValid, InvalidIdResponse } from './helpers/user.js';

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
        return notFound({ message: 'User Not Found' });
      }

      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
