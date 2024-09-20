import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    clientId: { type: mongoose.Types.ObjectId, ref: 'Client' },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: [
        'businessProject',
        'softwareProject',
        'serviceManagement',
        'productDiscovery',
      ],
      default: 'softwareProject',
    },
    developers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model('Project', projectSchema);
