import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    pib: { type: String },
    city: { type: String },
    zip: { type: String },
    address: { type: String },
    authorizedPerson: { type: String, default: null },
    projectManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mainCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    // emailReceiver: { type: Array },
  },
  { timestamps: true }
);

export const Client = mongoose.model('Client', clientSchema);
