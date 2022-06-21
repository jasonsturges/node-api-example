const { Character } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

/**
 * Create a character
 * @param {Object} characterBody
 * @returns {Promise<Character>}
 */
const createCharacter = async (characterBody) => {
  if (await Character.isNameTaken(characterBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name already taken");
  }
  return Character.create(characterBody);
};

/**
 * Query for characters
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCharacters = async (filter, options) => {
  return await Character.paginate(filter, options);
};

/**
 * Get character by id
 * @param {ObjectId} id
 * @returns {Promise<Character>}
 */
const getCharacterById = async (id) => {
  return Character.findById(id);
};

/**
 * Get character by email
 * @param {string} name
 * @returns {Promise<Character>}
 */
const getCharacterByName = async (name) => {
  return Character.findOne({ name });
};

/**
 * Update character by id
 * @param {ObjectId} characterId
 * @param {Object} updateBody
 * @returns {Promise<Character>}
 */
const updateCharacterById = async (characterId, updateBody) => {
  const character = await getCharacterById(characterId);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, "Character not found");
  }
  if (updateBody.name && (await Character.isNameTaken(updateBody.email, characterId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name already taken");
  }
  Object.assign(character, updateBody);
  await character.save();
  return character;
};

/**
 * Delete character by id
 * @param {ObjectId} characterId
 * @returns {Promise<Character>}
 */
const deleteCharacterById = async (characterId) => {
  const character = await getCharacterById(characterId);
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, "Character not found");
  }
  await character.remove();
  return character;
};

module.exports = {
  createCharacter,
  queryCharacters,
  getCharacterById,
  getCharacterByName,
  updateCharacterById,
  deleteCharacterById,
};
