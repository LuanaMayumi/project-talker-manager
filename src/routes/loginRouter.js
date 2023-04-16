const express = require('express');
const loginValidation = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', loginValidation, async (req, res) => {
  const { email, password } = req.body;
  const num = Math.random();
  const string = num.toString();
  const token = string.slice(-16);
  // console.log(token);
  if (email && password) {
    res.status(200).json({ token: `${token}` });
  }
});

module.exports = router;
