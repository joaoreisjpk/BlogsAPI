const createUser = async (req, resp) => {
  const { displayName, email, password, image } = req.body;

  const { status, response } = await Users.createUser({
    displayName,
    email,
    password,
    image,
  });

  return resp.status(status).json(response);
};

module.exports = { createUser };
