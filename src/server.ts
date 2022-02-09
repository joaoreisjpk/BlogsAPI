import express from 'express';
import router from './routes';

require('dotenv/config');

const app = express();

app.use(express.json());

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

export default app;
