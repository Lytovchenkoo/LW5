module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("Group", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "group_name"
      }
    }, {
      tableName: "groups_", // ← явно вказуємо назву таблиці
      timestamps: false
    });
  
    Group.associate = (models) => {
      Group.hasMany(models.Student, {
        foreignKey: "groupId"
      });
    };
  
    return Group;
  };
  