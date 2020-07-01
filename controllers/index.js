const db = require('../db');

module.exports.get = function (req, res) {
  const skills = db.getState().skills || [];
  const goods = db.getState().products || [];
  res.render('pages/index', {
    skills: skills,
    products: goods,
    msgsemail: req.flash('msgemail'),
  });
};

module.exports.sendMail = function (req, res) {
  console.log(req.body);
  const { name, email, message } = req.body;
  const newMessage = { name, email, message };
  let messagesArr = db.getArray('messages');
  messagesArr.push(newMessage).write();
  req.flash('msgemail', 'Message was sent!');
  res.redirect('/#form');
};
