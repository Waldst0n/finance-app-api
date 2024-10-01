import { CreateUserUseCase } from '../use-cases/create-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  EmailAlreadyInUseResponse,
  InvalidPasswordResponse,
  badRequest,
  created,
  serverError,
} from './helpers/index.js';

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      // validar a requisição (Campos obrigatórios e tamanho de senha)
      const requiredFields = ['first_name', 'last_name', 'email', 'password'];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().lenght === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);

      if (!passwordIsValid) {
        return InvalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailIsValid(params.email);

      if (!emailIsValid) {
        return EmailAlreadyInUseResponse();
      }

      // chamar o use case
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      // Retornar resposta para o usuário (status code)
      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);

      return serverError();
    }
  }
}
