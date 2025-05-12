const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('students_db', 'root', '25122005', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Group = require('./group')(sequelize, Sequelize);
db.Student = require('./student')(sequelize, Sequelize);
db.Login = require('./login')(sequelize, Sequelize);

// Зв’язки
db.Group.hasMany(db.Student, { foreignKey: 'group_id' });
db.Student.belongsTo(db.Group, { foreignKey: 'group_id' });

module.exports = db;
