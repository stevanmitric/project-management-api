import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const inviteSchema = new Schema(
  {
    email: { type: String },
    status: {
      type: String,
      enum: ['Invited', 'Active', 'InActive'],
      default: 'Invited',
    },
  },
  {
    timestamps: true,
  }
);

export const Invite = mongoose.model('Invite', inviteSchema);
