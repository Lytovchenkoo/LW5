const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.showAdmin);
router.post("/search", adminController.searchGroup);
router.post("/add-group", adminController.addGroup);
router.post("/add-student", adminController.addStudent);
router.post("/edit", adminController.editStudent);
router.post("/delete", adminController.deleteStudent);

module.exports = router;
