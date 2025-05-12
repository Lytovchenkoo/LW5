const db = require('../models');
const studentRepo = require('../repositories/studentRepository');

module.exports = {
  getAllStudents: () => studentRepo.getAll(),

  getStudentById: (id) => studentRepo.getById(id),

  createStudent: async (data) => {
    const t = await db.sequelize.transaction();
    try {
      const student = await studentRepo.create(data, t);
      
      // Бізнес-правило: якщо ім’я містить "error", відкотити
      if (data.name_.toLowerCase().includes('error')) throw new Error('Invalid student name');

      await t.commit();
      return student;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  updateStudent: async (id, data) => {
    const t = await db.sequelize.transaction();
    try {
      const updated = await studentRepo.update(id, data, t);
      await t.commit();
      return updated;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  deleteStudent: async (id) => {
    const t = await db.sequelize.transaction();
    try {
      await studentRepo.delete(id, t);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
