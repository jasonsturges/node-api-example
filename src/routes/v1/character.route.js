const express = require("express");
const characterController = require("../../controllers/character.controller");
const characterValidation = require("../../validations/character.validation");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .post(validate(characterValidation.createCharacter), characterController.createCharacter)
  .get(validate(characterValidation.getCharacters), characterController.getCharacters);

router
  .route("/:characterId")
  .get(validate(characterValidation.getCharacter), characterController.getCharacter)
  .patch(validate(characterValidation.updateCharacter), characterController.updateCharacter)
  .delete(validate(characterValidation.deleteCharacter), characterController.deleteCharacter);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Character management and retrieval
 */

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a character
 *     description: Anyone can create other characters.
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Micky Mouse
 *               description: A cheerful and plucky anthropomorphic mouse
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Character'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *
 *   get:
 *     summary: Get all characters'
 *     description: Anyone can retrieve all characters.
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Character name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of characters
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Character'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get a character
 *     description: Anyone can fetch characters.
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Character id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Character'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a character
 *     description: Anyone can update characters.
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Character id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Minnie Mouse
 *               description: Longtime girlfriend of Mickey Mouse, known for her sweet disposition, large head bows, and polka-dotted dresses
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Character'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a character
 *     description: Anyone can delete characters.
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Character id
 *     responses:
 *       "200":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
