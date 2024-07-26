import mongoose from "mongoose";

const rateSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    created_at: { type: Date, default: Date.now }
})

export const rateModel = mongoose.model('Rate', rateSchema);