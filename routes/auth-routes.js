const router = require('express').Router();

// auth login route
router.get('/login', (req, res) => {
	res.render('login');
});

// auth logout route
router.get('/logout', (req, res) => {
	//handle with passport.js
	res.send('logging out. . .');
});

// auth with google
router.get('/google', (req, res) => {
	// handle this section with passport.js
	res.send('loggin in with google');
});

module.exports = router;

