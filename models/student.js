module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name_"
      },
      groupId: {
        type: DataTypes.INTEGER,
        field: "group_id"
      }
    }, {
      tableName: "student", // ← явна назва таблиці
      timestamps: false
    });
  
    Student.associate = (models) => {
      Student.belongsTo(models.Group, {
        foreignKey: "groupId"
      });
    };
  
    return Student;
  };
  