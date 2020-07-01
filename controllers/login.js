const db = require('../db');
const { v4: uuidv4 } = require('uuid');

module.exports.get = function (req, res) {
  res.render('pages/login', { msglogin: req.flash('msglogin') });
};

module.exports.newAuthorization = function (req, res) {
  console.log(req.body);
  const { email, password } = req.body;
  const user = {
    id: uuidv4(),
    email,
    password,
  };
  let usersArr = db.get('users').value();
  usersArr.push(user).write();
  req.flash('msglogin', 'User is authorized!');
  res.redirect('/login');
};
