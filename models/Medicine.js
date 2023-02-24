import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
})