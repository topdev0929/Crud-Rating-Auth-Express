
import {body} from "express-validator"

export const validateRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];

  export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
  
  
  export const validateContent = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').isIn(['game', 'video', 'artwork', 'music']).withMessage('Invalid category'),
    body('thumbnail_url').notEmpty().withMessage('Thumbnail url is required'),
    body('content_url').notEmpty().withMessage('Content url is required'),
  ];
  

  export const validateRate = [
    body('rating').isInt({min: 1, max: 5}).withMessage('The rating must be a number is between 1 and 5'),
    body('contentId').isMongoId().withMessage('The contentId must be a valid MongoDB ObjectId')
  ];
  