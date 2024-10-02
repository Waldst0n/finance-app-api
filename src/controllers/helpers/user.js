import validator from 'validator';
import { badRequest, notFound } from '../helpers/http.js';

export const InvalidPasswordResponse = () => {
  return badRequest({
    message: 'Password must be at least 6 characters.',
  });
};

export const EmailAlreadyInUseResponse = () => {
  return badRequest({
    message: 'Invalid e-mail. Please provide a valid one',
  });
};

export const InvalidIdResponse = () => {
  badRequest({
    message: 'The provided id is not valid.',
  });
};

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const userNotFoundResponse = () =>
  notFound({ message: 'user not found' });
