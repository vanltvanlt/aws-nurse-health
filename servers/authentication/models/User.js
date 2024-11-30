const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { // Update username to name for simplicity
    type: String,
    required: true,
  },
  email: { // Adding email to be used as the main identifier for login and registration
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['nurse', 'patient'],
    required: true,
  },
  vitalSigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'VitalSigns',
    },
  ],
  motivationalTips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MotivationalTip',
    },
  ],
  assignedPatients: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  assignedNurses: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],  
});

module.exports = mongoose.model('User', UserSchema);