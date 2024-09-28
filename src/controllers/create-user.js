import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';
import { badRequest, created, serverError } from './helpers.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

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

      const passwordIsValid = params.password.length < 6;

      if (passwordIsValid) {
        return badRequest({ message: 'Password must be at last 6 characters' });
      }

      const emailIsValid = validator.isEmail(params.email);
      if (!emailIsValid) {
        return badRequest({
          message: 'Invalid e-mail. Please provide a valid one',
        });
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
      console.log(error);

      return serverError();
    }
  }
}
