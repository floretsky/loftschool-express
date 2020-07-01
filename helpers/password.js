const crypto = require('crypto');

module.exports.cryptPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, 'sha512')
    .toString('hex');
  return { hash, salt };
};

module.exports.comparePassword = (password, user) => {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 512, 'sha512')
    .toString('hex');
  return hash === user.hash;
};
