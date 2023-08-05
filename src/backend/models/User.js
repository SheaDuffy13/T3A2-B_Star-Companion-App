const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Compare the provided password with the stored hash
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  console.log(candidatePassword)
  console.log(this.password)
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      console.log(isMatch)
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
