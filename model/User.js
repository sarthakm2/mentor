const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  imageUrl: {
    type: String,
  },
  registered_date: {
    type: Date,
    default: Date.now
  }
});


/**
  * @desc Mongoose middleware - Hash the password before pushing
  * to the DB. Does not Hash on every save. 
*/
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

const User = mongoose.model("users", userSchema);
module.exports = User;