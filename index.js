import 'dotenv/config.js';
import express from 'express';
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './src/controllers/index.js';
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js';
import { GetUserByIDUseCase } from './src/use-cases/get-user-by-id.js';
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js';
import { CreateUserUseCase } from './src/use-cases/create-user.js';
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js';
import { DeleteUserUseCase } from './src/use-cases/delete-user.js';
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js';
import { UpdateUserUseCase } from './src/use-cases/update-user.js';
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIDUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.post('/api/users', async (request, response) => {
  const getUserByEmail = new PostgresGetUserByEmailRepository();
  const createUserRepository = new PostgresCreateUserRepository();

  const createUserUseCase = new CreateUserUseCase(
    getUserByEmail,
    createUserRepository
  );

  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute(request);

  response.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

  const updateUserUsecase = new UpdateUserUseCase(postgresUpdateUserRepository);

  const updateUserController = new UpdateUserController(updateUserUsecase);

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserRepository = new PostgresDeleteUserRepository();

  const deleteUserUsecase = new DeleteUserUseCase(deleteUserRepository);

  const deleteUserController = new DeleteUserController(deleteUserUsecase);

  const { statusCode, body } = await deleteUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
