// import { number, optional, required, string } from 'joi';
import { countryEnum, languageEnum } from '../common.model.js'
import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    Learners: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address',
        ],
    },
    avatar: {
        type: String,
        required: false || true,
        default: 'https://res.cloudinary.com/dpxvet5ra/image/upload/v1748110022/xmzqvlmrdtm7tzqwlr1m.jpg'
    },
    country: {
        type: String,
        enum: countryEnum,
        required: true
    },
    Language: {
        type: String,
        enum: languageEnum,
        required: true,
    },
    Occupation: {
        type: String,
        required: true
    },
    Objective: {
        type: String,
        required: true
    },
    Subscription: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });


const Products = mongoose.model('Products', ProductsSchema);



export default Products;
