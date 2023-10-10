const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength:[3, 'Username \'{VALUE}\' is too short. Username must have minimum lenght of 3 characters'],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*$/,
      'Username must contain only alphanumeric characters or underscore, but no at the beggining or end'
    ]
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User