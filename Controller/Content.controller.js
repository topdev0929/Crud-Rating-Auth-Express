

import { validationResult } from "express-validator";
import { contentModel } from "../Models/Content.model.js";

export const contentGet = async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 5; 
    const startIndex = (page - 1) * limit;

    try {
        let query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }

        const contents = await contentModel.find(query).limit(limit).skip(startIndex);
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const contentAdd = async(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
    try {
        const content = await contentModel.create(req.body)
        await content.save();
        res.json({msg:"Content Added"})
     } catch (error) {
      res.json({error})
     }
}


export const contentDelete = async(req,res)=>{
    const { userId } = req.body;
    const { id } = req.params;

    try {
        const content = await contentModel.findOne({ _id: id, userId });

        if (!content) {
            return res.status(404).json({ msg: "Content not found or you don't have permission to delete this content." });
        }

        await contentModel.findByIdAndDelete(id);
        res.json({ msg: "Content deleted", content });
     } catch (error) {
      res.json({error})
     }
}


export const contentUpdate = async(req,res)=>{
    const { id } = req.params;

    try {
        const content = await contentModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!content) {
            return res.status(404).json({ msg: "Content not found or you don't have permission to update this content." });
        }

        res.json({ msg: "Content updated successfully", content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
