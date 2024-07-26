

import { validationResult } from "express-validator";
import { rateModel } from "../Models/Rate.model.js";
import { usersModel } from "../Models/Auth.model.js";
import { contentModel } from "../Models/Content.model.js";


export const rateAdd = async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    // Check if user and content exist
    const { userId, contentId } = req.body;
    const user = await usersModel.findById(userId);
    const content = await contentModel.findById(contentId);

    if (!user || !content) {
        return res.status(404).json({ message: 'User or content not found.' });
    }

    try {
        const user = await rateModel.findOne({userId});
        const content = await rateModel.findOne({contentId});

        if(user && content) {
            return res.status(404).json({ message: 'You have already rated this content.' });
        }

        const rate = await rateModel.create(req.body)
        await rate.save();

        res.json({ msg: "Rate Added" })
     } catch (error) {
      res.json({error})
     }
}


export const rateGetForContent = async (req, res) => {
    try {
        const { contentId } = req.params;
        const rates = await rateModel.find({ contentId }).populate('userId', 'name'); // Populate user data if needed
        
        res.json(rates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const rateGetForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const rates = await rateModel.find({ userId }).populate('contentId', ['title', 'description']); // Populate content data if needed

        res.json(rates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const rateDelete = async(req,res)=>{
    const { userId } = req.body;
    const { id } = req.params;

    try {
        const rate = await rateModel.findOne({ _id: id, userId });

        if (!rate) {
            return res.status(404).json({ msg: "Rate not found or you don't have permission to delete this rate." });
        }

        await rateModel.findByIdAndDelete(id);
        res.json({ msg: "Rate deleted", rate });
     } catch (error) {
      res.json({error})
     }
}


export const rateUpdate = async(req,res)=>{
    const { userId } = req.body;
    const { id } = req.params;

    try {
        const rate = await rateModel.findOneAndUpdate({ _id: id, userId }, req.body, { new: true });

        if (!rate) {
            return res.status(404).json({ msg: "Rate not found or you don't have permission to update this rate." });
        }

        res.json({ msg: "Rate updated successfully", rate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



