const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /^(https?|www):\/\/\S+$/.test(link),
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
