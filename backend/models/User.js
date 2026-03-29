const mongoose = require('mongoose');

// RIGHT: This creates and exports the actual Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['investor', 'developer', 'admin'], default: 'investor' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;