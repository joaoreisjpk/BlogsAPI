### Blogs API

Desafio do curso de FullStack Developer da TRYBE https://www.betrybe.com/

## Tech em uso

[NodeJs] API </br>
Criação de uma API RestFul utilizando express </br>
Uso do MySQL como database e do Sequelize como ORM </br>
Uso do jsonwebtoken como biblioteca para gerar um token de validiação </br>
Uso de typescript para tipar as funções.

# Habilidades desenvolvidas.

-Componentizar a API em diretórios com diferentes funcções, como a pasta services, models e controllers, seguindo o padrão Rest </br>

-Fazer uso do banco de dados MySql para armazenar os dados </br>

-Fazer uso do ORM Sequelize para facilitar a criação de querys </br>

-Fazer uso do jsonwebtoken para criar e controlar tokens de verificação do usuário </br>

-Fazer uso do Express para lidar com as requisições </br>

-Tipar todo o código para torna-lo mais confiável </br>

-Aprender a criar associações com diferentes tabelas no Sequelize </br>


# O que foi desenvolvido.

Uma API de blogs que possui quatro endpoints: Login, User, Categories, Posts. O User e o login são responsáveis por controlar a criação e verificação de um usuário, sendo só possível cria um novo post ou categoria uma vesz que o usuário esteja logado e com um token válido. No endpoint Categories e Posts é possível criar, editar ou listá-los, além disso o endpoint Posts também permite que você busque por um título ou conteúdo específico, usando uma palavra chave ou frase que contenha nos mesmos.

  - Criar um usuário, logar nesse mesmo usuário, criar posts e categorias.
  - Só é possível criar posts ou categorias uma vez que o usuário esteja logado e com token válido.
  - Só é possível deletar um post que o próprio usuário tenha criado.
  - É possível que o usuário delete sua conta, desde que esteja logado e validado.

# Como rodar a aplicação

Para rodar a aplicação é necessário rodar no terminal `yarn`ou `npm install` e criar um banco de dados. para criar a tabela é necessário usar os seguintes comandos em sequência, no root da aplicação: 
  - ```yarn prestart || npm prestart```.
  - ```yarn start || npm start```.
  - ```yarn seed || npm seed```. (opcional, utilizado caso já queira que tenham informações no banco)
  - ```yarn dev || npm dev```.

Além disso é necessário criar um arquivo `.env` com o seguinte formato no root da aplicação:
```
MYSQL_HOST=<local onde o mysql rodará>
MYSQL_USER=<usuario do mysql>
MYSQL_PASSWORD=<senha do mysql>
JWT_SECRET=<segredo do token>
```
Na pasta já existe um `.env.example` que pode lhe auxiliar