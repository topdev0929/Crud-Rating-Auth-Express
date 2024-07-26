/**
 * @swagger
 * tags:
 *   name: Contents
 *   description: Content management APIs
 */


import express from "express";
import { AuthMiddleware } from "../Middleware/Auth.Middleware.js";
import { validateContent } from "../Middleware/Validator.middlewares.js";
import { contentAdd, contentDelete, contentGet, contentUpdate } from "../Controller/Content.controller.js";
export const ContentRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       properties:
 *          title:
 *            type: string
 *            description: The title of the content.
 *          description:
 *            type: string
 *            description: The description of the content.
 *          category:
 *            type: string
 *            description: The category of the content.
 *          thumbnail_url:
 *            type: string
 *            description: The thumbnail url of the content.
 *          content_url:
 *            type: string
 *            description: The url of the content.
 *       required:
 *        - title
 *        - description
 *        - category
 *        - thumbnail_url
 *        - content_url
 *   securitySchemes:
 *     Bearer:
 *        type: http
 *        scheme: bearer
 */



/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Get a list of contents
 *     tags: [Contents]
 *     parameters:
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Maximum number of contents per page (default is 5)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [game, video, artwork, music]
 *         description: Filter contents by category
 *     responses:
 *       200:
 *         description: A list of contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /contents/add:
 *   post:
 *     summary: Add a new content
 *     tags: [Contents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Content added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /contents/delete/{id}:
 *   delete:
 *     summary: Delete a content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Content ID 
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *       404:
 *         description: Content not found or you don't have permission to delete this content
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /contents/update/{id}:
 *   patch:
 *     summary: Update a content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Content updated successfully
 *       404:
 *         description: Content not found or you don't have permission to update this content
 *       500:
 *         description: Internal server error
 */


ContentRoutes.get("/", contentGet)

ContentRoutes.post("/add", AuthMiddleware, validateContent, contentAdd)

ContentRoutes.delete("/delete/:id", AuthMiddleware, contentDelete)

ContentRoutes.patch("/update/:id", AuthMiddleware, contentUpdate)