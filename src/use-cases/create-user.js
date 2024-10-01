import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWithProviderEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWithProviderEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
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
