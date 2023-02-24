import mongoose from 'mongoose';

const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    address: {
    type: String,
    required: true,
    },
    Phone: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
    },
    website:{
    type: String,   
    },
    License:{
    type: String,
    required: true,
    },
    OpeningHours:{
    type: String,
    required: true,
    },
 
});

export default mongoose.model('Phamarcy', PharmacySchema);