const User = require('../models/user');

function postUsers(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: user });
  })
}

function getUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: users });
  })
}

module.exports = {
  postUsers,
  getUsers,
}