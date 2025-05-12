const studentService = require('../services/studentService');

module.exports = {
  list: async (req, res) => {
    const students = await studentService.getAllStudents();
    res.render('students', { students });
  },

  createForm: (req, res) => {
    res.render('createStudent');
  },

  create: async (req, res) => {
    try {
      await studentService.createStudent(req.body);
      res.redirect('/students');
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  delete: async (req, res) => {
    try {
      await studentService.deleteStudent(req.params.id);
      res.redirect('/students');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
