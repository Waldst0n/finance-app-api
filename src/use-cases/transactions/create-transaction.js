import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../../errors/user.js';

export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(createtransactionParams) {
    const userId = createtransactionParams.userId;

    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = uuidv4();

    const transaction = await this.createTransactionRepository.execute({
      ...createtransactionParams,
      id: transactionId,
    });

    return transaction;
  }
}
