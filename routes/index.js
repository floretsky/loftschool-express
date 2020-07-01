const express = require('express');
const router = express.Router();

const index = require('../controllers');
const login = require('../controllers/login');
const admin = require('../controllers/admin');

router.get('/', index.get);
router.post('/', index.sendMail);

router.get('/login', login.get);
router.post('/login', login.newAuthorization);

router.get('/admin', admin.get);
router.post('/admin/skills', admin.saveSkills);
router.post('/admin/upload', admin.uploadProducts);

module.exports = router;
