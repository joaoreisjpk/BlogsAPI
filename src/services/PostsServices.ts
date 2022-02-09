require('dotenv').config();
const { Op } = require('sequelize');
const {
  BlogPosts,
  Users,
  PostsCategories,
  Categories,
} = require('../../models');
const { handleResponse } = require('../helpers');

const createPost = async ({ id: userId, title, content, categoryIds }) => {
  const post = await BlogPosts.create({
    userId,
    title,
    content,
    categoryIds,
  });

  await PostsCategories.bulkCreate(
    categoryIds.map((categoryId) => ({ categoryId, postId: post.id })),
  );

  const data = { id: post.id, userId, title, content };
  return { status: 201, response: data };
};

const getPosts = async () => {
  try {
    const posts = await BlogPosts.findAll({
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });

    return { code: 200, response: posts };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const getPostId = async ({ id }) => {
  try {
    const posts = await BlogPosts.findOne({
      where: { id },
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!posts) {
      return { code: 404, response: { message: 'Post does not exist' } };
    }
    const response = handleResponse([posts])[0];
    return { code: 200, response };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const updatePost = async ({ id, title, content, userId }: { id: number, title: string, content: string, userId: number }) => {
  const { response, response: { categories } } = await getPostId({ id });

  if (response.message) {
    return { code: 404, response: { message: response.message } };
  }

  if (response.userId !== userId) {
    return { code: 401, response: { message: 'Unauthorized user' } };
  }

  await BlogPosts.update({ title, content }, { where: { id } });

  return {
    code: 200,
    response: { title, content, userId, categories },
  };
};

const deletePost = async ({ id, userId }: { id: number, userId: number }) => {
  try {
    const { response } = await getPostId({ id });

    if (response.message) {
      return { code: 404, response: { message: response.message } };
    }
    if (response.userId !== userId) {
      return { code: 401, response: { message: 'Unauthorized user' } };
    }

    await BlogPosts.destroy({ where: { id } });

    return { code: 204 };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const include = [
  { model: Users, as: 'user', attributes: { exclude: ['password'] } },
  { model: Categories, as: 'categories', through: { attributes: [] } },
];
const queryPosts = async (searchTerm: { email?: string, id?: string }) => {
  try {
    const posts = await BlogPosts.findAll({
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${searchTerm}%` },
          content: { [Op.like]: `%${searchTerm}%` },
        },
      },
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include,
    });
    const response = handleResponse(posts);
    return { code: 200, response };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};
module.exports = {
  createPost,
  getPosts,
  getPostId,
  updatePost,
  deletePost,
  queryPosts,
};
