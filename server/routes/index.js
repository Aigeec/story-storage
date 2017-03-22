const express = require('express');
const router = express.Router();

const passport = require('../config/passport');
const api = require('./api');

const authenticateOptions = {
  session: false
};

/* GET api listing. */
router.use('/api', passport.authenticate('jwt', authenticateOptions), api);

router.post('/login',
  passport.authenticate('local-login', authenticateOptions),
  (req, res) => {
    res.json(req.user);
  }
);

router.post('/register',
  passport.authenticate('local-signup', authenticateOptions),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;