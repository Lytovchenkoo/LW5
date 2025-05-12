const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const authController = require("./controllers/authController");
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');

// Middleware ДО маршрутів!!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'someSecret',
    resave: false,
    saveUninitialized: false,
  })
);

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Маршрути
app.get('/login', authController.loginPage);
app.post("/login", authController.login);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// Кореневий маршрут
app.get('/', (req, res) => {
  res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
