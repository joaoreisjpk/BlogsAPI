const nameError = '"displayName" length must be at least 8 characters long';
const noEmail = '"email" is required';
const blankEmail = '"email" is not allowed to be empty';
const invalidEmail = '"email" must be a valid email';
const invalidPassword = '"password" length must be 6 characters long';
const noPassword = '"password" is required';
const blankPassword = '"password" is not allowed to be empty';
const noTitle = '"title" is required';
const noContent = '"content" is required';
const noCategoryIDs = '"categoryIds" is required';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { Categories } = require('../../models');

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
  if (password.length !== 6) throw Error(invalidPassword);
};

const Title = (title) => {
  if (!title) throw Error(noTitle);
};

const Content = (content) => {
  if (!content) throw Error(noContent);
};

const CategoryIds = async (idsArray) => {
  if (!idsArray) throw Error(noCategoryIDs);

  const { count } = await Categories.findAndCountAll({
    where: { id: idsArray },
    raw: true,
  });

  if (count !== idsArray.length) {
    throw Error('"categoryIds" not found');
  }
};

const UpdateValidation = async ({ categoryIds, title, content, id, userId }) => {
  if (categoryIds) throw Error('Categories cannot be edited');
  if (!title) throw Error('"title" is required');
  if (!content) throw Error('"content" is required');
  if (id !== userId) throw Error('Unauthorized user');
};
module.exports = { DisplayName, Email, Password, Content, Title, CategoryIds, UpdateValidation };
