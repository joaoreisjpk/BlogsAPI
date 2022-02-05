const nameError = '"displayName" length must be at least 8 characters long';
const noEmail = '"email" is required';
const blankEmail = '"email" is not allowed to be empty';
const invalidEmail = '"email" must be a valid email';
const invalidPassword = '"password" length must be at least 8 characters long';
const noPassword = '"password" is required';
const blankPassword = '"password" is not allowed to be empty';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DisplayName = (name) => {
  if (!name || name.length < 8) throw Error(nameError);
};

const Email = (email) => {
  if (!email && email !== '') throw Error(noEmail);
  if (!email) throw Error(blankEmail);
  if (!email.match(emailRegex)) throw Error(invalidEmail);
};

const Password = (password) => {
  if (!password && password !== '') throw Error(noPassword);
  if (!password) throw Error(blankPassword);
  if (password.length < 6) throw Error(invalidPassword);
};

module.exports = { DisplayName, Email, Password };
