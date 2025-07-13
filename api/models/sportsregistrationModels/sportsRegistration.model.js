import mongoose from 'mongoose';
import Counter from '../counter.model.js';
const mobileUserSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    coachname: {
        type: String,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', "other"],
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        match: [
            /^[6-9]\d{9}$/,
            'Please enter a valid 10-digit mobile number'
        ]
    },
    altMobile: {
        type: String,
        match: [
            /^[6-9]\d{9}$/,
            'Please enter a valid 10-digit mobile number'
        ]

    },
    selectedGameType: {
        type: String,
        enum: ["indoor", "outdoor"],
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
    },
    playerName: {
        type: String,
    },
    playerAge: {
        type: Number,
    },

    playerGender: {
        type: String,
        enum: ['male', 'female', "other"],

    },

    playerCity: {
        type: String,
    },
    playerState: {
        type: String,
    },
    playerPhoto: {
        type: String,
    },
    playerAdharPhoto: {
        type: String,
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
