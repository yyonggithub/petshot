const Client = require('../models/client');

function postClients(req, res) {
  const client = new Client();
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.body._id;
  client.save((err) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: client });
  })
}

function getClients(req, res) {
  Client.find({ userId: req.user._id }, (err, clients) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: clients });
  })
}

module.exports = {
  postClients,
  getClients,
}