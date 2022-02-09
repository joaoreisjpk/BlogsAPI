'use strict';
import Categories from './Categories';
import BlogPosts from './BlogPosts';
import PostsCategories from './PostsCategories';
import Users from './Users';

const Sequelize = require('sequelize');

const nodeEnv: any = process.env.NODE_ENV || 'development'
const env: 'development' | 'test' | 'production' = nodeEnv ;
import configDir from '../config/config';

const config: any = configDir[env];
const db: any = {};
let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Categories = Categories(sequelize, Sequelize.DataTypes)
db.PostsCategories = PostsCategories(sequelize, Sequelize.DataTypes)
db.BlogPosts = BlogPosts(sequelize, Sequelize.DataTypes)
db.Users = Users(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
