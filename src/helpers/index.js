function handleResponse(posts) {
  const newPosts = JSON.parse(JSON.stringify(posts));

  const response = newPosts.map(({ categories, ...rest }) => ({
    ...rest,
    categories: categories.map((item) => item.categories),
  }));
  return response;
}

module.exports = { handleResponse };
