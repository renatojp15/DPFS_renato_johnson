var express = require('express');
var router = express.Router();
let isAuthenticated = require('../middlewares/isAuthenticated');
let isGuest = require('../middlewares/isGuest');
let {validateLogin} = require('../middlewares/validateLogin');
let loginControllers = require('../controllers/loginControllers');

router.get('/', loginControllers.login);
router.post('/', validateLogin, loginControllers.send);
router.get('/logout', loginControllers.logout);
router.get('/', isGuest, (req, res) => res.render('login'));
router.get('/profile', isAuthenticated, (req, res) => res.render('profile', { user: req.session.user }));
router.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard'));

module.exports = router;