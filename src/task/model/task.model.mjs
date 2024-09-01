import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    projectId: { type: mongoose.Types.ObjectId, ref: 'Project' },
    status: {
      type: String,
    },
    assignee: { type: mongoose.Types.ObjectId, ref: 'User' },
    reporter: { type: mongoose.Types.ObjectId, ref: 'User' },
    listId: { type: mongoose.Types.ObjectId, ref: 'TaskList' },
    dueDate: { type: Date },
    documents: { type: Array },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);

const taskListSchema = new Schema(
  {
    title: { type: String },
    projectId: { type: mongoose.Types.ObjectId, ref: 'Project' },
  },
  {
    timestamps: true,
  }
);

export const TaskList = mongoose.model('TaskList', taskListSchema);
