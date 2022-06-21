const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createCharacter = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getCharacters = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCharacter = {
  params: Joi.object().keys({
    characterId: Joi.string().custom(objectId),
  }),
};

const updateCharacter = {
  params: Joi.object().keys({
    characterId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteCharacter = {
  params: Joi.object().keys({
    characterId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
};
