import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ndc: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  pharmacyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  },
});

export default mongoose.model('Medicine', MedicineSchema);
