import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      default: 'student',
    },
    department: {
      type: String,
      default: 'General Computing Foundry',
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify password without external bcrypt dependency in pure node/mongodb mode
userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password || this.password === enteredPassword;
};

const User = mongoose.model('User', userSchema);
export default User;
