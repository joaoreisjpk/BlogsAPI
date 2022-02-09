export default (sequelize: any, DataTypes: any) => {
  const Users = sequelize.define(
    'Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    {
      timestamps: false,
    },
  );

  Users.associate = (models: any) => {
    Users.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'blogposts' });
  };
  
  return Users;
};
