// routes/student.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Використовуємо функцію з adminController
router.get('/', (req, res) => {
  res.render("student", { students: [], selectedGroup: "" });
});
router.post('/search', adminController.searchStudents);

module.exports = router;