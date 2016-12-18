// const bcrypt = require('bcrypt-nodejs');
// const crypto = require('crypto');
const mongoose = require('mongoose');

// crypto.g

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre('save', (next) => {
//   const self = this;
//   if (self.isModified('password')) {
//     return next();
//   }
//   cr
//   bcrypt.genSalt(5, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     bcrypt.hash(self.passowrd, salt, null, (err, hash){
//       if (err) {
//         return next(err);
//       }
//       self.passowrd = hash;
//       next();
//     })
//   })
// })

module.exports = mongoose.model('user', userSchema);