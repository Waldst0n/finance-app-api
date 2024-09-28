import { badRequest, notFound, ok, serverError } from './helpers.js';
import { GetUserByIDUseCase } from '../use-cases/get-user-by-id.js';
import validator from 'validator';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId);
      if (!isIdValid) {
        return badRequest({
          message: 'the provider id is not valid',
        });
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
