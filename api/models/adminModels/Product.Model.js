// import { number, optional, required, string } from 'joi';
import { countryEnum, languageEnum } from '../common.model.js'
import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: false || true,
        default: 'https://res.cloudinary.com/dpxvet5ra/image/upload/v1748110022/xmzqvlmrdtm7tzqwlr1m.jpg'

    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,

    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    warrantyPeriod: {
        type: String,
        required: true
    },
    returnPolicy: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
}, { timestamps: true });


const Products = mongoose.model('Customer', ProductsSchema);



export default Products;
