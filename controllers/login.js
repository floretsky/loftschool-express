const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const passwordHelper = require('../helpers/password');

module.exports.get = function (req, res) {
  if (req.session.auth) {
    return res.redirect('/admin');
  }
  res.render('pages/login', { msglogin: req.flash('msglogin') });
};

module.exports.newAuthorization = function (req, res) {
  const { email, password } = req.body;
  let user = db
    .get('users')
    .value()
    .find((el) => el.email === email);
  if (user) {
    if (passwordHelper.comparePassword(password, user)) {
      req.flash('msglogin', 'User is authorized!');
      req.session.auth = 'authentificated';
      res.redirect('/admin');
    } else {
      req.flash('msglogin', 'Password is incorrect!');
      res.redirect('/login');
    }
  } else {
    /* let encryptedData = passwordHelper.cryptPassword(password);
    const user = {
      id: uuidv4(),
      email,
      hash: encryptedData.hash,
      salt: encryptedData.salt,
    };
    db.get('users').push(user).write(); */
    req.flash('msglogin', 'Please register!');
    res.redirect('/login');
  }
};
