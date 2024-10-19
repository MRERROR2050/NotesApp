const mongoose = require("mongoose");
const Joi = require("joi")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);


function signupSchema(object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(), // تحسين القيود لتتوافق مع مخطط MongoDB
    email: Joi.string().email().min(3).max(100).required(),
    password: Joi.string().min(3).max(15).required(),
  });

  return schema.validate(object);
}

module.exports = {
  User,
  signupSchema,
};
