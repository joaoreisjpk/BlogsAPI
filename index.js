const express = require('express');
const userRouter = require('./routes/user.routes');
require('dotenv/config');

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`ouvindo porta ${process.env.PORT}!`));

app.use('/user', userRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;