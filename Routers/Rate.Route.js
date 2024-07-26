/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: Rating System APIs
 */


import express from "express";
import { AuthMiddleware } from "../Middleware/Auth.Middleware.js";
import { validateRate } from "../Middleware/Validator.middlewares.js";
import { rateAdd, rateDelete, rateGetForContent, rateGetForUser, rateUpdate } from "../Controller/Rate.controller.js";
export const RateRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Rate:
 *       type: object
 *       properties:
 *          rating:
 *            type: number
 *            description: The rate of the content.
 *            example: 1
 *            minimum: 1
 *            maximum: 5
 *          contentId:
 *           type: string
 *           description: The ID of the content. Typically an ObjectId in MongoDB.
 *           example: "60d21b4667d0d8992e610c86"
 *       required:
 *        - rating
 *        - userId
 *        - contentId
 *   securitySchemes:
 *     Bearer:
 *        type: http
 *        scheme: bearer
 */



/**
 * @swagger
 * /rates/add:
 *   post:
 *     summary: Add a new rate
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Rate added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rates/content/{contentId}:
 *   get:
 *     summary: Get a list of rates for a specific content
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       200:
 *         description: A list of rates for a specific content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rates/user/{userId}:
 *   get:
 *     summary: Get a list of rates for a specific user
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       200:
 *         description: A list of rates for a specific user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rates/delete/{id}:
 *   delete:
 *     summary: Delete a rate by ID
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Rate ID 
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Rate deleted successfully
 *       404:
 *         description: Rate not found or you don't have permission to delete this content
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rates/update/{id}:
 *   patch:
 *     summary: Update a rate by ID
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Rate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Rate updated successfully
 *       404:
 *         description: Rate not found or you don't have permission to update this rate
 *       500:
 *         description: Internal server error
 */

RateRoutes.get("/content/:contentId", AuthMiddleware, rateGetForContent)

RateRoutes.get("/user/:userId", AuthMiddleware, rateGetForUser)

RateRoutes.post("/add", AuthMiddleware, validateRate, rateAdd)

RateRoutes.delete("/delete/:id", AuthMiddleware, rateDelete)

RateRoutes.patch("/update/:id", AuthMiddleware, rateUpdate)