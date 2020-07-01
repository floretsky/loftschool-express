const db = require('../db');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports.get = function (req, res) {
  res.render('pages/admin', {
    msgskill: req.flash('msgskill'),
    msgfile: req.flash('msgfile'),
  });
};

module.exports.saveSkills = function (req, res) {
  console.log(req.body);
  const { age, concerts, cities, years } = req.body;
  db.get('skills').remove().write();
  db.get('skills')
    .push(
      {
        name: 'age',
        number: age && age > 0 ? age : '',
        text: 'Возраст начала занятий на скрипке',
      },
      {
        name: 'concerts',
        number: concerts && concerts > 0 ? concerts : '',
        text:
          concerts && concerts > 0
            ? `${declOfNum(concerts, [
                'Концерт',
                'Концерта',
                'Концертов',
              ])} отыграл`
            : '',
      },
      {
        name: 'cities',
        number: cities && cities > 0 ? cities : '',
        text: 'Максимальное число городов в туре',
      },
      {
        name: 'years',
        number: years && years > 0 ? years : '',
        text:
          years && years > 0
            ? `${declOfNum(years, [
                'Год',
                'Года',
                'Лет',
              ])} на сцене в качестве скрипача`
            : '',
      }
    )
    .write();
  req.flash('msgskill', 'Skills were saved');
  res.redirect('/admin');
};

// Склонения существительных

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

module.exports.uploadProducts = function (req, res) {
  let form = new formidable.IncomingForm();
  let upload = path.join('./public', 'upload');
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
  form.uploadDir = path.join(process.cwd(), upload);
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }
    const fileName = path.join(upload, files.photo.name);
    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
      let excludePublic =
        fileName.indexOf('/') === -1
          ? fileName.indexOf('\\')
          : fileName.indexOf('/');
      let dir = `.${fileName.substr(excludePublic).replace(/\\/g, '/')}`;
      const product = {
        src: dir,
        name: fields.name,
        price: +fields.price, // string to number
      };

      db.get('products').push(product).write();

      req.flash('msgfile', 'Product was saved!');
      res.redirect('/admin');
    });
  });
};
