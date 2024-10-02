import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class CreateUserUseCase {
  constructor(postgresCreateUserRepository, postgresGetUserByEmailRepository) {
    this.postgresCreateUserRepository = postgresCreateUserRepository;
    this.getUserByEmailRepository = postgresGetUserByEmailRepository;
  }
  async execute(createUserParams) {
    const userWithProviderEmail = await this.getUserByEmailRepository.execute(
      createUserParams.email
    );

    if (userWithProviderEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const createUser = await this.postgresCreateUserRepository.execute(user);

    return createUser;
  }
}
