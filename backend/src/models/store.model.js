import mongoose from 'mongoose';
const storeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    ownerEmail: {
        type: String,
        required: true
    }
},{timestamps: true});

export const Store = mongoose.model('Store',storeSchema);