const { Group, Student } = require("../models");

// Get all students grouped by their group name
exports.getAllStudentsGroupedByGroup = async () => {
  const groups = await Group.findAll({
    include: { model: Student }
  });
  
  const result = {};
  
  for (const group of groups) {
    result[group.name] = group.Students.map(student => ({
      name: student.name,
      group: group.name
    }));
  }
  
  return result;
};

// Check if a group exists
exports.checkGroupExists = async (groupName) => {
  const group = await Group.findOne({ where: { name: groupName } });
  return !!group;
};

// Create a group if it doesn't exist
exports.createGroupIfNotExists = async (groupName) => {
  const [group, created] = await Group.findOrCreate({ where: { name: groupName } });
  return group;
};

// Add a student to a group
exports.addStudentToGroup = async (studentName, groupName) => {
  const group = await Group.findOne({ where: { name: groupName } });
  if (!group) throw new Error(`Group ${groupName} not found`);
  
  return await Student.create({
    name: studentName,
    groupId: group.id
  });
};

// Update a student's name
exports.updateStudentName = async (oldName, newName, groupName) => {
  const group = await Group.findOne({ where: { name: groupName } });
  if (!group) throw new Error(`Group ${groupName} not found`);
  
  const student = await Student.findOne({
    where: {
      name: oldName,
      groupId: group.id
    }
  });
  
  if (student) {
    student.name = newName;
    await student.save();
    return student;
  }
  
  return null;
};

// Delete a student from a group
exports.deleteStudentFromGroup = async (studentName, groupName) => {
  const group = await Group.findOne({ where: { name: groupName } });
  if (!group) throw new Error(`Group ${groupName} not found`);
  
  return await Student.destroy({
    where: {
      name: studentName,
      groupId: group.id
    }
  });
};