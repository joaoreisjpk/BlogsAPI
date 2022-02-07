const express = require('express');
const userRouter = require('./src/routes/user.routes');
const loginRouter = require('./src/routes/login.routes');
const categorieRouter = require('./src/routes/categories.routes');
const postsRouter = require('./src/routes/posts.routes');
require('dotenv/config');

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categorieRouter);
app.use('/post', postsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;
