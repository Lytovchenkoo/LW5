const userRepo = require('../repositories/userRepository'); 

exports.loginPage = (req, res) => {
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password )

  try {
    console.log(1 )
    const user = await userRepo.getUserByUsername(username);
    console.log(2 )

    if (user && user.password === password) {
      if (user.role === 'admin') {
        res.redirect('/admin');
      } else {
        res.redirect('/student');
      }
    } else {
      res.render('login', { error: 'Невірний логін або пароль' });
    }

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('login', { error: 'Серверна помилка' });
  }
};
