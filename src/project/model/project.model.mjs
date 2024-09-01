import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    dueDate: { type: Date },
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
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model('Project', projectSchema);
