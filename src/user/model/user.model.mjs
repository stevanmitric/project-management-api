import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    status: {
      type: String,
      enum: ['In Progress', 'On Hold', 'Done'],
      default: 'On Hold',
    },
    role: [
      {
        type: String,
        enum: ['admin', 'developer', 'manager'],
        default: 'developer',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
