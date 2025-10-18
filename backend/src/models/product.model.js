import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    storeId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    barcode:{
        type:String,
        index:true
    },
    image:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
},{timestamps: true});

export const Product = mongoose.model('Product',productSchema);