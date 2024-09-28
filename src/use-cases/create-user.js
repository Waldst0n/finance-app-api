import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    //  TODO Verifica se o e-mail está em uso

    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWithProviderEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWithProviderEmail) {
      throw new Error('The provided e-mail is already in use');
    }

    // Gerar Id do user
    const userId = uuidv4();

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    // inserir o usuário
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    //chamar o repositório

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createUser = await postgresCreateUserRepository.execute(user);

    return createUser;
  }
}
