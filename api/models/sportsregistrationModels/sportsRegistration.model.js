import mongoose from 'mongoose';
import Counter from '../counter.model.js';
const mobileUserSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    coachname: {
        type: String,
        trim: true,
        required: false
    },
    middleName: {
        type: String,
        trim: true,
        required: false
    },
    photo: {
        type: String,
        trim: true,
        required: false
    },
    age: {
        type: Number,
        trim: true,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', "other"],
        trim: true,
        required: false
    },
    city: {
        type: String,
        trim: true,
        required: false
    },
    state: {
        type: String,
        trim: true,
        required: false
    },
    mobile: {
        type: String,
        match: [
            /^[6-9]\d{9}$/,
            'Please enter a valid 10-digit mobile number'
        ],
        required: false
    },
    altMobile: {
        type: String,
        match: [
            /^[6-9]\d{9}$/,
            'Please enter a valid 10-digit mobile number'
        ],
        required: false

    },
    selectedGameType: {
        type: String,
        enum: ["indoor", "outdoor"],
        required: false
    },
    selectedGame: {
        type: String,
        // required: true,
        enum: [
            "Badminton",
            "Table Tennis",
            "Chess",
            "Carrom",
            "Wrestling",
            "Cricket",
            "Football",
            "Basketball",
            "Kabaddi",
            "Volleyball",
            "Athletics",
        ],
        required: false
    },
    playerName: {
        type: String,
        required: false
    },
    playerAge: {
        type: Number,
        required: false
    },

    playerGender: {
        type: String,
        enum: ['male', 'female', "other"],
        required: false

    },

    playerCity: {
        type: String,
        required: false
    },
    playerState: {
        type: String,
        required: false
    },
    playerPhoto: {
        type: String,
        required: false
    },
    playerAdharPhoto: {
        type: String,
        required: false
    },
}, { timestamps: true });

mobileUserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'sportPlayerId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = counter.seq;
    }
    next();
});

export const SportsRegistraionPlayer = mongoose.model('SportPlayerRegistration', mobileUserSchema);
