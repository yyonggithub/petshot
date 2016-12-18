const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '欢迎来到宠物店',
  });
})

module.exports = router;