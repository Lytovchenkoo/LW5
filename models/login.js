module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Login', {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
    }, {
      tableName: 'login',
      timestamps: false,
    });
  };
  