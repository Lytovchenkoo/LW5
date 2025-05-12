const studentRepo = require('../repositories/studentRepository');

exports.showAdmin = async (req, res) => {
  res.render("admin", { students: [], selectedGroup: "" });
};

exports.searchGroup = async (req, res) => {
  const groupName = req.body.group.trim();
  
  try {
    console.log('Обрана група:', groupName);
    const allStudentsGrouped = await studentRepo.getAllStudentsGroupedByGroup();
    
    let students = [];
    let message = null;
    
    if (allStudentsGrouped.hasOwnProperty(groupName)) {
      students = allStudentsGrouped[groupName];
      if (students.length === 0) {
        message = `У групі ${groupName} немає студентів.`;
      }
    } else {
      message = "Групу не знайдено";
    }
    
    res.render("admin", {
      students,
      selectedGroup: groupName,
      message
    });
  } catch (err) {
    console.error('Помилка при пошуку групи:', err);
    res.render("admin", {
      students: [],
      selectedGroup: groupName,
      message: null,
      error: 'Помилка зчитування з бази'
    });
  }
};

exports.addGroup = async (req, res) => {
  const name = req.body.groupName.trim();
  
  try {
    await studentRepo.createGroupIfNotExists(name);
    res.redirect(`/admin?newGroup=true&selectedGroup=${encodeURIComponent(name)}`);
  } catch (err) {
    console.error('Помилка при додаванні групи:', err);
    res.render("admin", {
      students: [],
      selectedGroup: "",
      error: 'Помилка при додаванні групи'
    });
  }
};

exports.addStudent = async (req, res) => {
  const { studentName, group } = req.body;
  
  try {
    const groupExists = await studentRepo.checkGroupExists(group);
    
    if (!groupExists) {
      return res.render("admin", {
        students: [],
        selectedGroup: group,
        message: "Групу не знайдено"
      });
    }
    
    await studentRepo.addStudentToGroup(studentName.trim(), group);
    res.redirect("/admin");
  } catch (err) {
    console.error('Помилка при додаванні студента:', err);
    res.render("admin", {
      students: [],
      selectedGroup: group,
      error: 'Помилка при додаванні студента'
    });
  }
};

exports.editStudent = async (req, res) => {
  const { group, oldName, studentName } = req.body;
  
  try {
    await studentRepo.updateStudentName(oldName, studentName.trim(), group);
    res.redirect("/admin");
  } catch (err) {
    console.error('Помилка при редагуванні студента:', err);
    res.render("admin", {
      students: [],
      selectedGroup: group,
      error: 'Помилка при редагуванні студента'
    });
  }
};

exports.deleteStudent = async (req, res) => {
  const { studentName, group } = req.body;
  
  try {
    await studentRepo.deleteStudentFromGroup(studentName, group);
    res.redirect("/admin");
  } catch (err) {
    console.error('Помилка при видаленні студента:', err);
    res.render("admin", {
      students: [],
      selectedGroup: group,
      error: 'Помилка при видаленні студента'
    });
  }
};

exports.searchStudents = async (req, res) => {
  const groupOrLastName = (req.body && req.body.group) || (req.query && req.query.group) || '';
  const isAdminRoute = req.originalUrl.includes('/admin');
  let students = [];
  let message = null;

  try {
    console.log('Обрана група або прізвище:', groupOrLastName);
    const allStudentsGrouped = await studentRepo.getAllStudentsGroupedByGroup();

    const isGroupSearch = groupOrLastName.length >= 3 && groupOrLastName[2] === '-';

    if (isGroupSearch) {
      // Пошук по назві групи
      if (allStudentsGrouped.hasOwnProperty(groupOrLastName)) {
        students = allStudentsGrouped[groupOrLastName];
        if (students.length === 0) {
          message = `У групі ${groupOrLastName} немає студентів.`;
        }
      } else {
        message = `Групу ${groupOrLastName} не знайдено.`;
      }
    } else {
      // Пошук по прізвищу
      for (const groupName in allStudentsGrouped) {
        allStudentsGrouped[groupName].forEach(student => {
          const lastName = student.name.split(' ')[0];
          if (lastName.toLowerCase() === groupOrLastName.toLowerCase()) {
            students.push({ name: student.name, group: groupName });
          }
        });
      }

      if (students.length === 0) {
        message = `Студентів з прізвищем "${groupOrLastName}" не знайдено.`;
      }
    }

    res.render(isAdminRoute ? 'admin' : 'student', {
      students,
      selectedGroup: groupOrLastName,
      message,
      error: null
    });

  } catch (err) {
    console.error('Помилка при обробці запиту:', err);
    res.render(isAdminRoute ? 'admin' : 'student', {
      students: [],
      selectedGroup: groupOrLastName,
      message: null,
      error: 'Помилка зчитування з бази'
    });
  }
};