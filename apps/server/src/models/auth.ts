import { Schema, model } from 'mongoose';

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,// true for active, false for inactive
      required: false
    }
  },
  { timestamps: true }
);

export default model('Auth', authSchema);
