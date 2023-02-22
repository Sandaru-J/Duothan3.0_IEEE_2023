import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model('Test', TestSchema);
export default Test;
