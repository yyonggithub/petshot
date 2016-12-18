const oauth2orize = require('oauth2orize'),
  User = require('../models/user'),
  Client = require('../models/client'),
  Token = require('../models/token'),
  Code = require('../models/code');

const { uid, getRandomInt } = require('../util');

// 创建OAuth2 server
const server = oauth2orize.createServer();

// 注册序列化反序列化方法
server.serializeClient((client, cb) => {
  return cb(null, client._id);
});

server.deserializeClient((id, cb) => {
  Client.findOne({ _id: id }, (err, client) => {
    if (err) {
      return cb(err);
    }
    return cb(null, client);
  })
})

// 注册authorization code许可类型
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, cb) => {
  const code = new Code({
    value: uid(16),
    clientId: client._id,
    redirectUri: redirectUri,
    userId: user._id,
  });
  code.save((err) => {
    if (err) {
      return cb(err);
    }
    cb(null, code.value);
  })
}))

// 使用autho code交换access token
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, cb) => {
  Code.findOne({ value: code }, (err, authCode) => {
    if (err) {
      return cb(err);
    }
    if (authCode === undefined) {
      return cb(null, false);
    }
    if (client._id.toString() !== authCode.clientId) {
      return cb(null, false);
    }
    if (redirectUri !== authCode.redirectUri) {
      return cb(null, false);
    }
    authCode.remove((err) => {
      if (err) {
        return cb(err);
      }
      const token = new Token({
        value: uid(256),
        clientId: authCode.clientId,
        userId: authCode.userId
      });
      token.save((err) => {
        if (err) {
          return cb(err);
        }
        cb(null, token);
      });
    });
  });
}));

module.exports.authorization = [
  server.authorization((clientId, redirectUri, cb) => {
    Client.findOne({ id: clientId }, (err, client) => {
      if (err) {
        return cb(err);
      }
      return cb(null, client, redirectUri);
    });
  }),
  (req, res) => {
    res.render('dialog', { transationID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
  }
]

module.exports.decision = [server.decision()];

module.exports.token = [
  server.token(),
  server.errorHandler(),
]