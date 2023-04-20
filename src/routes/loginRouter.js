const express = require('express');
const loginValidation = require('../middlewares/loginValidation');
const createToken = require('../services/login.service')

const router = express.Router();

router.post('/', loginValidation, async (_req, res) => {
  const token = createToken();
  // console.log(token);
  
    res.status(200).json({ token: `${token}` });
  
});

module.exports = router;
