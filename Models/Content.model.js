import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
    title: { type: String,required : true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['game', 'video', 'artwork', 'music'] },
    thumbnail_url: { type: String, required: true },
    content_url : { type: String, required: true },
    created_at : { type: Date, default: Date.now }
})

export const contentModel = mongoose.model('Content', contentSchema);