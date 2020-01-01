let crypto = require('crypto');
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  firstname: {
    type: String,
    lowercase: true
  },
  lastname: {
    type: String,
    lowercase: true
  },
  password: String,
  interests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interest',
    autopopulate: true
  }],
  opinions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opinion',
    autopopulate: true
  }],
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  picture: String,
  authcode: String,
  verified: Boolean,
  date: String
});
UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({ "username" : { $regex : new RegExp(username, "i") } })
    .exec(function(err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      if (verifyHash(password, user.password)) {
        return callback(null, user);
      } else {
        callback();
      }
    });
};

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  user.password = hashPassword(user.password);
  next();
});

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  return [salt, hash].join('$');
}

function verifyHash(password, original) {
  const originalHash = original.split('$')[1];
  const salt = original.split('$')[0];
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  return hash === originalHash;
}

let User = mongoose.model('User', UserSchema);

module.exports = User;
