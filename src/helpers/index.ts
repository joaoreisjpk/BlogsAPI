function handleResponse(posts: any) {
  const newPosts = JSON.parse(JSON.stringify(posts));

  const response = newPosts.map(({ categories, ...rest }: any) => ({
    ...rest,
    categories: categories.map(({ id, name }: any) => ({
      id,
      name,
    })),
  }));
  return response;
}

export { handleResponse }